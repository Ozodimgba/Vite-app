import Plot from 'react-plotly.js';

const HeatmapChart = () => {
  const data = [
    {
      z: [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
      ],
      type: 'heatmap',
    },
  ];

  const layout = {
    title: 'Heatmap Chart',
  };

  return <Plot data={data} layout={layout} />;
};

export default HeatmapChart;
