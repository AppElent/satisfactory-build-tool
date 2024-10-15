import React from 'react';
import CytoscapeComponent from 'react-cytoscapejs';

const TabGraph = () => {
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

  const layout = {
    name: 'breadthfirst',
    directed: true,
    padding: 10,
    orientation: 'horizontal', // Change to horizontal layout
  };

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <CytoscapeComponent
        elements={elements}
        style={{
          width: '100%',
          height: '600px',
          //overflow: 'hidden',
          border: '1px solid #ccc',
          boxSizing: 'border-box',
        }}
        layout={layout}
        stylesheet={[
          {
            selector: 'node',
            style: {
              label: 'data(label)',
              'text-valign': 'center',
              'text-halign': 'center',
              color: '#FFFFFF',
              'font-size': '14px',
              width: '100px', // Increase node width
              height: '60px', // Increase node height
              shape: 'rectangle', // Make nodes square
            },
          },
          {
            selector: 'edge',
            style: {
              width: 3,
              label: 'data(label)',
              'font-size': 12,
              color: '#000000',
              'target-arrow-shape': 'triangle',
              'text-background-opacity': 1,
              'text-background-color': '#FFFFFF',
              'text-background-padding': '3px',
              'curve-style': 'bezier',
            },
          },
        ]}
      />
    </div>
  );
};

export default TabGraph;
