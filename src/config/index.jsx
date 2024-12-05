import { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import menu from './menu';
import getRoutes from './routes';

const config = {
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
      big: '/assets/satisfactory/icon.png',
      icon: '/location',
    },
    index: '/satisfactory',
  },
  settings: {
    httpsRedirect: !import.meta.env.DEV && window.location.hostname !== 'localhost',
    redirectFromRoot: '/satisfactory', //false, //or location, e.g. /app
    logLevel: 'info',
    confirmationDialogOptions: {
      confirmationButtonProps: { variant: 'contained', autoFocus: true },
      cancellationButtonProps: { variant: 'outlined', color: 'error' },
    },
  },
  auth: {
    redirectAfterLogin: '/',
    redirectAfterLogout: '/',
  },
  menu,
  routes: [],
  custom: {
    LoadComponents: undefined, // array of components to load in layout
  },
};

export const setConfig = (props) => {
  const { env, Layout, data, settings, auth, ...rest } = props;

  config.data = {
    ...config.data,
    ...data,
  };
  config.routes = getRoutes(Layout);
  config.settings = {
    ...config.settings,
    ...settings,
  };
  config.custom = {
    ...rest,
  };
  config.auth = {
    ...config.auth,
    ...auth,
  };
};

// export const ConfigContext = createContext({ config });

// export const ConfigContextConsumer = ConfigContext.Consumer;

// export const useConfig = () => useContext(ConfigContext);

// export const ConfigContextProvider = (props) => {
//   const { children } = props;
//   const [config, setConfig] = useState(props);

//   return (
//     <ConfigContext.Provider
//       value={{
//         config,
//         setConfig,
//       }}
//     >
//       {children}
//     </ConfigContext.Provider>
//   );
// };

// ConfigContextProvider.propTypes = {
//   children: PropTypes.node.isRequired,
// };

export default config;
