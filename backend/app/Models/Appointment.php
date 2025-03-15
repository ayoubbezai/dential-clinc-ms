<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Appointment extends Model
{
    //
        use HasFactory;

    protected $fillable=[
        "date","status","title","content","folder_id"
    ];

    public function folder(){
        return $this->belongsTo(Folder::class);
    }
}


