import api from "../other/api";

export const paymentService = {
  async addPayment(folder_id, amount, note, type = "in") {
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
};