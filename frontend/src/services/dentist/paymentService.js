import api from "../other/api";

export const paymentService = {
  async addPayment(folder_id, amount, note, type = "income") {
    try {
      console.log(folder_id);
      console.log(amount);
      console.log(type);
      const response = await api.post("/payments", {
        folder_id,
        amount,
        note,
        type,
      });
      console.log(response);
      return { data: response.data, error: null };
    } catch (err) {
      console.log(err);
      return { data: null, error: err };
    }
  },

  async getAllPayments(
    per_page,
    search,
    type,
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
      appendParam("type", type);
      if (start_date && end_date) {
        appendParam("start_date", start_date);
        appendParam("end_date", end_date);
      }
      appendParam("page", page);
      appendParam("sort_by", sortBy);
      appendParam("sort_direction", sortDirection);

      // API call using api
      const response = await api.get(`/payments?${params.toString()}`);
      return { data: response.data, error: null }; // Return data and no error
    } catch (error) {
      console.error("Error fetching payments:", error);
      return { data: null, error: error.message || "Failed to fetch payments" }; // Return error
    }
  },
};