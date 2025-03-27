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
    public function index()
    {
        return response()->json([
            "success" => true,
            "data" => StockUnit::all()
        ], Response::HTTP_OK);
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
