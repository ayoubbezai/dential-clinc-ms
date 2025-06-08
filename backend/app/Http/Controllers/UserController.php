<?php
namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Role;
use Illuminate\Contracts\Encryption\DecryptException;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Log; // For logging errors
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Crypt;

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

         if (!$role) {
             return response()->json([
                 "success" => false,
                 "message" => "Receptionist role not found."
             ], Response::HTTP_NOT_FOUND); // 404 Not Found
         }

        // Create the receptionist user
        try {
            $receptionist = User::create([
                "name" => $data["name"],
                "email" => $data["email"],
                "password" => $data["password"],
                "role_id" => $role,
            ]);

            // Return success response
            return response()->json([
                "success" => true,
                "message" => "Receptionist created successfully",
                "data" => [
                    "id" => $receptionist->id,
                    "name" => $receptionist->name,
                    "email" => $receptionist->email,
                    "role" => "receptionist",
                ],
            ], Response::HTTP_CREATED); // 201 Created

        } catch (\Exception $e) {

            // Log the error for debugging
            Log::error('Failed to create receptionist: ' . $e->getMessage());

            // Return error response
            return response()->json([
                "success" => false,
                "message" => "Failed to create receptionist",
                "error" => $e->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR); // 500 Internal Server Error
        }
    }

    /**
     * Display a listing of the resource.
     */

    
    public function index(Request $request)
    {
        // Get the query parameters
        $request_query = $request->query();
    
        // Pagination and sorting params
        $perPage = filter_var($request_query["per_page"] ?? 15, FILTER_VALIDATE_INT) ?: 15;
        $perPage = max($perPage, 1);
    
        $validSortColumns = ['name', 'created_at', 'updated_at'];
        $sortBy = in_array($request_query['sort_by'] ?? 'created_at', $validSortColumns)
            ? ($request_query['sort_by'] ?? 'created_at')
            : 'created_at';
        $sortDirection = in_array(strtolower($request_query['sort_direction'] ?? 'asc'), ['asc', 'desc'])
            ? strtolower($request_query['sort_direction'] ?? 'asc')
            : 'asc';
    
        // Start building the query
        $data = User::query();
    
        // // Add tenant filter manually here:
        // $tenantId = Auth::user()->tenant_id ?? null;
        // if ($tenantId) {
        //     $data->where('users.tenant_id', $tenantId);
        // }
    
        // Join with roles for role filters
        $data->leftJoin('roles', 'users.role_id', '=', 'roles.id')
             ->select('users.id', 'users.name', 'users.email', 'roles.name as role_name', 'users.created_at', 'users.updated_at');
    
        // Search filter
        if (!empty($request_query['search'])) {
            $search = $request_query['search'];
            $data->where(function ($query) use ($search) {
                $query->where('users.name', 'like', '%' . $search . '%')
                      ->orWhere('users.email', 'like', '%' . $search . '%')
                      ->orWhere('roles.name', 'like', '%' . $search . '%');
            });
        }
    
        // Role name filter
        if (!empty($request_query['role_name'])) {
            $roleName = $request_query['role_name'];
            $data->where('roles.name', 'like', '%' . $roleName . '%');
        }
    
        // Created_at filter
        if (!empty($request_query['created_at'])) {
            $createdAt = $request_query['created_at'];
            $data->whereRaw("DATE(users.created_at) = ?", [$createdAt]);
        }
    
        // Date range filter
$startDate = $request_query['start_date'] ?? null;
        $endDate = $request_query['end_date'] ?? now()->toDateString();
    
        if ($startDate && $endDate) {
            $data->whereRaw("DATE(users.created_at) BETWEEN ? AND ?", [$startDate, $endDate]);
        }
    
        // Sorting
        $data->orderBy($sortBy, $sortDirection);
    
        // Pagination
        $paginatedData = $data->paginate($perPage);
    
        // Response structure
        $response = [
            'success' => true,
            'message' => 'Data fetched successfully',
            'data' => $paginatedData->items(),
            'pagination' => [
                'total_items' => $paginatedData->total(),
                'items_per_page' => $paginatedData->perPage(),
                'current_page' => $paginatedData->currentPage(),
                'total_pages' => $paginatedData->lastPage(),
                'from' => $paginatedData->firstItem(),
                'to' => $paginatedData->lastItem(),
                'first_page_url' => $paginatedData->url(1),
                'last_page_url' => $paginatedData->url($paginatedData->lastPage()),
                'next_page_url' => $paginatedData->nextPageUrl(),
                'prev_page_url' => $paginatedData->previousPageUrl(),
                'path' => $paginatedData->path(),
            ]
        ];
    
        return response()->json($response, Response::HTTP_OK);
    }
    



     public function show($id)
    {
       
            // Fetch the user with necessary fields, including timestamps
            $user = User::select('id', 'name', 'email', 'created_at', 'updated_at')->findOrFail($id);
            
            return response()->json([
                'success' => true,
                'data' => $user,
                'message' => 'User details retrieved successfully'
            ], Response::HTTP_OK); // Explicit 200 OK status
        
    }

          /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //find or fail will throw auto 404
        try{
            $user = User::findOrFail($id);
             $data = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'email' => 'sometimes|required|email|unique:users,email,' . $id, //.id will ignor id row
            'password' => 'sometimes|required|min:6|confirmed',
        ]);

         // Update the user's attributes if provided

       
        if ($request->has('name')) {
            $user->name = $data['name'];
        }
        if ($request->has('email')) {
            $user->email = $data['email'];
        }
        if ($request->has('password')) {
            $user->password = $data['password'];//password auto hashed in User model
        }

        // Save the updated user
        $user->save();

        return response()->json([
            "success" => true,
            "message" => "User updated  successfully.",
            "user" => [
                "id" => $user->id,
                "name" => $user->name,
                "email" => $user->email,
                "role" => $user->role->name,
            ],
        ], Response::HTTP_OK); // 200 OK


    }catch (\Exception $e) {

            
            return response()->json([
                'success' => false,
                'message' => 'An error occurred',
                'error' => $e->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR); // 500 Internal Server Error
        }
        
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
          //find or fail will throw auto 404
        try{
            $user = User::findOrFail($id);
        
        // delete the user
        $user->delete();

        return response()->json([
            'success' => true,
            'message' => 'User deleted successfully',
            'data' => [],
        ], Response::HTTP_OK); // 200 OK


        
    }catch (\Exception $e) {
            
            return response()->json([
                'success' => false,
                'message' => 'An error occurred',
                'error' => $e->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR); // 500 Internal Server Error
        }
    }
    public function userProfile(){
        try{
                $userId = Auth::id();

            $user = User::with("patient:id,user_id,phone,gender,age")->select(["id","name","email"])->findOrFail($userId);
            try{

                $user->patient->phone = $user->patient->phone ?   Crypt::decryptString($user->patient->phone) : null ;
            }catch (DecryptException $e) {

            return response()->json([
        "success" => false,
        "message" => "Failed to dycript patient phone  number",
        "error" => "Decryption failed due to invalid data."
    ], Response::HTTP_INTERNAL_SERVER_ERROR);
        
    }

    

        return response()->json([
            'success' => true,
            'message' => 'User retrived successfully',
            'data' => $user,
        ], Response::HTTP_OK); // 200 OK


        
    }catch (\Exception $e) {
            
            return response()->json([
                'success' => false,
                'message' => 'An error occurred',
                'error' => $e->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR); // 500 Internal Server Error
        }

    }

  
}
