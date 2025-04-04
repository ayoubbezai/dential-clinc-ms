<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\StockUnit;
use Illuminate\Http\Response;

class StockUnitController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request )
    {
        
        //get per Page
        $perPage = filter_var($request_query["per_page"] ?? 15, FILTER_VALIDATE_INT) ?: 15;
        $perPage = max($perPage, 1);

        $data = StockUnit::query()->select([
                       'stock_units.id',
                'stock_units.name',
        ]);
               //get paginated data
            $paginatedData = $data->paginate($perPage);

        return response()->json([
            "success" => true,
                'data' => $paginatedData->items(), // Paginated data items
                'message' => 'units fetched successfully',
                'pagination' => [
                    'total_items' => $paginatedData->total(), // Total number of items
                    'items_per_page' => $paginatedData->perPage(), // Items per page
                    'current_page' => $paginatedData->currentPage(), // Current page number
                    'total_pages' => $paginatedData->lastPage(), // Last page number
                ]        ], Response::HTTP_OK);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validate the request
        $data = $request->validate([
            "name" => "required|string|max:255|unique:stock_units,name"
        ]);

        $unit = StockUnit::create($data);

        return response()->json([
            "success" => true,
            "message" => "Unit created successfully",
            "data" => $unit
        ], Response::HTTP_CREATED);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $unit = StockUnit::findOrFail($id);
        $unit->delete();

        return response()->json([
            "success" => true,
            "message" => "Unit deleted successfully"
        ], Response::HTTP_OK);
    }
}
