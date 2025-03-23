import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import RoleBasedRoute from "./RoleBasedRoute";
import DentistDashboard from "../pages/dentist/DentistDashboard";
import ClientDashboard from "../pages/client/ClientDashboard";
import ReceptionistDashboard from "../pages/receptionist/ReceptionistDashboard";
import Schedule from "../pages/shared/Schedule";
import Login from "../pages/auth/Login";
import UsersList from "../pages/shared/UsersList";
import PatientsList from "../pages/shared/PatientsList";
import AppointmentList from "../pages/shared/AppointmentList";
import Messanger from "../pages/shared/Messanger";
import Payment from "../pages/shared/Payment";
import PatientDetails from "@/pages/dentist/PatientDetails";

const AppRoutes = () => {
    return (
        <Routes>
            {/* Public Route */}
            <Route path="/login" element={<Login />} />

            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
                {/* Dentist Routes */}
                <Route element={<RoleBasedRoute allowedRoles={["dentist"]} />}>
                    <Route path="/dentist/dashboard" element={<DentistDashboard />} />
                </Route>

                {/* Shared Routes for Dentist & Receptionist */}
                <Route element={<RoleBasedRoute allowedRoles={["dentist", "receptionist"]} />}>
                    <Route path="/patients_list" element={<PatientsList />} />
                    <Route path="/patient/:id" element={<PatientDetails />} />
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
                <Route element={<RoleBasedRoute allowedRoles={["patient"]} />}>
                    <Route path="/patient/dashboard" element={<ClientDashboard />} />
                </Route>
            </Route>
        </Routes>
    );
};

export default AppRoutes;