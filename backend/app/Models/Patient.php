<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Traits\BelongsToTenant;
use App\Scopes\TenantScope;


class Patient extends Model
{
    use HasFactory;
    use SoftDeletes;

    
    use BelongsToTenant;

    protected static function booted()
    {
        static::addGlobalScope(new TenantScope);
    }




    protected $fillable = [
        'user_id',
        'patient_name',
        'phone',
        'gender',
        'age',
        'notes',
        'diseases',
        "patient_name_tokens",
        'tenant_id',
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
