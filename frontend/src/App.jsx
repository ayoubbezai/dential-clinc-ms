import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useContext } from "react";
import AuthProvider, { AuthContext } from "./context/AuthContext";
import ProtectedRoute from "./routes/ProtectedRoute";
import RoleBasedRoute from "./routes/RoleBasedRoute";
import DentistDashboard from "./pages/dentist/DentistDashboard";
import ClientDashboard from "./pages/client/ClientDashboard";
import ReceptionistDashboard from "./pages/receptionist/ReceptionistDashboard";
import Schedule from "./pages/shared/Schedule";
import Login from "./pages/auth/Login";
import SideBarDentist from "./layouts/SideBar";
import UsersList from "./pages/shared/UsersList";
import PatientsList from "./pages/shared/PatientsList";
import AppointmentList from "./pages/shared/AppointmentList";
import Messanger from "./pages/shared/Messanger";
import Payment from "./pages/shared/Payment";
import { Toaster } from 'react-hot-toast';
import "./style/index.css";

// Layout Component to Wrap Sidebar
const DashboardLayout = ({ children }) => {
  const location = useLocation();
  const { user } = useContext(AuthContext); // Get logged-in user data
  const isDentist = user?.role === "dentist"; // Check if user is a dentist

  // Sidebar should be visible ONLY for dentists on specific routes
  const dentistPaths = ["/dentist/dashboard", "/schedule", "/users_list", "/patients_list", "/appointments_list", "/payment", "/messanger"];
  const showSidebar = isDentist && dentistPaths.includes(location.pathname);

  return (
    <div className="flex">
      {showSidebar && <SideBarDentist />}
      <div className="flex-grow w-1/2 max-h-screen overflow-auto">{children}</div>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <Toaster />

      <Router>
        <DashboardLayout>
          <Routes>
            {/* Public Route */}
            <Route path="/login" element={<Login />} />


            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
              {/* Dentist Routes */}
              <Route element={<RoleBasedRoute allowedRoles={["dentist"]} />}>
                <Route path="/dentist/dashboard" element={<DentistDashboard />} />
              </Route>

              {/* Shared Route for Dentist & Receptionist */}
              <Route element={<RoleBasedRoute allowedRoles={["dentist", "receptionist"]} />}>
                <Route path="/patients_list" element={<PatientsList />} />
                <Route path="/schedule" element={<Schedule />} />
                <Route path="/users_list" element={<UsersList />} />
                <Route path="/appointments_list" element={<AppointmentList />} />
                <Route path="/payment" element={<Payment />} />
                <Route path="/messanger" element={<Messanger />} />
              </Route>

              {/* Receptionist Routes */}
              <Route element={<RoleBasedRoute allowedRoles={["receptionist"]} />}>
                <Route path="/receptionist/dashboard" element={<ReceptionistDashboard />} />
              </Route>

              {/* Client Routes */}
              <Route element={<RoleBasedRoute allowedRoles={["client"]} />}>
                <Route path="/client/dashboard" element={<ClientDashboard />} />
              </Route>
            </Route>
          </Routes>
        </DashboardLayout>

      </Router>
    </AuthProvider>
  );
}

export default App;
