import Login from "./pages/auth/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthProvider from "./context/AuthContext";
import "./style/index.css"
import ProtectedRoute from "./routes/ProtectedRoute";
import RoleBasedRoute from "./routes/RoleBasedRoute";
import DentistDashboard from "./pages/dentist/DentistDashboard";
import ClientDashboard from "./pages/client/ClientDashboard";
import ReceptionistDashboard from "./pages/receptionist/ReceptionistDashboard";
function App() {

  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* this route are for anyone */}
          <Route path="/login" element={<Login />} />

          {/* this rout should be a user */}
          <Route element={<ProtectedRoute />}>

            {/* this qre for dentist  */}
            <Route path="/dentist/dashboard" element={<DentistDashboard />} />
            <Route element={<RoleBasedRoute allowedRoles={["dentist"]} />}>
            </Route>

            {/* these are for receptionist */}
            <Route element={<RoleBasedRoute allowedRoles={["receptionist"]} />}>
              <Route path="/receptionist/dashboard" element={<ReceptionistDashboard />} />
            </Route>

            {/* these are for client  */}
            <Route element={<RoleBasedRoute allowedRoles={["client"]} />}>
              <Route path="/client/dashboard" element={<ClientDashboard />} />
            </Route>

          </Route>


        </Routes>

      </Router>
    </AuthProvider>
  )
}

export default App
