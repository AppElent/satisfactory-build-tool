import { Paper } from '@mui/material';
// import { useState } from 'react';
import DefaultPaperbasePage from './default/DefaultPaperbasePage';
import RecipeSelector from '../components/satisfactory/recipe-selector/recipe-selector';
import useLocalStorage from '../hooks/use-local-storage';

const RecipeSelectorPage = () => {
  const [preferredRecipes, setPreferredRecipes, deletePreferredRecipes] =
    useLocalStorage('preferredrecipes');
  return (
    <DefaultPaperbasePage title="Recipe selector">
      <Paper sx={{ margin: 'auto', overflow: 'hidden', py: 2, px: 2 }}>
        <RecipeSelector
          preferredRecipes={preferredRecipes || []}
          setPreferredRecipes={setPreferredRecipes}
          deletePreferredRecipes={deletePreferredRecipes}
        />
      </Paper>
    </DefaultPaperbasePage>
  );
};

export default RecipeSelectorPage;
