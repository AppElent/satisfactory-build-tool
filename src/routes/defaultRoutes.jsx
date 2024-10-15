import SignIn from '../pages/default/SignIn';
import Auth from '../pages/default/Auth';

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
    path: 'login2',
    element: <Auth loginMode={true} />,
  },
  {
    path: 'signup',
    element: <SignIn mode="signup" />,
  },
];

export default defaultRoutes;
