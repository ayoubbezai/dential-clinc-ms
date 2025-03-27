import api from "../other/api";

export const folderService = {
  async getPatientFolders(patientId, perPage, search, page = 1) {
    try {
      const params = new URLSearchParams();
      const appendParam = (key, value) => {
        if (value) params.append(key, value);
      };

      appendParam("per_page", perPage);
      appendParam("search", search);
      appendParam("page", page);
      console.log("patientId", patientId);
      console.log("page", page);
      console.log("perPage", perPage);
      console.log("params", params);

      const responce = await api.get(
        `patients/${patientId}/folders?${params.toString()}`
      );
      console.log(responce.data.data);
      return { data: responce?.data?.data };
    } catch (error) {
      console.log("err", error);
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
      return { data: response.data };
    } catch (err) {
      console.log("err", err);
    }
  },

  async deleteFolder(folderId) {
    try {
      console.log("id", folderId);
      const response = await api.delete(`/folders/${folderId}`);
      console.log(response);
      return response.data;
    } catch (err) {
      console.log("err", err);
    }
  },

  async editFolder(folderId, formData, visits) {
    try {
      const { folder_name, price, status } = formData;
      console.log(status);
      const response = await api.put(`/folders/${folderId}`, {
        folder_name,
        price,
        status,
        visits,
      });
      console.log(response);
      return { data: response.data };
    } catch (err) {
      console.log("err", err);
    }
  },
  async getAllFolderDetails(folderId) {
    try {
      console.log("Fetching details for folderId:", folderId);

      const response = await api.get(`/folder_details/${folderId}`);
      console.log("Folder details response:", response);

      return { data: response.data };
    } catch (error) {
      console.log("Error fetching folder details:", error);
      return {
        error:
          error?.response?.data?.message || "Failed to fetch folder details.",
      };
    }
  },
};
