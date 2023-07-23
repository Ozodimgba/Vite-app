import React,{useState, useEffect} from 'react'
import useSWR from 'swr';
import MainCard from '../MainCard';
import BarChart from '../../BarChart';
import FunnelChart from '../../FunnelChart';
import axios from 'axios';

function Main({ regions, country, companies, sectors, terms }) {
    
    const [yearRange, setYearRange] = useState([2012, 2022]);
    const [counter, setCounter] = useState(0)
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isLoading, setIsLoading] = useState(true);
    const [tfo, setTFO] = useState([]);
    const [btr, setBTR] = useState([]);
    const [one, setOne] = useState([]);
    const [two, setTwo] = useState([]);
    const [three, setThree] = useState([]);
    const [four, setFour] = useState([])
    const [five, setFive] = useState([])
    const [six, setSix] = useState([])

    // console.log(sectors)

    const payload = {
        "from_year": yearRange[0],
        "to_year": yearRange[1],
        "regions": regions,
        "countries": country,
        "companies": companies,
        "sectors": sectors,
        "terms": terms
      }

      const fetcher = async (url) => {
        const response = await axios.post(url, payload);
        const data = JSON.parse(response.data)
        console.log(JSON.stringify(data))
        return data;
      };

      const urls = [
        'https://data-value-tool.up.railway.app/top-5-terms-by-revenue',
        'https://data-value-tool.up.railway.app/bottom-5-terms-by-revenue',
        'https://data-value-tool.up.railway.app/top-5-terms-by-cost-of-revenue',
        'https://data-value-tool.up.railway.app/bottom-5-terms-by-cost-of-revenue',
        'https://data-value-tool.up.railway.app/top-5-terms-by-operating-income',
        'https://data-value-tool.up.railway.app/bottom-5-terms-by-operating-income',
        'https://data-value-tool.up.railway.app/top-5-terms-and-corresponding-financials',
        'https://data-value-tool.up.railway.app/bottom-5-terms-and-corresponding-financials',
        // Add more URLs for other API calls
      ];

      const options = {
        revalidateOnMount: true,
        revalidateOnFocus: true,
      };

      const fetchData = async () => {
        try {
          const [data1, data2, data3, data4, data5, data6, data7, data8] = await Promise.all([
            fetcher(urls[0]),
            fetcher(urls[1]),
            fetcher(urls[2]),
            fetcher(urls[3]),
            fetcher(urls[4]),
            fetcher(urls[5]),
            fetcher(urls[6]),
            fetcher(urls[7])
            // Add more fetcher calls for other data sets
          ]);
          
          setTFO(data1);
          setBTR(data2);
          setOne(data3);
          setTwo(data4);
          setThree(data5)
          setFour(data6);
          setFive(data7)
          setSix(data8)
          setIsLoading(false);

          return data1

          console.log(tfo, btr, one, two);
          // Set other data states
        } catch (error) {
          console.error(error);
          setIsLoading(false);
        }
      };

      console.log()


      useEffect(() => {
      const timeout =  setTimeout(() => {
          fetchData();
        }, 500);
    
        // Cleanup function
        return () => clearTimeout(timeout);
      }, [payload]);

      if (isLoading) {
        return <div>Loading...</div>;
      }

    
    
      
    
    
      // const { data: three, error: error5 } = useSWR(urls[4], fetcher, options);
      // const { data: four, error: error6 } = useSWR(urls[5], fetcher, options);
      // const { data: five, error: error7 } = useSWR(urls[6], fetcher, options);
      // const { data: six, error: error8 } = useSWR(urls[7], fetcher, options);
     // console.log(tfo, btr, one, two);


  return (
    <div className='w-[100%] grid grid-cols-2 gap-3'>
      <div className='col-span-2 flex flex-col items-center bg-white rounded-md shadow-md'>
  
       <MainCard />
        
      </div>
    <BarChart bardata={tfo} yLabel="Revenue" title="Top Five Terms by Revenue" />
    <BarChart bardata={btr} yLabel="Revenue" title="Bottom Five Terms by Revenue" />
    <BarChart bardata={one} yLabel="Cost of Revenue" title="Top Five Terms by Cost of Revenue" />
    <BarChart bardata={two} yLabel="Cost of Revenue" title='Bottom Five Terms by Cost of Revenue' />
    <BarChart bardata={three} yLabel="Operating Income" title='Top Five Terms by Operating Income' />
    <BarChart bardata={four} yLabel="Operating Income" title='Bottom Five Terms by Operating Income' />
    <div className='col-span-2 w-[100%] flex justify-center'>
    <FunnelChart labels="Most Frequent Terms And Associated Financials" funneldata={five} />
    </div>
    <div className='col-span-2 w-[100%] flex justify-center'>
    <FunnelChart labels="Least Frequent Terms And Associated Financials" funneldata={six} />
    </div>
    </div>
  )
}

export default Main