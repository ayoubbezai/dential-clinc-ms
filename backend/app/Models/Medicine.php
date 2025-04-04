<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Medicine extends Model
{
    //
            protected $fillable = ['name',"description","low_stock_threshold","medium_stock_threshold","good_stock_threshold"];

      public function stocks()
    {
        return $this->hasMany(Stock::class, 'medicine_id');
    }

}
