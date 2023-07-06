/* eslint-disable no-unused-vars */
import React, { useRef } from 'react';
import html2canvas from 'html2canvas';
import download from 'downloadjs';
import Plot from 'react-plotly.js';
import { IoMdDownload } from 'react-icons/io'
import { AiFillTwitterSquare, AiFillLinkedin } from 'react-icons/ai'

const TreeMapChart = () => {
  const data = [
    {
      type: 'treemap',
      labels: ['Q1', 'Q1', 'Q1', 'Q1', 'Q1', 'Q1', 'Q1', 'Q1', 'Q1', 'Q1', 'Q1', 'Q1', 'Q2', 'Q2', 'Q2', 'Q2', 'Q2', 'Q2', 'Q2', 'Q2', 'Q2', 'Q2', 'Q2', 'Q2', 'Q3', 'Q3', 'Q3', 'Q3', 'Q3', 'Q3', 'Q3', 'Q3', 'Q3', 'Q3', 'Q3', 'Q3', 'Q4', 'Q4', 'Q4', 'Q4', 'Q4', 'Q4', 'Q4', 'Q4', 'Q4', 'Q4', 'Q4', 'Q4', '2023', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022'],
      parents: ['2023', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2022', '2021', '2019', '2020', '2023', '2012', '2013', '2014', '2018', '2015', '2016', '2017', '2021', '2022', '2019', '2020', '2023', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2022', '2021', '2019', '2020', '2023', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2021', '2019', '2020', '2022', '', '', '', '', '', '', '', '', '', '', '', ''],
      values: [2.21330457e+07, 2.67238993e+09, 9.58715144e+08, 1.56587874e+09, 3.06300880e+09, 4.99575821e+08, 3.11840885e+09, 5.94125900e+08, 1.36230535e+09, 8.62321575e+08, 1.91688786e+09, 6.29627785e+08, 2.55585630e+07, 2.26965143e+09, 2.96789186e+09, 3.82939160e+09, 7.52332151e+08, 2.93410932e+09, 6.32890338e+08, 6.81604526e+08, 8.03839329e+08, 3.79216773e+09, 6.45272598e+08, 6.86649918e+08, 1.19515618e+07, 4.68254595e+08, 3.03022359e+09, 4.39612009e+09, 3.25702182e+09, 5.29760163e+08, 1.37600298e+09, 6.49579612e+08, 1.54042693e+09, 3.16063993e+09, 6.59556203e+08, 7.01013441e+08, 3.59989125e+07, 4.80876360e+08, 2.87015890e+09, 2.97629040e+09, 4.95723167e+08, 5.31954135e+08, 5.24740904e+08, 6.63581691e+08, 2.02920523e+09, 6.87133266e+08, 1.91388181e+09, 2.36498228e+09, 9.56420829e+07, 5.89117231e+09, 9.82698949e+09, 1.27676808e+10, 9.74986311e+09, 2.19418046e+09, 5.70075726e+09, 2.65961935e+09, 3.90884993e+09, 3.93117296e+09, 6.85600607e+09, 9.05988228e+09],
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

      const twitterShareUrl = `https://twitter.com/intent/tweet?url=https://dataproducts.io&text=Check Out This Earnings Explorer App By Data Products LLC`;
      window.open(twitterShareUrl, '_blank');
    });
  };

  const layout = {
    title: 'Treemap Chart',
  };

  return <div ref={divRef} className='flex relative bg-white flex-col w-[80%]'>
  <Plot data={data} layout={layout} />
  <div className='absolute top-0 right-0 px-2 py-1'>
  <button onClick={handleShareLinkedIn}><AiFillLinkedin color='0077b5' size={20} /></button>
  <button onClick={handleShareTwitter}><AiFillTwitterSquare color='1DA1F2' size={20} /></button>
  <button onClick={handleDownload}><IoMdDownload color='228B22' size={20} /></button>
  </div>
  </div>;;
};

export default TreeMapChart;
