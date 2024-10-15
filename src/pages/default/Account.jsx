import { Box, Button, Paper } from '@mui/material';
// import { useState } from 'react';
import { useAuth } from '../../libs/auth';
import DefaultPaperbasePage from './DefaultPaperbasePage';

const Account = () => {
  const auth = useAuth();
  console.log(auth);
  return (
    <DefaultPaperbasePage title="Account">
      <Box sx={{ flexGrow: 1 }}>
        {/* <ReactJson
          src={JSON.stringify(getSatisfactoryDataNew())}
          theme="monokai"
        /> */}
        <Paper sx={{ margin: 'auto', overflow: 'hidden', py: 2, px: 2 }}>
          <Button
            onClick={() => {
              auth.signOut();
            }}
          >
            Logout
          </Button>
        </Paper>
      </Box>
    </DefaultPaperbasePage>
  );
};

export default Account;
