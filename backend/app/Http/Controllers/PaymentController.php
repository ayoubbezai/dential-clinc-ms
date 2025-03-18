<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Folder;
use App\Models\Payment;
use Illuminate\Http\Response;



class PaymentController extends Controller
{
    /**
     * get all payment in a folder
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //add payment to a folder
        $data = $request->validate([
        "type" => "required|string|in:in,out",
        "amount" => "required|integer|min:1",
        "note" => "nullable|string|max:255",
        "folder_id"=>"nullable|integer|exists:folders,id"
        ]);
        try{
            $payment = Payment::create($data);
            return response()->json([
            "success" => true,
            "message" => "Patient created successfully",
            "data" => $payment 

        ], Response::HTTP_CREATED);
        } catch (\Exception $e) {
        // Return error response
        return response()->json([
            "success" => false,
            "message" => "Failed to add a payment",
            "error" => $e->getMessage(),
        ], Response::HTTP_INTERNAL_SERVER_ERROR);
    }

    }

    /**
     * Display the specified resource.
     */
   public function show(string $id)
{
    try {
        // Retrieve folder with related patient and payments
        $folder = Folder::with(['patient', 'payments'])->findOrFail($id);

        return response()->json([
            "success" => true,
            "message" => "Retrieved payments successfully",
            "data" => [
                "folder_id" => $folder->id,
                "folder_name" => $folder->folder_name,
                "patient_name" => $folder->patient->patient_name ?? null,
                "payments" => $folder->payments, 
                "total_payments" => $folder->payments->sum('amount')
            ]
        ], Response::HTTP_OK);

    } catch (\Exception $e) {
        return response()->json([
            "success" => false,
            "message" => "faild to get payments ",
            "error" => $e->getMessage()
        ], Response::HTTP_INTERNAL_SERVER_ERROR);
    }
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

    //get all paymetns in folder

    public function getPaymentOfFolder(string $id){
        
        
    }

    
}

/* wchrak tktb */