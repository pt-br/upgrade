import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ConfigProvider } from 'antd';

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

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#4b9d2d',
        },
      }}
    >
      <RouterProvider router={router} />
    </ConfigProvider>
  );
};
