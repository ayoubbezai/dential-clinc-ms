<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Role;

class UserController extends Controller
{
    //
    public function createReceptionist(Request $request){

        //validate the data from the request

        $data = $request->validate([
            "name" => "required|string|max:255",
            "email" => "required|email|unique:users,email",
            "password" => "required|min:6",
        ]);

         // Create the receptionist user

         $receptionist = User::create([
            "name" => $data["name"],
            "email" => $data["email"],
            "password" => $data["password"],
            "role_id" => Role::where("name","receptionist")->first()->id,
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
            ],201);

        

    }
}
