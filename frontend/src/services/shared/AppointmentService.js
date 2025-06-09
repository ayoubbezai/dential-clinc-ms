import api from "../other/api";

export const AppointmentService = {
  async scheduleAppointments(start, end) {
    try {
      // API call using api
      const response = await api.get(`/appointments?start=${start}&end=${end}`);
      console.log(response.data);
      console.log(response.data.data);
      return { data: response.data.data, error: null }; // Return data and no error
    } catch (error) {
      console.error("Error fetching appointments:", error);
      return {
        data: null,
        error: error.message || "Failed to fetch appointments",
      }; // Return error message
    }
  },

  async deleteAppointment(appointmentId) {
    try {
      const response = await api.delete(`/appointments/${appointmentId}`);
      console.log(response);
      return { data: response.data, error: null };
    } catch (error) {
      console.log(error);
      return {
        data: null,
        error: error.message || "Failed to delete the appointment",
      };
    }
  },

  async addAppointment(
    start_date,
    start_time,
    end_date,
    end_time,
    title,
    patientId,
    status,
    notes
  ) {
    try {
      const response = await api.post("/appointments", {
        start_date,
        start_time,
        end_date,
        end_time,
        title,
        patientId,
        status,
        notes,
      });
      console.log(response);
      return { data: response.data, error: null }; // Return data and no error
    } catch (error) {
      console.log(error);
      return {
        data: null,
        error: error.message || "Failed to create appointment",
      }; // Return error
    }
  },

  async updateAppointment(
    appointmentId,
    start_date,
    start_time,
    end_date,
    end_time,
    title,
    patientId,
    status,
    notes
  ) {
    try {
      const response = await api.put(`/appointments/${appointmentId}`, {
        start_date,
        start_time,
        end_date,
        end_time,
        title,
        patientId,
        status,
        notes,
      });
      console.log(response);
      return { data: response.data, error: null }; // Return data and no error
    } catch (error) {
      console.log(error);
      return {
        data: null,
        error: error.message || "Failed to update appointment",
      }; // Return error
    }
  },
}; 