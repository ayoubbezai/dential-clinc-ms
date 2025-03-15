<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Appointment;
use App\Models\Folder;
use Illuminate\Http\Response;
use Illuminate\Validation\Rule;

class AppointmentController extends Controller
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
    $data = $request->validate([
        "date" => "required|date",
        "status" => ["required", Rule::in(['not_yet', 'done', 'cancelled', 'rescheduled'])],
        "title" => "required|string|max:255",
        "content" => "nullable|string",
        "folder_id" => "required|integer|exists:folders,id"
    ]);

    try {
        $folder = Folder::findOrFail($data["folder_id"]);
        $appointment = Appointment::create($data);

        return response()->json([
            "success" => true,
            "message" => "Appointment created successfully",
            "data" => [
                "folder_id" => $folder->id,
                "folder_name" => $folder->folder_name,
                "appointment_id" => $appointment->id,
                "date" => $appointment->date,
                "status" => $appointment->status,
                "title" => $appointment->title,
                "content" => $appointment->content,
            ]
        ], Response::HTTP_CREATED);

    } catch (\Exception $e) {
        return response()->json([
            'success' => false,
            'message' => 'Failed to create the appointment',
            'error' => $e->getMessage(),
        ], Response::HTTP_INTERNAL_SERVER_ERROR);
    }
}



 

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //get appoinment in a folder ther id is for the fodler
        try{
        $appointment = Appointment::findOrFail($id);

        return response()->json([
            "success" => true,
            "message" => "Appointment retrived successfully",
            "data" => $appointment
        ], Response::HTTP_OK);

        }catch (\Exception $e) {
        return response()->json([
            'success' => false,
            'message' => 'Failed to get the appointment',
            'error' => $e->getMessage(),
        ], Response::HTTP_INTERNAL_SERVER_ERROR);
    }

        
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //update appointmens
        
        //find that appoinment
        $appointment = Appointment::findOrFail($id);

        //valideate data before update
        $data = $request->validate([
        "date" => "nullable|date",
        "status" => ["nullable", Rule::in(['not_yet', 'done', 'cancelled', 'rescheduled'])],
        "title" => "nullable|string|max:255",
        "content" => "nullable|string",
        "folder_id" => "nullable|integer|exists:folders,id"
    ]);

    //update the user
    try{
        $appointment->update($data);
        return response()->json([
            "success" => true,
            "message" => "Appointment updated successfully",
            "data" => $appointment
        ], Response::HTTP_OK);


    }catch (\Exception $e) {
        return response()->json([
            'success' => false,
            'message' => 'Failed to update the appointment',
            'error' => $e->getMessage(),
        ], Response::HTTP_INTERNAL_SERVER_ERROR);
    }      
    
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        
          //get appoinment in a folder ther id is for the fodler
        try{
        $appointment = Appointment::findOrFail($id);
        $appointment->delete();

        return response()->json([
            "success" => true,
            "message" => "Appointment deleted successfully",
            "data" => []
        ], Response::HTTP_OK);

        }catch (\Exception $e) {
        return response()->json([
            'success' => false,
            'message' => 'Failed to delete the appointment',
            'error' => $e->getMessage(),
        ], Response::HTTP_INTERNAL_SERVER_ERROR);
    }
    }

      public function getAppointmentsOfFolder(string $id)
    {
        //get appoinment in a folder ther id is for the fodler
        try{
        $folder = Folder::with('appointments')->findOrFail($id);

        return response()->json([
            "success" => true,
            "message" => "Appointment retrived successfully",
            "data" => [
                "folder_id" => $folder->id,
                "folder_name" => $folder->folder_name,
                "appointments" => $folder->appointments
            ]
        ], Response::HTTP_OK);

        }catch (\Exception $e) {
        return response()->json([
            'success' => false,
            'message' => 'Failed to get the appointments in this folder',
            'error' => $e->getMessage(),
        ], Response::HTTP_INTERNAL_SERVER_ERROR);
    }

        
    }
}
