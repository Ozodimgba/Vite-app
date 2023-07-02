
import Plot from 'react-plotly.js';

const FunnelChart = () => {
  const data = [
    {
      type: 'funnel',
      y: ['Step 1', 'Step 2', 'Step 3', 'Step 4'],
      x: [100, 60, 40, 20],
      textposition: 'inside',
      marker: {
        colors: ['#FFA500', '#FFC0CB', '#ADD8E6', '#90EE90'],
      },
    },
  ];

  const layout = {
    title: 'Funnel Chart',
    height: 400,
    width: 600,
  };

  return <Plot data={data} layout={layout} />;
};


export default FunnelChart
