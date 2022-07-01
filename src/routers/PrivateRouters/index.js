import { Navigate } from "react-router-dom";

import Admin from "pages/Admin";

const PrivateRoutes = () => {
  return localStorage.getItem("admin") ? <Admin /> : <Navigate to="/" />;
};

export default PrivateRoutes;
