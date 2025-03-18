import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import AuthProvider from "./context/AuthContext";
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
import "./style/index.css";
import { Toaster } from 'react-hot-toast';


// Layout Component to Wrap Sidebar
const DashboardLayout = ({ children }) => {
  const location = useLocation();
  const showSidebar = ["/dentist/dashboard", "/schedule", "/receptionist/dashboard", "/users_list", "/patients_list", "/appointments_list"].includes(location.pathname);

  return (
    <div className="flex">
      {showSidebar && <SideBarDentist />}
      <div className="flex-grow  w-1/2 ">{children}</div>
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
                <Route path="/schedule" element={<Schedule />} />
                <Route path="/users_list" element={<UsersList />} />
                <Route path="/patients_list" element={<PatientsList />} />
                <Route path="/appointments_list" element={<AppointmentList />} />
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
