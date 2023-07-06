/* eslint-disable no-unused-vars */
import React from 'react';
import Plot from 'react-plotly.js';

const TreeMapChart = () => {
  const data = [
    {
      type: 'treemap',
      labels: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'AA', 'AB', 'AC'],
      parents: ['', '', '', 'A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H', 'I', 'I', 'J', 'J', 'K', 'K', 'L', 'L', 'M', 'M'],
      values: [10.5, 20.2, 15.8, 7.3, 18.1, 5.6, 10.9, 12.4, 8.7, 9.2, 15.6, 7.1, 10.3, 8.9, 12.7, 9.8, 11.2, 6.5, 8.3, 10.1, 15.4, 7.9, 10.6, 8.2, 12.9, 9.6, 11.7, 6.9, 8.5, 10.8],
      text: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'AA', 'AB', 'AC'],
      
    },
  ];

  const layout = {
    title: 'Treemap Chart',
  };

  return <Plot data={data} layout={layout} />;
};

export default TreeMapChart;
