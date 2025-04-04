import api from "../other/api";

export const StocksService = {
  async getAllStcok(per_page, search, sortBy, sortDirection, page = 1) {
    try {
      const params = new URLSearchParams();
      const appendParam = (key, value) => {
        if (value) params.append(key, value);
      };

      appendParam("per_page", per_page);
      appendParam("search", search);

      appendParam("page", page);
      appendParam("sort_by", sortBy);
      appendParam("sort_direction", sortDirection);

      // API call using api
      const response = await api.get(`/medicines?${params.toString()}`);
      console.log(response);

      return { data: response.data, error: null };
    } catch (error) {
      console.error("Error fetching medicines:", error);
      return {
        data: null,
        error: error.message || "Failed to fetch medicines",
      }; // Return error message
    }
  },
};