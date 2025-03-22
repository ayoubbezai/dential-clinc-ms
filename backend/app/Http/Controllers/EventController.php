<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use App\Models\Event;
use Illuminate\Support\Facades\DB;

class EventController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        try {
            // Get the logged-in user's ID
            $userId = Auth::id();

            // Get query parameters from the request
            $requestQuery = $request->query();

            // Validate and set the number of items per page
            $perPage = $this->validatePerPage($requestQuery['per_page'] ?? 15);

            // Validate sorting parameters
            $sortBy = $this->validateSortBy($requestQuery['sort_by'] ?? 'created_at');
            $sortDirection = $this->validateSortDirection($requestQuery['sort_direction'] ?? 'asc');

            // Build the query
            $query = Event::where('user_id', $userId);

            // Apply search filter
            if (!empty($requestQuery['search'])) {
                $query->where('title', 'like', '%' . $requestQuery['search'] . '%');
            }

            // Apply date filter
            $startDate = $requestQuery['start_date'] ?? null;
            $endDate = $requestQuery['end_date'] ?? now()->toDateString();

            if ($startDate && $endDate) {
                if ($startDate > $endDate) {
                    [$startDate, $endDate] = [$endDate, $startDate]; 
                }
                $query->whereBetween('created_at', [$startDate, $endDate]);
            }

            // Apply sorting
            $query->orderBy($sortBy, $sortDirection);

          // Paginate the results
$paginationData = $query->paginate($perPage);

// Decode the JSON-encoded 'people' field in each event
$decodedData = $paginationData->getCollection()->map(function ($event) {
    if (!empty($event->people)) {
        $event->people = json_decode($event->people, true); // Decode JSON to array
    }
    return $event;
});

// Replace the pagination collection with the decoded data
$paginationData->setCollection($decodedData);

            

            // Prepare the response
            $response = [
                'success' => true,
                'message' => 'Events retrieved successfully',
                'data' => $paginationData->items(),
                'pagination' => $this->buildPaginationResponse($paginationData),
            ];

            return response()->json($response, Response::HTTP_OK);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve events',
                'error' => $e->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
public function store(Request $request)
{
    try {
        // Validate the request data
        $data = $request->validate([
            'start_date' => 'required|date',
            'start_time' => 'nullable|date_format:H:i', // Optional time field
            'end_date' => 'required|date|after_or_equal:start_date',
            'end_time' => 'nullable|date_format:H:i', // Optional time field
            'location' => 'nullable|string|max:255',
            'title' => 'nullable|string|max:255',
            'calendarId' => 'nullable|string|max:255',
            'people' => 'nullable|array',
            'people.*' => 'nullable|string|max:255',
        ]);

        // Get the logged-in user's ID
        $userId = Auth::id();

        // Encode the 'people' array to JSON if it exists
        if (!empty($data['people'])) {
            $data['people'] = json_encode($data['people']);
        }

        // Create the event with the user ID and separate date/time fields
        $event = Event::create([
            'user_id' => $userId,
            'start_date' => $data['start_date'], // Store start date
            'start_time' => $data['start_time'] ?? null, // Store start time (nullable)
            'end_date' => $data['end_date'], // Store end date
            'end_time' => $data['end_time'] ?? null, // Store end time (nullable)
            'location' => $data['location'] ?? null, // Default to null if not provided
            'title' => $data['title'] ?? null, // Default to null if not provided
            'calendarId' => $data['calendarId'] ?? null, // Default to null if not provided
            'people' => $data['people'] ?? null, // Default to null array if not provided
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Event created successfully',
            'data' => $event,
        ], Response::HTTP_CREATED);
    } catch (\Exception $e) {
        return response()->json([
            'success' => false,
            'message' => 'Failed to create event',
            'error' => $e->getMessage(),
        ], Response::HTTP_INTERNAL_SERVER_ERROR);
    }
}
    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        // Implement logic to show a specific event
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        // update and event
        //find the event to update and return 404 if not
        $event = Event::findOrFail($id);

        //validate data

        $data =$request->validate([
                'start' => 'required|date',
                'end' => 'required|date|after_or_equal:start',
                'location' => 'nullable|string|max:255',
                'title' => 'nullable|string|max:255',
                'people' => 'nullable|array',
                'people.*' => 'nullable|string|max:255',
        ]);

        try{   

            // Encode the 'people' array to JSON if it exists
            if (!empty($data['people'])) {
                $data['people'] = json_encode($data['people']);
            }

            // Create the event
        $event->update($data);

            return response()->json([
                'success' => true,
                'message' => 'Event updated successfully',
                'data' => $event,
            ], Response::HTTP_OK);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update event',
                'error' => $e->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }



    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        // delete an event

                $event = Event::findOrFail($id);
        try{


            // Create the event
        $event->delete();

            return response()->json([
                'success' => true,
                'message' => 'Event deleted successfully',
                'data' => [],
            ], Response::HTTP_OK);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete event',
                'error' => $e->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }



        
    }
public function getEvents(Request $request)
{
    try {
        // Get the logged-in user's ID
        $userId = Auth::id();

        // Get query parameters from the request
        $requestQuery = $request->only(['start', 'end']); // Fetch date filters

        // Build the query
        $query = Event::where('user_id', $userId)
            ->select([
                'id',
                'start_date',
                'start_time',
                'end_date',
                'end_time',
                'title',
                'location',
                'people',
                'calendarId'
            ]);

        // Apply date filter
        $startDate = $requestQuery['start'] ?? null;
        $endDate = $requestQuery['end'] ?? null;

        if ($startDate && $endDate) {
            if ($startDate > $endDate) {
                [$startDate, $endDate] = [$endDate, $startDate];
            }

            $query->where(function ($q) use ($startDate, $endDate) {
                $q->whereBetween('start_date', [$startDate, $endDate])  // Start falls within range
                  ->orWhereBetween('end_date', [$startDate, $endDate]); // End falls within range
            });
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Start date and end date are required',
            ], Response::HTTP_BAD_REQUEST);
        }

        // Get events
        $events = $query->get();

        // Decode JSON and combine date/time fields
$decodedData = $events->map(function ($event) {
    // Decode the 'people' field if it exists
    if (!empty($event->people)) {
        $event->people = json_decode($event->people, true); // Decode JSON to array
    }

    // Combine start_date and start_time (without minutes)
    $event->start = $event->start_date;
    if (!empty($event->start_time)) {
        // Remove sec from the time
        $startTimeWithoutSecends = substr($event->start_time, 0, 5); // Extract only hours and min
        $event->start = $event->start_date . ' ' . $startTimeWithoutSecends; // Use space as a separator
    }

    // Combine end_date and end_time (without sec)
    $event->end = $event->end_date;
    if (!empty($event->end_time)) {
        // Remove secend from the time 
        $endTimeWithoutSecends = substr($event->end_time, 0, 5); // Extract only hours and min
        $event->end = $event->end_date . ' ' . $endTimeWithoutSecends; // Use space as a separator
    }

    // Remove unnecessary fields
    unset($event->start_date, $event->start_time, $event->end_date, $event->end_time);

    return $event;
});

        return response()->json([
            'success' => true,
            'data' => $decodedData,
        ], Response::HTTP_OK);
    } catch (\Exception $e) {
        return response()->json([
            'success' => false,
            'message' => 'Failed to fetch events',
            'error' => $e->getMessage(),
        ], Response::HTTP_INTERNAL_SERVER_ERROR);
    }
}

    /**
     * Validate the number of items per page.
     */
    private function validatePerPage($perPage)
    {
        return max(filter_var($perPage, FILTER_VALIDATE_INT) ?: 15, 1);
    }

    /**
     * Validate the sort column.
     */
    private function validateSortBy($sortBy)
    {
        $validSortColumns = ['title', 'created_at', 'updated_at'];
        return in_array($sortBy, $validSortColumns) ? $sortBy : 'created_at';
    }

    /**
     * Validate the sort direction.
     */
    private function validateSortDirection($sortDirection)
    {
        $validSortDirections = ['asc', 'desc'];
        return in_array(strtolower($sortDirection), $validSortDirections) ? strtolower($sortDirection) : 'asc';
    }

    /**
     * Build the pagination response.
     */
    private function buildPaginationResponse($paginationData)
    {
        return [
            'total_items' => $paginationData->total(),
            'items_per_page' => $paginationData->perPage(),
            'current_page' => $paginationData->currentPage(),
            'total_pages' => $paginationData->lastPage(),
        ];
    }
}


