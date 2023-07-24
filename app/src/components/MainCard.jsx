/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import Term from "./filters/Term";
import axios from "axios";
import useSWR from 'swr';

const MainCard = ({ data, yearRange, regions, country, companies, sectors, terms }) => {
  const [ isLoading, setIsLoading ] = useState(true)
  const [term, setTerm] = useState('Cloud')
  const [cardData, setCardData] = useState({ 
    "Average Revenue": 0,
    "Average Revenue Cost": 0,
    "Average Operating Income": 0
  })
  
    if (!cardData) {
      return null; // or render a fallback component/error message
    }

    const payload = {
      "from_year": yearRange[0],
      "to_year": yearRange[1],
      "regions": regions,
      "countries": country,
      "companies": companies,
      "sectors": sectors,
      "terms": terms,
      'term': term
    }

    const urls = [
      'https://data-value-tool.up.railway.app/average-financials-for-individual-terms'
      // Add more URLs for other API calls
    ];
  
    const fetcher = async (url) => {
      const response = await axios.post(url, payload);
      const data = JSON.parse(response.data)
      console.log(data)
      setIsLoading(false)
      return data;
    };

    const options = {
      revalidateOnMount: true,
      revalidateOnFocus: true,
    };

    const fetchData = async () => {
      try {
        const [data1,] = await Promise.all([
          fetcher(urls[0]),
          // Add more fetcher calls for other data sets
        ]);
        
        setCardData(data1)
        setIsLoading(false);

        return data1

        //console.log(tfo, btr, one, two);
        // Set other data states
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    useEffect(() => {
      // Simulating an API call to fetch data
  
      fetchData();
    }, [payload, term, cardData]);
    
    const { 
      "Average Revenue": AvrgRev,
      "Average Revenue Cost": AvrgRevCost,
      "Average Operating Income": AvrgOprInc
    } = cardData;

    console.log(0)
  
   
  
    // function formatNumberWithTwoDecimals(number) {
    //   const formattedNumber = Number(number).toFixed(2);
    //   return formattedNumber;
    // }
  
    const formatNumber = (val) => {
      if (val >= 1000000000000) {
        // Trillion or more
        return `${(val / 1000000000000).toFixed(2)} T`;
      } else if (val >= 1000000000) {
        // Billion or more
        return `${(val / 1000000000).toFixed(2)} B`;
      } else if (val >= 1000000) {
        // Million or more
        return `${(val / 1000000).toFixed(2)} M`;
      } else if (val >= 1000) {
        // Thousand or more
        return `${(val / 1000).toFixed(2)} K`;
      } else {
        // Less than thousand
        return val;
      }
    };
  
    return (
      <div className="p-4 w-[100%] flex flex-col justify-between">
        <Term data={data} term={term} setTerm={setTerm} />

        <div className="flex flex-row w-[100%] px-10 pb-4 mt-6 justify-between">
        <div className="flex flex-col items-center justify-between">
          <div className="flex items-center">
          <span>Average Revenue</span>
        
          </div>
          {/* {isLoading? <div>Loading</h1> : } */}
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
  