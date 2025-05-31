import axios from "axios";
import { createContext, useEffect, useState } from "react";
axios.defaults.withCredentials = true;
// eslint-disable-next-line react-refresh/only-export-components
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  // console.log(user);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    // Remove token from localStorage
    localStorage.removeItem("Authorization");

    // Remove token from axios headers
    // axios.defaults.headers.common["Authorization"] = null;

    axios
      .patch(
        `${import.meta.env.VITE_API_URL}/user/logout`,
        { user },
        { withCredentials: true }
      )
      .then((response) => {
        console.log(response);
        {
          if (response.data.success) {
            setUser(null);
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
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
      .catch(() => {
        setUser(null);
        setLoading(false);
      });
  }, []);

  const contextData = { loading, setLoading, user, login, logout, setUser };

  return (
    <UserContext.Provider value={contextData}>{children}</UserContext.Provider>
  );
};
