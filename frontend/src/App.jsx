import { BrowserRouter as Router } from "react-router-dom";
import AuthProvider from "./context/AuthContext";
import { Toaster } from 'react-hot-toast';
import "./style/index.css";
import React, { lazy, Suspense } from "react";

// Lazy load components
const DashboardLayout = lazy(() => import("./layouts/DashboardLayout"));
const AppRoutes = lazy(() => import("./routes/AppRoutes"));

function App() {
  return (
    <AuthProvider>
      <Toaster />
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
