import { Suspense } from 'react';
import Account from '../pages/default/Account';
import { Outlet } from 'react-router-dom';
import DataOperationsParent from '../pages/default/test/data-operations';

const appRoutes = [
  {
    path: 'account',
    element: <Account />,
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
        path: 'data-operations',
        element: <DataOperationsParent />,
      },
    ],
  },
];

export default appRoutes;
