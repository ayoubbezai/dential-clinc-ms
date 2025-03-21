<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Contracts\Encryption\DecryptException;
use App\Models\Event;
use Illuminate\Support\Facades\Auth;

class EventController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
       try {
        //show all events

        // get the id of loged in user
        $user = Auth::user(); 
        $userId = $user->id;

        //get the query from the request
        $request_query = $request->query();
        
        //get the number of element per page
        $perPage = filter_var($request_query["per_page"]?? 15 , FILTER_VALIDATE_INT) ?: 15;
        $perPage = max($perPage,1);

        //validate sorting direction and by
        $validSortColumns = ["title","created_at","updated_at"];
        $validSortDirection = ["asc","desc"];

        $sortBy = in_array($request_query["sort_by"]??"created_at",$validSortColumns)
                  ? $request_query["sort_by"]
                  : "created_at";

        $sortDirection = in_array(strtolower($request_query['sort_direction'] ?? 'asc'), $validSortDirection)
            ? strtolower($request_query['sort_direction'])
            : 'asc';

        //put the query 
        $data = Event::query();

        //search by event title
        if(!empty($request_query["search"])){
            $search = $request_query["search"];
            $data->where(function($query) use ($search) {
                $query->where("title", "like", "%".$search."%");
            });
        }

        //filer by date
        //we need start_date and end_date to filter
        $startDate = $request_query['start_date'] ?? null;
        $endDate = $request_query['end_date'] ?? now()->toDateString(); // Defaults to today if not provided

        if ($startDate > $endDate) {
            // Swap the dates if startDate is greater than endDate
            [$startDate, $endDate] = [$endDate, $startDate];
        }

        if ($startDate && $endDate) {
            $data->whereBetween('events.created_at', [$startDate, $endDate]);
        }

        // Apply sorting and user Id
        $data->where("user_id", $userId)->orderBy($sortBy, $sortDirection);

        $paginationData = $data->paginate($perPage);

        // Prepare a structured response
        $response = [
            'success' => true,
            'message' => 'Data fetched successfully',
            'data' => $paginationData->items(), // Paginated data items
            'pagination' => [
                'total_items' => $paginationData->total(), // Total number of items
                'items_per_page' => $paginationData->perPage(), // Items per page
                'current_page' => $paginationData->currentPage(), // Current page number
                'total_pages' => $paginationData->lastPage(), // Last page number
                'from' => $paginationData->firstItem(), // First item on the current page
                'to' => $paginationData->lastItem(), // Last item on the current page
                'first_page_url' => $paginationData->url(1), // First page URL
                'last_page_url' => $paginationData->url($paginationData->lastPage()), // Last page URL
                'next_page_url' => $paginationData->nextPageUrl(), // Next page URL
                'prev_page_url' => $paginationData->previousPageUrl(), // Previous page URL
                'path' => $paginationData->path(), // Base path of pagination
            ]
        ];

        //return sucess result
        return response()->json([
            "success" => true,
            "message" => "event retrived successfully",
            "data" =>

        ], Response::HTTP_OK);    } catch (\Exception $e) {
        return response()->json([
            'success' => false,
            'message' => 'Failed to get events',
            'error' => $e->getMessage(),
        ], Response::HTTP_INTERNAL_SERVER_ERROR);
    }








        
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //create a new event with in date

        $data = $request->validate([
            "start_date" => "required|date",
            "end_date" => "required|date|after_or_equal:start_date",
            "location" => "nullable|string|max:255",
            "title" => "nullable|string|max:255",
            "people" => "nullable|array",
            "people.*" =>"nullable|string|max:255",
            "user_id" => "required|uuid"
        ]);
        try{

             if (!empty($data["people"])) {
        $data["people"] = json_encode($data["people"]);
    }



            $event = Event::create($data);

              return response()->json([
            "success" => true,
            "message" => "event created successfully",
            "data" => $event
        ], Response::HTTP_CREATED);
        }catch(\Exception $e){
              return response()->json([
                'success' => false,
                'message' => 'faild to show the event',
                'error' => $e->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR); 
        }

    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }



}
