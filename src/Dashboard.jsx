import { useEffect } from 'react';
import { useRouter } from './hooks/use-router';
import useHttpsRedirect from './hooks/use-https-redirect';
import { useRoutes } from 'react-router-dom';
import { SplashScreen } from './components/default/splash-screen';
import { ConfirmProvider } from 'material-ui-confirm';
import { QueryParamProvider } from 'use-query-params';
import { ReactRouter6Adapter } from 'use-query-params/adapters/react-router-6';
import { AuthConsumer, AuthProvider } from './context/auth';
import PropTypes from 'prop-types';
import { Seo, setPageTitleSuffix } from './components/default/seo';
import { DataFramework } from './libs/data-framework';

const Dashboard = (props) => {
  console.log('Initialize app with props', props);
  // Redirect to HTTPS
  useHttpsRedirect(props?.options?.httpsRedirect);

  // Custom redirect from root page
  const navigate = useRouter();
  useEffect(() => {
    if (props?.options?.redirectFromRoot && window.location.pathname === '/')
      navigate.push(props.options?.redirectFromRoot);
  }, [navigate]);

  // Initialize routes
  const element = useRoutes(props.routes);

  // Set HTML page title suffix
  if (props.options?.data?.title) setPageTitleSuffix(props.options?.data?.title);

  return (
    <>
      <AuthProvider>
        <AuthConsumer>
          {(auth) => {
            console.log(auth);

            // Check if splashscreen should be shown
            const showSlashScreen = !auth.isInitialized;
            if (showSlashScreen) return <SplashScreen />;

            return (
              <DataFramework
                logger={console}
                resources={props.options?.resources}
              >
                <QueryParamProvider adapter={ReactRouter6Adapter}>
                  <ConfirmProvider>
                    <Seo />

                    {element}
                    {/* <pre>{JSON.stringify(props.options, null, 2)}</pre> */}
                  </ConfirmProvider>
                </QueryParamProvider>
              </DataFramework>
            );
          }}
        </AuthConsumer>
      </AuthProvider>
    </>
  );
};

Dashboard.propTypes = {
  options: PropTypes.object,
  routes: PropTypes.array,
};

export default Dashboard;
