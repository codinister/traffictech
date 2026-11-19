import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoutes = () => {
  const isLogin = sessionStorage.getItem('login');
  return isLogin ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoutes;
