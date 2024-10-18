import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { Home } from '../Pages/Home';
import { Login } from '../Pages/Login';
import { Details } from '../Pages/Details';
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
      path: '/details',
      element: <Details />,
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
