import api from "../other/api";
export const folderDetailsService ={
    async getFolderDetails(folderId){
        try{
           const response = await api.get(`folders/${folderId}`);
           console.log(response);
           return {data:response.data.data}
        }catch(err){
            console.log(err);
        }
    },
    async getFolderNotes(folderId){
        try{
           const response = await api.get(`folders/${folderId}/notes`);
           console.log(response);
           return {data:response.data}
        }catch(err){
            console.log(err);
        }
    },
    async getFolderPayments(folderId){
        try{
           const response = await api.get(`payments/${folderId}`);
           console.log(response);
           return {data:response.data}
        }catch(err){
            console.log(err);
        }
    }
    ,
    async getFolderAppointments(folderId){
        try{
           const response = await api.get(`folders/${folderId}/appointments`);
           console.log(response);
           return {data:response.data}
        }catch(err){
            console.log(err);
        }
    }
    
}