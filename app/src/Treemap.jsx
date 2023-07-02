/* eslint-disable no-unused-vars */
import React from 'react';
import Plot from 'react-plotly.js';

const TreeMapChart = () => {
  const data = [
    {
      type: 'treemap',
      labels: ['A', 'B', 'C', 'D'],
      parents: ['', '', 'A', 'A'],
      values: [8, 6, 4, 2],
    },
  ];

  const layout = {
    title: 'Treemap Chart',
  };

  return <Plot data={data} layout={layout} />;
};

export default TreeMapChart;
