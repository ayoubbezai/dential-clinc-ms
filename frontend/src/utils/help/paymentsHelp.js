function getTypeClassName(type) {
  switch (type?.toLowerCase()) {
    case "income":
      return "bg-green-100 text-green-700";
    case "expense":
      return "bg-red-100 text-red-700";
    case "refund":
      return "bg-yellow-100 text-yellow-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
}

function changenumberToText(value, t) {
  const options = {
    "7d": { value: "7d", label: t("last_week") },
    "30d": { value: "30d", label: t("last_month") },
    "90d": { value: "90d", label: t("last_3_months") },
    "365d": { value: "365d", label: t("last_year") },
    all: { value: "all", label: t("all_time") },
  };
  return options[value] || options["30d"];
}

function paymentCardData(
  paymentsStat,
  netProfitDate,
  setNetProfitDate,
  incomeDate,
  setIncomeDate,
  expensesDate,
  setExpensesDate,
  t
) {
  return [
    {
      title: t("net_earnings"),
      amount: paymentsStat?.net_profit || 0,
      comparison: changenumberToText(netProfitDate, t).label,
      selectedValue: changenumberToText(netProfitDate, t).value,
      percentage: paymentsStat?.net_profit_percentage,
      isProfit: paymentsStat?.net_profit_percentage > 0,
      setter: setNetProfitDate,
    },
    {
      title: t("total_revenue"),
      amount: paymentsStat?.income || 0,
      comparison: changenumberToText(incomeDate, t).label,
      selectedValue: changenumberToText(incomeDate, t).value,
      percentage: paymentsStat?.income_percentage,
      isProfit: paymentsStat?.income_percentage > 0,
      setter: setIncomeDate,
    },
    {
      title: t("total_expenses"),
      amount: paymentsStat?.expenses || 0,
      comparison: changenumberToText(expensesDate, t).label,
      selectedValue: changenumberToText(expensesDate, t).value,
      percentage: paymentsStat?.expenses_percentage,
      isProfit: paymentsStat?.expenses_percentage > 0,
      setter: setExpensesDate,
    },
    {
      title: t("pending_payments"),
      amount: paymentsStat?.pending || 0,
      comparison: t("all_time"),
      hasMenu: false,
    },
  ];
}

export { getTypeClassName, changenumberToText, paymentCardData };
