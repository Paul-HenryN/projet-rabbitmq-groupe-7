import React from "react";
import { AuthContext } from "../context/auth-context";

export default function useAuth() {
  const { user, setUser } = React.useContext(AuthContext);

  return {
    user,
    setUser,
  };
}
