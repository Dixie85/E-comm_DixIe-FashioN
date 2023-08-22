import { useLocation, Navigate, Outlet } from "react-router-dom"
import { useAppSelector } from "../../redux/redux.hooks"
import { selectCurrentToken } from "../../redux/slices/auth/authSlice"

const RequireAuth = () => {
  const location = useLocation()
  const token = useAppSelector(selectCurrentToken)

  return (
    token
      ? <Outlet />
      : <Navigate to="/" state={{ from: location }} replace />
  )  
}

export default RequireAuth