import { Navigate, Outlet } from "react-router-dom"

const ProtectedRoutes = () => {

const session = true



  return session ? <Outlet /> : <Navigate to="/" />
}

export default ProtectedRoutes