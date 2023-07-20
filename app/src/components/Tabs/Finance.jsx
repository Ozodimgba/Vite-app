import React,{useState} from 'react'
import useSWR from 'swr';
import axios from 'axios';
import StockCard from '../StockCard'
import TreeMapChart from '../../Treemap'
import Card from '../Card'

function Finance({ regions, country, companies, sectors, terms }) {
    const [yearRange, setYearRange] = useState([2012, 2022]);
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
    'https://data-value-tool.up.railway.app/average-operating-income-variation-over-quarters-and-years',
    'https://data-value-tool.up.railway.app/average-revenue-variation-over-quarters-and-years',
    'https://data-value-tool.up.railway.app/average-gross-profit-variation-over-quarters-and-years',
    'https://data-value-tool.up.railway.app/percentage-change-in-stock-price-and-market-cap'
           // Add more URLs for other API calls
      ];
    
      const fetcher = async (url) => {
        const response = await axios.post(url, payload);
        const data = JSON.parse(response.data)
        // console.log(JSON.stringify(data))
        return data;
      };
      
      const { data: seven, error: error0 } = useSWR(urls[3], fetcher);
      const { data: eight, error: error1 } = useSWR(urls[0], fetcher);
      const { data: nine, error: error2 } = useSWR(urls[1], fetcher);
      const { data: ten, error: error3 } = useSWR(urls[2], fetcher);
      
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