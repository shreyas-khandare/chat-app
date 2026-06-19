import { createContext, useState, useEffect } from "react";

import {
  saveToken,
  getToken,
  saveUser,
  getUser,
  clearStorage,
} from "../utils/storage";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);

  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkLogin();
  }, []);

  const checkLogin = async () => {
    const storedToken = await getToken();

    const storedUser = await getUser();

    if (storedToken && storedUser) {
      setToken(storedToken);

      setUser(storedUser);
    }

    setLoading(false);
  };

  const login = async (jwtToken, userData) => {
    await saveToken(jwtToken);

    await saveUser(userData);

    setToken(jwtToken);

    setUser(userData);
  };

  const logout = async () => {
    await clearStorage();

    setToken(null);

    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token,

        user,

        login,

        logout,

        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}