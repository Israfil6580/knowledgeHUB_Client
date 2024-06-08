import { Navigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import useAdmin from "../Hooks/useAdmin";
import useAuth from "../Hooks/useAuth";

const AdminRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const [isAdmin, isAdminLoading] = useAdmin();
    const location = useLocation();

    if (loading || isAdminLoading) {
        return <progress className="progress w-56" />;
    }

    if (user && isAdmin) {
        return children;
    }

    return <Navigate to="/" state={{ from: location }} replace />;
};

AdminRoute.propTypes = {
    children: PropTypes.node.isRequired
};

export default AdminRoute;
