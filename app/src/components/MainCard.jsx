/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import Term from "./filters/Term";
import axios from "axios";

const MainCard = ({ data }) => {
  const [ isLoading, setIsLoading ] = useState(true)
  const [term, setTerm] = useState('Cloud')
  const [cardData, setCardData] = useState(null)
  
    if (!data) {
      return null; // or render a fallback component/error message
    }

    const payload = {
      "from_year": 2012,
      "to_year": 2019,
      "regions": ["All"],
      "countries": ["All"],
      "companies": ["All"],
      "sectors": ["All"],
      "terms": ["All"],
      "term": term
    }

    useEffect(() => {
      // Simulating an API call to fetch data
      const fetchData = async () => {
        
        try {
          // Set isLoading to true to show the loading state
          setIsLoading(true);
  
          // Make the actual API call to fetch the dynamic data
          const response = await axios.post('https://data-value-tool.up.railway.app/average-financials-for-individual-terms', payload);
          const data = JSON.parse(response.data);
          setCardData(data)
      
  
          // Update the state with the fetched data
         // setTagData(data.data);
          
          // Set isLoading to false to hide the loading state
          setIsLoading(false);
        } catch (error) {
          console.error('Error fetching tag cloud data:', error);
        }
      };
  
      fetchData();
    }, [payload]);
    
    const { 
      "Average Revenue": AvrgRev,
      "Average Revenue Cost": AvrgRevCost,
      "Average Operating Income": AvrgOprInc
    } = cardData;
  
   
  
    // function formatNumberWithTwoDecimals(number) {
    //   const formattedNumber = Number(number).toFixed(2);
    //   return formattedNumber;
    // }
  
    const formatNumber = (val) => {
      if (val >= 1000000000000) {
        // Trillion or more
        return `${(val / 1000000000000).toFixed(2)}T`;
      } else if (val >= 1000000000) {
        // Billion or more
        return `${(val / 1000000000).toFixed(2)}B`;
      } else if (val >= 1000000) {
        // Million or more
        return `${(val / 1000000).toFixed(2)}M`;
      } else if (val >= 1000) {
        // Thousand or more
        return `${(val / 1000).toFixed(2)}K`;
      } else {
        // Less than thousand
        return val;
      }
    };
  
    return (
      <div className="p-4 px-10 w-[100%] flex flex-col justify-between">
        <Term data={data} term={term} setTerm={setTerm} />

        <div className="flex flex-row justify-between">
        <div className="flex flex-col items-center justify-between">
          <div className="flex items-center">
          <span>Average Revenue</span>
        
          </div>
          <span className='font-bold text-2xl'>{formatNumber(AvrgRev)}</span>
        </div>
  
        <div className="flex flex-col items-center justify-between">
          <div className="flex items-center">
            <span>Average Revenue Cost</span>
          </div>
          <span className='font-bold text-2xl'>{formatNumber(AvrgRevCost)}</span>
        </div>
        <div className="flex flex-col items-center justify-between">
          <span>Average Operating Income</span>
          <span className='font-bold text-2xl'>{formatNumber(AvrgOprInc)}</span>
        </div>
        </div>
      </div>
    );
  };
  
  export default MainCard;
  