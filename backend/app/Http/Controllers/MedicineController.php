<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Medicine;
use Illuminate\Http\Response;

class MedicineController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        //get all medicines details
        //first get the query from the request
        $request_query = $request->query();

        //get per Page
        $perPage = filter_var($request_query["per_page"] ?? 15, FILTER_VALIDATE_INT) ?: 15;
        $perPage = max($perPage, 1);

        try{
            $data = Medicine::query()->select([
        'medicines.id',
        'medicines.name',
        'medicines.category',
        'medicines.description',
        'medicines.low_stock_threshold',
        'medicines.medium_stock_threshold',
        'medicines.good_stock_threshold',
            ]);


                  //validate sort by and direction

        $validSortColumns = ['name', 'created_at','updated_at'];
        $validSortDirection = ["asc","desc"];
        $sortBy = in_array($request_query['sort_by'] ?? 'created_at', $validSortColumns)
                ? $request_query['sort_by'] ?? 'created_at'
                : 'created_at';

        $sortDirection = in_array(strtolower($request_query['sort_direction'] ?? 'asc'), $validSortDirection)
            ? strtolower($request_query['sort_direction'] ?? 'asc')
            : 'asc';


              //search by medicine name

            if (!empty($request_query['search'])) {
            $search = $request_query['search'];
            $data->where(function ($query) use ($search) {
                $query->where('name', 'like', '%' . $search . '%')
                ->orWhere('category', 'like', '%' . $search . '%');
            });
            }

            $data->orderBy($sortBy, $sortDirection);

            //get paginatied data
             $paginatedData = $data->paginate($perPage);

                     $response = [
            'success' => true,
            'message' => 'Data fetched successfully',
            'data' => $paginatedData->items(), // Paginated data items
            'pagination' => [
        'total_items' => $paginatedData->total(), // Total number of items
        'items_per_page' => $paginatedData->perPage(), // Items per page
        'current_page' => $paginatedData->currentPage() , // Current page number
        'total_pages' => $paginatedData->lastPage(), // Last page number
    ]
        ];

        
       // Return success response
        return response()->json($response, Response::HTTP_OK);
         } catch (\Exception $e) {
        return response()->json([
            'success' => false,
            'message' => 'Failed to get medicines',
            'error' => $e->getMessage(),
        ], Response::HTTP_INTERNAL_SERVER_ERROR);
    }

        
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validate the request
 $data = $request->validate([
    "name" => "required|string|max:255",
    "description" => "nullable|string|max:255",
    "low_stock_threshold" => "nullable|integer|min:0",
    "medium_stock_threshold" => "nullable|integer|min:0",
    "good_stock_threshold" => "nullable|integer|min:0",
]);



        $medicine = Medicine::create($data);

        return response()->json([
            "success" => true,
            "message" => "medicine created successfully",
            "data" => $medicine
        ], Response::HTTP_CREATED);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        try {
            $medicine = Medicine::findOrFail($id);
            
            return response()->json([
                'success' => true,
                'message' => 'medicine fetched successfully',
                'data' => $medicine
            ], Response::HTTP_OK);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'error getting medicine info ',
                'error' => $e->getMessage(),
            ], Response::HTTP_NOT_FOUND);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //first find the medicine to coorect its desc or name
        $medicine = Medicine::findOrFail($id);
        //then validate the new data

        //then update
                try{
$data = $request->validate([
    "name" => "required|string|max:255",
    "description" => "nullable|string|max:255",
    "low_stock_threshold" => "nullable|integer|min:0",
    "medium_stock_threshold" => "nullable|integer|min:0",
    "good_stock_threshold" => "nullable|integer|min:0",
]);

if (isset($data['low_stock_threshold'], $data['medium_stock_threshold'], $data['good_stock_threshold'])) {
    if ($data['low_stock_threshold'] >= $data['medium_stock_threshold']) {
        return back()->withErrors(['low_stock_threshold' => 'Low stock threshold must be less than medium stock threshold.']);
    }
    
    if ($data['medium_stock_threshold'] >= $data['good_stock_threshold']) {
        return back()->withErrors(['medium_stock_threshold' => 'Medium stock threshold must be less than good stock threshold.']);
    }
}
            $medicine->update($data);

         return response()->json([
            'success' => true,
            'message' => 'medicine updated successfully',
            'data' => [],
        ], Response::HTTP_OK);

        }catch(\Exception $e){
              return response()->json([
                'success' => false,
                'message' => 'faild to updated the medicine',
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
        $medicine = Medicine::findOrFail($id);
        try{
            $medicine->delete();

         return response()->json([
            'success' => true,
            'message' => 'medicine deleted successfully',
            'data' => [],
        ], Response::HTTP_OK);

        }catch(\Exception $e){
              return response()->json([
                'success' => false,
                'message' => 'faild to delete the medicine',
                'error' => $e->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR); // 500 Internal Server Error
        }
        }
}
