<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Note;
use Illuminate\Http\Response;
use Illuminate\Contracts\Encryption\DecryptException;
use Illuminate\Support\Facades\Crypt;


class NoteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * create a note
     * request should have folder id and title and content
     */
    public function store(Request $request)
    {
        //validate data of the note
    $data = $request->validate([
        "title" => "required|string|max:255",
        "content" => "required|string",
        "folder_id" => "required|integer|exists:folders,id",
    ]);

    $originalData = $data;

    try{
        //encrypte sensitive data title and content

        $data["title"] = Crypt::encryptString($data["title"]);
        $data["content"] = Crypt::encryptString($data["content"]);

        $note = Note::create($data);

        // Return success response
        return response()->json([
            "success" => true,
            "message" => "note created successfully",
            "data" => array_merge(["id" => $note->id], $originalData) // return the id and decrypted data

        ], Response::HTTP_CREATED);


    }catch(\Exception $e){
            
            //error response
              return response()->json([
                'success' => false,
                'message' => 'Failed to create the folder',
                'error' => $e->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR); // 500 Internal Server Error
        }


    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //retrive one note

        try{
        $note = Note::findOrFail($id);

        
        try{
            
            $note->title= Crypt::decryptString($note->title);
            $note->content= Crypt::decryptString($note->content);

            

        }catch (DecryptException $e) {
        return response()->json([
            "success" => false,
            "message" => "Failed to decrypt note data",
            "error" => $e->getMessage(),
        ], Response::HTTP_INTERNAL_SERVER_ERROR);
    }
    return response()->json([
        "success" => true,
        "message" => "note retireved successfuly",
        "data"=>$note
    ], Response::HTTP_OK);
}catch (\Exception $e) {
        return response()->json([
            "success" => false,
            "message" => "Note not found or another error occurred",
            "error" => $e->getMessage(),
        ], Response::HTTP_NOT_FOUND);
    }


    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
