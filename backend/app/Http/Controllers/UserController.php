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
    public function index(Request $request)
    {
        //get the query of the request

        $request_query = $request->query();

            // Get pages elements based on 'per_page' param if provided

        $perPage =$request_query['per_page'] ?? 15;
         if ($perPage <= 0) {
        $perPage = 15;
    }

        //validate sortBy and sortDirection inputs

       $validSortColumns = ['name', 'created_at', 'updated_at'];

        $sortBy = in_array($request_query['sort_by'] ?? 'created_at', $validSortColumns) 
              ? ($request_query['sort_by'] ?? 'created_at')
              : 'created_at';

        $sortDirection = in_array(strtolower($request_query['sort_direction'] ?? 'asc'), ['asc', 'desc']) 
                     ? strtolower($request_query['sort_direction'] ?? 'asc')
                     : 'asc';


        //get the data

        $data = User::query();

        // Join with roles table to filter by role name and select only needed data

        $data->leftJoin('roles', 'users.role_id', '=', 'roles.id')->select('users.name', 'users.email', 'roles.name as role_name', 'users.created_at', 'users.updated_at');

        // Search functionality with 'like' for multiple fields

        if(!empty($request_query['search'])){
            $search = $request_query['search'];
            $data->where(function($query) use ($search){
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

    // Filter by role name if 'role_name' query parameter is provided

    if(!empty($request_query['created_at'])){
                $createdAt = $request_query['created_at'];
                //the date format is (yyyy-mm-dd)
                $data->whereRaw("DATE(users.created_at) = ?", [$createdAt]);

        }

        // we need to have  start and end date is today if dont exict

        $startDate = $request_query['start_date'] ?? null;
        $endDate = $request_query['end_date'] ?? now()->toDateString(); // Defaults to today if not provided

        if ($startDate && $endDate) {
             $data->whereRaw("DATE(users.created_at) BETWEEN ? AND ?", [$startDate, $endDate]);
        }

    // Filter by role name if 'role_name' query parameter is provided

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
            'total' => $paginatedData->total(), // Total number of items
            'current_page' => $paginatedData->currentPage(), // Current page
            'last_page' => $paginatedData->lastPage(), // Last page number
            'per_page' => $paginatedData->perPage(), // Items per page
            'from' => $paginatedData->firstItem(), // Starting item on the current page
            'to' => $paginatedData->lastItem(), // Last item on the current page
        ]
    ];

    // Return JSON response
    return response()->json($response);
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