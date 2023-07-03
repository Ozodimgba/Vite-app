/* eslint-disable react/prop-types */
import Plot from 'react-plotly.js';

const HeatmapChart = ({ heatdata }) => {
  const data = [
    {
      z: heatdata?.z,
      x: heatdata?.x,
      y: heatdata?.y,
      type: 'heatmap',
      colorscale: [
        [0, 'rgb(204, 230, 255)'], // Lightest shade of blue
        [0.25, 'rgb(153, 204, 255)'], // Lighter shade of blue
        [0.5, 'rgb(102, 153, 255)'], // Medium shade of blue
        [0.75, 'rgb(51, 102, 255)'], // Darker shade of blue
        [1, 'rgb(0, 51, 204)'] // Darkest shade of blue
      ]
    },
  ];

  const layout = {
    title: 'Heatmap Chart',
  };

  return <Plot data={data} layout={layout} />;
};

export default HeatmapChart;
