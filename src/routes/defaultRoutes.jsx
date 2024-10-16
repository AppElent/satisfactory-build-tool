import SignIn from '../pages/default/SignIn';

const defaultRoutes = [
  {
    path: 'terms',
    element: <div>Terms and conditions</div>,
  },
  {
    path: 'privacy',
    element: <div>Privacy</div>,
  },
  {
    path: 'login',
    element: <SignIn mode="signin" />,
  },
  {
    path: 'signup',
    element: <SignIn mode="signup" />,
  },
];

export default defaultRoutes;
