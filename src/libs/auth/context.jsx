import PropTypes from 'prop-types';
import { createContext, useEffect, useReducer, useContext } from 'react';
import { useRouter } from '../../hooks/use-router';

export const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
  raw: null,
};

const AuthContext = createContext({
  ...initialState,
  issuer: 'FIREBASE',
  createUserWithEmailAndPassword: () => Promise.resolve(),
  signInWithEmailAndPassword: () => Promise.resolve(),
  signInWithGoogle: () => Promise.resolve(),
  signOut: () => Promise.resolve(),
});

export const AuthConsumer = AuthContext.Consumer;

export const useAuth = () => useContext(AuthContext);

const reducer = (state, action) => {
  if (action.type === 'AUTH_STATE_CHANGED') {
    const { isAuthenticated, user } = action.payload;

    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user,
    };
  }

  return state;
};

export const AuthProvider = (props) => {
  const { provider, redirectAfterLogout, children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);
  const router = useRouter();

  const handleAuthStateChanged = async (user) => {
    console.log('User authentication changed', { user, provider });
    if (user) {
      // Here you should extract the complete user profile to make it available in your entire app.
      // The auth state only provides basic information.
      dispatch({
        type: 'AUTH_STATE_CHANGED',
        payload: {
          isAuthenticated: true,
          user: await provider.getCurrentUser(),
        },
      });
    } else {
      dispatch({
        type: 'AUTH_STATE_CHANGED',
        payload: {
          isAuthenticated: false,
          user: null,
        },
      });
      router.replace(redirectAfterLogout);
    }
  };

  useEffect(() => provider.onAuthStateChanged(handleAuthStateChanged)(), [provider]);

  // const _signInWithEmailAndPassword = async (email, password) => {
  //   await signInWithEmailAndPassword(auth, email, password);
  // };

  // const signInWithGoogle = async () => {
  //   const provider = new GoogleAuthProvider();

  //   await signInWithPopup(auth, provider);
  // };

  // const _createUserWithEmailAndPassword = async (email, password) => {
  //   await createUserWithEmailAndPassword(auth, email, password);
  // };

  // const _signOut = async () => {
  //   await signOut(auth);
  // };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        issuer: provider.provider,
        signUp: provider.signUp,
        signInWithEmailAndPassword: provider.signIn,
        signInWithGoogle: provider.signInWithGoogle,
        signOut: provider.signOut,
        provider,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  provider: PropTypes.object.isRequired,
  redirectAfterLogout: PropTypes.string,
  children: PropTypes.node.isRequired,
};
