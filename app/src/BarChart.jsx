/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useRef } from 'react';
import html2canvas from 'html2canvas';
import download from 'downloadjs';
import Plot from 'react-plotly.js';
import { IoMdDownload } from 'react-icons/io'
import { AiFillTwitterSquare, AiFillLinkedin, AiFillCloseCircle } from 'react-icons/ai'
import { BsFillShareFill } from "react-icons/bs";

const BarChart = ({ bardata, title, yLabel }) => {
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

  const popupRef = useRef(null);

  const handleOpenPopup = () => {
    popupRef.current.style.display = 'block';
  }

  const handleClosePopup = () => {
    popupRef.current.style.display = 'none';
  }

  let xasis_title;
  let ticklabels;
  if (yLabel == "Terms count") {
    xasis_title = "Quarters";
    ticklabels = true
  } else {
    xasis_title = "Terms";
    ticklabels = false
  }

  const layout = {
    title: {
      text: `${title}`,
      font: {
        family: 'Inter, sans-serif',
        size: 20,
        weight: 'bold', // Set the weight to 'bold' to make the title text bolder
      },
    },
    xaxis: { title: xasis_title, showticklabels: ticklabels, },
    yaxis: { title: `${yLabel}` },
    bargap: 0.5, // Adjust the gap between bars
    bargroupgap: 0.1,
  };

  return <div ref={divRef} className='flex relative bg-white flex-col w-[100%]'>
    <Plot data={data} layout={layout} config={config}/>
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
  </div>;
};

export default BarChart;