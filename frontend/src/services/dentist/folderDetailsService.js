import api from "../other/api";
export const folderDetailsService = {
  async getFolderDetails(folderId) {
    try {
      const response = await api.get(`folders/${folderId}`);
      console.log(response);
      return { data: response.data.data };
    } catch (err) {
      console.log(err);
    }
  },
  async getFolderNotes(folderId) {
    try {
      const response = await api.get(`folders/${folderId}/notes`);
      console.log(response);
      return { data: response.data };
    } catch (err) {
      console.log(err);
    }
  },
  async getFolderPayments(folderId) {
    try {
      const response = await api.get(`payments/${folderId}`);
      console.log(response);
      return { data: response.data };
    } catch (err) {
      console.log(err);
    }
  },
  async getFolderAppointments(folderId) {
    try {
      const response = await api.get(`folders/${folderId}/appointments`);
      console.log(response);
      return { data: response.data };
    } catch (err) {
      console.log(err);
    }
  },
  async getAppointments(
    folder_id,
    per_page,
    search,
    status,
    sortBy,
    sortDirection,
    page = 1
  ) {
    try {
      const params = new URLSearchParams();
      const appendParam = (key, value) => {
        if (value) params.append(key, value);
      };
      appendParam("per_page", per_page);
      appendParam("search", search);
      appendParam("status", status);
      appendParam("page", page);
      appendParam("sort_by", sortBy);
      appendParam("sort_direction", sortDirection);

      const response = await api.get(
        `folders/${folder_id}/appointments?${params.toString()}`
      );
      return { data: response.data, error: null };
    } catch (error) {
      console.error("Error fetching appointments:", error);
      return {
        data: null,
        error: error.message || "Failed to fetch appointments",
      }; // Return error message
    }
  },
};