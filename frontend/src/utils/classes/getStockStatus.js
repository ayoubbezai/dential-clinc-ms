export const getStockStatus = (status) => {
  switch (status) {
    case "low":
      return "bg-red-100 text-red-800";
    case "medium":
      return "bg-yellow-100 text-yellow-800";
    case "good":
      return "bg-green-100 text-green-800";
    case "very_good":
      return "bg-blue-100 text-blue-800";
    default:
      return "bg-gray-200 text-gray-800";
  }
};
