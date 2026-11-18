import { createBrowserRouter } from 'react-router-dom';
import Login from '../components/Login';
import Error from '../components/Error';
import ProtectedRoutes from '../components/ProtectedRoutes';
import Dashboard from '../components/Dashboard';

const routes = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
    errorElement: <Error />,
  },
  {
    element: <ProtectedRoutes />, 
    children: [
      {
        element: <Dashboard />,
        path: '/dashboard', 
        errorElement: <Error />
      }
    ]
  }
]);

export default routes;
