import { Outlet } from "react-router-dom";
import AuthContextProvider from "../context/auth-context";
import "../index.css";

export default function Root() {
  return (
    <AuthContextProvider>
      <Outlet />
    </AuthContextProvider>
  );
}
