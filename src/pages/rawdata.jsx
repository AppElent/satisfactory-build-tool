import { Box, Divider, Paper, Typography } from '@mui/material';
// import { useState } from 'react';
import { getSatisfactoryData } from '../libs/satisfactory';
import JsonViewer from '@andypf/json-viewer/dist/esm/react/JsonViewer';
import DefaultPaperbasePage from './default/DefaultPaperbasePage';

const RawData = () => {
  return (
    <DefaultPaperbasePage title="Raw data">
      <Box sx={{ flexGrow: 1 }}>
        {/* <ReactJson
          src={JSON.stringify(getSatisfactoryDataNew())}
          theme="monokai"
        /> */}
        <Paper sx={{ margin: 'auto', overflow: 'hidden', py: 2, px: 2 }}>
          <Typography variant="h5">Browse raw Satisfactory data</Typography>
          <Divider />
          <JsonViewer data={JSON.stringify(getSatisfactoryData())} />
        </Paper>
      </Box>
    </DefaultPaperbasePage>
  );
};

export default RawData;
