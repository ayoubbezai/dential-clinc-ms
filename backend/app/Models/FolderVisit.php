<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FolderVisit extends Model
{
    //
      protected $fillable =[
        "folder_id",
        "dent",
        "reason_of_visit",
        "treatment_details",
    ];
    public function folder()
    {
        return $this->belongsTo(Folder::class);
    }
}
