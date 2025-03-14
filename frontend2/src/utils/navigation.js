export const navigateToDashboard = (role) => {
  const routes = {
    dentist: "/dentist/dashboard",
    receptionist: "/receptionist/dashboard",
    client: "/client/dashboard",
  };
  return routes[role] || "/";
};
