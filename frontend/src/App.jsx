import { BrowserRouter as Router } from "react-router-dom";
import AuthProvider from "./context/AuthContext";
import DashboardLayout from "./layouts/DashboardLayout";
import AppRoutes from "./routes/AppRoutes";
import { Toaster } from 'react-hot-toast';
import "./style/index.css";

function App() {
  return (
    <AuthProvider>
      <Toaster />
      <Router>
        <DashboardLayout>
          <AppRoutes />
        </DashboardLayout>
      </Router>
    </AuthProvider>
  );
}

export default App;