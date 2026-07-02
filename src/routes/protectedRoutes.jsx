import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

function ProtectedRoute() {
  const { user } = useAuth();


  if (!user) {
    toast.error("لطفا ابتدا وارد حساب کاربری خود شوید");
    return <Navigate to="/login" replace />;
  }


  return <Outlet />;
}

export default ProtectedRoute;
