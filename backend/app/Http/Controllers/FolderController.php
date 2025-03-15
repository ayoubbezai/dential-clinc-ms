<?php

namespace App\Http\Controllers;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\DB;
use App\Models\Folder;
use App\Models\Patient;
use App\Models\FolderVisit;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Contracts\Encryption\DecryptException;


class FolderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //get all folders (no need for now )
        
    }

    /**
     * request :
     * patient_id	int
     * folder_name	string
     * price    int
     * status   enum()
     * visits  [
     * {dent int,reason_of_visit  string ,treatment_details  string}
     * {dent int,reason_of_visit  string ,treatment_details  string}
     * {dent int,reason_of_visit  string ,treatment_details  string}
     * ]
     */
    public function store(Request $request)
    {
        // validate the request of creating a folder
        $data = $request->validate([
            "folder_name" => "required|string|max:255",
            "patient_id" => "required|integer|exists:patients,id",
            "price" => "required|integer|min:0",
            "status" => ["nullable", Rule::in(['working_on_it', 'completed', 'pending'])],
            //validaet visits array of objects
            "visits" => "nullable|array",
            "visits.*.dent" => "nullable|integer",
            "visits.*.reason_of_visit" => "nullable|string|max:500",
            "visits.*.treatment_details" => "nullable|string|max:1000",
        ]);

        // start transaction to create all or none
        DB::beginTransaction();
        try{
            //create a folder
            $folder = Folder::create([
                "folder_name" => $data["folder_name"],
                "price" => $data["price"] ,
                "status" => $data["status"] ??"working_on_it",
                "patient_id" => $data["patient_id"]
            ]);
            
            // now create visits and link to the folder
            $numberOfVisits = 0;

            if(!empty($data["visits"])){
                    $originalData = $data["visits"];
                    //loop over the array and create a table for each one
                foreach($data["visits"] as &$visit ){ //&refrence to actual data

                    //encrypte each element if exists

                if (!empty($visit['dent'])) {
                    $visit['dent'] = Crypt::encryptString($visit['dent']);
                }
                if (!empty($visit['reason_of_visit'])) {
                    $visit['reason_of_visit'] = Crypt::encryptString($visit['reason_of_visit']);
                }
                if (!empty($visit['treatment_details'])) {
                    $visit['treatment_details'] = Crypt::encryptString($visit['treatment_details']);
                }

                    FolderVisit::create([
                        "folder_id" => $folder->id,
                        "dent" => $visit["dent"] ?? null,
                        "reason_of_visit" => $visit["reason_of_visit"] ?? null,
                        "treatment_details" => $visit["treatment_details"] ?? null,
                    ]);
        $numberOfVisits++;
            }
            }
            //now commit everything if success

            DB::commit();

            // number of vists messgae

            $message = $numberOfVisits == 0
         ? "Folder created successfully, but no visits were added."
            : "Folder created successfully with $numberOfVisits visit" . (($numberOfVisits > 1) ? "s":" ");

            //return sucess message
            return response()->json([
                "success" => true,
                "message" => $message,
                "data" => [
                    "folder_id" => $folder->id,
                    "folder_name" => $folder->folder_name,
                    "price" => $folder->price,
                    "status" => $folder->status,
                    "patient_id" => $folder->patient_id,
                    "created_at" => $folder->created_at,
                    "updated_at" => $folder->updated_at,
                    "visits" => $originalData
                ]
            ], Response::HTTP_CREATED);
        
        }catch(\Exception $e){
            //rolle back if sonthing is wrong
            DB::rollBack();
            //error response 
              return response()->json([
                'success' => false,
                'message' => 'Failed to create the folder',
                'error' => $e->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR); // 500 Internal Server Error
        }
    }

    /**
     * get a one folder details by details means name id vits resean ..
     */
    public function show(string $id)
    {
        //id is of the folder not the patient 
            $folder = Folder::with("visits")->findOrFail($id);
            $visits = $folder->visits;
            try{

            
            if(!empty($visits)){
                try{

                    //decrypte each visit data
                foreach ($visits as $visit) {
                    $visit->dent = $visit->dent ? Crypt::decryptString($visit->dent) : null;
                    $visit->reason_of_visit = $visit->reason_of_visit ? Crypt::decryptString($visit->reason_of_visit) : null;
                    $visit->treatment_details = $visit->treatment_details ? Crypt::decryptString($visit->treatment_details) : null;
                }

            }catch (DecryptException $e) {
        return response()->json([
            "success" => false,
            "message" => "Failed to decrypt folder data",
            "error" => $e->getMessage(),
        ], Response::HTTP_INTERNAL_SERVER_ERROR);
            }
            // Success response
    return response()->json([
            "success" => true,
            "message" => "Folder retrieved successfully",
            "data" => [
                "folder" => $folder
            ],
        ], Response::HTTP_OK);
            }
            }catch(\Exception $e){
              return response()->json([
                'success' => false,
                'message' => 'faild to show the folder',
                'error' => $e->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR); // 500 Internal Server Error
        }

    }

    /**
     * Update the folder and its related visits
     */
  /**
 * Update the folder and its related visits
 */
public function update(Request $request, string $id)
{
    try {
        DB::beginTransaction(); // Start transaction

        // Find the folder with its visits
        $folder = Folder::with("visits")->findOrFail($id);

        // Validate request data
        $data = $request->validate([
            "folder_name" => "required|string|max:255",
            "patient_id" => "required|integer|exists:patients,id",
            "price" => "required|integer|min:0",
            "status" => ["nullable", Rule::in(['working_on_it', 'completed', 'pending'])],
            "visits" => "nullable|array",
            "visits.*.id" => "nullable|integer|exists:folder_visits,id",
            "visits.*.dent" => "nullable|integer",
            "visits.*.reason_of_visit" => "nullable|string|max:500",
            "visits.*.treatment_details" => "nullable|string|max:1000",
        ]);

        // Update folder details
        $folder->update([
            "folder_name" => $data["folder_name"],
            "patient_id" => $data["patient_id"],
            "price" => $data["price"],
            "status" => isset($data["status"])? $data["status"] : "working_on_it",
        ]);

        // Handle visits update
        if (!empty($data["visits"])) {

            //get the ids of visits provided in the request
            $visitIdsFormRequest = collect($data["visits"])->pluck("id")->filter()->toArray();

            //delte visits that are not in the request
            $folder->visits()->whereNotIn("id",$visitIdsFormRequest)->delete();

            //update or create visits from the request 
            foreach ($data["visits"] as $visitData) {
                $folder->visits()->updateOrCreate(
                    ["id" => $visitData["id"] ?? null],
                    [
                        "dent" => isset($visitData["dent"]) ? Crypt::encryptString($visitData["dent"]) : null,
                        "reason_of_visit" => isset($visitData["reason_of_visit"]) ? Crypt::encryptString($visitData["reason_of_visit"]) : null,
                        "treatment_details" => isset($visitData["treatment_details"]) ? Crypt::encryptString($visitData["treatment_details"]) : null,
                    ]
                );
            }
        }

        DB::commit(); // Commit transaction

        return response()->json([
            'success' => true,
            'message' => 'Folder and visits updated successfully',
            'data' => $folder->load('visits'), // Return updated folder with visits
        ], Response::HTTP_OK);

    } catch (\Exception $e) {
        DB::rollBack(); // Rollback if something fails

        // Log the error for debugging

        return response()->json([
            'success' => false,
            'message' => 'Failed to update the folder',
            'error' => $e->getMessage(),
        ], Response::HTTP_INTERNAL_SERVER_ERROR);
    }
}
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        // delete a folder
        $folder = Folder::findOrFail($id);
        try{
            $folder->delete();

         return response()->json([
            'success' => true,
            'message' => 'folder deleted successfully',
            'data' => [],
        ], Response::HTTP_OK);

        }catch(\Exception $e){
              return response()->json([
                'success' => false,
                'message' => 'faild to delete the folder',
                'error' => $e->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR); // 500 Internal Server Error
        }
    }

    public function getFoldersOfPatient(string $id){//the id of the patient
        //get the patient we are looking for
        $patient = Patient::with("folders")->findOrFail($id);
        try{
            // Check if the patient has folders
        $hasFolders = optional($patient->folders)->isNotEmpty();

        // Conditional message
        $message = $hasFolders
            ? 'This patient has folders.'
            : 'This patient has no folders.';

            return response()->json([
                'success' => true,
                'message' => $message,
                 'data' => [
                'patient' => [
                    'id' => $patient->id,
                    'patient_name' => $patient->patient_name,
                ],
                'folders' => $patient->folders, // empty if has none
            ],

            ], Response::HTTP_OK);
                }catch(\Exception $e){
              return response()->json([
                'success' => false,
            'message' => 'Failed to retrieve folders for the patient.',
                'error' => $e->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR); // 500 Internal Server Error
        }

        

    }
}
