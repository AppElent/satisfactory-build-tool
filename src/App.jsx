import { Outlet } from 'react-router-dom';
import PeopleIcon from '@mui/icons-material/People';
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import './App.css';
import Dashboard from './Dashboard';
//import MainLayout from './layouts/main/Layout';
import PaperbaseLayout from './layouts/paperbase/Layout';
import { Suspense } from 'react';
import defaultRoutes from './routes/defaultRoutes';
import appRoutes from './routes/appRoutes';
import { collection } from 'firebase/firestore';
import { db } from './libs/firebase';
import AuthGuard from './guards/auth-guard';
import Calculations from './pages/calculations';
import RawData from './pages/rawdata';
import DefaultPaperbasePage from './pages/default/DefaultPaperbasePage';
import RecipePage from './pages/recipe-page';
import ProductPage from './pages/product-page';
import RecipeProductDialog from './components/satisfactory/recipe-product-list/recipe-product-dialog';
import TierLayout from './pages/tier-layout';
import RecipeSelectorPage from './pages/recipe-selector-page';

export const OPTIONS = {
  data: {
    title: 'Satisfactory Build Tool',
    subtitle: 'Making Satisfactory easy again',
    plan: 'PRO',
    version: 'v0.0.1',
    copyright: 'AppElent',
    url: 'satisfactory.appelent.com',
    stagingUrl: 'satisfactory-stg.appelent.com',
    loginRedirect: '/',
    backend: 'https://api.appelent.com',
    logo: {
      big: <img src={'/assets/satisfactory/icon.png'} />,
      icon: '/location',
    },
  },
  httpsRedirect: !import.meta.env.DEV && window.location.hostname !== 'localhost',
  redirectFromRoot: '/satisfactory', //false, //or location, e.g. /app
  logLevel: 'info',
  confirmationDialogOptions: {
    confirmationButtonProps: { variant: 'contained', autoFocus: true },
    cancellationButtonProps: { variant: 'outlined', color: 'error' },
  },
  config: { auth: { redirectAfterLogin: '/app', redirectAfterLogout: '/' } },
  menu: [
    {
      id: 'Satisfactory',
      children: [
        {
          id: 'Calculations',
          icon: <AssignmentRoundedIcon />,
          href: '/satisfactory/calculations',
        },
        { id: 'Raw data', icon: <AssignmentRoundedIcon />, href: '/satisfactory/rawdata' },
        { id: 'Products', icon: <AssignmentRoundedIcon />, href: '/satisfactory/products' },
        { id: 'Recipes', icon: <AssignmentRoundedIcon />, href: '/satisfactory/recipes' },
        { id: 'Tier Layout', icon: <AssignmentRoundedIcon />, href: '/satisfactory/tierlayout' },
        {
          id: 'Recipe selector',
          icon: <AssignmentRoundedIcon />,
          href: '/satisfactory/recipeselector',
        },
        // { id: 'Storage', icon: <AssignmentRoundedIcon /> },
        // { id: 'Hosting', icon: <AssignmentRoundedIcon /> },
        // { id: 'Functions', icon: <AssignmentRoundedIcon /> },
        // {
        //   id: 'Machine learning',
        //   icon: <AssignmentRoundedIcon />,
        // },
      ],
    },
    {
      id: 'Settings',
      children: [
        { id: 'Profile', icon: <PeopleIcon /> },
        { id: 'Settings', icon: <PeopleIcon /> },
        { id: 'Account', icon: <PeopleIcon />, href: '/satisfactory/account' },
      ],
    },
  ],
  // {
  //   main: [
  //     { text: 'Home', icon: <HomeRoundedIcon />, href: '/satisfactory' },
  //     {
  //       text: 'Games',
  //       icon: <AssignmentRoundedIcon />,
  //       href: '/satisfactory/games',
  //     },
  //     {
  //       text: 'Products',
  //       icon: <AssignmentRoundedIcon />,
  //       href: '/satisfactory/products',
  //     },
  //     {
  //       text: 'Recipes',
  //       icon: <AssignmentRoundedIcon />,
  //       href: '/satisfactory/recipes',
  //     },
  //     {
  //       text: 'Calculations',
  //       icon: <AssignmentRoundedIcon />,
  //       href: '/satisfactory/calculations',
  //     },
  //   ],
  // },
  dropdown: {
    Production: [{ title: 'Satisfactory tools', subtitle: 'Helpful app' }],
    Development: [{ title: 'Satisfactory tools dev', subtitle: 'Helpful app' }],
  },
  loadComponents: [
    <RecipeProductDialog
      type="product"
      key={1}
    />,
    <RecipeProductDialog
      type="recipe"
      key={2}
    />,
  ],
};

const resources = [
  {
    name: 'test01',
    key: 'testkey',
    loadData: true,
    options: {
      dataProviderName: 'localStorage',
    },
  },
  {
    name: 'dummy01',
    options: {
      collection: collection(db, 'dummy'),
      dataProviderName: 'firestore',
    },
  },
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

  const routes = [
    ...defaultRoutes,
    {
      path: 'satisfactory',
      element: (
        <AuthGuard loginPath="/login">
          <PaperbaseLayout settings={LayoutSettings}>
            <Suspense>
              <Outlet />
            </Suspense>
          </PaperbaseLayout>
        </AuthGuard>
      ),
      children: [
        {
          index: true,
          element: <DefaultPaperbasePage title="Overview" />,
        },
        // {
        //   path: 'account',
        //   element: <Account />,
        // },
        {
          path: 'calculations',
          element: <Calculations />,
        },
        {
          path: 'rawdata',
          element: <RawData />,
        },
        {
          path: 'recipes',
          element: <RecipePage />,
        },
        {
          path: 'products',
          element: <ProductPage />,
        },
        {
          path: 'tierlayout',
          element: <TierLayout />,
        },
        {
          path: 'recipeselector',
          element: <RecipeSelectorPage />,
        },
        ...appRoutes,
      ],
    },
  ];

  return (
    <>
      <Dashboard
        routes={routes}
        resources={resources}
        options={OPTIONS}
      />
    </>
  );
}

export default App;
