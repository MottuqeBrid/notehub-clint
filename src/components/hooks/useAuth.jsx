import { use } from "react";
import { UserContext } from "../contextAPI/UserContext";

const useAuth = () => {
  const auth = use(UserContext);
//   console.log(object);
  return auth;
};

export default useAuth;
