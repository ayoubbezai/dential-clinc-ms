<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Appointment;
use App\Models\Folder;
use Illuminate\Http\Response;
use Illuminate\Validation\Rule;

class AppointmentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        //get all appoinemtns
        //get the query from the request

        try{
        $request_query = $request->query();

        //get the number of elements perPage by the front

        $perPage = filter_var($request_query["per_page"]?? 15 ,FILTER_VALIDATE_INT)?:15;
        $perPage = max($perPage,1);

        //validate sort bu and direction to avoid sql injection
        $validSortColumns = ["date",'created_at','updated_at'];
         $validSortDirection = ["asc","desc"];
        $sortBy = in_array($request_query['sort_by'] ?? 'created_at', $validSortColumns)
                ? $request_query['sort_by'] ?? 'created_at'
                : 'created_at';

        $sortDirection = in_array(strtolower($request_query['sort_direction'] ?? 'asc'), $validSortDirection)
            ? strtolower($request_query['sort_direction'] ?? 'asc')
            : 'asc';

            //get the data
            
            $data = Appointment::query()
    ->with(["folder:id,folder_name,patient_id", "folder.patient:id,patient_name"]);

     //search by appointemnt title

            if (!empty($request_query['search'])) {
            $search = $request_query['search'];
            $data->where(function ($query) use ($search) {
                $query->where('title', 'like', '%' . $search . '%')
                      ->orWhereHas('folder.patient',function ($q) use ($search){
                            $q->where('patient_name', 'like', '%' . $search . '%');
                      } )
;
            });
        }

        //filter by status if it provided
        if(!empty($request_query["status"])){
            $status = $request_query["status"];
                $data->where("status", $status);
          }

             // Filter by date name if 'date' query parameter is provided
        if (!empty($request_query['date'])) {
            $date = $request_query['date'];
            // The date format is (yyyy-mm-dd)
    $data->whereDate('appointemnts.date', $date);
        }

           $startDate = $request_query['start_date'] ?? null;
        $endDate = $request_query['end_date'] ?? null;
        if ($startDate && $endDate) {
            $data->whereBetween('appointments.date', [$startDate, $endDate]);
        } elseif ($startDate) {
            $data->where('appointments.date', '>=', $startDate);
        } elseif ($endDate) {
            $data->where('appointments.date', '<=', $endDate);
        }
         // Apply sorting
        $data->orderBy($sortBy, $sortDirection);

        // Get paginated results
        $paginatedData = $data->paginate($perPage);

        // Map data
        //get collection to get items of paginatedData
        $mappedData = $paginatedData->getCollection()->map(function ($appointment) {
            return [
                'id' => $appointment->id,
                'date' => $appointment->date,
                'status' => $appointment->status,
                'title' => $appointment->title,
                'tooth' => $appointment->tooth,
                'content' => $appointment->content,
                'folder_name' => $appointment->folder->folder_name,
                'patient_name' => $appointment->folder->patient->patient_name,
            ];
        });
                //get collection to set items of paginatedData

         $paginatedData->setCollection($mappedData);


        
         // Prepare a structured response
        $response = [
            'success' => true,
            'message' => 'Data fetched successfully',
            'data' => $paginatedData->items(), // Paginated data items
            'pagination' => [
        'total_items' => $paginatedData->total(), // Total number of items
        'items_per_page' => $paginatedData->perPage(), // Items per page
        'current_page' => $paginatedData->currentPage(), // Current page number
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
         // Return JSON response
        return response()->json($response, Response::HTTP_OK);
         } catch (\Exception $e) {
        return response()->json([
            'success' => false,
            'message' => 'Failed to get appointments',
            'error' => $e->getMessage(),
        ], Response::HTTP_INTERNAL_SERVER_ERROR);
    }



    }

    /**
     * Store a newly created resource in storage.
     */
public function store(Request $request)
{
    $data = $request->validate([
        "date" => "required|date",
        "status" => ["required", Rule::in(['pending', 'completed', 'cancelled', 'rescheduled','scheduled'])],
        "tooth" => "nullable|integer|max:255",
        "title" => "nullable|string|max:255",
        "content" => "nullable|string",
        "folder_id" => "required|integer|exists:folders,id"
    ]);

    try {
        $folder = Folder::findOrFail($data["folder_id"]);
        $appointment = Appointment::create($data);

        return response()->json([
            "success" => true,
            "message" => "Appointment created successfully",
            "data" => [
                "folder_id" => $folder->id,
                "folder_name" => $folder->folder_name,
                "appointment_id" => $appointment->id,
                "date" => $appointment->date,
                "status" => $appointment->status,
                "title" => $appointment->title,
                "tooth" => $appointment->tooth,
                "content" => $appointment->content,
            ]
        ], Response::HTTP_CREATED);

    } catch (\Exception $e) {
        return response()->json([
            'success' => false,
            'message' => 'Failed to create the appointment',
            'error' => $e->getMessage(),
        ], Response::HTTP_INTERNAL_SERVER_ERROR);
    }
}



 

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //get appoinment in a folder ther id is for the fodler
        try{
        $appointment = Appointment::findOrFail($id);

        return response()->json([
            "success" => true,
            "message" => "Appointment retrived successfully",
            "data" => $appointment
        ], Response::HTTP_OK);

        }catch (\Exception $e) {
        return response()->json([
            'success' => false,
            'message' => 'Failed to get the appointment',
            'error' => $e->getMessage(),
        ], Response::HTTP_INTERNAL_SERVER_ERROR);
    }

        
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //update appointmens
        
        //find that appoinment
        $appointment = Appointment::findOrFail($id);

        //valideate data before update
        $data = $request->validate([
        "date" => "nullable|date",
        "status" => ["required", Rule::in(['pending', 'completed', 'cancelled', 'rescheduled','scheduled'])],
        "title" => "nullable|string|max:255",
        "tooth" => "nullable|integer|max:255",
        "content" => "nullable|string",
        "folder_id" => "nullable|integer|exists:folders,id"
    ]);

    //update the user
    try{
        $appointment->update($data);
        return response()->json([
            "success" => true,
            "message" => "Appointment updated successfully",
            "data" => $appointment
        ], Response::HTTP_OK);


    }catch (\Exception $e) {
        return response()->json([
            'success' => false,
            'message' => 'Failed to update the appointment',
            'error' => $e->getMessage(),
        ], Response::HTTP_INTERNAL_SERVER_ERROR);
    }      
    
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        
          //get appoinment in a folder ther id is for the fodler
        try{
        $appointment = Appointment::findOrFail($id);
        $appointment->delete();

        return response()->json([
            "success" => true,
            "message" => "Appointment deleted successfully",
            "data" => []
        ], Response::HTTP_OK);

        }catch (\Exception $e) {
        return response()->json([
            'success' => false,
            'message' => 'Failed to delete the appointment',
            'error' => $e->getMessage(),
        ], Response::HTTP_INTERNAL_SERVER_ERROR);
    }
    }

 public function getAppointmentsOfFolder(Request $request, string $id)
{
    try {
        $folder = Folder::with('appointments')->findOrFail($id);

        $request_query = $request->query();
        
        $perPage = filter_var($request_query["per_page"] ?? 15, FILTER_VALIDATE_INT) ?: 15;
        $perPage = max($perPage, 1);

        $validSortColumns = ["date", "created_at", "updated_at"];
        $validSortDirection = ["asc", "desc"];

      $sortBy = in_array($request_query['sort_by'] ?? '', $validSortColumns)
    ? $request_query['sort_by']
    : 'created_at';

    
        $sortDirection = in_array(strtolower($request_query['sort_direction'] ?? ''), $validSortDirection)
            ? strtolower($request_query['sort_direction'] ?? 'asc')
            : 'asc';

        $data = $folder->appointments()->orderBy($sortBy, $sortDirection);

        if (!empty($request_query['search'])) {
            $search = $request_query['search'];
            $data->where('title', 'like', '%' . $search . '%');
        }

        if (!empty($request_query['status'])) {
            $status = $request_query['status'];
            $data->where('status', $status);
        }


        $paginatedData = $data->paginate($perPage);

        $mappedData = $paginatedData->getCollection()->map(function ($appointment) {
            return [
                'id' => $appointment->id,
                'date' => $appointment->date,
                'status' => $appointment->status,
                'title' => $appointment->title,
                'tooth' => $appointment->tooth,
                'content' => $appointment->content,
            ];
        });

        $paginatedData->setCollection($mappedData);

        return response()->json([
            "success" => true,
            "message" => "Appointments retrieved successfully",
            "data" => $paginatedData->items(),
            "pagination" => [
                "total_items" => $paginatedData->total(),
                "items_per_page" => $paginatedData->perPage(),
                "current_page" => $paginatedData->currentPage(),
                "total_pages" => $paginatedData->lastPage(),
                "from" => $paginatedData->firstItem(),
                "to" => $paginatedData->lastItem(),
                "first_page_url" => $paginatedData->url(1),
                "last_page_url" => $paginatedData->url($paginatedData->lastPage()),
                "next_page_url" => $paginatedData->nextPageUrl(),
                "prev_page_url" => $paginatedData->previousPageUrl(),
                "path" => $paginatedData->path(),
            ]
        ], Response::HTTP_OK);
    } catch (\Exception $e) {
        return response()->json([
            "success" => false,
            "message" => "Failed to get the appointments in this folder",
            "error" => $e->getMessage(),
        ], Response::HTTP_INTERNAL_SERVER_ERROR);
    }
}
}
