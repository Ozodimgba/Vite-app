/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unreachable */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React,{useState, useEffect} from 'react'
import Map from '../../Map'
import Cloud from '../../Word'
import BarChart from '../../BarChart';
import HeatmapChart from '../../Heatmap';
import useSWR from 'swr';
import axios from 'axios';

function Terms({ yearRange, regions, country, companies, sectors, terms }) {
    //const [yearRange, setYearRange] = useState([2012, 2022]);
    const [counter, setCounter] = useState(0)
    const [currentIndex, setCurrentIndex] = useState(0)
    const [ quarter, setQuarter] = useState(null)
    const [isLoading, setIsLoading] = useState(true);
    const [ tfr, setTFR] = useState(null)

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
        'https://data-value-tool.up.railway.app/individual-quarterly-terms-count',
        'https://data-value-tool.up.railway.app/terms-frequencies-over-years-quarter'
      ];
    
      const fetcher = async (url) => {
        const response = await axios.post(url, payload);
        const data = JSON.parse(response.data)
        console.log(JSON.stringify(data))
        return data;
      };

      const fetchData = async () => {
        try {
          const [data1, data2] = await Promise.all([
            fetcher(urls[0]),
            fetcher(urls[1]),
            
            // Add more fetcher calls for other data sets
          ]);
          
          setQuarter(data1);
          setTFR(data2)
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
        const timeout =  setTimeout(() => {
            fetchData();
          }, 500);
      
          // Cleanup function
          return () => clearTimeout(timeout);
        }, [payload]);

    
     // const { data: quarter, error: error1 } = useSWR(urls[0], fetcher);
     // const { data: tfr, error: error2 } = useSWR(urls[1], fetcher);
      
      
  return (
    <div className='flex flex-col items-center gap-4'>
        
        <div className='w-[80%]'>
      <BarChart bardata={quarter} yLabel="Terms count" title='Keyword Breakdown By Quarter' footnote="NB: This visualization illustrates the overall frequencies of terms across individual quarters. It provides an overview of the occurrences of various terms throughout each quarter."/>
      </div>
       <HeatmapChart heatdata={tfr} />
       <div className='bg-[#141414] px-2 flex text-center rounded-lg'>
      <Cloud yearRange={yearRange} regions={regions} sectors={sectors} terms={terms} country={country} companies={companies} />
      </div>
        <Map yearRange={yearRange} regions={regions} sectors={sectors} terms={terms} country={country} companies={companies} />
    </div>
  )
}

export default Terms