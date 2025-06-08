<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Traits\BelongsToTenant;
use App\Scopes\TenantScope;
class Medicine extends Model
{
    //

       
    use BelongsToTenant;

    protected static function booted()
    {
        static::addGlobalScope(new TenantScope);
    }

            protected $fillable = ['name',"description","low_stock_threshold","medium_stock_threshold","good_stock_threshold",'tenant_id'];

      public function stocks()
    {
        return $this->hasMany(Stock::class, 'medicine_id');
    }

}
