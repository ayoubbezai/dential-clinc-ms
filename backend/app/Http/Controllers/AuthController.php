<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\Role;
use Illuminate\Support\Facades\Log; // For logging errors
use Illuminate\Http\Response;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        // Validate the data from the request
        $data = $request->validate([
            "name" => "required|string",
            "email" => "required|string|email|unique:users",
            "password" => "required|min:6",
            "role_name" => "nullable|string|exists:roles,name"
        ]);

        $role_name = $request->role_name;
        $role = Role::where("name", $role_name)->first();

        if (!$role) {
            return response()->json([
                "message" => "Invalid role provided"
            ], 400);
        }

        // Create the user
        try {
            $user = User::create([
                "name" => $data["name"],
                "email" => $data["email"],
                "password" => $data["password"],//password ishashed auto
                "role_id" => $role->id
            ]);

            // Generate a token for the user
            $token = $user->createToken("auth_token")->plainTextToken;

            // Return success response
            return response()->json([
                "user" => $user,
                "token" => $token,
                "user_role" => $role_name
            ], 201);

        } catch (\Exception $e) {
            // Log the error for debugging

            Log::error('Failed to register user: ' . $e->getMessage());

            // Return error response

            return response()->json([
                "success" => false,
                "message" => "Failed to register user",
                "error" => $e->getMessage(), // Include the error message for debugging
            ], 500);
        }
    }

    public function login(Request $request)
    {
        // Validate the data from the request
        $data = $request->validate([
            "email" => "required|email|exists:users,email",
            "password" => "required|min:6",
        ]);

        // Get the user with that email with the role eager loaded
        $user = User::with('role')->where("email", $data["email"])->first();

        // Check if the user exists
        if (!$user) {
            return response()->json([
                "success" => false,
                "message" => "User not found."
            ], 404);
        }

        // Check if the password is correct
        if (!Hash::check($data["password"], $user->password)) {
            return response()->json([
                "success" => false,
                "message" => "The provided credentials are incorrect."
            ], 401);
        }

        // Generate a token for the user
        $token = $user->createToken("auth_token")->plainTextToken;

        // Return the user and the token in the response
        return response()->json([
            "success" => true,
            "message" => "User logged in successfully.",
            "user" => [
                "id" => $user->id,
                "name" => $user->name,
                "email" => $user->email,
                "role" => $user->role->name,
            ],
            "token" => $token
        ], 200);
    }

    public function logout(Request $request)
    {
        // Delete the token
        $request->user()->currentAccessToken()->delete();

        // Return success response
        return response()->json([
            "success" => true,
            "message" => "Logged out successfully"
        ], 200);
    }
      public function currentUser(Request $request){

        try{
            $currentUser = $request->user();
            if (!$currentUser) {
                return response()->json([
                    'success' => false,
                    'message' => 'User not authenticated',
                ], Response::HTTP_UNAUTHORIZED);
            }
           return response()->json([
            "success" => true,
            "message" => "User logged in successfully.",
            "user" => [
                "id" => $currentUser->id,
                "name" => $currentUser->name,
                "email" => $currentUser->email,
                "role" => $currentUser->role->name,
            ],
        ], 200);

        }catch(\Exception $e){
             return response()->json([
                'success' => false,
                'message' => 'faild to get the current user',
                'error' => $e->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }

    }
}