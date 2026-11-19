import { RouterProvider } from 'react-router-dom';
import routes from '../utils/useRoutes';
import { SessionContextProvider } from '../context/SessionContext';

function App() {
  return (
    <SessionContextProvider>
      <RouterProvider router={routes} />
    </SessionContextProvider>
  );
}

export default App;
