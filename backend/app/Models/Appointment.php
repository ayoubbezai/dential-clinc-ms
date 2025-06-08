<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Traits\BelongsToTenant;
use App\Scopes\TenantScope;
class Appointment extends Model
{
    //
        use HasFactory;

           
    use BelongsToTenant;

    protected static function booted()
    {
        static::addGlobalScope(new TenantScope);
    }


    protected $fillable=[
        "date","status","title","tooth","content","folder_id",'tenant_id'
    ];

    public function folder(){
        return $this->belongsTo(Folder::class);
    }
}


