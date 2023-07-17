/* eslint-disable no-unused-vars */
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { ResponsiveChoropleth } from "@nivo/geo";
import countries from "./world_countries.json";
import { AiFillTwitterSquare, AiFillLinkedin, AiFillCloseCircle } from 'react-icons/ai'
import { BsFillShareFill } from "react-icons/bs";

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

  const divRef = useRef(null);

  const handleDownload = () => {
    const divElement = divRef.current;

    html2canvas(divElement).then(canvas => {
      const image = canvas.toDataURL('image/png');

      // Create a new canvas element to draw the image and overlay
      const overlayCanvas = document.createElement('canvas');
      overlayCanvas.width = canvas.width;
      overlayCanvas.height = canvas.height;
      const context = overlayCanvas.getContext('2d');

      // Draw the original image
      const originalImage = new Image();
      originalImage.src = image;
      originalImage.onload = () => {
        context.drawImage(originalImage, 0, 0);

        // Draw the overlay image
        const overlayImage = new Image();
        overlayImage.src = 'logo.png';
        overlayImage.onload = () => {
          context.drawImage(overlayImage, 0, 0);

          // Convert the overlay canvas to data URL
          const finalImage = overlayCanvas.toDataURL('image/png');

          // Trigger the download of the final image
          download(finalImage, 'chart.png');
        };
      };
    });
  };

  const handleShareLinkedIn = () => {
    const divElement = divRef.current;

    html2canvas(divElement).then(canvas => {
      canvas.toBlob(blob => {
        const data = new FormData();
        data.append('image', blob, 'div_image.png');

        const url = window.URL.createObjectURL(blob);

        const linkedInShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=https://dataproducts.io`;
        window.open(linkedInShareUrl, '_blank');

        // Clean up the object URL
        window.URL.revokeObjectURL(url);
      });
    });
  };


  const handleShareTwitter = () => {
    const divElement = divRef.current;

    html2canvas(divElement).then(canvas => {
      const image = canvas.toDataURL('image/png');

      const twitterShareUrl = `https://twitter.com/intent/tweet?url=https://dataproducts.io&text=Check Out This Earnings Explorer App By Data Products LLC`;
      window.open(twitterShareUrl, '_blank');
    });
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

  const popupRef = useRef(null);

  const handleOpenPopup = () => {
    popupRef.current.style.display = 'block';
  }

  const handleClosePopup = () => {
    popupRef.current.style.display = 'none';
  }


  useEffect(() => {
    fetchData();
  }, [payload]);


  if (!data) {
    return null; // or render a fallback component/error message
  }

  return (
    <div className="w-[73%] flex flex-col items-center justify-center p-4 h-[500px] overflow-hidden bg-white rounded-xl">
      <h1>Term Frequency By Country</h1>
      <ResponsiveChoropleth
        data={data}
        features={countries.features}
        colors="blues"
        enableGraticule={false}
        unknownColor="#666666"
        label="properties.name"
        valueFormat=".2s"
        domain={[0, 100]}
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
