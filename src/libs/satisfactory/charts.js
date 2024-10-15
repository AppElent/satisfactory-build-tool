import { getSatisfactoryData, getSatisfactoryDataArray } from '.';

/**
 *
 * @param {object} recipe Recipe object
 * @param {Array} items
 * @param {Array} machines
 * @returns {string}
 */
export const recipeChart = (recipe, items, machines) => {
  if (!recipe) return '';
  const itemsMin = 60 / recipe.craftTime;
  let graphString = `graph LR;
    ${recipe.slug}([${machines[recipe.producedIn]?.name || 'Workshop'}])`;

  recipe.ingredients.forEach((ingredient) => {
    graphString += `
    ${ingredient.itemClass}[${ingredient.quantity} x ${items[ingredient.itemClass]?.name}] -->|${
      ingredient.quantity * itemsMin
    } p.m.| ${recipe.slug}`;
  });

  recipe.products.forEach((product) => {
    graphString += `
    ${recipe.slug} -->|${product.quantity * itemsMin} p.m.| ${product.itemClass}[${
      product.quantity
    } x ${items[product.itemClass]?.name}]
    `;
  });
  console.log(graphString);
  return graphString;
};

export const createRecipeChartObject = (products, version, options = {}) => {
  const { showDetails } = options;
  const recipeArray = getSatisfactoryDataArray('recipes', version);
  const productsArray = getSatisfactoryDataArray('items', version);
  const machines = getSatisfactoryData('buildables', version);
  const resources = getSatisfactoryData('resources', version);
  const result = { nodes: {}, edges: [], output: [], orphans: [] };
  products.forEach((p) => {
    result.nodes[p.className] = { name: p.name, type: 'product' };
    result.output.push(p.className);
    const defaultRecipe = recipeArray.find(
      (r) =>
        !resources[p.className] &&
        !r.isAlternate &&
        r.products.find((rp) => rp.itemClass === p.className)
    );
    if (defaultRecipe) {
      const itemsMin = 60 / defaultRecipe.craftTime;

      // if TYPE is not simple, also add recipe
      if (showDetails) {
        result.nodes[defaultRecipe.className] = {
          name: `${machines[defaultRecipe.producedIn]?.name || 'Workbench'} (${defaultRecipe.craftTime}sec)`,
          type: 'recipe',
        };
      }

      defaultRecipe.ingredients.forEach((i) => {
        const productObject = productsArray.find((p2) => p2.className === i.itemClass);
        result.nodes[i.itemClass] = { name: productObject.name, type: 'product' };
        if (!showDetails) {
          result.edges.push({
            from: i.itemClass,
            to: p.className,
          });
        } else {
          result.edges.push({
            from: i.itemClass,
            to: defaultRecipe.className,
            text: `${i.quantity} (${i.quantity * itemsMin} p.m.)`,
          });
        }
      });
      if (showDetails) {
        defaultRecipe.products.forEach((i) => {
          const productObject = productsArray.find((p2) => p2.className === i.itemClass);
          result.nodes[i.itemClass] = { name: productObject.name, type: 'product' };
          result.edges.push({
            from: defaultRecipe.className,
            to: i.itemClass,
            text: `${i.quantity} (${i.quantity * itemsMin} p.m.)`,
          });
        });
      }
    }
  });
  Object.keys(result.nodes).forEach((orphanKey) => {
    const found = result.edges.find((e) => e.from === orphanKey || e.to === orphanKey);
    if (!found) {
      result.orphans.push(orphanKey);
    }
  });

  return result;
};

export const createChartByObject = (object, options) => {
  let graphString = `%%{init: { "flowchart": { "useWidth": 300} } }%%
  
    graph LR;
    
    %% options %%
    classDef output fill:#0f0
    
    %% create nodes %%
    subgraph Legend
    output[/Output/]:::output
    recipe([Recipe/machine])
    input[Input]
    end`;
  Object.entries(object.nodes).forEach(([nodeId, value]) => {
    if (value.type === 'recipe') {
      graphString += `
    ${nodeId}(["${value.name}"])`;
    } else {
      if (options?.showOrphans || !object.orphans.includes(nodeId)) {
        if (object.output.includes(nodeId)) {
          graphString += `
      ${nodeId}[/"${value.name}"/]:::output`;
        } else {
          graphString += `
      ${nodeId}["${value.name}"]`;
        }
      }
    }
  });
  graphString += `
    %% create edges %%`;
  object.edges.forEach((edge) => {
    if (edge.text) {
      graphString += `
      ${edge.from}-->|"${edge.text}"|${edge.to}`;
    } else {
      graphString += `
      ${edge.from}-->${edge.to}`;
    }
  });
  if (object.orphans.length > 0 && options?.showOrphans) {
    graphString += `
      subgraph Products w/o recipe`;
    object.orphans.forEach((or) => {
      graphString += `
        ${or}[/"${object.nodes[or].name}"/]:::output`;
    });
    graphString += `
    end`;
  }
  return graphString;
};
