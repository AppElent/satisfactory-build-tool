import { AppBar, Tab, Tabs } from '@mui/material';
import PropTypes from 'prop-types';

const TabSection = ({ tabs }) => {
  return (
    <AppBar
      component="div"
      position="static"
      elevation={0}
      sx={{ zIndex: 0 }}
    >
      <Tabs
        indicatorColor="primary"
        onChange={tabs.handleTabChange}
        scrollButtons="auto"
        textColor="inherit"
        value={tabs.tab}
        variant="scrollable"
      >
        {tabs.tabsData.map((tab) => (
          <Tab
            key={tab.value}
            label={tab.label}
            value={tab.value}
          />
        ))}
        {/* <Tab label="Users" />
        <Tab label="Sign-in method" />
        <Tab label="Templates" />
        <Tab label="Usage" /> */}
      </Tabs>
    </AppBar>
  );
};

TabSection.propTypes = {
  tabs: PropTypes.any,
};

export default TabSection;
