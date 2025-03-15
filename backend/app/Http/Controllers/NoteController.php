<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Note;
use App\Models\Folder;
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

    //keep decrypted data

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
        //retrive a note ot throw 404 not found
                $note = Note::findOrFail($id);
                
                try{
                $data = $request->validate([
                    "title" => "nullable|string|max:255",
                    "content" => "nullable|string",
                    "folder_id" => "nullable|integer|exists:folders,id",
                ]);
                $originalData = $data;
                //chack if that key title and content send in the request and check if its not null
                  if (array_key_exists("title", $data) && $data["title"] !== null) {
        $data["title"] = Crypt::encryptString($data["title"]);
    }

    if (array_key_exists("content", $data) && $data["content"] !== null) {
        $data["content"] = Crypt::encryptString($data["content"]);
    }

                $note->update($data);

                return response()->json([
                    "success"=>true,
                    "message"=>"note updated succesfully updated succesfully ",
                    "data"=>$originalData
                ]);

            }catch (\Exception $e) {
        return response()->json([
            "success" => false,
            "message" => " error occurred in updating note",
            "error" => $e->getMessage(),
        ], Response::HTTP_NOT_FOUND);
    }

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //retrive a note ot throw 404 not found
                $note = Note::findOrFail($id);
                try{
                    //delete the note
            $note->delete();

            //success response

         return response()->json([
            'success' => true,
            'message' => 'note deleted successfully',
            'data' => [],
        ], Response::HTTP_OK);

        }catch(\Exception $e){
            //error response
              return response()->json([
                'success' => false,
                'message' => 'faild to delete the note',
                'error' => $e->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR); // 500 Internal Server Error
        }

    }

    public function getNotesOfFolder(string $id)
    {
        $folder= Folder::with("notes")->findOrFail($id);
        

        try{
            // Decrypt note data
            
           $folder->notes = $folder->notes->map(function ($note) {
            try {
                $note->title = Crypt::decryptString($note->title);
                $note->content = Crypt::decryptString($note->content);
            } catch (DecryptException $e) {
                // Handle decryption failure by marking the note
                $note->title = "[Decryption Failed]";
                $note->content = "[Decryption Failed]";
            }
            return $note;
        });


             //success response

         return response()->json([
            'success' => true,
            'message' => 'notes retrived successfully',
            'data' => $folder->notes,
        ], Response::HTTP_OK);


        }catch(\Exception $e){
            //error response
              return response()->json([
                'success' => false,
                'message' => 'faild to delete the note',
                'error' => $e->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR); // 500 Internal Server Error
        }
    }
}
