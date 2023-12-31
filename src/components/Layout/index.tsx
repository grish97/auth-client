import { FC } from "react";
import { Outlet } from "react-router-dom";
import "./AuthLayout/style.scss";

const AuthLayout: FC = () => {
  return (
    <div className="auth-layout">
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
