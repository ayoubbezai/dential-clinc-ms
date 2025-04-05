import api from "../other/api";

export const suppliersService = {
  async getAllSuppliers(per_page, search, sortBy, sortDirection, page = 1) {
    console.log(per_page)
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
      const response = await api.get(`/suppliers?${params.toString()}`);
      console.log(response);

      return { data: response.data, error: null };
    } catch (error) {
      console.error("Error fetching suppliers:", error);
      return {
        data: null,
        error: error.message || "Failed to fetch suppliers",
      }; // Return error message
    }
  },
  async addSupplier(name, contact_info) {
    try {
      const response = await api.post("/suppliers", {
        name,
        contact_info,
      });
      console.log(response);
      return { data: response.data, error: null };
    } catch (error) {
      console.log(error);
      return {
        data: null,
        error: error.message || "Failed to create supplier",
      };
    }
  },
  async deleteSupplier(supplierId) {
    try {
      const response = await api.delete(`/suppliers/${supplierId}`);
      console.log(response);
      return { data: response.data, error: null };
    } catch (error) {
      console.log(error);
      return {
        data: null,
        error: error.message || "Failed to delete the  supplier",
      };
    }
  },
  async editSupplier(supplierId,name, contact_info) {
    try {
      const response = await api.put(`/suppliers/${supplierId}`, {
        name,
        contact_info,
      });
      console.log(response);
      return { data: response.data, error: null };
    } catch (error) {
      console.log(error);
      return {
        data: null,
        error: error.message || "Failed to update supplier",
      };
    }
  },
};
