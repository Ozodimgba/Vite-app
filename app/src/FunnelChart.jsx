/* eslint-disable react/prop-types */

import Plot from 'react-plotly.js';

const FunnelChart = ({ funneldata }) => {
  const data = funneldata?.data;
  console.log(data)
  const layout = {
    margin: {l: 200, r: 0},
    title: 'Funnel Chart',
    height: 400,
    width: 700,
    showlegend: 'true'
  };

  return <Plot data={data} layout={layout} />;
};


export default FunnelChart
