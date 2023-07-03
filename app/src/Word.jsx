import { useState, useEffect } from 'react';
import { TagCloud } from 'react-tagcloud';
import axios from 'axios';

const Cloud = () => {
  const [tagData, setTagData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

 

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
        <TagCloud
          minSize={12}
          maxSize={35}
          tags={tagData}
          className="simple-cloud"
          onClick={(tag) => alert(`'${tag.value}' was selected!`)}
        />
      )}
    </div>
  );
};

export default Cloud;
