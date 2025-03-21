<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Contracts\Encryption\DecryptException;
use App\Models\Event;


class EventController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //create a new event with in date

        $data = $request->validate([
            "start_date" => "required|date",
            "end_date" => "required|date|after_or_equal:start_date",
            "location" => "nullable|string|max:255",
            "title" => "nullable|string|max:255",
            "people" => "nullable|array",
            "people.*" =>"nullable|string|max:255",
            "user_id" => "required|uuid"
        ]);
        try{

             if (!empty($data["people"])) {
        $data["people"] = json_encode($data["people"]);
    }



            $event = Event::create($data);

              return response()->json([
            "success" => true,
            "message" => "event created successfully",
            "data" => $event
        ], Response::HTTP_CREATED);
        }catch(\Exception $e){
              return response()->json([
                'success' => false,
                'message' => 'faild to show the event',
                'error' => $e->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR); 
        }

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
