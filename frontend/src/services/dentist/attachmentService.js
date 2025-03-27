import api from "../other/api";

export const attachmentService = {
  async storeAttachment(folder_id, formData) {
    try {
      const response = await api.post(
        `/folders/${folder_id}/attachments`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Response:", response);
      return response.data;
    } catch (e) {
      console.error("Error in storeAttachment:", e);
      return e.message;
    }
  },

  async getAllAttchments(folder_id) {
    try {
      const response = await api.get(`/folders/${folder_id}/attachments`);
      console.log(response);
      return response.data;
    } catch (e) {
      console.log(e);
      return e;
    }
  },
};
