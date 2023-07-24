/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unreachable */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React,{useState, useEffect} from 'react'
import useSWR from 'swr';
import axios from 'axios';
import StockCard from '../StockCard'
import TreeMapChart from '../../Treemap'
import Card from '../Card'

function Finance({ yearRange, regions, country, companies, sectors, terms }) {
    //const [yearRange, setYearRange] = useState([2012, 2022]);
    const [counter, setCounter] = useState(0)
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isLoading, setIsLoading] = useState(true);
    const [seven, setSeven] = useState(null)
    const [eight, setEight] = useState(null)
    const [nine, setNine] = useState(null)
    const [ten, setTen] = useState(null)

    const payload = {
        "from_year": yearRange[0],
        "to_year": yearRange[1],
        "regions": regions,
        "countries": country,
        "companies": companies,
        "sectors": sectors,
        "terms": terms
      }

    const urls = [
    'https://data-value-tool.up.railway.app/average-operating-income-variation-over-quarters-and-years',
    'https://data-value-tool.up.railway.app/average-revenue-variation-over-quarters-and-years',
    'https://data-value-tool.up.railway.app/average-gross-profit-variation-over-quarters-and-years',
    'https://data-value-tool.up.railway.app/percentage-change-in-stock-price-and-market-cap'
           // Add more URLs for other API calls
    ];

    const options = {
        revalidateOnMount: true,
        revalidateOnFocus: true,
    };  
    
      const fetcher = async (url) => {
        const response = await axios.post(url, payload);
        const data = JSON.parse(response.data)
        // console.log(JSON.stringify(data))
        return data;
      };

      const fetchData = async () => {
        try {
          const [data1, data2, data3, data4] = await Promise.all([
            fetcher(urls[0]),
            fetcher(urls[1]),
            fetcher(urls[2]),
            fetcher(urls[3]),
            
            // Add more fetcher calls for other data sets
          ]);
          
          // setSeven(data1)
          setEight(data1)
          setNine(data2)
          setTen(data3)
          setIsLoading(false);

          return data1

          console.log(seven);
          // Set other data states
        } catch (error) {
          console.error(error);
          setIsLoading(false);
        }
      };

      useEffect(() => {
        const timeout =  setTimeout(() => {
            fetchData();
          }, 500);
      
          // Cleanup function
          return () => clearTimeout(timeout);
        }, [payload]);
      
      // const { data: seven, error: error0 } = useSWR(urls[3], fetcher);
      // const { data: eight, error: error1 } = useSWR(urls[0], fetcher);
      //const { data: nine, error: error2 } = useSWR(urls[1], fetcher);
      // const { data: ten, error: error3 } = useSWR(urls[2], fetcher);
      
      // console.log(eight, ten)

  return (
    <div className='w-full flex flex-col items-center gap-4 justify-center'>
    <TreeMapChart treedata={eight} />
    <TreeMapChart treedata={nine} />
    <TreeMapChart treedata={ten} />
    </div>
  )
}

export default Finance