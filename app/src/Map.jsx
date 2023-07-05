/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import { ResponsiveChoropleth } from '@nivo/geo'
import { ResponsiveGeoMap } from "@nivo/geo";
import { ResponsiveGeoMapCanvas } from "@nivo/geo";
import countries from "./world_countries.json";
//import data from './utils/data.js';


function Map() {
  const data = [
    { id: 'USA', value: 150 },
    { id: 'CAN', value: 200 },
    { id: 'MEX', value: 75 },
    { id: 'ATA', value: 875 },
    { id: 'NGA', value: 875 }
    // Add more data objects for other regions as needed
  ];

  return (<div className='w-[73%] p-4 h-[500px] overflow bg-white rounded-xl'>
    <ResponsiveChoropleth
        data={data}
        features={countries.features}
        colors="nivo"
        unknownColor="#666666"
        label="properties.name"
        valueFormat=".2s"
        domain={[0, 0]}
        projectionTranslation={[0.5, 0.5]}
        enableGraticule={true}
        graticuleLineColor="#dddddd"
        borderWidth={0.5}
        borderColor="#152538"
        legends={[
          {
            anchor: "bottom-left",
            direction: "column",
            justify: true,
            translateX: 20,
            translateY: -100,
            itemsSpacing: 0,
            itemWidth: 94,
            itemHeight: 18,
            itemDirection: "left-to-right",
            itemTextColor: "#444444",
            itemOpacity: 0.85,
            symbolSize: 18,
            effects: [
              {
                on: "hover",
                style: {
                  itemTextColor: "#000000",
                  itemOpacity: 1
                }
              }
            ]
          }
        ]}
      />
    </div>
  )
}

export default Map