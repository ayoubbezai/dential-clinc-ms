import api from "../other/api";

export const folderSevice = {
  async getPatientFolders(patientId) {
    try {
      const responce = await api.get(`patients/${patientId}/folders`);
      console.log(responce);
      return { folders: responce.data };
    } catch {
      console.log("err");
    }
  },

  async createFolder(patientId, formData, visits) {
    try {
      const { folder_name, price, status } = formData;
      console.log(formData);
      const response = await api.post("/folders", {
        patient_id: patientId,
        folder_name,
        price,
        status,
        visits,
      });
      console.log(response);
      return response.data;
    } catch (err){
      console.log("err",err);
    }
  },
};
