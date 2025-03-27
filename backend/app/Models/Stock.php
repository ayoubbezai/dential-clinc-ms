<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Stock extends Model
{
    protected $fillable = [
        'medicine_id',
        'supplier_id',
        'unit_id',
        'price',
        'quantity',
        'expiry_date'
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
