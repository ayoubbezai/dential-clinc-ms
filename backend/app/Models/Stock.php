<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Scopes\TenantScope;
use App\Traits\BelongsToTenant;
class Stock extends Model
{

       
    use BelongsToTenant;

    // protected static function booted()
    // {
    //     static::addGlobalScope(new TenantScope);
    // }



    protected $fillable = [
        'medicine_id',
        'supplier_id',
        'unit_id',
        'price',
        'quantity',
        'expiry_date','tenant_id'
        
    ];

  

    // Define relationships
    public function medicine()
    {
        return $this->belongsTo(Medicine::class);
    }

    public function supplier()
    {
        return $this->belongsTo(Supplier::class);
    }

    public function unit()
    {
        return $this->belongsTo(StockUnit::class);
    }
}
