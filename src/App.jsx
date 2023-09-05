import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Register } from "./pages/register/Register";
import { Login } from "./pages/login/Login";
import Admin from "./pages/admin/Admin";
import User from "./pages/user/User";
import ProtectedRoute from "./pages/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Register />} />
      <Route path="/signin" element={<Login />} />
      <Route path="/admin" element={<Admin />} />

      {/* Protected user route below */}
      <Route
        path="/user"
        element={
          <ProtectedRoute>
            <User />
          </ProtectedRoute>
        }
      />

      {/* <Route path="/user" element={<User />} /> */}
    </Routes>
  );
}

export default App;
