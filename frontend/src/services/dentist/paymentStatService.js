import api from "../other/api"

export const paymentStatServcie = {
  async getPaymnetStat(
    income_date,
    expenses_date,
    net_profit_date,
    income_expense_date
  ) {

    try {
      const params = new URLSearchParams();
      const appendParam = (key, value) => {
        if (value) params.append(key, value);
      };

      appendParam("income_date", income_date);
      appendParam("expenses_date", expenses_date);
      appendParam("net_profit_date", net_profit_date);
      appendParam("income_expense_date", income_expense_date);

      const response = await api.get(`/payments_stat?${params.toString()}`);
      console.log(response);
      return { data: response.data, error: null };
    } catch (err) {
      console.log(err);
      return { data: null, error: err };
    }

  },
}; 