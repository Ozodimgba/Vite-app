/* eslint-disable no-unused-vars */
import React from 'react';
import Plot from 'react-plotly.js';

const TreeMapChart = () => {
  const data = [
    {
      type: 'treemap',
      labels: ['A', 'B', 'C', 'D', 'E'],
      parents: ['', '', '', 'A', 'A'],
      values: [10, 20, 15, 7, 18],
      text: ['A', 'B', 'C', 'D', 'E'],
      hovertemplate: '%{label}<br>Value: %{value}<extra></extra>'
    },
  ];

  const layout = {
    title: 'Treemap Chart',
  };

  return <Plot data={data} layout={layout} />;
};

export default TreeMapChart;
