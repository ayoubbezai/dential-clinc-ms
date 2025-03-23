import api from "../other/api";


export const folderSevice = {
  async getPatientFolders(patientId) {
    try {
      const responce = await api.get(`patients/${patientId}/folders`);
      console.log(responce)
      return {folders :responce.data}
    } catch {
        console.log("err")
    }
  },
};