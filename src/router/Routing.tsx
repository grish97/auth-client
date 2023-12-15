import { Routes, Route, Navigate } from "react-router-dom";
import useAuth from "hooks/useAuth";

// Route types
import PublicRoutes from "./PublicRoutes";
import ProtectedRoutes from "./ProtectedRoutes";
import PrivateRoutes from "./PrivateRoutes";
import RequireAuth from "./RequireAuth";

import Dashboard from "components/Dashboard";
import Unknown from "components/Unknown";
import Unauthorized from "components/Unauthorized";
import Login from "components/Login";
import Register from "components/Register";
import PersistLogin from "components/PersistLogin";
import AuthLayout from "components/Layout/AuthLayout";
import MainLayout from "components/Layout/MainLayout";

export default function Routing() {
  const auth = useAuth();

  return (
    <Routes>
      {/** Public routes */}
      <Route element={<AuthLayout />}>
        <Route path="/auth" element={<PublicRoutes />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="unauthorized" element={<Unauthorized />} />
        </Route>
      </Route>

      {/** Require to auth routes */}
      <Route path="/" element={<MainLayout />}>
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth allowedRoles={auth.roles} />}>
            <Route path="" element={<Navigate replace to="dashboard" />} />
            <Route path="dashboard" element={<Dashboard />} />
          </Route>
        </Route>
      </Route>

      {/** Unknown routes */}
      <Route path="*" element={<Unknown />} />
    </Routes>
  );
}
