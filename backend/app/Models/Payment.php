<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Payment extends Model
{
        use HasFactory;

    //
    protected $fillable= ["amount","folder_id","type","note"];


    public function folder(){
        return $this->belongsTo(Folder::class);
    }
}
