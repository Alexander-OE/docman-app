import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Register } from "./pages/register/Register";
import { Login } from "./pages/login/Login";
import Admin from "./pages/admin/Admin";

function App() {
  return <Routes>
    <Route path="/" element={<Register />} />
    <Route path="/signin" element={<Login />} />
    <Route path="/admin" element={<Admin />} />

  </Routes>;
}

export default App;
