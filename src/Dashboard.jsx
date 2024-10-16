import { useEffect } from 'react';
import { useRouter } from './hooks/use-router';
import useHttpsRedirect from './hooks/use-https-redirect';
import { useRoutes } from 'react-router-dom';
import { SplashScreen } from './components/default/splash-screen';
import { ConfirmProvider } from 'material-ui-confirm';
import { QueryParamProvider } from 'use-query-params';
import { ReactRouter6Adapter } from 'use-query-params/adapters/react-router-6';
//import { AuthConsumer, AuthProvider } from './context/auth';
import PropTypes from 'prop-types';
import { Seo, setPageTitleSuffix } from './components/default/seo';
import IssueDialog from './components/default/issue-dialog';
import useDialog from './hooks/use-dialog';
import { OPTIONS } from './App';
import { DataProvider } from './libs/data-sources';
import { AuthConsumer, AuthProvider } from './libs/auth';
import { ThemeProvider } from '@mui/material';

const Dashboard = (props) => {
  // Initialize logger
  // logger(import.meta.env.DEV);
  //const [debug, , forceLog] = useLogger(import.meta.env.DEV);
  //forceLog.log('Debug mode: ' + debug);

  console.log('Initialize app with props', props);
  // Redirect to HTTPS
  useHttpsRedirect(props?.options?.httpsRedirect);

  // Issue dialog
  const dialog = useDialog();
  OPTIONS.issueDialogOpen = dialog.setDialogOpen;

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
      <ThemeProvider theme={props.theme}>
        <AuthProvider
          provider={props.authProvider}
          redirectAfterLogout={props.options?.config?.auth?.redirectAfterLogout || '/'}
        >
          <AuthConsumer>
            {(auth) => {
              // Check if splashscreen should be shown
              const showSlashScreen = !auth.isInitialized;
              if (showSlashScreen) return <SplashScreen />;

              return (
                // <DataFramework
                //   logger={console}
                //   resources={props.options?.resources}
                // >
                <DataProvider dataSources={props.dataSources}>
                  <QueryParamProvider adapter={ReactRouter6Adapter}>
                    <ConfirmProvider>
                      <Seo />
                      <IssueDialog
                        onSave={(values) => console.log(values)}
                        open={dialog.open}
                        onClose={() => dialog.setDialogOpen(false)}
                      />

                      {element}
                      {/* <pre>{JSON.stringify(props.options, null, 2)}</pre> */}
                    </ConfirmProvider>
                  </QueryParamProvider>
                </DataProvider>
                // </DataFramework>
              );
            }}
          </AuthConsumer>
        </AuthProvider>
      </ThemeProvider>
    </>
  );
};

Dashboard.propTypes = {
  options: PropTypes.object,
  theme: PropTypes.any.isRequired,
  routes: PropTypes.array,
  dataSources: PropTypes.array,
  authProvider: PropTypes.any,
};

export default Dashboard;
