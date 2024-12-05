export default class SatisfactoryCytoscapeGraph {
  constructor() {}

  getDemo() {
    const elements = [
      { data: { id: 'Iron Ore', label: 'Iron Ore' }, style: { 'background-color': '#FFCC00' } }, // Yellow (for resources)
      { data: { id: 'Iron Ingot', label: 'Iron Ingot' }, style: { 'background-color': '#D35400' } }, // Orange (for intermediate products)
      { data: { id: 'Iron Plate', label: 'Iron Plate' }, style: { 'background-color': '#2980B9' } }, // Blue (for final products)

      // Edges with labels and custom styles
      {
        data: { source: 'Iron Ore', target: 'Iron Ingot', label: '1:1' },
        style: { 'line-color': '#FF5733', 'target-arrow-color': '#FF5733' },
      },
      {
        data: { source: 'Iron Ingot', target: 'Iron Plate', label: '2:1' },
        style: { 'line-color': '#3498DB', 'target-arrow-color': '#3498DB' },
      },
    ];
    return elements;
  }
}
