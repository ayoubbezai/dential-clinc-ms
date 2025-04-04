<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Supplier;
use Illuminate\Http\Response;

class SupplierController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        //get all suppliers details
        //first get the query from the request
        $request_query = $request->query();

        //get per Page
        $perPage = filter_var($request_query["per_page"] ?? 15, FILTER_VALIDATE_INT) ?: 15;
        $perPage = max($perPage, 1);

        try{
            $data = Supplier::query()->select([
                'suppliers.id',
                'suppliers.name',
                'suppliers.contact_info'
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


            //search by supplier name
            if (!empty($request_query['search'])) {
                $search = $request_query['search'];
                $data->where(function ($query) use ($search) {
                    $query->where('name', 'like', '%' . $search . '%');
                });
            }

                        $data->orderBy($sortBy, $sortDirection);


            //get paginated data
            $paginatedData = $data->paginate($perPage);

            $response = [
                'success' => true,
                'message' => 'Data fetched successfully',
                'data' => $paginatedData->items(), // Paginated data items
                'pagination' => [
                    'total_items' => $paginatedData->total(), // Total number of items
                    'items_per_page' => $paginatedData->perPage(), // Items per page
                    'current_page' => $paginatedData->currentPage(), // Current page number
                    'total_pages' => $paginatedData->lastPage(), // Last page number
                ]
            ];

            // Return success response
            return response()->json($response, Response::HTTP_OK);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to get suppliers',
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
            "contact_info" => "nullable|string|max:255"
        ]);

        $supplier = Supplier::create($data);

        return response()->json([
            "success" => true,
            "message" => "Supplier created successfully",
            "data" => $supplier
        ], Response::HTTP_CREATED);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        try {
            $supplier = Supplier::findOrFail($id);
            
            return response()->json([
                'success' => true,
                'message' => 'Supplier fetched successfully',
                'data' => $supplier
            ], Response::HTTP_OK);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Supplier not found',
                'error' => $e->getMessage(),
            ], Response::HTTP_NOT_FOUND);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //first find the supplier to correct its contact_info or name
        $supplier = Supplier::findOrFail($id);
        
        try {
            $data = $request->validate([
                "name" => "nullable|string|max:255",
                "contact_info" => "nullable|string|max:255"
            ]);
            
            $supplier->update($data);

            return response()->json([
                'success' => true,
                'message' => 'Supplier updated successfully',
                'data' => $supplier,
            ], Response::HTTP_OK);

        } catch(\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update the supplier',
                'error' => $e->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $supplier = Supplier::findOrFail($id);
        try {
            $supplier->delete();

            return response()->json([
                'success' => true,
                'message' => 'Supplier deleted successfully',
                'data' => [],
            ], Response::HTTP_OK);

        } catch(\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete the supplier',
                'error' => $e->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}