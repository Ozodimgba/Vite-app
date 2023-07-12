import React,{useState} from 'react'
import Map from '../../Map'
import Cloud from '../../Word'
import BarChart from '../../BarChart';
import HeatmapChart from '../../Heatmap';
import useSWR from 'swr';
import axios from 'axios';

function Terms() {
    const [country, setCountry] = useState(['All'])
    const [regions, setRegions] = useState(['All'])
    const [companies, setCompanies] = useState(['All'])
    const [terms, setTerms] = useState(['All'])
    const [yearRange, setYearRange] = useState([2012, 2022]);
    const [sectors, setSectors] = useState(['All'])
    const [counter, setCounter] = useState(0)
    const [currentIndex, setCurrentIndex] = useState(0)

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
    
      const { data: quarter, error: error1 } = useSWR(urls[0], fetcher);
      const { data: tfr, error: error2 } = useSWR(urls[1], fetcher);
      
      
  return (
    <div className='flex flex-col items-center gap-4'>
        
        <div className='w-[80%]'>
      <BarChart bardata={quarter} yLabel="Terms count" title='Individual quarterly terms count' />
      </div>
       <HeatmapChart heatdata={tfr} />
       <div className='bg-[#141414] px-2 flex text-center rounded-lg'>
      <Cloud />
      </div>
        <Map />
    </div>
  )
}

export default Terms