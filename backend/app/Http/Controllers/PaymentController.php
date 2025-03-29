<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Folder;
use App\Models\Patient;
use App\Models\Payment;
use Illuminate\Http\Response;



class PaymentController extends Controller
{
    /**
     * get all payment in a folder
     */
public function index(Request $request)
{
    try {
        // Get the query from the request
        $request_query = $request->query();

        // Get the number of elements per page
        $perPage = filter_var($request_query["per_page"] ?? 15, FILTER_VALIDATE_INT) ?: 15;
        $perPage = max($perPage, 1);

        // Validate sort by and direction
        $validSortColumns = ['patient_name', 'amount', 'created_at', 'updated_at'];
        $validSortDirection = ["asc", "desc"];
        $sortBy = in_array($request_query['sort_by'] ?? 'created_at', $validSortColumns)
            ? $request_query['sort_by'] ?? 'created_at'
            : 'created_at';

        $sortDirection = in_array(strtolower($request_query['sort_direction'] ?? 'asc'), $validSortDirection)
            ? strtolower($request_query['sort_direction'] ?? 'asc')
            : 'asc';

        // Get the data
$data = Payment::query()->with([
    'folder:id,folder_name,patient_id', // select  folder id and name
    'folder.patient:id,patient_name' // Select  patient id and name
]);
        // Search by patient name
        if (!empty($request_query['search'])) {
            $search = $request_query['search'];
            $data->where(function ($query) use ($search) {
                $query->where('patient_name', 'like', '%' . $search . '%');
            });
        }

        // Filter by type if "type" query exists
        if (!empty($request_query["type"])) {
            $type = $request_query["type"];
            $data->where("type", $type);
        }

        // Filter by date if 'created_at' query parameter is provided
        if (!empty($request_query['created_at'])) {
            $createdAt = $request_query['created_at'];
            $data->whereDate('created_at', $createdAt);
        }

        // Filter by date range
        $startDate = $request_query['start_date'] ?? null;
        $endDate = $request_query['end_date'] ?? now()->toDateString(); // Defaults to today if not provided

        if ($startDate && $endDate) {
            if ($startDate > $endDate) {
                // Swap the dates if startDate is greater than endDate
                [$startDate, $endDate] = [$endDate, $startDate];
            }
            $data->whereBetween('created_at', [$startDate, $endDate]);
        }

        // applay sorting
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

        // Return success response
        return response()->json($response, Response::HTTP_OK);
    } catch (\Exception $e) {
        return response()->json([
            'success' => false,
            'message' => 'Failed to get payments',
            'error' => $e->getMessage(),
        ], Response::HTTP_INTERNAL_SERVER_ERROR);
    }
}

public function store(Request $request)
{
    // Add payment to a folder or payout
    $data = $request->validate([
        "type" => "nullable|string|in:income,expense,refund",
        "amount" => "required|integer|min:1",
        "note" => "nullable|string|max:255",
        "folder_id" => "nullable|integer|exists:folders,id"
    ]);

    try {
        $payment = Payment::create($data);
        return response()->json([
            "success" => true,
            "message" => "Payment created successfully",
            "data" => $payment
        ], Response::HTTP_CREATED);
    } catch (\Exception $e) {
        return response()->json([
            "success" => false,
            "message" => "Failed to add a payment",
            "error" => $e->getMessage(),
        ], Response::HTTP_INTERNAL_SERVER_ERROR);
    }
}

public function show(string $id)
{
    try {
        // Retrieve folder with related patient and payments
        $folder = Folder::with(['patient', 'payments'])->findOrFail($id);
$total_payments = $folder->payments->where("type", "in")->sum('amount') -
                  $folder->payments->where("type", "out")->sum('amount');
        return response()->json([
            "success" => true,
            "message" => "Retrieved payments successfully",
            "data" => [
                "folder_id" => $folder->id,
                "folder_name" => $folder->folder_name,
                "patient_name" => $folder->patient->patient_name ?? null,
                "details" => $folder->payments,
                "total_payments" => $total_payments
            ]
        ], Response::HTTP_OK);
    } catch (\Exception $e) {
        return response()->json([
            "success" => false,
            "message" => "Failed to get payments",
            "error" => $e->getMessage()
        ], Response::HTTP_INTERNAL_SERVER_ERROR);
    }
}

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //update a payment amount or note..
        //find the payment that is with the id
        $payment = Payment::findOrFail($id);

        //validate request data
        $data = $request->validate([
        "type" => "nullable|string|in:income,expense,refund",
        "amount" => "nullable|integer|min:1",
        "note" => "nullable|string|max:255",
        "folder_id" => "nullable|integer|exists:folders,id"
    ]);
    try{
        $payment->update($data);
        //success response
         return response()->json([
            "success" => true,
            "message" => "Payment updated successfully",
            "data" => $payment
        ], Response::HTTP_OK);//200

    } catch (\Exception $e) {
        // return error response
        return response()->json([
            "success" => false,
            "message" => "Failed to update payment",
            "error" => $e->getMessage(),
        ], Response::HTTP_INTERNAL_SERVER_ERROR);//500
    }

        
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //delete a payment
                $payment = Payment::findOrFail($id);

        try{
        $payment->delete();
        //success response
         return response()->json([
            "success" => true,
            "message" => "Payment deleted successfully",
            "data" => []
        ], Response::HTTP_OK);//200

    } catch (\Exception $e) {
        // return error response
        return response()->json([
            "success" => false,
            "message" => "Failed to update payment",
            "error" => $e->getMessage(),
        ], Response::HTTP_INTERNAL_SERVER_ERROR);//500
    }
    }

    //get payments statistic

 public function paymentStat(Request $request)
{
    try {
        // Extract request query parameters
        $request_query = $request->query();

        // Default filters
        $income_date = $request_query["income_date"] ?? "last_month";
        $expenses_date = $request_query["expenses_date"] ?? "last_month";
        $net_profit_date = $request_query["net_profit_date"] ?? "last_month";
        $income_expense_date = $request_query["income_expense_date"] ?? "last_week";

        // Function to convert filter to actual date
        function getDateFromFilter($filter)
        {
            switch ($filter) {
                case "last_month":
                    return now()->subMonth()->startOfMonth();
                case "last_3_months":
                    return now()->subMonths(3)->startOfMonth();
                case "last_year":
                    return now()->subYear()->startOfYear();
                case "last_week":
                    return now()->subDays(7)->startOfDay();
                default:
                    return null;
            }
        }

        // Apply the function to get start dates
        $income_start_date = getDateFromFilter($income_date);
        $expenses_start_date = getDateFromFilter($expenses_date);
        $net_profit_start_date = getDateFromFilter($net_profit_date);
        $income_expense_start_date = getDateFromFilter($income_expense_date);

        // Calculate Income (Income - Refunds)
        $income = Payment::where("type", "income")
            ->when($income_start_date, fn($query) => $query->where("created_at", ">", $income_start_date))
            ->sum("amount")
            - Payment::where("type", "refund")
                ->when($income_start_date, fn($query) => $query->where("created_at", ">", $income_start_date))
                ->sum("amount");

        // Calculate Expenses
        $expenses = Payment::where("type", "expense")
            ->when($expenses_start_date, fn($query) => $query->where("created_at", ">", $expenses_start_date))
            ->sum("amount");

        // Calculate Net Profit (Income - Expenses - Refunds)
        $net_profit = Payment::where("type", "income")
            ->when($net_profit_start_date, fn($query) => $query->where("created_at", ">", $net_profit_start_date))
            ->sum("amount")
            - Payment::where("type", "expense")
                ->when($net_profit_start_date, fn($query) => $query->where("created_at", ">", $net_profit_start_date))
                ->sum("amount")
            - Payment::where("type", "refund")
                ->when($net_profit_start_date, fn($query) => $query->where("created_at", ">", $net_profit_start_date))
                ->sum("amount");

        // Query Pending Payments (Always All Time)
        $pending = Folder::sum("price")
            - Payment::where("type", "income")->sum("amount")
            + Payment::where("type", "refund")->sum("amount");
        
        $pending = Max($pending,0);

        // Income & Expense Stats (For Graphs)
        $income_expense_stats = Payment::selectRaw('DATE(created_at) as date,
            SUM(CASE WHEN type = "income" THEN amount ELSE 0 END) -
            SUM(CASE WHEN type = "refund" THEN amount ELSE 0 END) as income,
            SUM(CASE WHEN type = "expense" THEN amount ELSE 0 END) as expand')
            ->where("created_at", ">", $income_expense_start_date)
            ->groupBy("date")
            ->orderBy("date", "ASC")
            ->get();

        // Return response
        return response()->json([
            "income" => $income,
            "expenses" => $expenses,
            "pending" => $pending,
            "net_profit" => $net_profit,
            "income_expense_stats" => $income_expense_stats,
            "icome_date" =>$income_start_date,
            "expenses_date"=> $expenses_start_date,
            "net_profit_date"=>$net_profit_start_date,
            "income_expense_start_date"=>$income_expense_start_date

        ], 200);
    } catch (\Exception $e) {
        return response()->json(["error" => $e->getMessage()], 500);
    }
}
}