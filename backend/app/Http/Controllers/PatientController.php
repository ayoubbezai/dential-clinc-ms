<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Models\Patient;
use App\Models\Role;
use App\Models\User;
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
                try{

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


   $data = Patient::query()
    ->select([
        'patients.id',
        'patients.patient_name',
        'patients.phone',
        'patients.gender',
        'patients.age',
        'patients.notes',
        'patients.diseases',
        'patients.created_at',
        'patients.updated_at',
        'patients.user_id',
    ])
    ->with([
        'user:id,name,email' // Load only selected user fields
    ]);


  //search by patient name

            if (!empty($request_query['search'])) {
            $search = $request_query['search'];
            $data->where(function ($query) use ($search) {
                $query->where('patient_name', 'like', '%' . $search . '%');
            });
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
    $data->whereDate('patients.created_at', $createdAt);
        }

        // We need to have start and end date as today if not exist
        $startDate = $request_query['start_date'] ?? null;
        $endDate = $request_query['end_date'] ?? now()->toDateString(); // Defaults to today if not provided
        if ($startDate > $endDate) {
    // Swap the dates if startDate is greater than endDate
    [$startDate, $endDate] = [$endDate, $startDate];
}

        if ($startDate && $endDate) {
    $data->whereBetween('patients.created_at', [$startDate, $endDate]);
        }

         // Apply sorting
        $data->orderBy($sortBy, $sortDirection);

        // Get paginated results
        $paginatedData = $data->paginate($perPage);

// Decrypt patient data
$paginatedData->through(function ($patient) {
    try {
        $patient->phone = $patient->phone ? Crypt::decryptString($patient->phone) : null;
        $patient->notes = $patient->notes ? Crypt::decryptString($patient->notes) : null;
        $patient->diseases = $patient->diseases ? Crypt::decryptString($patient->diseases) : null;
    } catch (DecryptException $e) {

         //if somthing went wrong with decryption
            return response()->json([
        "success" => false,
        "message" => "Failed to dycript patient data",
        "error" => "Decryption failed due to invalid data."
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
        'total_items' => $paginatedData->total(), // Total number of items
        'items_per_page' => $paginatedData->perPage(), // Items per page
        'current_page' => $paginatedData->currentPage() , // Current page number
        'total_pages' => $paginatedData->lastPage(), // Last page number
        'from' => $paginatedData->firstItem(), // First item on the current page
        'to' => $paginatedData->lastItem(), // Last item on the current page
        'first_page_url' => $paginatedData->url(1), // First page URL
        'last_page_url' => $paginatedData->url($paginatedData->lastPage()), // Last page URL
        'next_page_url' => $paginatedData->nextPageUrl(), // Next page URL
        'prev_page_url' => $paginatedData->previousPageUrl(), // Previous page URL
        'path' => $paginatedData->path(), // Base path of pagination
    ]
        ];

        // Return success response
        return response()->json($response, Response::HTTP_OK);
         } catch (\Exception $e) {
        return response()->json([
            'success' => false,
            'message' => 'Failed to get patients',
            'error' => $e->getMessage(),
        ], Response::HTTP_INTERNAL_SERVER_ERROR);
    }

    }

    /**
     * Store a newly created resource in storage.
     */
public function store(Request $request)
{
    // Validate the data from the request
    $data = $request->validate([
        "patient_name" => "required|string|max:255",
        "phone" => "nullable|string|max:255",
        "gender" => "required|string|in:male,female",
        "age" => "required|integer|min:1|max:120",
        "notes" => "nullable|string",
        "diseases" => "nullable|string",
    ]);
    //keep a copy on decrypted data
    $originalData =$data;

    try {
        // Create the patient record

         // Encrypt sensitive data

         $data['phone'] = $data['phone'] ? Crypt::encryptString($data['phone']) : null;
        $data['notes'] = !empty($data['notes']) ? Crypt::encryptString($data['notes']) : null;
        $data['diseases'] = !empty($data['diseases']) ? Crypt::encryptString($data['diseases']) : null;


    
        $patient = Patient::create($data);


        // Return success response
        return response()->json([
            "success" => true,
            "message" => "Patient created successfully",
            "data" => array_merge(["id" => $patient->id], $originalData) // return the id and decrypted data

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

             $patient->phone = $patient->phone ? Crypt::decryptString($patient->phone) : null;
             $patient->notes = $patient->notes ? Crypt::decryptString($patient->notes) : null;
            $patient->diseases = $patient->diseases ? Crypt::decryptString($patient->diseases) : null;

    // Prepare user details if patient has a linked user

        $userDetails = null;
        if ($patient->user) {
            $userDetails = [
                "id" => $patient->user->id,
                "name" => $patient->user->name,
                "email" => $patient->user->email,
            ];
        }
    } catch (DecryptException $e) {
        return response()->json([
            "success" => false,
            "message" => "Failed to decrypt patient data",
            "error" => $e->getMessage(),
        ], Response::HTTP_INTERNAL_SERVER_ERROR);
    }

    // Success response
    return response()->json([
        "success" => true,
        "message" => "Patient retrieved successfully",
        "data" => [
            "id" => $patient->id,
            "patient_name" => $patient->patient_name,
            "phone" => $patient->phone,
            "gender" => $patient->gender,
            "age" => $patient->age,
            "notes" => $patient->notes,
            "diseases" => $patient->diseases,
            "user" => $userDetails, // Include user details if available
            "created_at" => $patient->created_at,
            "updated_at" => $patient->updated_at,
        ],
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

    public function createUser(Request $request, string $id){

        $patient = Patient::findOrFail($id);

        $data = $request->validate([
            "email" => "required|string|max:255|email|unique:users,email",
            "password" => "required|min:6",
        ]);

            $role = Role::where("name", "patient")->first();

         if (!$role) {
             return response()->json([
                 "success" => false,
                 "message" => "patient role not found."
             ], Response::HTTP_NOT_FOUND); // 404 Not Found
         }
            // Wrap both actions in a transaction
            DB::beginTransaction();

            //decrypte the patient name first

        try{
            $user =User::create([
                "name" => $patient->patient_name,
                "email" => $data["email"],
                "password" => $data["password"],
                "role_id" => $role->id,
            ]);

             // Assign user to patient

             $patient->user_id = $user->id;
             $patient->save();

            // If everything is successful, commit the transaction
              DB::commit();

            // Return success response
            return response()->json([
                "success" => true,
                "message" => "patinet  updated  successfully and user account created",
                "data" => [
                    "patient_id" => $patient->id,
                    "patient_name" =>  $patient->patient_name,
                    "user_id" => $patient->user_id,
                ],
            ], Response::HTTP_CREATED);

         
        }catch(\Exception $e){
            // if somthing went wrong dont do anything
                    DB::rollBack();
              return response()->json([
                'success' => false,
                'message' => 'faild to create a user for the patient',
                'error' => $e->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR); // 500 Internal Server Error
        }

    }
    }
