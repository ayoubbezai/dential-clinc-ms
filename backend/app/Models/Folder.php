<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Folder extends Model
{
    //
    use HasFactory;

    protected $fillable =[
        "patient_id",
        "folder_name",
        "price",
        "status",
    ];

    //defiend relationships

     public function patient()
    {
        return $this->belongsTo(Patient::class);
    }

    // public function notes()
    // {
    //     return $this->hasMany(Note::class);
    // }

    // public function files()
    // {
    //     return $this->hasMany(File::class);
    // }

    // public function appointments()
    // {
    //     return $this->hasMany(Appointment::class);
    // }

    // public function payments()
    // {
    //     return $this->hasMany(Payment::class);
    // }
}
