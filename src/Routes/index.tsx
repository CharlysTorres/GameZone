import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { Login } from '../Pages/Login';
import { Home } from '../Pages/Home';
import { Leaderboard } from '../Pages/Leaderboard';

interface RouterProps {
  isLogged?: boolean;
}

export function Router({isLogged}: RouterProps) {
  const router = createBrowserRouter([
    {
      path: '/',
      element: isLogged ? <Home /> : <Login />,
    },
    {
      path: 'leaderboard',
      element: <Leaderboard />,
    },
    {
      path: '*',
      element: <h1>Page Not Found</h1>,
    }
  ]);
  return (
    <RouterProvider router={router} />
  );
}
