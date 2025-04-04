import api from "../other/api";

export const UnitsService = {
  async getAllUnits(page = 1) {
    try {
      const params = new URLSearchParams();
      const appendParam = (key, value) => {
        if (value) params.append(key, value);
      };

      appendParam("page", page);

      // API call using api
      const response = await api.get(`/stock_units?${params.toString()}`);
      console.log(response);

      return { data: response.data, error: null };
    } catch (error) {
      console.error("Error fetching units:", error);
      return {
        data: null,
        error: error.message || "Failed to fetch units",
      }; // Return error message
    }
  },
  async addUnit(name){
     try {
      const response = await api.post("/stock_units", {
        name,
      });
      console.log(response);
      return { data: response.data, error: null };
    } catch (error) {
      console.log(error);
      return {
        data: null,
        error: error.message || "Failed to create unit",
      }; // Return error
    }
  }
};