<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    //
 protected $fillable =[
        "start",
        "end",
        "location",
        "user_id",
        "people",
        "title"
    ];

    public function user(){
        return $this->belongsTo(User::class);
    }

}
