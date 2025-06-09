<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Appointment;
use App\Models\Patient;
use App\Models\FolderVisit;
use App\Models\Folder;
use App\Models\Stock;
use App\Models\User;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;


class StatController extends Controller
{
    //

    public function dashboardStat(Request $request){
        try{
            //get appoinments and users and patients numebrs
            $appointmentsNumber = Appointment::count();
            $patientsNumber = Patient::count();
            $usersNumber = User::count();
            $folderVisitReasonstotal = FolderVisit::count();

            //get appointments fo 6 and 12 montes by month

            $lastYearAppointems =  Appointment::select(
                Db::raw("Month(date) as month"),
                Db::raw("Count(*) as count")
            )->where('created_at', '>=', Carbon::now()->subMonths(12))
            ->groupBy(DB::raw('MONTH(date)'))
            ->orderBy(DB::raw('MONTH(date)'))
            ->get();


            //convetMonth to name instade of number

            $monthNames = function ($collection) {
            return $collection->map(function ($item) {
                $item->month = Carbon::create()->month($item->month)->format('M');
                return $item;
            });
        };

        //get the appointments of last week

$appointmentType = [
    ["type" => "scheduled", "count" => Appointment::where("status", "scheduled")->count()],
    ["type" => "completed", "count" => Appointment::where("status", "completed")->count()],
    ["type" => "pending", "count" => Appointment::where("status", "pending")->count()],
    ["type" => "cancelled", "count" => Appointment::where("status", "cancelled")->count()],
    ["type" => "rescheduled", "count" => Appointment::where("status", "rescheduled")->count()],
];
$folderVisitReasons = [
    ["type" => "prosthesis", "count" => FolderVisit::where("reason_of_visit", "prosthesis")->count()],
    ["type" => "odontology", "count" => FolderVisit::where("reason_of_visit", "odontology")->count()],
    ["type" => "orthodontics", "count" => FolderVisit::where("reason_of_visit", "orthodontics")->count()],
    ["type" => "care", "count" => FolderVisit::where("reason_of_visit", "care")->count()],
    ["type" => "occlusion_correction", "count" => FolderVisit::where("reason_of_visit", "occlusion_correction")->count()],
    ["type" => "other", "count" => FolderVisit::whereNotIn("reason_of_visit", ["prosthesis", "odontology", "orthodontics", "care", "occlusion_correction"])->count()],
];
        
        
                 return response()->json([
            "success" => true,
            "message" => "stat fetched successfully",
            "data" => [
                'count'=>[
                    'appointmentsNumber' => $appointmentsNumber,
                    'folderVisitReasons' => $folderVisitReasons,
                    'patientsNumber' => $patientsNumber,
                    'folderVisitReasonstotal' => $folderVisitReasonstotal,
                    'usersNumber' => $usersNumber,],

            'lastYearAppointems' => $monthNames($lastYearAppointems),
            "appointmentType"=>$appointmentType
        ]
        ]);

        }catch (\Exception $e) {
            return response()->json([
                'error' => 'Something went wrong',
                'message' => $e->getMessage()
            ], 500);
        }
        
    }

    public function statisticStat(Request $request)
    {
        try {
            // PATIENTS
            $totalPatients = Patient::count();
            $malePatients = Patient::where("gender", "male")->count();
            $femalePatients = Patient::where("gender", "female")->count();
    
            $ageGroups = [
                '<18' => Patient::where("age", "<", 18)->count(),
                '18-30' => Patient::whereBetween("age", [18, 30])->count(),
                '31-50' => Patient::whereBetween("age", [31, 50])->count(),
                '>50' => Patient::where("age", ">", 50)->count(),
            ];
    
            $withDiseases = Patient::whereNotNull("diseases")->count();
            $withoutDiseases = Patient::whereNull("diseases")->count();
    
            $newPatientsByMonth = Patient::select(
                    DB::raw("MONTH(created_at) as month"),
                    DB::raw("COUNT(*) as count")
                )
                ->where('created_at', '>=', Carbon::now()->subMonths(12))
                ->groupBy(DB::raw('MONTH(created_at)'))
                ->orderBy(DB::raw('MONTH(created_at)'))
                ->get()
                ->map(function ($item) {
                    $item->month = Carbon::create()->month($item->month)->format('M');
                    return $item;
                });
    
            $averageNewPatientsPerDay = round(Patient::where('created_at', '>=', Carbon::now()->subDays(30))->count() / 30, 2);
            $averageNewPatientsPerMonth = Patient::where('created_at', '>=', Carbon::now()->subDays(30))->count();
    
            // FOLDERS
            $completedFolders = Folder::where('status', 'completed')->count();
            $workingOnItFolders = Folder::where('status', 'working_on_it')->count();
            $pendingFolders = Folder::where('status', 'pending')->count();
    
            $fullyPaidFolders = Folder::where('price', '>', 0)
                ->whereRaw("price <= (SELECT COALESCE(SUM(price),0) FROM payments WHERE folder_id = folders.id)")
                ->count();
    
            $partiallyPaidFolders = Folder::where('price', '>', 0)
                ->whereRaw("price > (SELECT COALESCE(SUM(price),0) FROM payments WHERE folder_id = folders.id)")
                ->count();
    
            $unpaidFolders = Folder::where('price', '>', 0)
                ->whereRaw("(SELECT COALESCE(SUM(price),0) FROM payments WHERE folder_id = folders.id) = 0")
                ->count();
    
            // APPOINTMENTS
            $mostVisitedTooth = Appointment::select('tooth', DB::raw('count(*) as total'))
                ->groupBy('tooth')
                ->orderBy('total', 'desc')
                ->first();
    
            $appointmentsThisWeek = Appointment::whereBetween('date', [
                Carbon::now()->startOfWeek(),
                Carbon::now()->endOfWeek()
            ])->count();
    
            $appointmentsThisMonth = Appointment::whereMonth('date', now()->month)->count();
    
            $appointmentsByMonth = Appointment::select(
                    DB::raw("MONTH(date) as month"),
                    DB::raw("COUNT(*) as count")
                )
                ->where('date', '>=', Carbon::now()->subMonths(12))
                ->groupBy(DB::raw('MONTH(date)'))
                ->orderBy(DB::raw('MONTH(date)'))
                ->get()
                ->map(function ($item) {
                    $item->month = Carbon::create()->month($item->month)->format('M');
                    return $item;
                });
    
            $appointmentsByDayOfWeek = Appointment::select(
                    DB::raw("DAYOFWEEK(date) as day_of_week"),
                    DB::raw("COUNT(*) as count")
                )
                ->where('date', '>=', Carbon::now()->subDays(30))
                ->groupBy(DB::raw('DAYOFWEEK(date)'))
                ->orderBy(DB::raw('DAYOFWEEK(date)'))
                ->get()
                ->map(function ($item) {
                    $item->day_of_week = Carbon::now()->startOfWeek()->addDays($item->day_of_week - 1)->format('l');
                    return $item;
                });
    
            $averageAppointmentsPerDay = round(Appointment::where('date', '>=', Carbon::now()->subDays(30))->count() / 30, 2);
    
            // PAYMENTS
            $transactionsPerDay = round(DB::table('payments')
                ->where('created_at', '>=', Carbon::now()->subDays(30))
                ->count() / 30, 2);
    
            $transactionsPerMonth = DB::table('payments')
                ->where('created_at', '>=', Carbon::now()->subDays(30))
                ->count();
    
            $averagePaymentAmountPerDay = round(DB::table('payments')
                ->where('created_at', '>=', Carbon::now()->subDays(30))
                ->avg('amount'), 2);
    
            $averagePaymentAmountPerMonth = round(DB::table('payments')
                ->where('created_at', '>=', Carbon::now()->subDays(30))
                ->sum('amount') / 30, 2);
    
            // USERS
            $totalUsers = User::count();
    
            $userRoleCounts = User::select('roles.name as role_name', DB::raw('count(*) as total'))
                ->join('roles', 'roles.id', '=', 'users.role_id')
                ->groupBy('roles.name')
                ->get()
                ->mapWithKeys(fn ($item) => [$item->role_name => $item->total]);
    
            // STOCK
            $stocks = Stock::with('medicine')->get();
    
            $lowStock = [];
            $goodStock = [];
            $outOfStock = [];
            $expired = [];
    
            foreach ($stocks as $stock) {
                $quantity = $stock->quantity;
                $threshold = $stock->medicine->low_stock_threshold ?? 0;
                $isExpired = $stock->expiry_date && $stock->expiry_date < now();
    
                if ($isExpired) {
                    $expired[] = [
                        'medicine' => $stock->medicine->name,
                        'quantity' => $quantity,
                        'expiry_date' => $stock->expiry_date,
                        'status' => 'Expired'
                    ];
                } elseif ($quantity == 0) {
                    $outOfStock[] = [
                        'medicine' => $stock->medicine->name,
                        'quantity' => $quantity,
                        'status' => 'Out of Stock'
                    ];
                } elseif ($quantity <= $threshold) {
                    $lowStock[] = [
                        'medicine' => $stock->medicine->name,
                        'quantity' => $quantity,
                        'threshold' => $threshold,
                        'status' => 'Low'
                    ];
                } else {
                    $goodStock[] = [
                        'medicine' => $stock->medicine->name,
                        'quantity' => $quantity,
                        'threshold' => $threshold,
                        'status' => 'Good'
                    ];
                }
            }
    
            $stockStats = [
                'total_items' => $stocks->count(),
                'low_stock' => $lowStock,
                'good_stock' => $goodStock,
                'out_of_stock' => $outOfStock,
                'expired' => $expired,
            ];

            $data = [
            'patients' => [
                    'total' => $totalPatients,
                    'gender' => [
                        'male' => $malePatients,
                        'female' => $femalePatients,
                    ],
                    'ageGroups' => $ageGroups,
                    'diseases' => [
                        'with' => $withDiseases,
                        'without' => $withoutDiseases,
                    ],
                    'averageNewPerDay' => $averageNewPatientsPerDay,
                    'averageNewPerMonth' => $averageNewPatientsPerMonth,
                ],
                'folders' => [
                    'total' => Folder::count(),
                    'status' => [
                        'completed' => $completedFolders,
                        'working_on_it' => $workingOnItFolders,
                        'pending' => $pendingFolders,
                    ],

                    'paid' => [
                        'fully' => $fullyPaidFolders,
                        'partially' => $partiallyPaidFolders,
                        'unpaid' => $unpaidFolders,
                    ]
                ],
                'appointments' => [
                    'mostVisitedTooth' => $mostVisitedTooth,
                    'averagePerDay' => $averageAppointmentsPerDay,
                    'byMonth' => $appointmentsByMonth,
                    'byWeekDay' => $appointmentsByDayOfWeek,
                    'thisWeek' => $appointmentsThisWeek,
                    'thisMonth' => $appointmentsThisMonth,
                ],
                'payments' => [
                    'transactionsPerDay' => $transactionsPerDay,
                    'transactionsPerMonth' => $transactionsPerMonth,
                    'averageAmountPerDay' => $averagePaymentAmountPerDay,
                    'averageAmountPerMonth' => $averagePaymentAmountPerMonth,
                ],
                'users' => [
                    'total' => $totalUsers,
                    'byRole' => $userRoleCounts,
                ],
                'stock' => $stockStats,
            ];    
            // RESPONSE

            return response()->json(
                [
                    "success" => true,
                    "message" => "Statistics fetched successfully",
                    "data" => $data,
                ]
            );
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Something went wrong',
                'message' => $e->getMessage()
            ], 500);
        }
    }
    
    
}    