<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    //
    protected $fillable= ["amount","folder_id","type","note"];


    public function folder(){
        return $this->belongsTo(Folder::class);
    }
}
