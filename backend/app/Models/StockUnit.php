<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StockUnit extends Model
{
        protected $fillable = ['name'];

            public function stocks()
    {
        return $this->hasMany(Stock::class, 'medicine_id');
    }


}
