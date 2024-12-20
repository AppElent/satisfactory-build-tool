import PropTypes from 'prop-types';
import { useCallback, useEffect, useState } from 'react';
import { useAuth } from '../libs/auth';
import { useRouter } from '../hooks/use-router';

const AuthGuard = (props) => {
  const { loginPath, children } = props;
  const router = useRouter();
  const { isAuthenticated, issuer } = useAuth();
  const [checked, setChecked] = useState(false);

  const check = useCallback(() => {
    if (!isAuthenticated && window.location.pathname !== loginPath) {
      const searchParams = new URLSearchParams({ returnTo: window.location.pathname }).toString();
      const href = loginPath + `?${searchParams}`;
      router.replace(href);
    } else {
      setChecked(true);
    }
  }, [isAuthenticated, issuer, router]);

  // Only check on mount, this allows us to redirect the user manually when auth state changes
  useEffect(
    () => {
      check();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  if (!checked) {
    return null;
  }

  // If got here, it means that the redirect did not occur, and that tells us that the user is
  // authenticated / authorized.

  return <>{children}</>;
};

export default AuthGuard;

AuthGuard.propTypes = {
  children: PropTypes.node,
  loginPath: PropTypes.string,
};
