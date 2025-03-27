<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Stock;
use Illuminate\Http\Response;
class StockController extends Controller
{
    /**
     * Display a listing of the resource.
     */
public function index(Request $request)
{
    // Get query parameters
    $request_query = $request->query();
    $perPage = filter_var($request_query["per_page"] ?? 15, FILTER_VALIDATE_INT) ?: 15;
    $perPage = max($perPage, 1);

    try {
        // Fetch stock details with medicine, supplier, and unit details
        $data = Stock::query()
            
            ->select([
                "stocks.id",
                "stocks.price",
                "stocks.quantity",
                "stocks.expiry_date",
                "medicines.name as medicine_name",
                "suppliers.name as supplier_name",
                "stock_units.name as unit_name"
            ])
            ->leftJoin("medicines", "medicines.id", "=", "stocks.medicine_id")
            ->leftJoin("suppliers", "suppliers.id", "=", "stocks.supplier_id")
            ->leftJoin("stock_units", "stock_units.id", "=", "stocks.unit_id")
            ->paginate($perPage);

        //  Success Response
        return response()->json([
            "success" => true,
            "message" => "Stocks fetched successfully",
            "data" => $data->items(), // Paginated data items
            "pagination" => [
                "total_items" => $data->total(), 
                "items_per_page" => $data->perPage(), 
                "current_page" => $data->currentPage(), 
                "total_pages" => $data->lastPage()
            ]
        ], Response::HTTP_OK);

    } catch (\Exception $e) {
        //  Error Response
        return response()->json([
            "success" => false,
            "message" => "Failed to fetch stocks",
            "error" => $e->getMessage(),
        ], Response::HTTP_INTERNAL_SERVER_ERROR);
    }
}


    /**
     * Store a newly created resource in storage.
     */
  public function store(Request $request)
    {
        // Validate the incoming request data
        $data = $request->validate([
            'medicine_id' => 'required|exists:medicines,id',
            'supplier_id' => 'nullable|exists:suppliers,id',
            'unit_id'     => 'required|exists:stock_units,id',
            'price'       => 'nullable|numeric|min:0',
            'quantity'    => 'required|integer|min:0',
            'expiry_date' => 'nullable|date|after:today'
        ]);

        // Create the stock record
        try {
            $stock = Stock::create($data);

            return response()->json([
                "success" => true,
                "message" => "Stock added successfully",
                "data"    => $stock
            ], Response::HTTP_CREATED);
        } catch (\Exception $e) {
            return response()->json([
                "success" => false,
                "message" => "Failed to add stock",
                "error"   => $e->getMessage(),
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
    // Find the stock item or fail with a 404 response
    $stock = Stock::findOrFail($id);

    try {
        // Validate the request data
        $data = $request->validate([
            'medicine_id' => 'nullable|exists:medicines,id',
            'supplier_id' => 'nullable|exists:suppliers,id',
            'unit_id'     => 'nullable|exists:stock_units,id',
            'price'       => 'nullable|numeric|min:0',
            'quantity'    => 'nullable|integer|min:0',
            'expiry_date' => 'nullable|date|after:today'
        ]);

        // Update the stock record
        $stock->update($data);

        // Return success response
        return response()->json([
            "success" => true,
            "message" => "Stock updated successfully",
            "data"    => $stock
        ], Response::HTTP_OK);
        
    } catch (\Exception $e) {
        // Return error response
        return response()->json([
            "success" => false,
            "message" => "Failed to update stock",
            "error"   => $e->getMessage(),
        ], Response::HTTP_INTERNAL_SERVER_ERROR);
    }
}


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
        
    // Find the stock item or fail with a 404 response
    $stock = Stock::findOrFail($id);

    try {


        // dekete the stock record
        $stock->delete();

        // Return success response
        return response()->json([
            "success" => true,
            "message" => "Stock deleted successfully",
            "data"    => $stock
        ], Response::HTTP_OK);
        
    } catch (\Exception $e) {
        // Return error response
        return response()->json([
            "success" => false,
            "message" => "Failed to delete stock",
            "error"   => $e->getMessage(),
        ], Response::HTTP_INTERNAL_SERVER_ERROR);
    }
    
}
}