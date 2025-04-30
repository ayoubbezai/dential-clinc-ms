import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import ProtectedRoute from "./ProtectedRoute";
import RoleBasedRoute from "./RoleBasedRoute";
import PatientDetailsResp from "@/pages/receptionist/PatientDetailsResp";
import Conversation from "@/pages/shared/Conversation";

// Lazy Load Pages
const DentistDashboard = lazy(() => import("../pages/dentist/DentistDashboard"));
const ClientDashboard = lazy(() => import("../pages/client/ClientDashboard"));
const ReceptionistDashboard = lazy(() => import("../pages/receptionist/ReceptionistDashboard"));
const Schedule = lazy(() => import("../pages/shared/Schedule"));
const Login = lazy(() => import("../pages/auth/Login"));
const UsersList = lazy(() => import("../pages/shared/UsersList"));
const PatientsList = lazy(() => import("../pages/shared/PatientsList"));
const AppointmentList = lazy(() => import("../pages/shared/AppointmentList"));
const Messanger = lazy(() => import("../pages/shared/Messanger"));
const Payment = lazy(() => import("../pages/shared/Payment"));
const PatientDetails = lazy(() => import("@/pages/dentist/PatientDetails"));
const FolderDetails = lazy(() => import("@/pages/dentist/FolderDetails"));
const Inventory = lazy(() => import("@/pages/shared/Inventory"));

const AppRoutes = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Routes>
                {/* Public Route */}
                <Route path="/login" element={<Login />} />

                {/* Protected Routes */}
                <Route element={<ProtectedRoute />}>

                    {/* Dentist Routes */}
                    <Route element={<RoleBasedRoute allowedRoles={["dentist"]} />}>
                        <Route path="/dentist/dashboard" element={<DentistDashboard />} />
                        <Route path="/payment" element={<Payment />} />
                        <Route path="/inventory" element={<Inventory />} />
                        <Route path="/patient/:patientId/folder/:folderId" element={<FolderDetails />} />
                        <Route path="/patient/:id" element={<PatientDetails />} />
                    </Route>
                    <Route element={<RoleBasedRoute allowedRoles={["receptionist"]} />}>
                        <Route path="/receptionist/patient/:id" element={<PatientDetailsResp />} />
                    </Route>
                    {/* Shared Routes for Dentist & Receptionist */}
                    <Route element={<RoleBasedRoute allowedRoles={["dentist", "receptionist"]} />}>
                        <Route path="/patients_list" element={<PatientsList />} />
                        <Route path="/schedule" element={<Schedule />} />
                        <Route path="/users_list" element={<UsersList />} />
                        <Route path="/appointments_list" element={<AppointmentList />} />
                        <Route path="/messanger" element={<Messanger />} />
                        <Route path="/messanger/:id" element={<Conversation />} />
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
        </Suspense>
    );
};

export default AppRoutes;
