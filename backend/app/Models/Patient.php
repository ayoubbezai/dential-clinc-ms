<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Patient extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'patient_name',
        'phone',
        'gender',
        'age',
        'notes',
        'diseases',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
