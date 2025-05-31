import { useNavigate } from "react-router";
import useAuth from "../../components/hooks/useAuth";

const PublicRoute = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  //   const { userType } = user;
  //   console.log(isBlocked);
  if (user) {
    return navigate("/dashboard");
  } else {
    return navigate("/login");
  }
};

export default PublicRoute;
