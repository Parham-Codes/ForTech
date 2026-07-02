import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

function AdminProtectedRoute() {
  const { user } = useAuth();

  if (!user) {
    toast.error('ابتدا لاگین کنید')
    return <Navigate to="/login" replace />;
  }

  if (user.role !== "admin") {
    toast.error('دسترسی غیر مجاز')
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export default AdminProtectedRoute;
