/* eslint-disable react/jsx-key */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-unused-vars */
import { useState, useRef, useEffect } from 'react';
import { Bars, LineWave } from  'react-loader-spinner'
import Fliter from './components/Fliter';
import Query from './components/Query';
import { BiFlag, BiSolidCircleThreeQuarter } from 'react-icons/bi'
import { MdOutlineAttachMoney, MdOutlineAccountBalance } from 'react-icons/md'
import { Bars, LineWave } from  'react-loader-spinner'
import FixedHeader from './components/FixedHeader';
import SideBar from './components/SideBar';
import Main from './components/Tabs/Main';
import Finance from './components/Tabs/Finance';
import Terms from './components/Tabs/Terms';
import TreeMapChart from './Treemap';
import FunnelChart from './FunnelChart';
import Map from './Map';
import Cloud from './Word';

import MainCard from './components/MainCard';
import StockCard from './components/StockCard';
import Country from './components/filters/Countries';
import Sectors from './components/filters/Sectors';
import Terms from './components/filters/Terms';
import Companies from './components/filters/Companies';
import Term from './components/filters/Term';
//import NumberAnimation from './components/NumberAnimation';
import BarChart from './BarChart';
import { MdOutlineAccountBalance } from 'react-icons/md'
import Card from './components/Card';
import React,{ useState } from 'react';
import useSWR,{ SWRConfig } from 'swr';
import Carousel from './components/Carousel';
import Test from './Test';
import axios from 'axios';

function App() {
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

      const [isLoading, setIsLoading] = useState(true);
      const [data, setData] = useState([]);

      const My_Component = <MdOutlineAccountBalance color='white' />
      const My_Component2 = <BiFlag color='white' />
      const My_Component3 = <BiSolidCircleThreeQuarter color='white' />
      const My_Component4 = <MdOutlineAttachMoney color='white' />

      
          const urls = [
            'https://data-value-tool.up.railway.app/get_filters',
            'https://data-value-tool.up.railway.app/companies-countries-sectors',
            'https://data-value-tool.up.railway.app/total-financials',
            'https://data-value-tool.up.railway.app/average-financials'
            // Add more URLs for other API calls
          ];
        
          const fetcher = async (url) => {
            const response = await axios.post(url, payload);
            const data = JSON.parse(response.data)
            setIsLoading(false)
            return data;
          };
        
          const { data: data1, error: error1 } = useSWR(urls[0], fetcher);
          const { data: card, error: error2 } = useSWR(urls[1], fetcher);
          const { data: card2, error: error3 } = useSWR(urls[2], fetcher);
          const { data: card3, error: error4 } = useSWR(urls[3], fetcher);
          console.log(card3)
          
          

          const Tabs = [
            <Main regions={regions} sector={sectors} terms={terms} country={country} companies={companies} />,
            <Finance regions={regions} sector={sectors} terms={terms} country={country} companies={companies} />,
            <Terms regions={regions} sector={sectors} terms={terms} country={country} companies={companies} />,
          ]
          
          
        // const allDataLoaded = urls.every((url) => {
        //     const { data } = useSWR(url, fetcher, {suspense: true});
        //    // console.log(data)
            
        //     console.log(counter + data)
        //     return data;
        //   });
        //   console.log(allDataLoaded)
        if (isLoading) {
          return <div className='w-[100vw] h-[100vh] bg-white flex justify-center items-center'>
            {/* <Head>
              <title>Loading</title>
           </Head>  */}
            <Bars
        height="80"
        width="80"
        color="#1652f0"
        ariaLabel="bars-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
          </div>;
        }  


  return (
    <div className='flex max-w-[100vw] min-h-screen bg-[#e3edf7] flex-row'>
      
      <SideBar setCurrentIndex={setCurrentIndex} currentIndex={currentIndex} />
      <div className='h-full px-6 w-[80%]'>
      <FixedHeader card={card} regions={regions} sector={sectors} setSectors={setSectors} companies={companies} setCompanies={setCompanies} country={country} setCountry={setCountry} setRegions={setRegions} terms={terms} setTerms={setTerms} cardthree={card3} cardtwo={card2} list={data1} setCurrentIndex={setCurrentIndex} currentIndex={currentIndex} />
      
      {Tabs[currentIndex]}
      </div>
    {/* {allDataLoaded ? (
      // Render your component with the retrieved data
      <div>Your Component</div>
    ) : (
      // Render loading state while data is being fetched
      <div>Loading...</div>
    )} */}
    </div>
  )
}

export default App