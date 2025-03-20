import api from "../api";

export const UsersService = {
  async getUsers(
    per_page,
    search,
    role_name,
    start_date,
    end_date,
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
      appendParam("role_name", role_name);
      if (start_date && end_date) {
        appendParam("start_date", start_date);
        appendParam("end_date", end_date);
      }
      appendParam("page", page);
      appendParam("sort_by", sortBy);
      appendParam("sort_direction", sortDirection);

      // API call using api
      const response = await api.get(`/users?${params.toString()}`);
      return { data: response.data, error: null }; // Return data and no error
    } catch (error) {
      console.error("Error fetching users:", error);
      return { data: null, error: error.message || "Failed to fetch users" }; // Return error
    }
  },
  async updateUser(userId, name, role_name, email) {
    try {
      const response = await api.put(`/users/${userId}`, {
        name,
        role_name,
        email,
      });
      console.log(response);
      return { data: response.data, error: null };
    } catch (error) {
      console.log(error);
      return {
        data: null,
        error: error.message || "Failed to update user",
      }; // Return error
    }
  },
  async deleteUser(userId) {
    try {
      const response = await api.delete(`/users/${userId}`);
      console.log(response);
      return { data: response.data, error: null };
    } catch (error) {
      console.log(error);
      return {
        data: null,
        error: error.message || "Failed to delete the  user",
      };
    }
  },
};
