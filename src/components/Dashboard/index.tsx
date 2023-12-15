import { useEffect } from "react";
import { useAxiosPrivate, useLogout } from "hooks";
import "./style.scss";

export default function Index() {
  const logout = useLogout();
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    axiosPrivate
      .get("/user", {
        withCredentials: true,
      })
      .then(() => {});
  }, []);

  return (
    <div className="dashboard">
      Dashboard
    </div>
  );
}
