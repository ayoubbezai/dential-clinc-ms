<?php

namespace App\Http\Controllers;

use App\Models\Attachment;
use App\Models\Folder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Http\Response;

class AttachmentController extends Controller
{
    //

        public function store(Request $request, Folder $folder){

            //validate the attachment

            try{

                
                $request->validate([
            'file' => 'required|file|max:20480', // 20MB max
            "title"=> 'required|string',
            ]);

            $file = $request->file('file');
            $uniqueName = Str::uuid() . '.' . $file->extension();
            $path = $file->storeAs('attachments', $uniqueName, 'attachments');

            $attachment = $folder->attachments()->create([
                'title' => $request->title,
                'original_name' => $file->getClientOriginalName(),
                'storage_path' => $path,
                'mime_type' => $file->getMimeType(),
                'size' => $file->getSize()
            ]);
            
            return response()->json([
            "success" => true,
            "message" => "attachment uplaoded successfully",
            "data" => []
        ], Response::HTTP_CREATED);
    } catch (\Exception $e) {
        return response()->json([
            "success" => false,
            "message" => "Failed to uplaoded the attachment",
            "error" => $e->getMessage(),
        ], Response::HTTP_INTERNAL_SERVER_ERROR);
    }


        }
}
