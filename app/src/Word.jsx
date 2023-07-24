/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef } from 'react';
import { TagCloud } from 'react-tagcloud';
import axios from 'axios';
import html2canvas from 'html2canvas';
import download from 'downloadjs';
import { IoMdDownload } from 'react-icons/io'
import { AiFillTwitterSquare, AiFillLinkedin, AiFillCloseCircle } from 'react-icons/ai'
import { BsFillShareFill } from "react-icons/bs";

const Cloud = ({ yearRange, regions, country, companies, sectors, terms }) => {
  const [tagData, setTagData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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


  const payload = {
    "from_year": yearRange[0],
    "to_year": yearRange[1],
    "regions": regions,
    "countries": country,
    "companies": companies,
    "sectors": sectors,
    "terms": terms
  }
 

  useEffect(() => {
    // Simulating an API call to fetch data
    const fetchData = async () => {
      
      try {
        // Set isLoading to true to show the loading state
        setIsLoading(false);

        // Make the actual API call to fetch the dynamic data
        const response = await axios.post('https://data-value-tool.up.railway.app/terms-frequencies-count-for-wordcloud-and-table', payload);
        const data = JSON.parse(response.data);

        console.log(data)

        // Update the state with the fetched data
        setTagData(data.data);
        
        // Set isLoading to false to hide the loading state
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching tag cloud data:', error);
      }
    };

    fetchData();
  }, [payload, tagData]);

  const popupRef = useRef(null);

  const handleOpenPopup = () => {
    popupRef.current.style.display = 'block';
  }

  const handleClosePopup = () => {
    popupRef.current.style.display = 'none';
  }

  const options = {
    luminosity: 'light',
    hue: 'blue',
  }

  return (
    <div>
      {isLoading ? (
        <div className='text-white'>Loading...</div> // Show a loading state
      ) : (
        <div>
          <h1 className='wordcloud-title' style={{ color: 'white' }}>Wordcloud Representation of Terms By Frequency</h1>
        <div ref={divRef} className='bg-[#141414]' >
        <br/>
        <TagCloud
          minSize={10}
          maxSize={100}
          tags={tagData}
          className="simple-cloud"
          // colorOptions={options}
        />
          <div className='flex justify-end px-2 py-1'>

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
            </div>

          </div>
        </div>
      </div>
      )}
    </div>
  );
};

export default Cloud;
