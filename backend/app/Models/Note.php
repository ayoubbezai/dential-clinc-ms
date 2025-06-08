<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Traits\BelongsToTenant;
use App\Scopes\TenantScope;
class Note extends Model
{
    //
     use HasFactory;

        
    use BelongsToTenant;

    protected static function booted()
    {
        static::addGlobalScope(new TenantScope);
    }


    protected $fillable =[
        "folder_id",
        "title",
        "content"
        ,'tenant_id'
        
    ];

    public function folder(){
        return $this->belongsTo(Folder::class);
    }
}
