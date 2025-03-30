export const changenumberToText = (value) => {
  const options = {
    "7d": "Last Week",
    "30d": "Last Month",
    "90d": "Last 3 Months",
    "365d": "Last Year",
  };
  return options[value] || "Last Month";
};
