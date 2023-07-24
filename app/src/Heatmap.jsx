/* eslint-disable react/prop-types */
import React, { useRef } from 'react';
import html2canvas from 'html2canvas';
import download from 'downloadjs';
import Plot from 'react-plotly.js';
import { IoMdDownload } from 'react-icons/io'
import { AiFillTwitterSquare, AiFillLinkedin, AiFillCloseCircle } from 'react-icons/ai'
import { BsFillShareFill } from "react-icons/bs";

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

  const config = {
    displayModeBar: false
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
          
          const x = canvas.width - overlayImage.width;
          const y = canvas.height - overlayImage.height;

          context.drawImage(overlayImage, x, y);

          // Convert the overlay canvas to data URL
          const finalImage = overlayCanvas.toDataURL('image/png');

          // Trigger the download of the final image
          download(finalImage, 'Term Frequency Breakdown By Year and Quarter.png');
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
        
        // Open the LinkedIn share URL in a popup window
        const windowOptions = 'width=550,height=420,top=100,left=100';
        const popup = window.open(linkedInShareUrl, '_blank', windowOptions);
        if (popup) {
            popup.focus();
        } else {
            // If the popup was blocked by the browser, fall back to opening in a new tab
            window.open(linkedInShareUrl, '_blank');
        }

        // Clean up the object URL
        window.URL.revokeObjectURL(url);
      });
    });
  };

  
  const handleShareTwitter = () => {
    const divElement = divRef.current;

    html2canvas(divElement).then(canvas => {
      const image = canvas.toDataURL('image/png');

     const twitterShareUrl = `https://twitter.com/intent/tweet?url=https://dataproducts.io&text=Check Out This Earnings Explorer App By @dataproducts #FinancialVizPro #DataInsights`;

      const windowWidth = 550;
      const windowHeight = 420;
      const windowLeft = (window.screen.width - windowWidth) / 2;
      const windowTop = (window.screen.height - windowHeight) / 2;
      const windowOptions = `width=${windowWidth},height=${windowHeight},top=${windowTop},left=${windowLeft}`;

      const popup = window.open(twitterShareUrl, '_blank', windowOptions);

      if (popup) {
            popup.focus();
      } else {
          // If the popup was blocked by the browser, fall back to opening in a new tab
          window.open(twitterShareUrl, '_blank');
      }
      
    });
  };

  const popupRef = useRef(null);

  const handleOpenPopup = () => {
    popupRef.current.style.display = 'block';
  }

  const handleClosePopup = () => {
    popupRef.current.style.display = 'none';
  }


  const layout = {
    title: 'Keyword Breakdown By Year And Quarter',
  };

  return <div ref={divRef} className='flex relative bg-white flex-col w-[80%]'>
  <Plot data={data} layout={layout} config={config} />
  <div className='absolute top-0 right-0 px-2 py-1' style={{ display: 'flex', alignItems: 'center' }}>

    <button onClick={handleDownload} className="mr-2"><IoMdDownload color='228B22' size={20} /></button>

      <div onClick={handleOpenPopup} className="pb-2 mr-2">
        <BsFillShareFill color='1DA1F2' size={15} />
      </div>

      <div ref={popupRef} className="popup" style={{ display: 'none' }}>
        <button onClick={handleShareLinkedIn} className="mr-2">
          <AiFillLinkedin color='0077b5' size={19} />
        </button>
        <button onClick={handleShareTwitter} className="mr-2">
          <AiFillTwitterSquare color='1DA1F2' size={19} />
        </button>
        <button onClick={handleClosePopup} className="popup-close">
          <AiFillCloseCircle color='FF0000' size={19} />
        </button>
      </div>
  </div>
  <h6 className="text-left absolute bottom-0 text-sm italic mt-2">This breakdown offers a more detailed and clear view of the years that have contributed the most to the frequencies observed in a particular quarter. It helps identify the specific periods within each quarter that had the highest impact on the overall term frequencies.</h6>
  </div>;
};

export default HeatmapChart;
