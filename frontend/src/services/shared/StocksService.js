import api from "../other/api";

export const StocksService = {
  async getAllStcok(
    per_page,
    search,
    stockStatus,
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
      appendParam("page", page);
      appendParam("sort_by", sortBy);
      appendParam("sort_direction", sortDirection);
      appendParam("stock_status", stockStatus);

      // API call using api
      const response = await api.get(`/stocks?${params.toString()}`);
      console.log(response);

      return { data: response.data, error: null };
    } catch (error) {
      console.error("Error fetching stocks:", error);
      return {
        data: null,
        error: error.message || "Failed to fetch stocks",
      }; // Return error message
    }
  },
  async addStock(
    medicine_id,
    supplier_id,
    unit_id,
    price,
    quantity,
    expiry_date
  ) {
    console.log(unit_id);
    try {
      const response = await api.post("/stocks", {
        medicine_id,
        supplier_id,
        unit_id,
        price,
        quantity,
        expiry_date,
      });
      console.log(response);
      return { data: response.data, error: null };
    } catch (error) {
      console.log(error);
      return {
        data: null,
        error: error.message || "Failed to create stock",
      };
    }
  },
  async editStock(
    stockId,
    medicine_id,
    supplier_id,
    unit_id,
    price,
    quantity,
    expiry_date
  ) {
    console.log(unit_id);
    try {
      const response = await api.put(`/stocks/${stockId}`, {
        medicine_id,
        supplier_id,
        unit_id,
        price,
        quantity,
        expiry_date,
      });
      console.log(response);
      return { data: response.data, error: null };
    } catch (error) {
      console.log(error);
      return {
        data: null,
        error: error.message || "Failed to edit stock",
      };
    }
  },
  async deleteStock(stockId) {
    try {
      const response = await api.delete(`/stocks/${stockId}`);
      console.log(response);
      return { data: response.data, error: null };
    } catch (error) {
      console.log(error);
      return {
        data: null,
        error: error.message || "Failed to delete the  stock",
      };
    }
  },
};