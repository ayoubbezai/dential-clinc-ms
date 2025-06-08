<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Traits\BelongsToTenant;
use App\Scopes\TenantScope;

class FolderVisit extends Model
{
    //
      protected $fillable =[
        "folder_id",
        "dent",
        "reason_of_visit",
        "treatment_details"
        ,'tenant_id'
    ];
       
    use BelongsToTenant;

    protected static function booted()
    {
        static::addGlobalScope(new TenantScope);
    }

    
    public function folder()
    {
        return $this->belongsTo(Folder::class);
    }
}
