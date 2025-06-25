import { useNavigate } from "react-router";
import useAuth from "../../components/hooks/useAuth";
import AccountBlocked from "../../components/AccountBlocked/AccountBlocked";
import { useEffect } from "react";
// import { useEffect } from "react";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (
      !loading &&
      user &&
      !user?.isBlocked &&
      !user?.isVerified &&
      user?.userType === "user"
    ) {
      navigate("/otp");
    } else if (!loading && !user) {
      navigate("/login");
    }
  }, [user, loading, navigate]);

  if (loading) {
    return <div>Loading...</div>; // or a loading spinner
  }

  if (user?.isBlocked) {
    return <AccountBlocked />;
  }

  if (
    user &&
    !user?.isBlocked &&
    user?.isVerified &&
    user?.userType === "user"
  ) {
    return children;
  } else {
    return null;
  }
};

export default PrivateRoute;
