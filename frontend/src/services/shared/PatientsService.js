import api from "../api";

export const PatientsService = {
  // Get all patients with filters and pagination
  async getPatients(
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
      const response = await api.get(`/patients?${params.toString()}`);
      return { data: response.data, error: null }; // Return data and no error
    } catch (error) {
      console.error("Error fetching patients:", error);
      return { data: null, error: error.message || "Failed to fetch patients" }; // Return error
    }
  },

  async createPatient(patient_name, phone, gender, age, diseases, note) {
    try {
      const response = await api.post("/patients", {
        patient_name,
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
        error: error.message || "Failed to create patients",
      }; // Return error
    }
  },
  async updatePatient(patient_id,patient_name, phone, gender, age, diseases, note) {
    try {
      const response = await api.put(`/patients/${patient_id}`, {
        patient_name,
        phone,
        gender,
        age,
        diseases,
        note,
      });
      console.log(response);
      return { data: response.data, error: null }; 
    } catch (error) {
      console.log(error);
      return {
        data: null,
        error: error.message || "Failed to update patients",
      }; // Return error
    }
  },

  async deletePatient(patientID) {
    try {
      const response = await api.delete(`/patients/${patientID}`);
      console.log(response);
      return { data: response.data, error: null };
    } catch (error) {
      console.log(error);
      return {
        data: null,
        error: error.message || "Failed to delete the  patient",
      };
    }
  },
};
