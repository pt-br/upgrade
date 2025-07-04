import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { PageWrapper } from '@/components/PageWrapper';

import { UserData } from '@/pages/UserData';
import { MoreInfo } from '@/pages/MoreInfo';
import { Confirmation } from '@/pages/Confirmation';
import { Success } from '@/pages/Success';
import { Error } from '@/pages/Error';

export const App = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <PageWrapper>
          <UserData />
        </PageWrapper>
      ),
    },
    {
      path: '/more-info',
      element: (
        <PageWrapper>
          <MoreInfo />
        </PageWrapper>
      ),
    },
    {
      path: '/confirmation',
      element: (
        <PageWrapper>
          <Confirmation />
        </PageWrapper>
      ),
    },
    {
      path: '/success',
      element: (
        <PageWrapper>
          <Success />
        </PageWrapper>
      ),
    },
    {
      path: '/error',
      element: (
        <PageWrapper>
          <Error />
        </PageWrapper>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
};
