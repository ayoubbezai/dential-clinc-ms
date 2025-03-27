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
        'medicines.description'
            ]);

              //search by medicine name

            if (!empty($request_query['search'])) {
            $search = $request_query['search'];
            $data->where(function ($query) use ($search) {
                $query->where('name', 'like', '%' . $search . '%');
            });
            }

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
            "description" => "nullable|string|max:255"
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
            "name" => "nullable|string|max:255",
            "description" => "nullable|string|max:255"
        ]);
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
