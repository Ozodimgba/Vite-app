/* eslint-disable no-unused-vars */
import { CustomMap } from "@jadesrochers/geomap";
import { useEffect, useState } from "react";
import { geoEqualEarth } from "d3-geo";
import * as R from "ramda";
import axios from 'axios';

const projectEqualEarth = scale =>
  geoEqualEarth()
    .scale(scale)
    .translate([770, 530]);

const useLoadMap = path => {
  const [geodata, setgeodata] = useState(undefined);
  useEffect(() => {
    
    const datagetter = async () => {
      let rawgeo = await fetch(path);
      rawgeo = await rawgeo.json();
      console.log("the raw data: ", rawgeo);
      let rsltgeo = {
        type: rawgeo["type"],
        features: rawgeo["features"]
      };
      setgeodata(rsltgeo);
    };
    datagetter();
  }, [path]);
  return geodata;
};
//const GnYlRd73 = ['#1652f0', '#ffff00', '#1652f0', '#1652f0', '#addd8e', '#d9f0a3', '#ffffcc', '#ffeda0', '#feb24c', '#f03b20'];
// The ToolTipMap must contain the custom map to get data tooltip support.
const WorldMap = props => {
  const [response, setResponse] = useState(null);
  const path =
    "https://raw.githubusercontent.com/jadesrochers/geomap/master/src/__tests__/worldmap110m.json";
  let worldgeo = useLoadMap(path);
  //console.log('the other data: ',otherdata)
  // The datakey will determine the path for the topology in the output
  if (!worldgeo) {
    return null;
  }
  let randdata = worldgeo.features.map(feat => {
    let item = {};
    item[feat.properties.sov_a3] = Math.random() * 100;
    
    return item;
  });
  let data = R.mergeAll(randdata);
  console.log(data)
  
  const payload = {
    "from_year": 2012,
    "to_year": 2019,
    "regions": ["All"],
    "countries": ["All"],
    "companies": ["All"],
    "sectors": ["All"],
    "terms": ["All"]
  }
  

  console.log(JSON.stringify(response))
  return (
    <CustomMap
      projection={projectEqualEarth}
      
      featurename={"countries"}
      featurekey={"sov_a3"}
      scaling={400}
      getgeofeat={worldgeo}
      data={data}
      tooltipkey={"name_sort"}
      formatter={input => Math.round(input)}
      legendstyle={{
        width: "100%",
        height: "40px",
        fontSize: "0.8em",
        padding: "0 0 5px 0",
        fill: "#ffffff"
      }}
      style={{
        fill: "#f4f6f6",
        stroke: "#707b7c",
        strokeLinejoin: "round"
      }}
      datastyle={{
        stroke: "#323535",
        strokeLinejoin: "round"
      }}
      zoomstyle={{ width: "30px", height: "30px" }}
      tooltipwidth={260}
      tooltipheight={120}
      tooltiprectstyle={{
        fill: '#ffffff',
      fillOpacity: 1
      }}
      tooltipstyle={{ fontSize: "1.9rem", fontWeight: 800 }}
      limitHook={{ xlimits: { min: 0, max: 100 } }}
      {...props}
    />
  );
};

export { WorldMap };
