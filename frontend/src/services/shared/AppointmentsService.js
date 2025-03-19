import api from "../api";

export const AppointmentService = {
  async getAppointments(
    per_page,
    search,
    status,
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
      appendParam("status", status);
      if (start_date && end_date) {
        appendParam("start_date", start_date);
        appendParam("end_date", end_date);
      }
      appendParam("page", page);
      appendParam("sort_by", sortBy);
      appendParam("sort_direction", sortDirection);

      // API call using api
      const response = await api.get(`/appointments?${params.toString()}`);
      return { data: response.data, error: null }; // Return data and no error
    } catch (error) {
      console.error("Error fetching appointments:", error);
      return {
        data: null,
        error: error.message || "Failed to fetch appointments",
      }; // Return error message
    }
  },

  async updateAppointments(appointment_id, date, title, content, status) {
    try {
      const response = await api.put(`/appointments/${appointment_id}`, {
        date,
        title,
        content,
        status,
      });
      console.log(response);
      return { data: response.data, error: null };
    } catch (error) {
      console.log(error);
      return {
        data: null,
        error: error.message || "Failed to update appointment",
      };
    }
  },

  async deleteAppointment(appointment_id) {
    try {
      const response = await api.delete(`/appointments/${appointment_id}`);
      console.log(response);
      return { data: response.data, error: null };
    } catch (error) {
      console.log(error);
      return {
        data: null,
        error: error.message || "Failed to delete the  appointment",
      };
    }
  },
};
