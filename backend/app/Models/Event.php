<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    //
 protected $fillable =[
        "start_date",
        "start_time",
        "end_date",
        "end_time",
        "location",
        "user_id",
        "people",
        "title","calendarId"
    ];

    public function user(){
        return $this->belongsTo(User::class);
    }

}
