import api from "../api";

export const UserService = {
  // Get all Users with filters and pagination
  async getUsers(
    per_page,
    search,
    gender,
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
      appendParam("gender", gender);
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

  async createUser(user_name, phone, gender, age, diseases, note) {
    try {
      const response = await api.post("/users", {
        user_name,
        phone,
        gender,
        age,
        diseases,
        note,
      });
      console.log(response);
      return { data: response.data, error: null }; // Return data and no error
    } catch (error) {
      console.log(error);
      return {
        data: null,
        error: error.message || "Failed to create users",
      }; // Return error
    }
  },
  async updateUser(user_id,user_name, phone, gender, age, diseases, note) {
    try {
      const response = await api.put(`/users/${user_id}`, {
        user_name,
        phone,
        gender,
        age,
        diseases,
        note,
      });
      console.log(response);
      return { data: response.data, error: null }; // Return data and no error
    } catch (error) {
      console.log(error);
      return {
        data: null,
        error: error.message || "Failed to update users",
      }; // Return error
    }
  },

  async deleteUser(userID) {
    try {
      const response = await api.delete(`/users/${patientID}`);
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
