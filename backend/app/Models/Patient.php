<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Patient extends Model
{
    use HasFactory;
    use SoftDeletes;


    protected $fillable = [
        'user_id',
        'patient_name',
        'phone',
        'gender',
        'age',
        'notes',
        'diseases',
        "patient_name_tokens"
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function folders()
    {
        return $this->hasMany(Folder::class);
    }
}
