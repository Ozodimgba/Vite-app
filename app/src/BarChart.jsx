/* eslint-disable no-unused-vars */
import React from 'react';
import Plot from 'react-plotly.js';

const BarChart = () => {
  const data = [
    {
      x: ['Category 1', 'Category 2', 'Category 3'],
      y: [4, 6, 2],
      type: 'bar',
      marker: {
        color: 'blue', // Change bar color
        opacity: 1, // Change bar opacity
        width: [0.4, 0.6, 0.8], // Change bar width
      },
    },
  ];

  const layout = {
    title: 'Top Rev',
    xaxis: { title: 'Categories' },
    yaxis: { title: 'Values' },
    bargap: 0.5, // Adjust the gap between bars
    bargroupgap: 0.1,
  };

  return <Plot className="w-[100%]" data={data} layout={layout} />;
};

export default BarChart;