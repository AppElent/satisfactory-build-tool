export default class SatisfactoryDataType {
  constructor(type, data) {
    this.data = data;
    this.type = type;
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

  getItem(name) {
    return this.data[name];
  }

  getProducts() {
    return this.data;
  }

  getProductsArray() {
    return Object.values(this.data);
  }
}

/**
 * "Desc_CartridgeChaos_C": {
    "slug": "turbo-rifle-ammo",
    "name": "Turbo Rifle Ammo",
    "description": "Lightweight, compact, and volatile. These rounds provide extreme capacity and fire rates, at the cost of accuracy.",
    "stackSize": 500,
    "sinkPoints": 120,
    "isFluid": false,
    "isFuel": false,
    "isBiomass": false,
    "isRadioactive": false,
    "isEquipment": false,
    "meta": {},
    "event": "NONE"
  }
 */
