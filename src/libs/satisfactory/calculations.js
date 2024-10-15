import { getSatisfactoryDataArray } from '.';

function calculateFactoryRequirements(recipesToCreate, inputs, resources, preferredRecipes) {
  console.log('Starting calculateFactoryRequirements with:', {
    recipesToCreate,
    inputs,
    resources,
    preferredRecipes,
  });
  const productionRecipes = getSatisfactoryDataArray('recipes');
  const output = {};

  // Helper function to find the preferred recipe
  function getPreferredRecipe(product) {
    console.log(`Searching for preferred recipe for product: ${product}`);
    const preferred = preferredRecipes.find((r) => r.product === product);
    console.log(`Preferred recipe for product ${product}:`, preferred);
    return preferred ? preferred.recipe : null;
  }

  // Helper function to find a recipe by product
  function findRecipeByProduct(product) {
    console.log(`Searching for recipe by product: ${product}`);
    const recipe = productionRecipes.find((r) => r.products.some((p) => p.itemClass === product));
    console.log(`Found recipe for product ${product}:`, recipe);
    return recipe;
  }

  // Recursive function to calculate requirements
  function calculateRequirements(product, amount, machines) {
    console.log(
      `Calculating requirements for product: ${product}, amount: ${amount}, machines: ${machines}`
    );
    let recipe = getPreferredRecipe(product);

    if (!recipe) {
      // Use default recipe if no preferred recipe is found
      recipe = findRecipeByProduct(product);
    }

    if (!recipe) {
      console.error(`No recipe found for product: ${product}`);
      return;
    }

    const craftTime = recipe.craftTime;
    const productionRate = (60 / craftTime) * machines; // items/min

    // Add product to output
    if (!output[product]) {
      output[product] = {
        requiredAmount: 0,
        requiredMachines: 0,
        productionRate: 0,
        ingredients: [],
      };
    }
    output[product].requiredAmount += amount;
    output[product].requiredMachines += machines;
    output[product].productionRate = productionRate;
    output[product].ingredients = recipe.ingredients;

    console.log(`Updated output for product ${product}:`, output[product]);

    // Process ingredients
    recipe.ingredients.forEach((ingredient) => {
      if (!inputs[ingredient.itemClass]) {
        // Recursively calculate requirements for the ingredient
        calculateRequirements(ingredient.itemClass, ingredient.quantity * machines, machines);
      }
    });
  }

  // Iterate over each recipe to create
  recipesToCreate.forEach((recipeToCreate) => {
    console.log('Processing recipe to create:', recipeToCreate);
    const { product, amount, mode, machines } = recipeToCreate;

    if (mode === 'max') {
      // Calculate based on inputs/resources
      // This part would need more detailed logic based on available inputs/resources
    } else if (mode === 'goal') {
      // Calculate based on items/min goal
      calculateRequirements(product, amount, machines);
    }
  });

  console.log('Final output:', output);
  return output;
}

export default calculateFactoryRequirements;
