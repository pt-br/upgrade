import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { Signup } from '@/pages/signup';

export const App = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Signup />,
    },
    {
      path: '/more-info',
      element: <Signup />,
    },
    {
      path: '/confirmation',
      element: <Signup />,
    },
    {
      path: '/success',
      element: <Signup />,
    },
    {
      path: '/error',
      element: <Signup />,
    },
  ]);

  return <RouterProvider router={router} />;
};
