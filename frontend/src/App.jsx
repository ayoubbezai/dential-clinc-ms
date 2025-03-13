import Login from "./pages/auth/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthProvider from "./context/AuthContext";
import "./style/index.css"
function App() {

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>

      </Router>
    </AuthProvider>
  )
}

export default App
