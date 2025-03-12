<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Log; // For logging errors
use Illuminate\Database\Eloquent\ModelNotFoundException;

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
        // Get the query of the request
        $request_query = $request->query();

        // Get pages elements based on 'per_page' param if provided
        $perPage = filter_var($request_query["per_page"] ?? 15, FILTER_VALIDATE_INT) ?: 15;
        $perPage = max($perPage, 1);

        // Validate sortBy and sortDirection inputs
        $validSortColumns = ['name', 'created_at', 'updated_at'];
        $sortBy = in_array($request_query['sort_by'] ?? 'created_at', $validSortColumns)
            ? ($request_query['sort_by'] ?? 'created_at')
            : 'created_at';
        $sortDirection = in_array(strtolower($request_query['sort_direction'] ?? 'asc'), ['asc', 'desc'])
            ? strtolower($request_query['sort_direction'] ?? 'asc')
            : 'asc';

        // Get the data
        $data = User::query();

        // Join with roles table to filter by role name and select only needed data
        $data->leftJoin('roles', 'users.role_id', '=', 'roles.id')
             ->select('users.id', 'users.name', 'users.email', 'roles.name as role_name', 'users.created_at', 'users.updated_at');

        // Search functionality with 'like' for multiple fields
        if (!empty($request_query['search'])) {
            $search = $request_query['search'];
            $data->where(function ($query) use ($search) {
                $query->where('name', 'like', '%' . $search . '%')
                      ->orWhere('users.email', 'like', '%' . $search . '%')
                      ->orWhere('roles.name', 'like', '%' . $search . '%');
            });
        }

        // Filter by role name if 'role_name' query parameter is provided
        if (!empty($request_query['role_name'])) {
            $roleName = $request_query['role_name'];
            $data->where('roles.name', 'like', '%' . $roleName . '%');
        }

        // Filter by date name if 'created_at' query parameter is provided
        if (!empty($request_query['created_at'])) {
            $createdAt = $request_query['created_at'];
            // The date format is (yyyy-mm-dd)
            $data->whereRaw("DATE(users.created_at) = ?", [$createdAt]);
        }

        // We need to have start and end date as today if not exist
        $startDate = $request_query['start_date'] ?? null;
        $endDate = $request_query['end_date'] ?? now()->toDateString(); // Defaults to today if not provided

        if ($startDate && $endDate) {
            $data->whereRaw("DATE(users.created_at) BETWEEN ? AND ?", [$startDate, $endDate]);
        }

        // Apply sorting
        $data->orderBy($sortBy, $sortDirection);

        // Get paginated results
        $paginatedData = $data->paginate($perPage);

        // Prepare a structured response
      $response = [
    'success' => true,
    'message' => 'Data fetched successfully',
    'data' => $paginatedData->items(), // Paginated data items
    'pagination' => [
        'total_items' => $paginatedData->total(), // Total number of items
        'items_per_page' => $paginatedData->perPage(), // Items per page
        'current_page' => $paginatedData->currentPage(), // Current page number
        'total_pages' => $paginatedData->lastPage(), // Last page number
        'from' => $paginatedData->firstItem(), // First item on the current page
        'to' => $paginatedData->lastItem(), // Last item on the current page
        'first_page_url' => $paginatedData->url(1), // First page URL
        'last_page_url' => $paginatedData->url($paginatedData->lastPage()), // Last page URL
        'next_page_url' => $paginatedData->nextPageUrl(), // Next page URL
        'prev_page_url' => $paginatedData->previousPageUrl(), // Previous page URL
        'path' => $paginatedData->path(), // Base path of pagination
    ]
];


        // Return JSON response
        return response()->json($response, Response::HTTP_OK); // 200 OK
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
}
