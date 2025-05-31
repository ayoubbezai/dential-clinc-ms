<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Appointment;
use App\Models\Patient;
use App\Models\FolderVisit;
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
}
