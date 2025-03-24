import api from "../other/api";

export const patientService = {
  async getPatientDetails(patientId) {
    try {
      const response = await api.get(`patients/${patientId}`);
      console.log(response);
      return { data: response.data.data, error: null };
    } catch (err) {
      console.log(err.message);
      return { data: null, error: err.message };
    }
  },
  async createPatientAccount(patientId,email,password){
    try{
      const response = await api.post(`patients/${patientId}/createUser`,{email,password});

      return {data:response.data ,error :null}

    }catch (err) {
      return { data: null, error: err.message };
  }
}

};
