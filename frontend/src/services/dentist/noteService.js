import api from "../other/api"



export const noteService = {
    async addNote(folder_id,title,content){
        try{
            const response = await api.post("/notes",{folder_id,title,content});
            console.log(response);
            return {data : response.data,error :null}

        }catch(error){
                        console.log(error);
                        return { data: null.data, error: error };

        }
    }
}