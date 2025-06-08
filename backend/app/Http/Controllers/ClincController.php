<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Stancl\Tenancy\Database\Models\Domain;
use App\Models\User;
use App\Models\Role;
use App\Models\Tenant;

class ClincController extends Controller
{


    
    public function registerClinic(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'subdomain'    => 'required|string|alpha_dash',
            'clinic_name'  => 'required|string|max:255',
            'email'        => 'required|email|unique:users,email',
            'password'     => 'required|string|min:6',
        ]);
    
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }
    
        $subdomain = strtolower($request->subdomain);
        $fullDomain = "{$subdomain}.ayoubbezai.site";
    
        if (Tenant::find($subdomain)) {
            return response()->json(['error' => 'Subdomain already exists.'], 409);
        }
    
        if (Domain::where('domain', $fullDomain)->exists()) {
            return response()->json(['error' => 'Domain already exists.'], 409);
        }
    
        $tenant = Tenant::create([
            'id' => $subdomain,
            'data' => [
                'clinic_name' => $request->clinic_name,
                'email' => $request->email,
            ],
        ]);
    
        $tenant->domains()->create([
            'domain' => $fullDomain,
        ]);
    
        tenancy()->initialize($tenant);

        $clinicRole = Role::where('name', 'clinic')->first();

    
        User::create([
            'name' => 'Clinic Admin',
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'role_id' => $clinicRole->id,
        ]);
    
        tenancy()->end();
    
        return response()->json(['message' => 'Clinic registered successfully.'], 201);
    }
    

}
