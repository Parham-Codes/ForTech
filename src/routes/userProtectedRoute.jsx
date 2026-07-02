import toast from "react-hot-toast"
import { useAuth } from "../context/AuthContext"
import { Navigate, Outlet } from "react-router-dom"


function UserProtectedRoute() {

  const { user } = useAuth()
  
  if (!user) {
    toast.error('ابتدا لاگین کنید')
    return <Navigate to='/login' replace />
  }

  return <Outlet />

}

export default UserProtectedRoute