import api from "../api"

export const AppointmentService = {

    async getAppointments(){

        try{
            const response = await api.get("/appointments");
            console.log(response);
            return response.data;

        }catch(error){
            return error.message

        }

    }
}