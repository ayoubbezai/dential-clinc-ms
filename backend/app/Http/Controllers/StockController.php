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
    
    try {
        $request_query = $request->query();
        $perPage = filter_var($request_query["per_page"] ?? 15, FILTER_VALIDATE_INT) ?: 15;
        $perPage = max($perPage, 1);
    
        $data = Stock::query()
        ->select([
            "stocks.id",
            "stocks.price",
            "stocks.quantity",
                "stocks.expiry_date",
                "medicines.name as medicine_name",
                "medicines.low_stock_threshold",
                "medicines.medium_stock_threshold",
                "medicines.good_stock_threshold",
                "suppliers.name as supplier_name",
                "stock_units.name as unit_name",
            "stocks.created_at as created_at"
            ])
            ->leftJoin("medicines", "medicines.id", "=", "stocks.medicine_id")
            ->leftJoin("suppliers", "suppliers.id", "=", "stocks.supplier_id")
            ->leftJoin("stock_units", "stock_units.id", "=", "stocks.unit_id");
            
            $validSortColumns = ['name', 'created_at', 'updated_at','medicine_name','supplier_name'];
            $validSortDirection = ["asc", "desc"];
           $sortBy = $request_query['sort_by'] ?? 'created_at';
$sortBy = in_array($sortBy, $validSortColumns) ? $sortBy : 'created_at';

$sortDirection = strtolower($request_query['sort_direction'] ?? 'asc');
$sortDirection = in_array($sortDirection, $validSortDirection) ? $sortDirection : 'asc';
        // Search
        if (!empty($request_query['search'])) {
            $search = $request_query['search'];
            $data->where(function ($query) use ($search) {
                $query->where('medicine_name', 'like', '%' . $search . '%')
                    ->orWhere('supplier_name', 'like', '%' . $search . '%');
            });
        }

     if (!empty($request_query['stock_status'])) {
    $status = strtolower($request_query['stock_status']);

    if (in_array($status, ['low', 'medium', 'good', 'very_good', 'unknown'])) {
        $data->where(function ($query) use ($status) {
            $query->whereRaw("
                CASE
                    WHEN medicines.low_stock_threshold IS NULL 
                      OR medicines.medium_stock_threshold IS NULL 
                      OR medicines.good_stock_threshold IS NULL THEN 'unknown'
                    WHEN stocks.quantity <= medicines.low_stock_threshold THEN 'low'
                    WHEN stocks.quantity <= medicines.medium_stock_threshold THEN 'medium'
                    WHEN stocks.quantity <= medicines.good_stock_threshold THEN 'good'
                    ELSE 'very_good'
                END = ?
            ", [$status]);
        });
    }
}


        // Sorting
        $data->orderBy($sortBy, $sortDirection);

        // Pagination
        $paginatedData = $data->paginate($perPage);

        // Append status
        $stocksWithStatus = $paginatedData->getCollection()->map(function ($item) use ($request_query) {
            $quantity = $item->quantity;

$hasAllThresholds = isset($item->low_stock_threshold, $item->medium_stock_threshold, $item->good_stock_threshold);

if ($quantity <= $item->low_stock_threshold) {
    $status = 'low';
} elseif ($quantity <= $item->medium_stock_threshold) {
    $status = 'medium';
} elseif ($quantity <= $item->good_stock_threshold) {
    $status = 'good';
} elseif ($hasAllThresholds) {
    $status = 'very_good';
} else {
    $status = 'unkonwn'; 
}



            // Optional filter by stock_status query param
            if (!empty($request_query['stock_status']) && $request_query['stock_status'] !== $status) {
                return null;
            }

            $item->status = $status;
            return $item;
        })->filter(); // remove nulls

        return response()->json([
            "success" => true,
            "message" => "Stocks fetched successfully",
            "data" => $stocksWithStatus->values(),
            "pagination" => [
                "total_items" => $paginatedData->total(),
                "items_per_page" => $paginatedData->perPage(),
                "current_page" => $paginatedData->currentPage(),
                "total_pages" => $paginatedData->lastPage()
            ]
        ], Response::HTTP_OK);

    } catch (\Exception $e) {
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