import { alpha } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import PropTypes from 'prop-types';
import AppNavbar from './AppNavbar';
import Header from './Header';
import SideMenu from './SideMenu';
import AppTheme from '../../theme/AppTheme';
import {
  chartsCustomizations,
  dataGridCustomizations,
  datePickersCustomizations,
  treeViewCustomizations,
} from '../../theme/customizations';
import { OPTIONS } from '../../App';

const xThemeComponents = {
  ...chartsCustomizations,
  ...dataGridCustomizations,
  ...datePickersCustomizations,
  ...treeViewCustomizations,
};

export default function MainLayout(props) {
  return (
    <>
      <AppTheme
        {...props}
        themeComponents={xThemeComponents}
      >
        <CssBaseline enableColorScheme />
        <Box sx={{ display: 'flex' }}>
          <SideMenu />
          <AppNavbar />
          {/* Main content */}
          <Box
            component="main"
            sx={(theme) => ({
              flexGrow: 1,
              backgroundColor: theme.vars
                ? `rgba(${theme.vars.palette.background.defaultChannel} / 1)`
                : alpha(theme.palette.background.default, 1),
              overflow: 'auto',
              //minWidth: '70vw',
              height: '90vh',
              m: 0,
              p: 0,
            })}
          >
            <Stack
              spacing={2}
              sx={{
                alignItems: 'center',
                justifyContent: 'flex-start',
                mx: 3,
                pb: 10,
                mt: { xs: 8, md: 0 },
              }}
            >
              <Header />
              {OPTIONS?.loadComponents && OPTIONS.loadComponents}
              {props.children}

              {/* <MainGrid /> */}
            </Stack>
          </Box>
        </Box>
      </AppTheme>
    </>
  );
}

MainLayout.propTypes = {
  props: PropTypes.any,
  children: PropTypes.any,
};
