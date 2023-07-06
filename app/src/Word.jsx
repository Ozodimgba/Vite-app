import { useState, useEffect, useRef } from 'react';
import { TagCloud } from 'react-tagcloud';
import axios from 'axios';
import html2canvas from 'html2canvas';
import download from 'downloadjs';
import { IoMdDownload } from 'react-icons/io'
import { AiFillTwitterSquare, AiFillLinkedin } from 'react-icons/ai'

const Cloud = () => {
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

        const linkedInShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
          url
        )}`;
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

 

  useEffect(() => {
    // Simulating an API call to fetch data
    const fetchData = async () => {
      const payload = {
        "from_year": 2012,
        "to_year": 2019,
        "regions": ["All"],
        "countries": ["All"],
        "companies": ["All"],
        "sectors": ["All"],
        "terms": ["All"]
      }
      try {
        // Set isLoading to true to show the loading state
        setIsLoading(true);

        // Make the actual API call to fetch the dynamic data
        const response = await axios.post('https://data-value-tool.up.railway.app/terms-frequencies-count-for-wordcloud-and-table', payload);
        const data = JSON.parse(response.data);

    

        // Update the state with the fetched data
        setTagData(data.data);
        
        // Set isLoading to false to hide the loading state
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching tag cloud data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {isLoading ? (
        <div className='text-white'>Loading...</div> // Show a loading state
      ) : (
        <div ref={divRef} className='bg-[#141414]' >
        <TagCloud
          minSize={12}
          maxSize={35}
          tags={tagData}
          className="simple-cloud"
          onClick={(tag) => alert(`'${tag.value}' was selected!`)}
        />
        <div className='flex justify-end px-2 py-1'>
  <button onClick={handleShareLinkedIn}><AiFillLinkedin color='white' size={30} /></button>
  <button onClick={handleShareTwitter}><AiFillTwitterSquare color='white' size={30} /></button>
  <button onClick={handleDownload}><IoMdDownload color='white' size={30} /></button>
  </div>
        </div>
      )}
    </div>
  );
};

export default Cloud;
