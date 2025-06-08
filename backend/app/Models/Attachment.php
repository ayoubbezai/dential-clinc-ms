<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Traits\BelongsToTenant;
use App\Scopes\TenantScope;
class Attachment extends Model
{
    //

       
    use BelongsToTenant;

    protected static function booted()
    {
        static::addGlobalScope(new TenantScope);
    }



    protected $fillable = [
    'folder_id',
    'title',
    'type',
    'original_name',
    'storage_path',
    'mime_type',
    'size','tenant_id'
];

public function folder()
{
    return $this->belongsTo(Folder::class);
}

}
