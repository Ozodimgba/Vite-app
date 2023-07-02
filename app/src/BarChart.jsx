/* eslint-disable no-unused-vars */
import React from 'react';
import Plot from 'react-plotly.js';

const BarChart = () => {
  const data = [
    {
      x: ['Category 1', 'Category 2', 'Category 3'],
      y: [4, 6, 2],
      type: 'bar',
    },
  ];

  const layout = {
    title: 'Bar Chart',
    xaxis: { title: 'Categories' },
    yaxis: { title: 'Values' },
  };

  return <Plot data={data} layout={layout} />;
};

export default BarChart;