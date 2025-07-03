import React, { useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { Signup } from '@/pages/signup';
import { MoreInfo } from '@/pages/moreInfo';
import { Confirmation } from '@/pages/confirmation';
import { Success } from '@/pages/success';
import { Error } from '@/pages/error';

export const App = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Signup />,
    },
    {
      path: '/more-info',
      element: <MoreInfo />,
    },
    {
      path: '/confirmation',
      element: <Confirmation />,
    },
    {
      path: '/success',
      element: <Success />,
    },
    {
      path: '/error',
      element: <Error />,
    },
  ]);

  return <RouterProvider router={router} />;
};
