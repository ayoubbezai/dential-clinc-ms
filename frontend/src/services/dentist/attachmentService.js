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

  async deleteAttachments(attachments_id) {
    try {
      const response = await api.delete(`/attachments/${attachments_id}`);
      console.log(response);
      return response.data;
    } catch (err) {
      console.log("err", err);
      return err;
    }
  },

  async getAllAttchments(folderId){
        try {
          const response = await api.get(`/folders/${folderId}/attachments`);
          console.log(response);
          return { data: response.data };
        } catch (err) {
          console.log(err);
        }
  }
};
