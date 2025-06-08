<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Traits\BelongsToTenant;
use App\Scopes\TenantScope;
class Supplier extends Model
{
    //

       
    use BelongsToTenant;

    protected static function booted()
    {
        static::addGlobalScope(new TenantScope);
    }

                protected $fillable = ['name',"contact_info",'tenant_id'
            ];

            public function stocks()
    {
        return $this->hasMany(Stock::class, 'medicine_id');
    }
}
