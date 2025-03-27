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

public function getAttachments(string $id)
{
    try {
        // Corrected query - using with() before findOrFail()
        $folder = Folder::with(['attachments'])
            ->findOrFail($id);

        return response()->json([
            'success' => true,
            'data' => [
                'attachments' => $folder->attachments->map(function($file) {
                    return [
                        'id' => $file->id,
                        'title' => $file->title,
                        'type' => $file->mime_type,
                        'size' => $this->formatBytes($file->size),
                        'uploaded_at' => $file->created_at->format('M d, Y'),
                        'download_url' => url("/api/attachments/{$file->id}/download"),
                        'previewable' => in_array($file->mime_type, [
                            'image/jpeg',
                            'image/png',
                            'application/pdf'
                        ])
                    ];
                })
            ]
        ]);

    } catch (\Exception $e) {
        return response()->json([
            'success' => false,
            "error" => $e->getMessage(),
        ], Response::HTTP_INTERNAL_SERVER_ERROR);
    }
}

private function formatBytes($bytes) {
    if ($bytes == 0) return '0 Bytes';
    $k = 1024;
    $sizes = ['Bytes', 'KB', 'MB', 'GB'];
    $i = floor(log($bytes) / log($k));
    return round($bytes / pow($k, $i), 2) . ' ' . $sizes[$i];
}
public function download(string $id)
{
    try {
        // Fetch attachment by ID
        $attachment = Attachment::findOrFail($id);

        // Ensure file exists in storage
        if (!Storage::disk('attachments')->exists($attachment->storage_path)) {
            return response()->json([
                'success' => false,
                'message' => 'File not found in storage.'
            ], Response::HTTP_NOT_FOUND);
        }

        // Get file path and return file as a download response
        $filePath = Storage::disk('attachments')->path($attachment->storage_path);

        // return response()->json([
        //     "path"=>$filePath
        // ],200);
        
        return response()->download($filePath, $attachment->original_name, [
            'Content-Type' => $attachment->mime_type
        ]);


    } catch (\Exception $e) {
        return response()->json([
            'success' => false,
            'message' => 'Failed to download file.',
            'error' => $e->getMessage()
        ], Response::HTTP_INTERNAL_SERVER_ERROR);
    }
}}