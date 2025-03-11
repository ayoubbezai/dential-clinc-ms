<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Crypt;

use Illuminate\Http\Request;
use App\Models\Patient;
use Illuminate\Http\Response; 

class PatientController extends Controller
{
    /**
     * Display a listing of the resource.
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
    // Validate the data from the request
    $data = $request->validate([
        "user_id" => "nullable|string|exists:users,id",
        "patient_name" => "required|string|max:255",
        "phone" => "nullable|string|max:255",
        "gender" => "required|string|in:male,female",
        "age" => "required|integer|min:1|max:120",
        "notes" => "nullable|string",
        "diseases" => "nullable|string",
    ]);

    try {
        // Create the patient record

         // Encrypt sensitive data
        $data['patient_name'] = Crypt::encryptString($data['patient_name']);
        $data['phone'] = $data['phone'] ? Crypt::encryptString($data['phone']) : null;
        $data['notes'] = $data['notes'] ? Crypt::encryptString($data['notes']) : null;
        $data['diseases'] = $data['diseases'] ? Crypt::encryptString($data['diseases']) : null;


        $patient = Patient::create($data);

        // Return success response
        return response()->json([
            "success" => true,
            "message" => "Patient created successfully",
            "data" => $patient
        ], Response::HTTP_CREATED); // 201 Created

    } catch (\Exception $e) {
        // Return error response
        return response()->json([
            "success" => false,
            "message" => "Failed to create a patient",
            "error" => $e->getMessage(),
        ], Response::HTTP_INTERNAL_SERVER_ERROR); // 500 Internal Server Error
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
