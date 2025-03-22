import api from "../api";
export const EventsService = {
  async getEvents(
    per_page,
    search,
    start,
    end,
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
      if (start && end) {
        appendParam("start", start);
        appendParam("end", end);
      }
      appendParam("page", page);
      appendParam("sort_by", sortBy);
      appendParam("sort_direction", sortDirection);

      // API call using api
      const response = await api.get(`/events?${params.toString()}`);
      console.log(response.data);
      return { data: response.data, error: null }; // Return data and no error
    } catch (error) {
      console.error("Error fetching events:", error);
      return {
        data: null,
        error: error.message || "Failed to fetch events",
      }; // Return error message
    }
  },

  async scheduleEvents(start, end) {
    try {
      // API call using api
      const response = await api.get(`/schedule?start=${start}&end=${end}`);
      console.log(response.data);
      console.log(response.data.data);
      return { data: response.data.data, error: null }; // Return data and no error
    } catch (error) {
      console.error("Error fetching events:", error);
      return {
        data: null,
        error: error.message || "Failed to fetch events",
      }; // Return error message
    }
  },
};
