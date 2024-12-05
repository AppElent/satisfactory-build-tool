import PeopleIcon from '@mui/icons-material/People';
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';

const menu = [
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
      {
        id: 'Factory calculator',
        icon: <AssignmentRoundedIcon />,
        href: '/satisfactory/factorycalculator',
      },
    ],
  },
  {
    id: 'Settings',
    children: [
      { id: 'Profile', icon: <PeopleIcon />, href: '/app/profile' },
      { id: 'Settings', icon: <PeopleIcon />, href: '/app/settings' },
      { id: 'Account', icon: <PeopleIcon />, href: '/app/account' },
    ],
  },
];

if (!menu.find((item) => item.id === 'Test pages') && import.meta.env.DEV)
  menu.push({
    id: 'Test pages',
    children: [
      {
        id: 'Test data-sources',
        icon: <PeopleIcon />,
        href: '/app/test/data-sources',
      },
    ],
  });

export default menu;
