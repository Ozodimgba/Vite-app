/* eslint-disable react/prop-types */
import React, { useRef } from 'react';
import html2canvas from 'html2canvas';
import download from 'downloadjs';
import Plot from 'react-plotly.js';
import { IoMdDownload } from 'react-icons/io'
import { AiFillTwitterSquare, AiFillLinkedin } from 'react-icons/ai'

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

      const twitterShareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
        image
      )}`;
      window.open(twitterShareUrl, '_blank');
    });
  };


  const layout = {
    title: 'Frequency of Term Over Years and Quarters',
  };

  return <div ref={divRef} className='flex relative bg-white flex-col w-[80%]'>
  <Plot data={data} layout={layout} />
  <div className='absolute top-0 right-0 p-2'>
  <button onClick={handleShareLinkedIn}><AiFillLinkedin color='1652f0' size={30} /></button>
  <button onClick={handleShareTwitter}><AiFillTwitterSquare color='1652f0' size={30} /></button>
  <button onClick={handleDownload}><IoMdDownload color='1652f0' size={30} /></button>
  </div>
  </div>;
};

export default HeatmapChart;
