import { Outlet } from 'react-router-dom';
import './App.css';
import Dashboard from './Dashboard';
//import MainLayout from './layouts/main/Layout';
import PaperbaseLayout from './layouts/paperbase/Layout';
import { Suspense } from 'react';
import { db } from './libs/firebase';
import AuthGuard from './guards/auth-guard';
import RecipeProductDialog from './components/satisfactory/recipe-product-list/recipe-product-dialog';
import { FirebaseDataSource } from './libs/data-sources';
import theme from './theme/paperbase/theme';
import { FirebaseAuthProvider } from './libs/auth';
import FirebaseDataSourceNoRealtime from './libs/data-sources/data-sources/FirebaseDataSourceNoRealtime';
import config, { setConfig } from './config';

// export const OPTIONS = {
//   data: {
//     title: 'Satisfactory Build Tool',
//     subtitle: 'Making Satisfactory easy again',
//     plan: 'PRO',
//     version: 'v0.0.1',
//     copyright: 'AppElent',
//     url: 'satisfactory.appelent.com',
//     stagingUrl: 'satisfactory-stg.appelent.com',
//     loginRedirect: '/',
//     backend: 'https://api.appelent.com',
//     logo: {
//       big: <img src={'/assets/satisfactory/icon.png'} />,
//       icon: '/location',
//     },
//   },
//   httpsRedirect: !import.meta.env.DEV && window.location.hostname !== 'localhost',
//   redirectFromRoot: '/satisfactory', //false, //or location, e.g. /app
//   logLevel: 'info',
//   confirmationDialogOptions: {
//     confirmationButtonProps: { variant: 'contained', autoFocus: true },
//     cancellationButtonProps: { variant: 'outlined', color: 'error' },
//   },
//   config: { auth: { redirectAfterLogin: '/', redirectAfterLogout: '/' } },
//   menu: config.menu,
//   // [
//   //   {
//   //     id: 'Satisfactory',
//   //     children: [
//   //       {
//   //         id: 'Calculations',
//   //         icon: <AssignmentRoundedIcon />,
//   //         href: '/satisfactory/calculations',
//   //       },
//   //       { id: 'Raw data', icon: <AssignmentRoundedIcon />, href: '/satisfactory/rawdata' },
//   //       { id: 'Products', icon: <AssignmentRoundedIcon />, href: '/satisfactory/products' },
//   //       { id: 'Recipes', icon: <AssignmentRoundedIcon />, href: '/satisfactory/recipes' },
//   //       { id: 'Tier Layout', icon: <AssignmentRoundedIcon />, href: '/satisfactory/tierlayout' },
//   //       {
//   //         id: 'Recipe selector',
//   //         icon: <AssignmentRoundedIcon />,
//   //         href: '/satisfactory/recipeselector',
//   //       },
//   //       {
//   //         id: 'Factory calculator',
//   //         icon: <AssignmentRoundedIcon />,
//   //         href: '/satisfactory/factorycalculator',
//   //       },
//   //       // { id: 'Storage', icon: <AssignmentRoundedIcon /> },
//   //       // { id: 'Hosting', icon: <AssignmentRoundedIcon /> },
//   //       // { id: 'Functions', icon: <AssignmentRoundedIcon /> },
//   //       // {
//   //       //   id: 'Machine learning',
//   //       //   icon: <AssignmentRoundedIcon />,
//   //       // },
//   //     ],
//   //   },
//   //   {
//   //     id: 'Settings',
//   //     children: [
//   //       { id: 'Profile', icon: <PeopleIcon /> },
//   //       { id: 'Settings', icon: <PeopleIcon /> },
//   //       { id: 'Account', icon: <PeopleIcon />, href: '/app/account' },
//   //     ],
//   //   },
//   // ],
//   dropdown: {
//     Production: [{ title: 'Satisfactory tools', subtitle: 'Helpful app' }],
//     Development: [{ title: 'Satisfactory tools dev', subtitle: 'Helpful app' }],
//   },
//   loadComponents: [
//     <RecipeProductDialog
//       type="product"
//       key={1}
//     />,
//     <RecipeProductDialog
//       type="recipe"
//       key={2}
//     />,
//   ],
// };

// if (!OPTIONS.menu.find((item) => item.id === 'Test pages') && import.meta.env.DEV)
//   OPTIONS.menu.push({
//     id: 'Test pages',
//     children: [
//       {
//         id: 'Test data-sources',
//         icon: <PeopleIcon />,
//         href: '/satisfactory/test/data-operations',
//       },
//     ],
//   });

const dataSources = [
  { key: 'dummy', dataSource: new FirebaseDataSource(db, 'dummy') },
  { key: 'dummy2', dataSource: new FirebaseDataSourceNoRealtime(db, 'dummy') },

  // Add more data sources as needed
];

function App() {
  const LayoutSettings = {
    navigation: {},
    notifications: {
      list: () => {},
      add: () => {},
      delete: () => {},
    },
  };

  const Layout = (
    <AuthGuard loginPath="/login">
      <PaperbaseLayout settings={LayoutSettings}>
        <Suspense>
          <Outlet />
        </Suspense>
      </PaperbaseLayout>
    </AuthGuard>
  );

  setConfig({
    env: import.meta.env,
    Layout: Layout,
    componentsToLoad: [
      <RecipeProductDialog
        type="product"
        key={1}
      />,
      <RecipeProductDialog
        type="recipe"
        key={2}
      />,
    ],
  });

  return (
    <>
      <Dashboard
        routes={config.routes}
        options={config}
        dataSources={dataSources}
        authProvider={new FirebaseAuthProvider()}
        theme={theme}
      />
    </>
  );
}

export default App;
