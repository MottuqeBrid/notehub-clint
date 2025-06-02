import axios from "axios";
import { createContext, useCallback, useEffect, useState } from "react";
axios.defaults.withCredentials = true;
// eslint-disable-next-line react-refresh/only-export-components
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = useCallback(() => {
    // Remove token from localStorage
    localStorage.removeItem("Authorization");
    axios
      .patch(
        `${import.meta.env.VITE_API_URL}/user/logout`,
        { user },
        { withCredentials: true }
      )
      .then((response) => {
        console.log(response);
        if (response.data.success) {
          setUser(null);
        }
      })
      // eslint-disable-next-line no-unused-vars
      .catch((err) => {
        // console.log(err);
      });
  }, [user]);
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/user/me`, {
        withCredentials: true,
      })
      .then((response) => {
        if (response.data.success === false) {
          setUser(null);
          setLoading(false);
          return;
        }
        setUser(response.data.user);
        setLoading(false);
      })
      .catch((err) => {
        // console.log(err);
        if (
          (err.response && err.response.status === 401) ||
          err.response.status === 403 ||
          err.response.status === 400
        ) {
          // User is not authenticated
          logout();
          setUser(null);
        }
        setLoading(false);
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const contextData = { loading, setLoading, user, login, logout, setUser };

  return (
    <UserContext.Provider value={contextData}>{children}</UserContext.Provider>
  );
};
