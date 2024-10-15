import { Button, Paper } from '@mui/material';
// import { useState } from 'react';
import DefaultPaperbasePage from './default/DefaultPaperbasePage';
import { useContext } from 'react';
import { DataContext } from '../libs/data-sources/DataProvider';

const SatisfactoryHome = () => {
  const context = useContext(DataContext);
  console.log('Data cache', { dataSources: context.dataSources, data: context.data });

  return (
    <DefaultPaperbasePage title="Satisfactory home">
      <Paper sx={{ margin: 'auto', overflow: 'hidden', py: 2, px: 2 }}>
        {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
      </Paper>
    </DefaultPaperbasePage>
  );
};

export default SatisfactoryHome;
