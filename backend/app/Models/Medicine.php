<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Medicine extends Model
{
    //
            protected $fillable = ['name',"description"];

      public function stocks()
    {
        return $this->hasMany(Stock::class, 'medicine_id');
    }

}
