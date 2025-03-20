export const navigateToDashboard = (role) => {
  const routes = {
    dentist: "/dentist/dashboard",
    receptionist: "/receptionist/dashboard",
    patient: "/patient/dashboard",
  };
  return routes[role] || "/";
};
