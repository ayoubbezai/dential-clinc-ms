<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Crypt;

use Illuminate\Http\Request;
use App\Models\Patient;
use Illuminate\Http\Response;
use Illuminate\Contracts\Encryption\DecryptException;
class PatientController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        // get the query from the request

        $request_query = $request->query();

        //get number of element per page

       $perPage = filter_var($request_query["per_page"] ?? 15, FILTER_VALIDATE_INT) ?: 15;
        $perPage = max($perPage, 1);

        //validate sort by and direction

        $validSortColumns = ['patient_name', 'age', 'created_at','updated_at'];
        $validSortDirection = ["asc","desc"];
        $sortBy = in_array($request_query['sort_by'] ?? 'created_at', $validSortColumns)
                ? $request_query['sort_by'] ?? 'created_at'
                : 'created_at';

        $sortDirection = in_array(strtolower($request_query['sort_direction'] ?? 'asc'), $validSortDirection)
            ? strtolower($request_query['sort_direction'] ?? 'asc')
            : 'asc';



           // Get the data


        $data = Patient::query()->select([
        'patients.id',
        'patients.patient_name',
        'patients.phone',
        'patients.gender',
        'patients.age',
        'patients.notes',
        'patients.diseases',
        'patients.created_at',
        'patients.updated_at'
    ]);

  
                if (!empty($request_query['search'])) {
            $searchTerm = strtolower($request_query['search']);
            $searchTokens = explode(' ', $searchTerm);

            // Hash each search token
            $hashedSearchTokens = array_map(function($token) {
                return hash('sha256', $token);
            }, $searchTokens);

            foreach ($hashedSearchTokens as $hashedToken) {
                $data->where('patient_name_tokens', 'LIKE', "%{$hashedToken}%");
            }
}

        //filter by gender if "gender" query exicts
          if(!empty($request_query["gender"])){
            $gender = $request_query["gender"];
                $data->where("gender", $gender);
          }


           // Filter by date name if 'created_at' query parameter is provided
        if (!empty($request_query['created_at'])) {
            $createdAt = $request_query['created_at'];
            // The date format is (yyyy-mm-dd)
            $data->whereRaw("DATE(patients.created_at) = ?", [$createdAt]);
        }

        // We need to have start and end date as today if not exist
        $startDate = $request_query['start_date'] ?? null;
        $endDate = $request_query['end_date'] ?? now()->toDateString(); // Defaults to today if not provided

        if ($startDate && $endDate) {
            $data->whereRaw("DATE(patients.created_at) BETWEEN ? AND ?", [$startDate, $endDate]);
        }

         // Apply sorting
        $data->orderBy($sortBy, $sortDirection);

        // Get paginated results
        $paginatedData = $data->paginate($perPage);

// Decrypt patient data
$paginatedData->getCollection()->transform(function ($patient) {
    try {
        $patient->patient_name = Crypt::decryptString($patient->patient_name);
        $patient->phone = $patient->phone ? Crypt::decryptString($patient->phone) : null;
        $patient->notes = $patient->notes ? Crypt::decryptString($patient->notes) : null;
        $patient->diseases = $patient->diseases ? Crypt::decryptString($patient->diseases) : null;
    } catch (DecryptException $e) {

         //if somthing went wrong with decryption
            return response()->json([
        "success" => false,
        "message" => "Failed to dycript patient data",
        "error" => $e->getMessage(),
    ], Response::HTTP_INTERNAL_SERVER_ERROR);
        
    }
    return $patient;
});

         // Prepare a structured response
        $response = [
            'success' => true,
            'message' => 'Data fetched successfully',
            'data' => $paginatedData->items(), // Paginated data items
            'pagination' => [
                'total' => $paginatedData->total(), // Total number of items
                'current_page' => $paginatedData->currentPage(), // Current page
                'last_page' => $paginatedData->lastPage(), // Last page number
                'per_page' => $paginatedData->perPage(), // Items per page
                'from' => $paginatedData->firstItem(), // Starting item on the current page
                'to' => $paginatedData->lastItem(), // Last item on the current page
            ]
        ];

        // Return JSON response
        return response()->json($response, Response::HTTP_OK);

    }

    /**
     * Store a newly created resource in storage.
     */
public function store(Request $request)
{
    // Validate the data from the request
    $data = $request->validate([
        "user_id" => "nullable|string|exists:users,id",
        "patient_name" => "required|string|max:255",
        "phone" => "nullable|string|max:255",
        "gender" => "required|string|in:male,female",
        "age" => "required|integer|min:1|max:120",
        "notes" => "nullable|string",
        "diseases" => "nullable|string",
    ]);
    //keep a copy on decrypted data 
    $decryptedData =$data;

    try {
        // Create the patient record

         // Encrypt sensitive data
        $data['patient_name'] = Crypt::encryptString($data['patient_name']);
        $data['phone'] = $data['phone'] ? Crypt::encryptString($data['phone']) : null;
        $data['notes'] = $data['notes'] ? Crypt::encryptString($data['notes']) : null;
        $data['diseases'] = $data['diseases'] ? Crypt::encryptString($data['diseases']) : null;

        // Tokenize patient name split by spaces
        $tokens = explode(' ', strtolower($decryptedData['patient_name']));

        $hashedTokens = array_map(function($token) {
            return hash('sha256', $token);
        }, $tokens);

    // Store hashed tokens as a string for easy searching
    $data['patient_name_tokens'] = implode(' ', $hashedTokens);


         Patient::create($data);


        // Return success response
        return response()->json([
            "success" => true,
            "message" => "Patient created successfully",
            "data" => $decryptedData
        ], Response::HTTP_CREATED); // 201 Created

    } catch (\Exception $e) {
        // Return error response
        return response()->json([
            "success" => false,
            "message" => "Failed to create a patient",
            "error" => $e->getMessage(),
        ], Response::HTTP_INTERNAL_SERVER_ERROR); // 500 Internal Server Error
    }
}
    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
            $patient = Patient::findOrFail($id);

        //decrypte sensetive data
        try{

            $patient->patient_name = Crypt::decryptString($patient->patient_name);
             $patient->phone = $patient->phone ? Crypt::decryptString($patient->phone) : null;
             $patient->notes = $patient->notes ? Crypt::decryptString($patient->notes) : null;
            $patient->diseases = $patient->diseases ? Crypt::decryptString($patient->diseases) : null;

        }catch(DecryptException $e){
            //if somthing went wrong with decryption
            return response()->json([
        "success" => false,
        "message" => "Failed to dycript patient data",
        "error" => $e->getMessage(),
    ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        //success response

        return response()->json([
        "success" => true,
        "message" => "Patient retrieved successfully",
        "data" => $patient
    ], Response::HTTP_OK);

}
    

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
           $patient = Patient::findOrFail($id);

            // Validate the data from the request
        $data = $request->validate([
            "patient_name" => "nullable|string|max:255",
            "phone" => "nullable|string|max:255",
            "gender" => "nullable|string|in:male,female",
            "age" => "nullable|integer|min:1|max:120",
            "notes" => "nullable|string",
            "diseases" => "nullable|string",
        ]);
        //keep a copy on decrypted data
        $decryptedData =$data;

          // Encrypt sensitive fields before updating
        if (!empty($data['patient_name'])) {
            $data['patient_name'] = Crypt::encryptString($data['patient_name']);
                    // Tokenize patient name split by spaces
            $tokens = explode(' ', strtolower($decryptedData['patient_name']));

            $hashedTokens = array_map(function($token) {
                return hash('sha256', $token);
            }, $tokens);

        // Store hashed tokens as a string for easy searching
        $data['patient_name_tokens'] = implode(' ', $hashedTokens);
        }
        if (!empty($data['phone'])) {
            $data['phone'] = Crypt::encryptString($data['phone']);
        }
        if (!empty($data['notes'])) {
            $data['notes'] = Crypt::encryptString($data['notes']);
        }
        if (!empty($data['diseases'])) {
            $data['diseases'] = Crypt::encryptString($data['diseases']);
        }
    


          try{
            $patient->update($data);

         return response()->json([
            'success' => true,
            'message' => 'patient updated successfully',
            'data' => $decryptedData,
        ], Response::HTTP_OK);

        }catch(\Exception $e){
              return response()->json([
                'success' => false,
                'message' => 'faild to updated the patient',
                'error' => $e->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR); // 500 Internal Server Error
        }
        

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
        $patient = Patient::findOrFail($id);
        try{
            $patient->delete();

         return response()->json([
            'success' => true,
            'message' => 'patient deleted successfully',
            'data' => [],
        ], Response::HTTP_OK);

        }catch(\Exception $e){
              return response()->json([
                'success' => false,
                'message' => 'faild to delete the patient',
                'error' => $e->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR); // 500 Internal Server Error
        }
        }
    

    }
