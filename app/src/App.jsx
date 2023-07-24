/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-key */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-unused-vars */
import React,{ useState, useEffect } from 'react';
import FixedHeader from './components/FixedHeader';
import { BiFlag, BiSolidCircleThreeQuarter } from 'react-icons/bi'
import { MdOutlineAttachMoney, MdOutlineAccountBalance } from 'react-icons/md'
import { Bars, LineWave } from  'react-loader-spinner'
import SideBar from './components/SideBar';
import Main from './components/Tabs/Main';
import Finance from './components/Tabs/Finance';
import Terms from './components/Tabs/Terms'
import useSWR from 'swr';
import axios from 'axios';

function App() {
    const [country, setCountry] = useState(['All'])
    const [regions, setRegions] = useState(['All'])
    const [companies, setCompanies] = useState(['All'])
    const [terms, setTerms] = useState(['All'])
    const [yearRange, setYearRange] = useState([2012, 2022]);
    const [sectors, setSectors] = useState(['All'])
    const [counter, setCounter] = useState(0)
    const [card, setCard] = useState(null)
    const [card2, setCard2] = useState(null)
    const [card3, setCard3] = useState(null)
    const [data1, setData1] = useState(null)
    const [currentIndex, setCurrentIndex] = useState(0)

    console.log(yearRange)

    

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
          
          const options = {
            revalidateOnMount: true,
            revalidateOnFocus: true,
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
              
              setData1(data1)
              setCard(data2)
              setCard2(data3)
              setCard3(data4)
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
        
          // const { data: data1, error: error1 } = useSWR(urls[0], fetcher);
          //const { data: card, error: error2 } = useSWR(urls[1], fetcher);
          //const { data: card2, error: error3 } = useSWR(urls[2], fetcher);
          // const { data: card3, error: error4 } = useSWR(urls[3], fetcher);

          const Tabs = [
            <Main list={data1} yearRange={yearRange} regions={regions} sectors={sectors} terms={terms} country={country} companies={companies} />,
            <Finance yearRange={yearRange} regions={regions} sectors={sectors} terms={terms} country={country} companies={companies} />,
            <Terms yearRange={yearRange} regions={regions} sectors={sectors} terms={terms} country={country} companies={companies} />,
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
      <FixedHeader yearRange={yearRange} setYearRange={setYearRange} card={card} regions={regions} sector={sectors} setSectors={setSectors} companies={companies} setCompanies={setCompanies} country={country} setCountry={setCountry} setRegions={setRegions} terms={terms} setTerms={setTerms} cardthree={card3} cardtwo={card2} list={data1} setCurrentIndex={setCurrentIndex} currentIndex={currentIndex} />
      
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