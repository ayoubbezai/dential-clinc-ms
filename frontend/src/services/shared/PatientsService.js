import api from "../api";

export const PatientsService = {
  // get all patients with filters and pagination
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
      //
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

      // api call using api
      const response = await api.get(`/patients?${params.toString()}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching patients:", error);
      throw error;
    }
  },
};
