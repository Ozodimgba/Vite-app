/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import axios from "axios";
import { ResponsiveChoropleth } from "@nivo/geo";
import countries from "./world_countries.json";

function Map() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();

  const payload = {
      "from_year": 2012,
      "to_year": 2022,
      "regions": ["All"],
      "countries": ["All"],
      "companies": ["All"],
      "sectors": ["All"],
      "terms": ["All"],
  };

  const fetchData = async () => {
    try {
      setIsLoading(true);

      const response = await axios.post(
        "https://data-value-tool.up.railway.app/frequencies-by-countries",
        payload
      );
      const responseData = JSON.parse(response.data);
      setData(responseData.data);
      
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching map data:", error);
    }
  };

  console.log(JSON.stringify(data))

  useEffect(() => {
    fetchData();
  }, [payload]);


  if (!data) {
    return null; // or render a fallback component/error message
  }

  return (
    <div className="w-[73%] flex flex-col items-center justify-center p-4 h-[500px] overflow bg-white rounded-xl">
      <h1>Terms Frequency by Country</h1>
      <ResponsiveChoropleth
        data={data}
        features={countries.features}
        colors="blues"
        enableGraticule={false}
        unknownColor="#666666"
        label="properties.name"
        valueFormat=".2s"
        domain={[0, 0]}
        projectionTranslation={[0.5, 0.5]}
        graticuleLineColor="#ffffff"
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
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
      />
    </div>
  );
}

export default Map;
