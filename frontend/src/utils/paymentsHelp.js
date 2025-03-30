function getTypeClassName(type) {
  switch (type?.toLowerCase()) {
    case "income":
      return "bg-green-100 text-green-700"; // Green for income
    case "expense":
      return "bg-red-100 text-red-700"; // Red for expense
    case "refund":
      return "bg-yellow-100 text-yellow-700"; // Yellow for refund
    default:
      return "bg-gray-100 text-gray-700"; // Default gray
  }
}
function changenumberToText(value) {
  const options = {
    "7d": { value: "7d", label: "Last Week" },
    "30d": { value: "30d", label: "Last Month" },
    "90d": { value: "90d", label: "Last 3 Months" },
    "365d": { value: "365d", label: "Last Year" },
    all: { value: "all", label: "All Time" },
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
   setExpensesDate
 ) {
   return [
     {
       title: "Net Earnings",
       amount: paymentsStat?.net_profit || 0,
       comparison: changenumberToText(netProfitDate).label,
       selectedValue: changenumberToText(netProfitDate).value,
       percentage: paymentsStat?.net_profit_percentage,
       isProfit: paymentsStat?.net_profit_percentage > 0,
       setter: setNetProfitDate,
     },
     {
       title: "Total Revenue",
       amount: paymentsStat?.income || 0,
       comparison: changenumberToText(incomeDate).label,
       selectedValue: changenumberToText(incomeDate).value,
       percentage: paymentsStat?.income_percentage,
       isProfit: paymentsStat?.income_percentage > 0,
       setter: setIncomeDate,
     },
     {
       title: "Total Expenses",
       amount: paymentsStat?.expenses || 0,
       comparison: changenumberToText(expensesDate).label,
       selectedValue: changenumberToText(expensesDate).value,
       percentage: paymentsStat?.expenses_percentage,
       isProfit: paymentsStat?.expenses_percentage > 0,
       setter: setExpensesDate,
     },
     {
       title: "Pending Payments",
       amount: paymentsStat?.pending || 0,
       comparison: "All The Time",
       hasMenu: false,
     },
   ];
 }
    

export { getTypeClassName, changenumberToText, paymentCardData };