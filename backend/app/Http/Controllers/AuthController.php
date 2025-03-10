<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\Role;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    //this section will be removed 
public function register(Request $request){
    
    $data = $request->validate([
        "name"=> "required|string",
        "email"=>"required|string|email|unique:users",
        "password"=>"required|min:6",
        "role_name"=>"nullable|string|exists:roles,name"
    ]);
        $role_name = $request->role_name;
        $role = Role::where("name", $role_name)->first();

        if(!$role){
            return response()->json([
                "message"=> "invalide role provided"
            ],400);
        }

        $user = User::create([
            "name" =>$data["name"],
            "email"=> $data["email"],
            "password"=>$data["password"],
            "role_id" => $role->id
        ]);

    $token = $user->createToken("auth_token")->plainTextToken;

    return response()->json([
        "user" => $user,
        "token" => $token,
        "user_role" => $role_name
    ],201);


}

public function login(Request $request){

    //validate the data from the request

    $data = $request->validate([
            "email" => "required|email|exists:users,email",
            "password" => "required|min:6",
    ]);

    //get the user with that email with the role eager loaded

    $user = User::with('role')->where("email", $data["email"])->first();

    //check if the user exict and the password correct

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

    //generate a token for the user

            $token = $user->createToken("auth_token")->plainTextToken;


    //return the user and the token in the response

    return response()->json([
        "success" => true,
        "message" => "User logged in successfully.",
        "user"=> [
            "id"=> $user->id,
            "name" => $user->name,
            "email"=> $user->email,
            "role"=> $user->role->name,
        ],
        "token" => $token
    ],200);
            

}
public function logout(Request $request)
{
    $request->user()->currentAccessToken()->delete();

    return response()->json([
        "message" => "Logged out successfully"
    ], 200);
}
    
}