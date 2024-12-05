import defaultRoutes from '@/routes/defaultRoutes';
import appRoutes from '@/routes/appRoutes';
import Calculations from '@/pages/calculations';
import RawData from '@/pages/rawdata';
import SatisfactoryHome from '@/pages/home';
import RecipePage from '@/pages/recipe-page';
import ProductPage from '@/pages/product-page';
import TierLayout from '@/pages/tier-layout';
import RecipeSelectorPage from '@/pages/recipe-selector-page';
import FactoryCalculator from '@/pages/factory-calculator';

const getRoutes = (Layout) => {
  return [
    ...defaultRoutes,
    {
      path: 'app',
      element: Layout,
      children: [
        {
          index: true,
          element: <div></div>,
        },
        ...appRoutes,
      ],
    },
    {
      path: 'satisfactory',
      element: Layout,
      children: [
        {
          index: true,
          element: <SatisfactoryHome />,
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
        {
          path: 'factorycalculator',
          element: <FactoryCalculator />,
        },
        ...appRoutes,
      ],
    },
  ];
};

export default getRoutes;
