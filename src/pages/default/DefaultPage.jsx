import { Box, Container, Typography } from '@mui/material';
import PropTypes from 'prop-types';
// import { useState } from 'react';
import { Seo } from '../../components/default/seo';

const DefaultPage = ({ title, children }) => {
  return (
    <>
      <Seo title={title} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 2,
          minWidth: '100%',
        }}
      >
        <Container maxWidth="xl">
          <Box>
            <div>
              <Typography variant="h4">{title}</Typography>
            </div>
          </Box>
          {children}
        </Container>
      </Box>
    </>
  );
};

DefaultPage.propTypes = {
  title: PropTypes.any,
  children: PropTypes.any,
};

export default DefaultPage;
