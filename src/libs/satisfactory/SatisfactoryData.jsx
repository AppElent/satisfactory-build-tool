import buildableRecipes_v700 from './data/v700/buildableRecipes.json';
import buildables_v700 from './data/v700/buildables.json';
import items_v700 from './data/v700/items.json';
import productionRecipes_v700 from './data/v700/productionRecipes.json';
import resources_v700 from './data/v700/resources.json';
import schematics_v700 from './data/v700/schematics.json';
import tierList_v700 from './data/v700/tierList.json';
import buildableRecipes_v800 from './data/v800/buildableRecipes.json';
import buildables_v800 from './data/v800/buildables.json';
import items_v800 from './data/v800/items.json';
import productionRecipes_v800 from './data/v800/productionRecipes.json';
import resources_v800 from './data/v800/resources.json';
import schematics_v800 from './data/v800/schematics.json';
import buildableRecipes_v1000 from './data/v800/buildableRecipes.json';
import buildables_v1000 from './data/v800/buildables.json';
import items_v1000 from './data/v800/items.json';
import productionRecipes_v1000 from './data/v800/productionRecipes.json';
import resources_v1000 from './data/v800/resources.json';
import schematics_v1000 from './data/v800/schematics.json';

import data_v1000 from './data/v1000/data.json';
import SatisfactoryDataType from './SatisfactoryDataType';

const satisfactory_data = {
  v600: {
    items: [],
    buildables: [],
    buildableRecipes: [],
    recipes: [],
    resources: [],
    schematics: [],
    tierList: [],
  },
  v700: {
    items: items_v700,
    buildables: buildables_v700,
    buildableRecipes: buildableRecipes_v700,
    recipes: productionRecipes_v700,
    resources: resources_v700,
    schematics: schematics_v700,
    tierList: tierList_v700,
  },
  v800: {
    items: items_v800,
    buildables: buildables_v800,
    buildableRecipes: buildableRecipes_v800,
    recipes: productionRecipes_v800,
    resources: resources_v800,
    schematics: schematics_v800,
    tierList: tierList_v700,
  },
  v1000: {
    items: items_v1000,
    buildables: buildables_v1000,
    buildableRecipes: buildableRecipes_v1000,
    recipes: productionRecipes_v1000,
    resources: resources_v1000,
    schematics: schematics_v1000,
    tierList: tierList_v700,
  },
};

//   const satisfactory_data_new = {
//     v1000: undefined,
//     v800: undefined,
//     v700: undefined,
//     v600: undefined,
//   };

const satisfactoryVersions = [
  {
    label: 'Update 1.0',
    key: 'v1000',
  },
  {
    label: 'Update 8 (Experimental)',
    key: 'v800',
  },
  {
    label: 'Update 7',
    key: 'v700',
  },
  {
    label: 'Update 6',
    key: 'v600',
  },
];

export default class SatisfactoryData {
  constructor(version) {
    this.currentVersion = 'v1000';
    this.setVersion(version || this.currentVersion);
  }

  setVersion(version) {
    if (!satisfactoryVersions.find((v) => v.key === version)) {
      throw new Error('Version not found');
    }
    this.version = version;
    this.versionLabel = satisfactoryVersions.find((v) => v.key === version).label;
    this.recipes = this.getDataArray('recipes', version);
    this.products = this.getDataArray('items', version);
    this.machines = this.getDataArray('buildables', version);
    this.resources = this.getDataArray('resources', version);
    this.schematics = this.getDataArray('schematics', version);
    this.recipesTest = new SatisfactoryDataType('recipes', this.getData('recipes', version));
  }

  getVersions() {
    return satisfactoryVersions;
  }

  getItemByKey(type, key) {
    return this[type]?.find((item) => item.className === key);
  }

  getData(type) {
    const keynames = Object.keys(satisfactory_data[this.version].items);
    data_v1000.items.forEach((item) => {
      const foundItem = keynames.find(
        (key) => satisfactory_data[this.version].items[key]?.name === item.name
      );

      if (foundItem) {
        satisfactory_data[this.version].items[foundItem].tier = item.tier;
      }
    });
    data_v1000.fluids.forEach((item) => {
      const foundItem = keynames.find(
        (key) => satisfactory_data[this.version].items[key]?.name === item.name
      );

      if (foundItem) {
        satisfactory_data[this.version].items[foundItem].tier = item.tier;
      }
    });
    satisfactory_data[this.version].tierList.forEach((item) => {
      const foundItem = Object.keys(satisfactory_data[this.version].recipes).find(
        (key) => satisfactory_data[this.version].recipes[key]?.name === item.name
      );

      if (foundItem) {
        satisfactory_data[this.version].items[foundItem].rating = item.tier;
      }
    });

    if (!type) {
      return satisfactory_data[this.version] || satisfactory_data[this.version];
    }
    return satisfactory_data[this.version][type] || satisfactory_data[this.version][type];
  }

  getDataArray(type) {
    const items = this.getData(type);
    let array = Object.keys(items).map((k) => ({
      ...items[k],
      className: k,
    }));
    return array;
  }

  resolveRecipe(product, recipeList = []) {
    // Check if product is a resource. If so, return undefined
    if (this.resources.find((r) => r.className === product)) return undefined;
    // Get a list of default recipes excluding alternate recipes and package recipes
    const defaultRecipes = this.recipes.filter(
      (r) => !r.isAlternate && !r.slug.includes('package-')
    );
    // Check input object to see if there is a preferred recipe
    const fixedRecipe = recipeList.find((r) => r.product === product);
    return fixedRecipe
      ? this.recipes.find((r) => (r.className = fixedRecipe.recipe))
      : defaultRecipes.find((r) => r.products.some((p) => p.itemClass === product));
  }

  isResource(product) {
    return this.resources.find((r) => r.className === product);
  }

  getEndProducts = () => {
    return this.products.filter(
      (p) =>
        !p.isEquipment &&
        p.tier !== undefined &&
        p.tier !== 11 && // ammo
        !this.recipes
          .filter((recipe) => !recipe.isAlternate) // also include alternates?
          .find((r) => r.ingredients.find((i) => i.itemClass === p.className))
    );
  };
}
