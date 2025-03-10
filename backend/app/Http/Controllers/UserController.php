<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Role;
use Illuminate\Support\Facades\Log; // For logging errors

class UserController extends Controller
{
    public function createReceptionist(Request $request)
    {
        // Validate the data from the request
        $data = $request->validate([
            "name" => "required|string|max:255",
            "email" => "required|email|unique:users,email",
            "password" => "required|min:6",
        ]);

         $role = Role::where("name", "receptionist")->first()->id;

         if(!$role){
             return response()->json([
        "success" => false,
        "message" => "Receptionist role not found."
             ],404);
         };

        // Create the receptionist user
        try {
            $receptionist = User::create([
                "name" => $data["name"],
                "email" => $data["email"],
                "password" => $data["password"],
                "role_id" =>$role,
            ]);

            // Return success response
            return response()->json([
                "success" => true,
                "message" => "Receptionist created successfully",
                "user" => [
                    "id" => $receptionist->id,
                    "name" => $receptionist->name,
                    "email" => $receptionist->email,
                    "role" => "receptionist",
                ],
            ], 201);

        } catch (\Exception $e) {

            // Log the error for debugging

            Log::error('Failed to create receptionist: ' . $e->getMessage());

            // Return error response

            return response()->json([
                "success" => false,
                "message" => "Failed to create receptionist",
                "error" => $e->getMessage(),
            ], 500);
        }
    }

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
        //
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