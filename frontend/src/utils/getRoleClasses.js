export const getRoleClasses = (status) => {
  switch (status) {
    case "patient":
      return "bg-green-100 text-green-800";
    case "receptionist":
      return "bg-yellow-100 text-yellow-800";
    case "dentist":
      return "bg-blue-100 text-blue-800";

    default:
      return "bg-gray-100 text-gray-800";
  }
};
