import axios from "axios";
import { createContext, useEffect, useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  console.log(user);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    // Remove token from localStorage
    localStorage.removeItem("Authorization");
    setUser(null);
  };
  useEffect(() => {
    // const token = localStorage.getItem("Authorization");
    // if (token) {
    //   // If token exists, decode it and set user
    //   const userData = JSON.parse(atob(token.split(".")[1]));
    //   //   setUser(userData);
    //   //   console.log(userData);
    // }

    axios
      .get(`${import.meta.env.VITE_API_URL}/user/me`, {
        baseURL: import.meta.env.VITE_API_URL,
        headers: {
          Authorization: localStorage.getItem("Authorization"),
        },
      })
      .then((response) => {
        console.log(response.data);
        setUser(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const contextData = { user, login, logout, setUser };

  return (
    <UserContext.Provider value={contextData}>{children}</UserContext.Provider>
  );
};
