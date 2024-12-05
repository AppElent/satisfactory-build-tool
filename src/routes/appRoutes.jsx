import { Suspense } from 'react';
import Account from '../pages/default/Account';
import { Outlet } from 'react-router-dom';
import DataSources from '../pages/default/test/data-sources';

const appRoutes = [
  {
    path: 'account',
    element: <Account />,
  },
  {
    path: 'settings',
    element: <div></div>,
  },
  {
    path: 'profile',
    element: <div></div>,
  },
  {
    path: 'test',
    element: (
      <Suspense>
        <Outlet />
      </Suspense>
    ),
    children: [
      {
        path: 'data-sources',
        element: <DataSources />,
      },
    ],
  },
];

export default appRoutes;
