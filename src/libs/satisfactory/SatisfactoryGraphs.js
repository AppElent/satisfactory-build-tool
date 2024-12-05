import SatisfactoryData from './SatisfactoryData';
import SatisfactoryMermaidChart from './SatisfactoryMermaidChart';

export default class SatisfactoryGraphs {
  constructor(version) {
    this.version = version;
  }

  setVersion(version) {
    this.version = version;
  }

  createMermaidChartByRecipe(recipe, debug = false) {
    return new SatisfactoryMermaidChart(this.version).createChartByRecipe(recipe, debug);
  }

  createMermaidObject(products, options = {}) {
    const data = new SatisfactoryData(this.version);
    const { showDetails } = options;

    const result = { nodes: {}, edges: [], output: [], orphans: [] };
    products.forEach((p) => {
      result.nodes[p.className] = { name: p.name, type: 'product' };
      result.output.push(p.className);
      const defaultRecipe = data.recipes.find(
        (r) =>
          !data.resources[p.className] &&
          !r.isAlternate &&
          r.products.find((rp) => rp.itemClass === p.className)
      );
      if (defaultRecipe) {
        const itemsMin = 60 / defaultRecipe.craftTime;

        // if TYPE is not simple, also add recipe
        if (showDetails) {
          result.nodes[defaultRecipe.className] = {
            name: `${data.machines[defaultRecipe.producedIn]?.name || 'Workbench'} (${defaultRecipe.craftTime}sec)`,
            type: 'recipe',
          };
        }

        defaultRecipe.ingredients.forEach((i) => {
          const productObject = data.products.find((p2) => p2.className === i.itemClass);
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
            const productObject = data.products.find((p2) => p2.className === i.itemClass);
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
  }

  createMermaidChartByObject(object, options) {
    // object =
    return new SatisfactoryMermaidChart(this.version).createChartByObject(object, options);
  }
}
