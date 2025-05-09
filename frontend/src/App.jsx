import { BrowserRouter as Router } from "react-router-dom";
import AuthProvider from "./context/AuthContext";
import { Toaster } from 'react-hot-toast';
import "./style/index.css";
import React, { lazy, Suspense } from "react";

// Lazy load components
const DashboardLayout = lazy(() => import("./layouts/DashboardLayout"));
const AppRoutes = lazy(() => import("./routes/AppRoutes"));
const AiChatBot = lazy(() => import("./pages/dentist/AiChatBot")); // Add this line

function App() {
  return (
    <AuthProvider>
      <Toaster />
      {/* Add AiChatBot here - outside Router but inside AuthProvider */}
      <Suspense fallback={null}>
        <AiChatBot />
      </Suspense>

      <Router>
        <Suspense fallback={<p>Loading...</p>}>
          <DashboardLayout>
            <AppRoutes />
          </DashboardLayout>
        </Suspense>
      </Router>
    </AuthProvider>
  );
}

export default App;