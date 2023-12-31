import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Register } from "./pages/register/Register";
import { Login } from "./pages/login/Login";
import Admin from "./pages/admin/Admin";
import UserDash from "./pages/user-dash/UserDash";
import ProtectedRoute from "./pages/ProtectedRoute";
import Manage from "./pages/manage/Manage";

function App() {
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<Login />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/manage" element={<Manage/>} />
      {/* Protected user route below */}
      <Route
        path="/user"
        element={
          <ProtectedRoute>
            <UserDash />
          </ProtectedRoute>
        }
      />


      {/* <Route path="/user" element={<User />} /> */}
    </Routes>
  );
}

export default App;
