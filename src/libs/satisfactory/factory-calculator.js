import { useState, useEffect } from 'react';
import { getSatisfactoryDataArray } from '.';

const calculateFactory = (config, logs) => {
  const { recipes, inputs, recipeList, version } = config;
  let result = {
    main: [],
    inputs: {},
    output: {},
    chains: [],
    byProducts: [],
    production: [],
    inputsOutputs: [],
  };
  const recipeArray = getSatisfactoryDataArray('recipes', version);

  //   const calculateMachinesNeeded = (recipe, amount, mode) => {
  //     const ratePerMachine = (recipe.products[0].quantity / recipe.craftTime) * 60; // Per minute
  //     let machines;

  //     if (mode === 'itemsPerMinute') {
  //       machines = amount / ratePerMachine;
  //     } else if (mode === 'machines') {
  //       machines = amount; // Direct machine count input
  //     } else if (mode === 'max') {
  //       // Calculate max production based on inputs
  //       // Custom logic depending on available inputs
  //     }

  //     return machines;
  //   };

  const calculateChain = (recipe, quantity, ingredientList, neededFor) => {
    const addToIngredients = (recipe, product, qty, neededFor2) => {
      const newNeededFor = neededFor2 || neededFor;
      const existing = ingredientList.find((c) => c.recipe === recipe);
      logs.push(`addToChain: ${recipe} ${qty} ${neededFor2}`);
      if (existing) {
        existing.quantity += qty;
        const existingGoal = existing.products.find((r) => r.product === newNeededFor);
        if (existingGoal) {
          existingGoal.quantity += qty;
        } else {
          existing.products.push({ product: newNeededFor, quantity: qty });
        }
      } else {
        ingredientList.push({
          recipe,
          product: product,
          quantity: qty,
          products: [{ product: newNeededFor, quantity: qty }],
        });
      }
    };

    // First, check if there are inputs that satisfy our needs (partly).
    // TODO: Check for inputs, resources, byproducts
    const neededProduct = neededFor;
    const checkForAvailableResources = (recipe, quantity, product) => {
      console.log(
        `Needed product ${[product]} for ${recipe.name} amount ${quantity}`,
        neededProduct
      );
    };
    checkForAvailableResources(recipe, quantity, neededProduct);

    // See if there are other products that have no goal yet and add them to byProducts
    // array if not exists. If it exists, add to quantity
    const addByProducts = (recipe) => {
      const outputProduct = recipe.products.find((p) => p.itemClass === neededFor);
      recipe.products
        .filter((p) => p.itemClass !== neededFor)
        .forEach((product) => {
          const existing = result.byProducts.find((p) => p.product === product.itemClass);
          const byProductQuantity = product.quantity;
          console.log(byProductQuantity, product.quantity, outputProduct.quantity);
          if (existing) {
            existing.quantity += product.quantity * (quantity / outputProduct.quantity);
          } else {
            result.byProducts.push({
              product: product.itemClass,
              quantity: product.quantity * (quantity / outputProduct.quantity),
            });
          }
        });
    };
    addByProducts(recipe);

    // recipe && nedeedFor. ParentProduct = neededFor, childproduct = recipe.ingredients.itemclass

    recipe.ingredients.forEach((ingredient) => {
      const resolvedRecipe = resolveRecipe(ingredient.itemClass, recipeList, recipeArray);
      // Calculate needed quantity based on the recipe's product quantity and the product quantity.
      const outputProduct = recipe.products.find((p) => p.itemClass === neededFor);
      const neededQty = ingredient.quantity * (quantity / outputProduct.quantity);

      if (resolvedRecipe) {
        logs.push(`Need ${neededQty} of ${ingredient.itemClass} for ${recipe.name}`);

        // Add to chain ingredient list
        addToIngredients(resolvedRecipe.className, ingredient.itemClass, neededQty, neededFor);

        // Re-iterate because recipe is found
        calculateChain(resolvedRecipe, neededQty, ingredientList, ingredient.itemClass);
      } else {
        addToIngredients(ingredient.itemClass, ingredient.itemClass, neededQty, neededFor);
        logs.push(`No recipe for ${ingredient.itemClass}, assumed raw resource.`);
      }
    });
  };

  const resolveRecipe = (product) => {
    const defaultRecipes = recipeArray.filter(
      (r) => !r.isAlternate && !r.slug.includes('package-')
    );
    const fixedRecipe = recipeList.find((r) => r.product === product);
    return fixedRecipe
      ? recipeArray.find((r) => (r.className = fixedRecipe.recipe))
      : defaultRecipes.find((r) => r.products.some((p) => p.itemClass === product));
  };

  // we need to sort the recipes on the mode setting, where max is done first and itemsPerMinute last
  recipes.sort((a, b) => (a.mode === 'max' ? -1 : 1));

  // Iterate all the recipes and calculate the chains
  recipes.forEach((recipe) => {
    const resolvedRecipe = resolveRecipe(recipe.product, recipeList, recipeArray);

    if (resolvedRecipe) {
      //const machinesNeeded = calculateMachinesNeeded(resolvedRecipe, recipe.amount, recipe.mode);
      //logs.push(`For ${recipe.product}, need ${machinesNeeded} machines.`);

      const amount = recipe.mode !== 'max' ? recipe.amount : 1;
      const chain = {
        recipe: resolvedRecipe.className,
        product: recipe.product,
        quantity: amount,
        production: [
          {
            recipe: resolvedRecipe.className,
            product: recipe.product,
            quantity: amount,
          },
        ],
      };

      // TODO: check for available products/resources. If available, we dont have to go in nested chain
      calculateChain(resolvedRecipe, amount, chain.production, recipe.product);

      // If mode is set to max, we need to calculate the max amount based on chain (apply multiplier)
      // TODO: Add maximizer function

      //result.main.push({ recipe: resolvedRecipe.slug, machines: machinesNeeded });
      result.chains.push(chain);
    }
  });

  // Merge ingredient lists into totalIngredients array
  const mergeIngredientLists = () => {
    result.chains.forEach((chain) => {
      chain.production.forEach((ingredient) => {
        const existing = result.production.find((i) => i.recipe === ingredient.recipe);
        if (existing) {
          existing.quantity += ingredient.quantity;
          ingredient.products.forEach((product) => {
            const existingProduct = existing.products.find((p) => p.product === product.product);
            if (existingProduct) {
              existingProduct.quantity += product.quantity;
            } else {
              existing.products.push(product);
            }
          });
        } else {
          result.production.push({ ...ingredient });
        }
      });
    });
  };
  mergeIngredientLists();

  // Calculate machines needed for each recipe
  const calculateMachinesNeeded = () => {
    result.production.forEach((ingredient) => {
      const resolvedRecipe = recipeArray.find((r) => r.className === ingredient.recipe);
      if (resolvedRecipe) {
        const outputProduct = resolvedRecipe.products.find(
          (p) => p.itemClass === ingredient.product
        );
        const ratePerMachine = (outputProduct.quantity / resolvedRecipe.craftTime) * 60; // Per minute
        ingredient.machines = ingredient.quantity / ratePerMachine;
      }
    });
  };
  calculateMachinesNeeded();

  // set percentages
  const setProductPercentages = () => {
    result.production.forEach((prod) => {
      if (prod.products) {
        prod.products.forEach((p) => {
          p.percentage = p.quantity / prod.quantity;
        });
      }
    });
  };
  setProductPercentages();

  // Calculate products that are output and input
  const calculateInputOutputProducts = () => {
    result.production.forEach((prod) => {
      const existing = result.inputsOutputs.find((i) => i.product === prod.product);
      if (existing) {
        existing.quantity += prod.quantity;
      } else {
        result.inputsOutputs.push({ product: prod.product, quantity: prod.quantity });
      }
      if (prod.products) {
        prod.products.forEach((p) => {
          const existing = result.inputsOutputs.find((i) => i.product === prod.product);
          if (existing) {
            existing.quantity -= p.quantity;
          } else {
            result.inputsOutputs.push({ product: p.product, quantity: -p.quantity });
          }
        });
      }
      // check if product is a resource
      const isResource = !recipeArray.find((r) =>
        r.products.some((p) => p.itemClass === prod.product)
      );
      if (isResource) {
        const existing = result.inputsOutputs.find((i) => i.product === prod.product);
        if (existing) {
          existing.quantity -= prod.quantity;
        } else {
          result.inputsOutputs.push({ product: prod.product, quantity: -prod.quantity });
        }
      }
      //   const recipeObject = recipeArray.find((r) => r.className === prod.recipe);
      //   if (recipeObject && prod.machines) {
      //     const existing = result.inputsOutputs.find((i) => i.product === prod.product);
      //     const cyclesMin = 60 / recipeObject.craftTime;
      //     recipeObject.ingredients.forEach((ingredient) => {
      //       const existing = result.inputsOutputs.find((i) => i.product === ingredient.itemClass);
      //       if (existing) {
      //         existing.quantity -= ingredient.quantity * cyclesMin * prod.machines;
      //       } else {
      //         result.inputsOutputs.push({
      //           product: ingredient.itemClass,
      //           quantity: -(ingredient.quantity * cyclesMin * prod.machines),
      //         });
      //       }
      //     });
      //   }
    });
  };
  calculateInputOutputProducts();

  return { ...result, logs };
};

const useSatisfactoryCalculator = (
  recipesToProduce,
  inputsProvided,
  recipeList,
  mode,
  productionMode,
  version
) => {
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState([]);
  const [logs, setLogs] = useState([]);
  const [result, setResult] = useState(null);
  const [config, setConfig] = useState({
    recipes: recipesToProduce,
    inputs: inputsProvided,
    recipeList,
    version,
  });

  useEffect(() => {
    try {
      setLoading(true);
      setLogs([]);

      const output = calculateFactory(config, logs);

      setResult(output);
    } catch (error) {
      setErrors([...errors, error.message]);
      setLogs([...logs, error.message]);
    } finally {
      setLoading(false);
    }
  }, [config]);

  return { loading, errors, logs, result, config, setConfig };
};

export default useSatisfactoryCalculator;
