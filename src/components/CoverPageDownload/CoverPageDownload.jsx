import { Link, useLocation } from "react-router";

const CoverPageDownload = () => {
  const location = useLocation();
  console.log(location.state);
  return (
    <div>
      <h1>Download Cover Page</h1>
      <Link className="btn btn-active" to="/cover-page">
        Go back to cover page form
      </Link>
    </div>
  );
};

export default CoverPageDownload;
