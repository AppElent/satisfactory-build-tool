import SatisfactoryData from './SatisfactoryData';
import SatisfactoryMermaidChart from './SatisfactoryMermaidChart';

const RESULT_TEMPLATE = {
  nodesAndEdges: {}, // {product: {nodes: [], edges: []}}
  nodesAndEdgesTotal: { nodes: [], edges: [] }, // {nodes: [], edges: []}
  availableProducts: [], // {product: <string>, amount: <number>}
  production: {}, // {product: {nodes: [], edges: []}}
  productionTotal: { nodes: [], edges: [] }, // {nodes: [], edges: []}
};

const CONFIG_TEMPLATE = {
  autoUpdate: true, // auto update the result
  dirty: false, // check if config has changed
  updateSeconds: 3, // Number of seconds between autoUpdates
  version: new SatisfactoryData().version, // version of the game
  products: [], //  {recipe: <class>, recipe: <class>, amount: <number>, mode:"max/itemsMin", production_mode:"output/produce"} --> items to produce
  inputs: [], // {product: <class>, amount: <number>}
  recipes: [], //  {product: <class>, recipe: <class>}
};

export default class SatisfactoryCalculator {
  constructor(config) {
    this.config = {
      ...CONFIG_TEMPLATE,
      ...config,
    }; // Merge config with template
    this.orderProducts();
    this.version = config.version;
    this.data = new SatisfactoryData(this.version);
    this.result = RESULT_TEMPLATE;
  }

  setVersion(version) {
    if (version !== this.version) {
      this.version = version;
      this.data.setVersion(version);
    }
  }

  updateConfig(config) {
    this.config = {
      ...this.config,
      ...config,
    };
    this.orderProducts();
    //TODO: check if config is dirty and has to be recalculated
  }

  resetConfig() {
    this.config = CONFIG_TEMPLATE;
    //TODO: this.result = RESULT_TEMPLATE;
  }

  orderProducts() {
    // Sort products by 1. mode is set to 'max', 2. production_mode is set to 'produce'
    this.config.products = this.config.products.sort((a, b) => {
      if (a.mode?.toUpperCase() === 'MAX' && b.mode?.toUpperCase() !== 'MAX') return -1;
      if (a.mode?.toUpperCase() !== 'MAX' && b.mode?.toUpperCase() === 'MAX') return 1;
      if (
        a.production_mode?.toUpperCase() === 'PRODUCE' &&
        b.production_mode?.toUpperCase() !== 'PRODUCE'
      )
        return -1;
      if (
        a.production_mode?.toUpperCase() !== 'PRODUCE' &&
        b.production_mode?.toUpperCase() === 'PRODUCE'
      )
        return 1;
      return;
    });
  }

  reset() {
    this.result = RESULT_TEMPLATE;
  }

  resetResultItem(item) {
    return {
      ...this.result,
      [item]: RESULT_TEMPLATE[item],
    };
  }

  getItemByKey(type, key) {
    return this.data?.[type]?.find((item) => item.className === key);
  }

  roundNumber(num, decimals) {
    num = parseFloat(num);
    return +num.toFixed(decimals);
  }

  createElement = (parentElement, id, type, data) => {
    const existing = parentElement[type].find((n) => n.id === id);
    if (id === 'Desc_OreIron_C_-_Recipe_IngotIron_C') {
      console.log(77777, id, type, data, data.itemsPerMinute, parentElement, existing);
    }
    if (!existing) {
      if (type === 'nodes') {
        const objectToAdd = {
          id,
          label: data.rawObject.name,
          type: data.type,
          raw: data.rawObject,
        };
        if (data.type === 'recipe') {
          parentElement[type].push({
            ...objectToAdd,
            machine: data.rawObject.producedIn,
            cyclesMin: 60 / data.rawObject.craftTime,
          });
        } else if (data.type === 'product') {
          parentElement[type].push({
            ...objectToAdd,
          });
        }
      } else if (type === 'edges') {
        parentElement[type].push({
          id,
          ...data,
          //for: data.for ? [data.for] : [],
        });
      }
    } else if (type === 'edges') {
      existing.itemsPerMinute += data.itemsPerMinute;
      //existing.for.push(data.for);
    }
  };

  createNodesAndEdges(product = this.config.products) {
    const _createNodesAndEdges = (product, amount, newObject, upstreamProducts = []) => {
      //helper function to create nodes and edges for a product
      const recipeObject = this.data.resolveRecipe(product, this.config.recipes);
      const ingredientObject = recipeObject.products.find((i) => i.itemClass === product);
      const cyclesMin = 60 / recipeObject.craftTime;
      const productItemsPerMinute = ingredientObject.quantity * (60 / recipeObject.craftTime);
      const itemsPerMinute = amount || productItemsPerMinute;
      //const multiplier = amount || productItemsPerMinute
      const multiplier = itemsPerMinute / productItemsPerMinute;

      const addElement = (id, type, data) => {
        this.createElement(newObject, id, type, data);
      };

      if (recipeObject) {
        addElement(recipeObject.className, 'nodes', {
          type: 'recipe',
          productionType: 'production',
          rawObject: recipeObject,
        });

        // check for products that are output from the recipe
        recipeObject.products.forEach((prod) => {
          addElement(prod.itemClass, 'nodes', {
            type: 'product',
            productionType: 'production',
            rawObject: this.data.products.find((p) => p.className === prod.itemClass),
          });
          addElement(`${recipeObject.className}_-_${prod.itemClass}`, 'edges', {
            source: recipeObject.className,
            target: prod.itemClass,
            byProduct: prod.itemClass !== product,
            itemsPerMinute: prod.quantity * cyclesMin * multiplier, //product.quantity * (60 / recipeObject.craftTime),
          });
        });

        // Check for ingredients and create nodes and edges for them
        if (!upstreamProducts.includes(product)) upstreamProducts.push(product);
        recipeObject.ingredients.forEach((ingredient) => {
          addElement(ingredient.itemClass, 'nodes', {
            type: 'product',
            productionType: 'production',
            rawObject: this.data.products.find((p) => p.className === ingredient.itemClass),
          });

          addElement(`${ingredient.itemClass}_-_${recipeObject.className}`, 'edges', {
            source: ingredient.itemClass,
            target: recipeObject.className,
            //for: product,
            itemsPerMinute: ingredient.quantity * cyclesMin * multiplier,
          });
          const childRecipe = this.data.resolveRecipe(ingredient.itemClass, this.config.recipes);
          if (childRecipe) {
            _createNodesAndEdges(
              ingredient.itemClass,
              ingredient.quantity * cyclesMin * multiplier,
              newObject,
              [...upstreamProducts]
            );
          }
        });
      }
    };

    // Iterate all the edges and see what the ratios are
    // 1. Iterate all edges, 2. see if there are edges with the current target = source, 3. calculate ratio
    const addRatios = (edges) => {
      edges.map((e) => {
        const targetEdges = edges.filter(
          (te) => te.source === e.target && e.target.toUpperCase().startsWith('DESC_')
        );
        if (targetEdges.length > 1) {
          const total = targetEdges.reduce((acc, te) => acc + te.itemsPerMinute, 0);
          e.for = targetEdges.map((te) => ({
            id: te.id,
            ratio: te.itemsPerMinute / total,
          }));
        }
      });
    };

    // {product: <productClass>, amount: <number>}
    // if product is array, create a new object for each product
    if (Array.isArray(product)) {
      //const returnArray = [];
      product.forEach((p) => {
        const newObject = { nodes: [], edges: [] };
        _createNodesAndEdges(p.product, 1, newObject);
        addRatios(newObject.edges);
        this.result.nodesAndEdges[p.product] = newObject;
      });
    } else {
      const newObject = { nodes: [], edges: [] };
      _createNodesAndEdges(product.product, 1, newObject);
      addRatios(newObject.edges);
      this.result.nodesAndEdges[product.product] = newObject;
      return this.result.nodesAndEdges[product.product];
    }
    // Create total list of nodes and edges with all products
    this.merge('nodesAndEdges', 'nodesAndEdgesTotal');

    // Return the result
    return this.result;
  }

  calculateAvailableProducts() {
    // create a list of available products
    this.resetResultItem('availableProducts');
    // Get all inputs from config
    this.config.inputs.forEach((input) => {
      // Add to availableProducts it not already there
      const existingProduct = this.result.availableProducts.find(
        (p) => p.product === input.product && p.type === 'input'
      );
      if (existingProduct) {
        existingProduct.amount += input.amount;
      } else {
        this.result.availableProducts.push({
          product: input.product,
          amount: input.amount,
          type: 'input',
        });
      }
    });
    // all products that have mode set to 'PRODUCE' are available
    this.config.products
      .filter((p) => p.production_mode?.toUpperCase() === 'PRODUCE') // Items with production_mode set to produce
      .forEach((product) => {
        const existingProduct = this.result.availableProducts.find(
          (p) => p.product === product.product && p.type === 'produce'
        );
        if (!existingProduct) {
          this.result.availableProducts.push({
            product: product.product,
            amount: product.amount,
            type: 'produce',
          });
        } else {
          existingProduct.amount += product.amount;
        }
      });
  }

  // applyAmounts() {
  //   // TODO: use available resources (subtract)
  //   // apply amounts to nodes and edges
  //   this.config.products.forEach((product) => {
  //     let multiplier = product.amount;
  //     //const node = this.result.nodesAndEdges[product.product];
  //     // There are several factors influencing the amount: mode set to max, production_mode set to produce, mode set to ouptput
  //     if (product.mode?.toUpperCase() === 'MAX') {
  //       const childProducts = this.result.nodesAndEdges[product.product].nodes.filter(
  //         (p) => p.type === 'product'
  //       );
  //       let leastAmount = 0;
  //       this.config.inputs
  //         .filter((i) => childProducts.find((p) => p.id === i.product))
  //         .forEach((input) => {
  //           const amountNeeded = this.result.nodesAndEdges[product.product].edges.find(
  //             (e) => e.target === input.product
  //           ).itemsPerMinute;
  //           const productMultiplier = input.amount / amountNeeded;
  //           if (leastAmount === 0 || productMultiplier < leastAmount)
  //             leastAmount = productMultiplier;
  //         });
  //       multiplier = leastAmount;
  //     } else if (product.mode?.toUpperCase() === 'MACHINES') {
  //       const recipe = this.data.resolveRecipe(product.product, this.config.recipes);
  //       const cyclesMin = 60 / recipe.craftTime;
  //       const productItemsPerMinute =
  //         recipe.products.find((p) => p.itemClass === product.product).quantity * cyclesMin;
  //       multiplier = product.amount * productItemsPerMinute;
  //     }
  //     this.result.production[product.product].edges.forEach((edge) => {
  //       edge.itemsPerMinute *= multiplier;
  //     });
  //   });
  // }

  calculateMultiplier(product) {
    // TODO: use available resources (subtract)
    // apply amounts to nodes and edges
    let multiplier = product.amount;
    //const node = this.result.nodesAndEdges[product.product];
    // There are several factors influencing the amount: mode set to max, production_mode set to produce, mode set to ouptput
    if (product.mode?.toUpperCase() === 'MAX') {
      const childProducts = this.result.nodesAndEdges[product.product].nodes.filter(
        (p) => p.type === 'product'
      );
      let leastAmount = 0;
      this.config.inputs
        .filter((i) => childProducts.find((p) => p.id === i.product))
        .forEach((input) => {
          const amountNeeded = this.result.nodesAndEdges[product.product].edges.find(
            (e) => e.target === input.product
          ).itemsPerMinute;
          const productMultiplier = input.amount / amountNeeded;
          if (leastAmount === 0 || productMultiplier < leastAmount) leastAmount = productMultiplier;
        });
      multiplier = leastAmount;
    } else if (product.mode?.toUpperCase() === 'MACHINES') {
      const recipe = this.data.resolveRecipe(product.product, this.config.recipes);
      const cyclesMin = 60 / recipe.craftTime;
      const productItemsPerMinute =
        recipe.products.find((p) => p.itemClass === product.product).quantity * cyclesMin;
      multiplier = product.amount * productItemsPerMinute;
    }
    // this.result.production[product.product].edges.forEach((edge) => {
    //   edge.itemsPerMinute *= multiplier;
    // });
    return multiplier;
  }

  createProductionList = () => {
    // Create production list, apply amounts, and use available items
    this.resetResultItem('production');

    const checkAvailableAmount = (product, amount, mainProduct) => {
      let newAmount = amount;
      this.result.availableProducts.map((availableProduct) => {
        if (availableProduct.product === product && newAmount > 0) {
          const resourcesAvailable = availableProduct.amount - (availableProduct.used || 0);
          if (resourcesAvailable >= amount) {
            // add used amount or set if not set
            if (!availableProduct.used) availableProduct.used = 0;
            availableProduct.used += amount;
            newAmount = 0;
          } else if (resourcesAvailable < amount) {
            const usedAmount = resourcesAvailable;
            availableProduct.used = availableProduct.amount;
            newAmount = amount - usedAmount;
          }
          const usedAmount = amount - newAmount;
          if (usedAmount > 0) {
            const nodeId = `${product}-${availableProduct.type}`;
            // Create node if it doesn't exist
            const existingNode = this.result.production[mainProduct].nodes.find(
              (n) => n.id === nodeId
            );
            if (!existingNode) {
              this.createElement(this.result.production[mainProduct], nodeId, 'nodes', {
                type: 'product',
                productionType: availableProduct.type,
                rawObject: this.data.products.find((p) => p.className === product),
              });
            }
            // Create edge if it doesn't exist
            const existingEdge = this.result.production[mainProduct].edges.find(
              (e) => e.id === `${nodeId}-${product}`
            );
            if (!existingEdge) {
              this.createElement(
                this.result.production[mainProduct],
                `${nodeId}-${product}`,
                'edges',
                {
                  source: nodeId,
                  target: product,
                  itemsPerMinute: usedAmount, //product.quantity * (60 / recipeObject.craftTime),
                }
              );
            } else {
              existingEdge.itemsPerMinute += usedAmount;
            }
          }
        }
      });
      return { new: newAmount !== amount ? newAmount : undefined, old: amount };
    };
    Object.keys(this.result.nodesAndEdges).forEach((productKey) => {
      // Copy from nodesAndEdges to production
      this.result.production[productKey] = {
        nodes: JSON.parse(JSON.stringify(this.result.nodesAndEdges[productKey]?.nodes)),
        edges: [],
      };

      // Calculate multiplier
      const configProduct = this.config.products.find((p) => p.product === productKey);
      const multiplier = this.calculateMultiplier(configProduct);

      // Top level edge which creates config product
      const configProductEdge = this.result.nodesAndEdges[productKey].edges.find(
        (e) => e.target === productKey
      );
      this.createElement(this.result.production[productKey], configProductEdge.id, 'edges', {
        ...configProductEdge,
        itemsPerMinute: configProductEdge.itemsPerMinute * multiplier,
      });

      const checkByProducts = (edge, defaultProduct, localMultiplier) => {
        // For top level, check if there are byproducts from toplevel Recipe.
        const byProductEdges = this.result.nodesAndEdges[productKey].edges.filter(
          (e) => e.source === edge.source && e.id !== edge.id && e.target !== defaultProduct
        );

        byProductEdges.forEach((byProductEdge) => {
          this.createElement(
            this.result.production[productKey],
            `${byProductEdge.target}-byproduct`,
            'nodes',
            {
              type: 'product',
              productionType: 'production',
              rawObject: this.data.products.find((p) => p.className === byProductEdge.target),
            }
          );
          this.createElement(this.result.production[productKey], byProductEdge.id, 'edges', {
            ...byProductEdge,
            target: `${byProductEdge.target}-byproduct`,
            itemsPerMinute: byProductEdge.itemsPerMinute * multiplier * localMultiplier,
          });
        });
      };

      checkByProducts(configProductEdge, productKey, 1);

      // Find recipe (child edge) and calculate downstream edges with correct amounts

      const findChildProducts = (edge, localMultiplier) => {
        const childEdges = this.result.nodesAndEdges[productKey].edges.filter(
          (e) => e.target === edge.source
        ); // Find all edges where node is target
        //const testNeeded =
        // Iterate childEdges. If it exists, skip. If not, apply multiplier, and add to production list. If source is a product, check if available. If available, adjust localMultiplier
        childEdges.forEach((childEdge) => {
          const product = childEdge.source;
          const productAmount = childEdge.itemsPerMinute * multiplier * localMultiplier;
          const availableCheckResult = checkAvailableAmount(product, productAmount, productKey);
          // If availableCheckResult.new is set, calculate new localMultiplier
          const newLocalMultiplier =
            availableCheckResult.new !== undefined
              ? availableCheckResult.new / productAmount
              : localMultiplier;

          // Create edges
          this.createElement(this.result.production[productKey], childEdge.id, 'edges', {
            ...childEdge,
            itemsPerMinute: productAmount,
          });

          // find the following child edges and iterate
          const childRecipeEdges = this.result.nodesAndEdges[productKey].edges.filter(
            (e) => e.target === childEdge.source
          );
          childRecipeEdges.forEach((childRecipeEdge) => {
            let childMultiplier = newLocalMultiplier;
            if (childRecipeEdge.for) {
              const foundProduct = childRecipeEdge.for.find((f) => f.id === childEdge.id);
              if (foundProduct) {
                childMultiplier = foundProduct.ratio * newLocalMultiplier;
              }
            }

            const childRecipeEdgeAmount =
              childRecipeEdge.itemsPerMinute * multiplier * childMultiplier;
            // Check byproducts
            //console.log(888888888, product, productKey);
            checkByProducts(childRecipeEdge, product, newLocalMultiplier);

            // add edges
            if (childRecipeEdgeAmount > 0) {
              this.createElement(this.result.production[productKey], childRecipeEdge.id, 'edges', {
                ...childRecipeEdge,
                itemsPerMinute: childRecipeEdgeAmount,
              });
            }
            // re-terate with new amount
            if (newLocalMultiplier > 0 && !this.data.isResource(childRecipeEdge.target)) {
              findChildProducts(childRecipeEdge, childMultiplier);
            }
          });
        });
      };

      findChildProducts(configProductEdge, 1);
    });

    console.log(this.result.production);
  };

  // applyAvailableItems() {
  //   // apply available items to nodes and edges
  //   // If there is an availableProduct, subtract from the edge
  //   // Edge situation: if production_mode is set to PRODUCE, and product = product, then skip
  //   // Function to get product node and all downstream products, including product itself and other outputs

  //   const getDownstreamNodes = (target, amount, nodes) => {
  //     const multiplier = 1 / (amount || 1);
  //     if (target.toUpperCase().startsWith('DESC_')) nodes.push({ product: target, amount });

  //     // Return if target is a resource
  //     if (this.data.isResource(target)) return;

  //     this.result.nodesAndEdgesTotal.edges
  //       .filter((e) => e.target === target)
  //       .forEach((edge) => {
  //         // Recursively get downstream nodes
  //         //nodes.push({ product: edge.target, amount: edge.itemsPerMinute * multiplier });
  //         // Find byproducts
  //         const byProducts = this.result.nodesAndEdgesTotal.edges.filter(
  //           (e) => e.source === edge.source && e.byProduct
  //         );
  //         if (byProducts.length > 0) {
  //           byProducts.forEach((byProduct) => {
  //             nodes.push({
  //               product: byProduct.target,
  //               amount: this.roundNumber(byProduct.itemsPerMinute * multiplier, 4),
  //               byProductFrom: edge.source,
  //             });
  //           });
  //         }

  //         return getDownstreamNodes(
  //           edge.source,
  //           this.roundNumber(edge.itemsPerMinute * multiplier, 4),
  //           nodes
  //         );
  //       });
  //     return nodes;
  //   };
  //   getDownstreamNodes('Desc_IronPlate_C', 4, []);
  //   return true;
  // }

  merge(sourceKey, targetKey) {
    //const result = { nodes: [], edges: [] };
    Object.keys(this.result[sourceKey]).forEach((key) => {
      this.result[sourceKey][key].nodes.forEach((node) => {
        // if upstreamproducts already exists, add to it
        const existingNode = this.result[targetKey].nodes.find((n) => n.id === node.id);
        if (existingNode && existingNode.upstreamProducts) {
          existingNode.upstreamProducts = [
            ...new Set([...existingNode.upstreamProducts, ...node.upstreamProducts]),
          ];
        } else this.result[targetKey].nodes.push({ ...node });
      });
      this.result[sourceKey][key].edges.forEach((edge) => {
        // if edge already exists, add itemsPerMinute
        const existingEdge = this.result[targetKey].edges.find((e) => e.id === edge.id);
        if (existingEdge) {
          existingEdge.itemsPerMinute += edge.itemsPerMinute;
        } else {
          this.result[targetKey].edges.push({ ...edge });
        }
      });
    });
  }

  calculateNumberOfMachines = () => {
    // Iterate all nodes, get all edges with source = node.id, add up all the itemsPerMinute, and calculate the number of machines needed per node
    this.result.productionTotal.nodes
      .filter((n) => n.type === 'recipe')
      .forEach((node) => {
        const edges = this.result.productionTotal.edges.filter((e) => e.source === node.id);
        console.log(node.id, edges);
        const totalItemsPerMinute = edges.reduce((acc, e) => acc + e.itemsPerMinute, 0);
        const recipe = this.data.getItemByKey('recipes', node.id); //this.data.resolveRecipe(node.id);
        if (recipe) {
          const machinesNeeded = totalItemsPerMinute / node.cyclesMin; // TODO: check if this is correct
          node.machinesNeeded = this.roundNumber(machinesNeeded, 2);
        }
      });
  };

  removeUnusedNodes = () => {
    // Check if there are unused nodes in this.result.production
    // If there are, remove them
    Object.keys(this.result.production).forEach((product) => {
      this.result.production[product].nodes.forEach((node) => {
        console.log('checking', node);
        const used = this.result.production[product].edges.find(
          (e) => e.source === node.id || e.target === node.id
        );
        if (!used) {
          // Remove node
          console.log('UNUSED', node);
          this.result.production[product].nodes = this.result.production[product].nodes.filter(
            (n) => n.id !== node.id
          );
        }
      });
    });
  };

  prepare = () => {
    this.reset();
    this.createNodesAndEdges(); // create chain data for each product
    this.calculateAvailableProducts(); // calculate available products
  };

  calculate() {
    this.prepare();
    this.createProductionList(); // create production list
    // TODO: remove unused nodes
    this.removeUnusedNodes();
    // TODO: Round up to 2 decimals and 0 if less than 0.01
    // TODO: Set percentages for each product
    // TODO: Calculate input/output products
    // TODO: Calculate machines needed
    this.merge('production', 'productionTotal'); // merge nodes and edges for total results
    this.calculateNumberOfMachines(); // add number of machines to total result

    return this.result;
  }
}
