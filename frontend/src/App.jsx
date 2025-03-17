import Login from "./pages/auth/Login";
import Schedule from "./pages/commen/Schedule";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthProvider from "./context/AuthContext";
import ProtectedRoute from "./routes/ProtectedRoute";
import RoleBasedRoute from "./routes/RoleBasedRoute";
import DentistDashboard from "./pages/dentist/DentistDashboard";
import ClientDashboard from "./pages/client/ClientDashboard";
import ReceptionistDashboard from "./pages/receptionist/ReceptionistDashboard";
import "./index.css"
import SideBar from "./layouts/SideBar";
function App() {

  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* this route are for anyone */}
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<SideBar />} />

          {/* this rout should be a user */}
          <Route element={<ProtectedRoute />}>

            {/* this qre for dentist  */}
          </Route>

          <Route element={<RoleBasedRoute allowedRoles={["dentist"]} />}>
            <Route path="/dentist/dashboard" element={<DentistDashboard />} />
          </Route>
          <Route element={<RoleBasedRoute allowedRoles={["dentist", "receptionist"]} />}>
            <Route path="/schedule" element={<Schedule />} />
          </Route>

          {/* these are for receptionist */}
          <Route element={<RoleBasedRoute allowedRoles={["receptionist"]} />}>
            <Route path="/receptionist/dashboard" element={<ReceptionistDashboard />} />
          </Route>

          {/* these are for client  */}
          <Route element={<RoleBasedRoute allowedRoles={["client"]} />}>
            <Route path="/client/dashboard" element={<ClientDashboard />} />
          </Route>



        </Routes>

      </Router>
    </AuthProvider>
  )
}

export default App
