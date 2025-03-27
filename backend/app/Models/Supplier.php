<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Supplier extends Model
{
    //
                protected $fillable = ['name',"contact_info"];

            public function stocks()
    {
        return $this->hasMany(Stock::class, 'medicine_id');
    }
}
