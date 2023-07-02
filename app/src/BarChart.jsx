/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import Plot from 'react-plotly.js';

const BarChart = ({ bardata, title }) => {
  const data = [
    {
      x: bardata?.labels,
      y: bardata?.data,
      type: 'bar',
      marker: {
        color: 'blue', // Change bar color
        opacity: 1, // Change bar opacity
        width: [0.4, 0.6, 0.8], // Change bar width
      },
    },
  ];

  const layout = {
    title: {
      text: `${title}`,
      font: {
        family: 'Inter, sans-serif',
        size: 20,
        weight: 'bold', // Set the weight to 'bold' to make the title text bolder
      },
    },
    xaxis: { title: 'Terms', showticklabels: false, },
    yaxis: { title: 'Values' },
    bargap: 0.5, // Adjust the gap between bars
    bargroupgap: 0.1,
  };

  return <Plot className="w-[100%]" data={data} layout={layout} />;
};

export default BarChart;