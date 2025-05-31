import { useNavigate } from "react-router";
import useAuth from "../../components/hooks/useAuth";
import AccountBlocked from "../../components/AccountBlocked/AccountBlocked";
// import { useEffect } from "react";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  //   const { userType } = user;
  //   console.log(isBlocked);
  if (!loading && user && user?.isVerified && user?.userType === "user") {
    return children;
  } else if (!loading && user?.isBlocked) {
    return <AccountBlocked />;
  } else if (!loading && !user) {
    navigate("/login");
  }

  //   useEffect(() => {
  //     if (!loading && !user) {
  //       navigate("/login");
  //     } else if (
  //       !loading &&
  //       user &&
  //       user?.isVerified &&
  //       user?.userType === "user"
  //     ) {
  //       return children;
  //     } else if (!loading && user?.isBlocked) {
  //       return <AccountBlocked />;
  //     }
  //   }, [user, loading, children, navigate]);
};

export default PrivateRoute;
