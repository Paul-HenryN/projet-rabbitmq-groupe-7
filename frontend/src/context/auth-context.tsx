import React, { useEffect } from "react";
import { Dispatch, SetStateAction, createContext } from "react";
import { User } from "../types/user";
import { axios } from "../lib/axios";

type AuthContextType = {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
});

export default function AuthContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = React.useState<User | null>(
    JSON.parse(localStorage.getItem("user")!) || null
  );

  useEffect(() => {
    axios
      .get<User>("/user")
      .then((response) => {
        if (response.data) {
          setUser(response.data);
          localStorage.setItem("user", JSON.stringify(response.data));
        }
      })
      .catch(() => {
        setUser(null);
        localStorage.removeItem("user");
      });
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
