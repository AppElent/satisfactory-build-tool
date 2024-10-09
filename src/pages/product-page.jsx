import { Box, Paper } from '@mui/material';
// import { useState } from 'react';
import DefaultPaperbasePage from './default/DefaultPaperbasePage';
import RecipeProductList from '../components/satisfactory/recipe-product-list/recipe-product-list';

const ProductPage = () => {
  return (
    <DefaultPaperbasePage title="Products">
      <Box sx={{ flexGrow: 1 }}>
        {/* <ReactJson
          src={JSON.stringify(getSatisfactoryDataNew())}
          theme="monokai"
        /> */}
        <Paper sx={{ margin: 'auto', overflow: 'hidden', py: 2, px: 2 }}>
          <RecipeProductList productOrRecipe={'product'} />
        </Paper>
      </Box>
    </DefaultPaperbasePage>
  );
};

export default ProductPage;
