<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Attachment extends Model
{
    //
    protected $fillable = [
    'folder_id',
    'title',
    'type',
    'original_name',
    'storage_path',
    'mime_type',
    'size'
];

public function folder()
{
    return $this->belongsTo(Folder::class);
}

}
