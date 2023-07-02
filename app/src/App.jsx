/* eslint-disable react/jsx-key */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-unused-vars */
import { useState, useRef, useEffect } from 'react';
import { Bars } from  'react-loader-spinner'
import Fliter from './components/Fliter';
import Query from './components/Query';
//import { BsChatLeftTextFill } from 'react-icons/bs';
import { BiFlag, BiSolidCircleThreeQuarter } from 'react-icons/bi'
import { MdOutlineAttachMoney } from 'react-icons/md'
import TreeMapChart from './Treemap';
import FunnelChart from './FunnelChart';
import { WorldMap } from './Map';
import Cloud from './Word';

import MainCard from './components/MainCard';
import StockCard from './components/StockCard';
import Country from './components/filters/Countries';
import Sectors from './components/filters/Sectors';
import Terms from './components/filters/Terms';
import Companies from './components/filters/Companies';
//import NumberAnimation from './components/NumberAnimation';
import BarChart from './BarChart';
import { MdOutlineAccountBalance } from 'react-icons/md'
import Card from './components/Card';
import axios from 'axios';
import HeatmapChart from './Heatmap';




export default function Home() {

 // const [isOpen, setIsOpen] = useState(true);
 
  const [currentIndex, setCurrentIndex] = useState(0)
  //const [filter, setFilter] = useState("Regions");
  const [quarter, setQuarter] = useState(null)
  const [country, setCountry] = useState(['All'])
  const [regions, setRegions] = useState(['All'])
  const [companies, setCompanies] = useState(['All'])
  const [selectedTags, setSelectedTags] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sectors, setSectors] = useState(['All'])
  const [terms, setTerms] = useState(['All'])
  const [list, setList] = useState(null)
  const [tfr, setTfr] = useState(null)
  const [tfo, setTfo] = useState(null)
  const [btr, setBtr] = useState(null)
  const [one, setOne] = useState(null)
  const [two, setTwo] = useState(null)
  const [three, setThree] = useState(null)
  const [four, setFour] = useState(null)
  const [five, setFive] = useState(null)
  const [six, setSix] = useState(null)
  const [seven, setSeven] = useState(null)
  const [eight, setEight] = useState(null)
  const [nine, setNine] = useState(null)
  const [ten, setTen] = useState(null)
  const [eleven, setEleven] = useState(null)
  const [card, setCard] = useState(null);
  const [open, setOpen] = useState(false)
  const [cardtwo, setCardtwo] = useState(null)
  const [cardthree, setCardthree] = useState(null)
  const [drop, setDrop] = useState([
    {
      name: "North America"
    },
    {
      name: "Europe"
    },
    {
      name: "Africa"
    },
    {
      name: "South America"
    },
    {
      name: "Oceania"
    },
  ]);
  const divRef = useRef(null);

  const payload = {
    "from_year": 2012,
    "to_year": 2019,
    "regions": regions,
    "countries": country,
    "companies": companies,
    "sectors": sectors,
    "terms": terms
  }

  const payloadTwo = {
    "from_year": 2012,
    "to_year": 2019,
    "regions": regions,
    "countries": country,
    "companies": companies,
    "sectors": sectors,
    "terms": terms,
    "term": "Cloud"
  }
  
  

      useEffect(() => {
        const fetchData = async () => {
          const url = 'https://data-value-tool.up.railway.app/get_filters'
          const url2 = 'https://data-value-tool.up.railway.app/companies-countries-sectors'
          const url3 = 'https://data-value-tool.up.railway.app/individual-quarterly-terms-count';
          const url4 = 'https://data-value-tool.up.railway.app/terms-frequencies-over-years-quarter';
          const url5 = 'https://data-value-tool.up.railway.app/top-5-terms-by-revenue';
          const url6 = 'https://data-value-tool.up.railway.app/total-financials';
          const url7 = 'https://data-value-tool.up.railway.app/average-financials';
          const url8 = 'https://data-value-tool.up.railway.app/bottom-5-terms-by-revenue';
          const url9 = 'https://data-value-tool.up.railway.app/top-5-terms-by-cost-of-revenue';
          const url10 = 'https://data-value-tool.up.railway.app/bottom-5-terms-by-cost-of-revenue';
          const url11 = 'https://data-value-tool.up.railway.app/top-5-terms-by-operating-income';
          const url12 = 'https://data-value-tool.up.railway.app/bottom-5-terms-by-operating-income';
          const url13 = 'https://data-value-tool.up.railway.app/top-5-terms-and-corresponding-financials';
          const url14 = 'https://data-value-tool.up.railway.app/bottom-5-terms-and-corresponding-financials';
          const url15 = 'https://data-value-tool.up.railway.app/percentage-change-in-stock-price-and-market-cap';
          const url16 = 'https://data-value-tool.up.railway.app/average-revenue-variation-over-quarters-and-years';
          const url17 = 'https://data-value-tool.up.railway.app/average-operating-income-variation-over-quarters-and-years';
          const url18 = 'https://data-value-tool.up.railway.app/average-gross-profit-variation-over-quarters-and-years';
          const url19 = 'https://data-value-tool.up.railway.app/average-financials-for-individual-terms';

      
          try {
            const response1 = await axios.post(url, payload);
            const response2 = await axios.post(url2, payload);
            const response3 = await axios.post(url3, payload);
            const response4 = await axios.post(url4, payload);
            const response5 = await axios.post(url5, payload);
            const response6 = await axios.post(url6, payload);
            const response7 = await axios.post(url7, payload);
            const response8 = await axios.post(url8, payload);
            const response9 = await axios.post(url9, payload);
            const response10 = await axios.post(url10, payload);
            const response11 = await axios.post(url11, payload);
            const response12 = await axios.post(url12, payload);
            const response13 = await axios.post(url13, payload);
            const response14 = await axios.post(url14, payload);
            const response15 = await axios.post(url15, payload);
            const response16 = await axios.post(url16, payload);
            const response17 = await axios.post(url17, payload);
            const response18 = await axios.post(url18, payload);
            const response19 = await axios.post(url19, payloadTwo);

            setList(JSON.parse(response1.data))
            setCard(JSON.parse(response2.data))
            setQuarter(JSON.parse(response3.data));
            setTfr(JSON.parse(response4.data))
            setTfo(JSON.parse(response5.data))
            setCardtwo(JSON.parse(response6.data))
            setCardthree(JSON.parse(response7.data))
            setBtr(JSON.parse(response8.data))
            setOne(JSON.parse(response9.data))
            setTwo(JSON.parse(response10.data))
            setThree(JSON.parse(response11.data))
            setFour(JSON.parse(response12.data))
            setFive(JSON.parse(response13.data))
            setSix(JSON.parse(response14.data))
            setSeven(JSON.parse(response15.data))
            setEight(JSON.parse(response16.data))
            setNine(JSON.parse(response17.data))
            setTen(JSON.parse(response18.data))
            setEleven(JSON.parse(response19.data))
            setIsLoading(false)
           // console.log(card);
          //console.log(list)
          } catch (error) {
            console.error(error);
          }
        };

        fetchData();
      }, [payload]);

console.log("here" + JSON.stringify(eleven))
//console.log(cardtwo["Total Revenue"])
// function formatNumber(value) {
//   const trillion = 1000000000000;
//   const billion = 1000000000;

//   if (value >= trillion) {
//     const roundedValue = (value / trillion).toFixed(2);
//     return roundedValue;
//   } else if (value >= billion) {
//     const roundedValue = (value / billion).toFixed(2);
//     return roundedValue;
//   } else {
//     const roundedValue = value.toFixed(2);
//     return roundedValue;
//   }
// }



  // const SectorsHead = ["All sectors"]
  // console.log("find" + JSON.stringify(list))
  // const handleClick = (listname) => {
  //   setIsOpen(!isOpen);
  //   setFilter(listname)
  // };

  // const handleClickCountry = (listname) => {
  //   setIsOpen(!isOpen);
  //   setFilter('Countries')
  // };

  // function handlePush({ tag }) {
  //   SectorsHead.push(`${tag}`);
  //   console.log(SectorsHead)
  // }


  //Barcharts Main page

  const IndvQuarterBarChart = {
    chart: {
      type: quarter?.type
    },
    series: [
      {
        name: 'My Dataset',
        data: quarter?.data
      }
    ],
    xaxis: {
      categories: quarter?.labels
    },
    plotOptions: {
      bar: {
        horizontal: true,
        dataLabels: {
          position: 'top',
        },
      }
    },
    title: {
      text: 'Individual quarterly terms count'
    },
  };

  
  const BottomRevBarChart = {
    chart: {
      type: quarter?.type
    },
    series: [
      {
        name: 'My Dataset',
        data: btr?.data
      }
    ],
    xaxis: {
      labels: {
        show: false,
      },
      categories: btr?.labels
    },
    plotOptions: {
      bar: {
        columnWidth: '50%',
        horizontal: false,
        dataLabels: {
          position: 'top',
        },
      }
    },
    dataLabels: {
      formatter: (val) => {
        return val / 100000000 + 'B'
      },
      enabled: false,
    },
    title: {
      text: 'Bottom Five terms by Revenue'
    },
  };

  const TopCostRevBarChart = {
    chart: {
      type: quarter?.type
    },
    series: [
      {
        name: 'My Dataset',
        data: one?.data
      }
    ],
    xaxis: {
      categories: one?.labels
    },
    plotOptions: {
      bar: {
        horizontal: true,
        dataLabels: {
          position: 'top',
        },
      }
    },
    dataLabels: {
      formatter: (val) => {
        return val / 100000000 + 'B'
      }
    },
    title: {
      text: 'Top Five terms by cost of revenue'
    },
  };

  const BottomCostRevBarChart = {
    chart: {
      type: quarter?.type
    },
    series: [
      {
        name: 'My Dataset',
        data: two?.data
      }
    ],
    xaxis: {
      categories: two?.labels
    },
    plotOptions: {
      bar: {
        horizontal: true,
        dataLabels: {
          position: 'top',
        },
      }
    },
    dataLabels: {
      formatter: (val) => {
        return val / 100000000 + 'B'
      }
    },
    title: {
      text: 'Bottom Five terms by cost of revenue'
    },
  };

  const TopbyOptIncome = {
    chart: {
      type: quarter?.type
    },
    series: [
      {
        name: 'My Dataset',
        data: three?.data
      }
    ],
    xaxis: {
      categories: three?.labels
    },
    plotOptions: {
      bar: {
        horizontal: true,
        dataLabels: {
          position: 'top',
        },
      }
    },
    dataLabels: {
      formatter: (val) => {
        return val / 100000000 + 'B'
      }
    },
    title: {
      text: 'Top Five terms by operating income'
    },
  };

  const BottombyOptIncome = {
    chart: {
      type: quarter?.type
    },
    series: [
      {
        name: '',
        data: four?.data
      }
    ],
    xaxis: {
      categories: four?.labels
    },
    plotOptions: {
      bar: {
        horizontal: true,
        dataLabels: {
          position: 'top',
        },
      }
    },
    dataLabels: {
      formatter: (val) => {
        return val / 100000000 + 'B'
      }
    },
    title: {
      text: 'Bottom Five terms by operating income'
    },
  };

  // const options = {
  //   chart: {
  //     type: quarter?.type
  //   },
  //   series: [
  //     {
  //       name: 'My Dataset',
  //       data: quarter?.data
  //     }
  //   ],
  //   xaxis: {
  //     categories: quarter?.labels
  //   }
  // };

  const series_data = []

  for (let i = 0; i < tfr?.labels.length; i++) {
    const series_element = {
      name : tfr?.labels[i],
      data : tfr?.data[i]
    }

    series_data.push(series_element)
    
  }

  const heatmapOptions = {
    chart: {
      type: tfr?.type
    },
    series: series_data,
    colors: ["#1652f0"],
    title: {
      text: 'Terms frequency over years quarters'
    },
  };

  console.log( "treemap"+ JSON.stringify(eight?.data[0].data))

  const treemapOptions = {
    series: [{
      data: eight?.data[0].data
    }],
    options: {
      legend: {
        show: true
      },
      chart: {
        height: 350,
        type: 'treemap'
      },
      title: {
        text: 'Basic Treemap'
      }
    },
  
  };

  const AvrgOpIncOptions = {
    series: [{
      data: nine?.data[0].data
    }],
    options: {
      legend: {
        show: true
      },
      chart: {
        height: 350,
        type: 'treemap'
      },
      title: {
        text: 'Basic Treemap'
      }
    },
  
  };

  const AvrgGrssPrftOptions = {
    series: [{
      data: ten?.data[0].data
    }],
    options: {
      legend: {
        show: true
      },
      chart: {
        height: 350,
        type: 'treemap'
      },
      title: {
        text: 'Basic Treemap'
      }
    },
  
  };

 
  
    
    //labels: tfo?.labels,


  //duplicate this and rename to radialThreeOptions


  //   const Tabs = [
  //     // eslint-disable-next-line react/jsx-key
  //     <div className='grid grid-cols-2 justify-between h-[100%] w-[100%]'>

  //       <div className='w-[100%] flex justify-center'>
  //       <div className='bg-white w-[70%] rounded-lg p-3 mt-4'>
  //     <ApexCharts options={TopRevBarChart} series={TopRevBarChart.series} type='bar' /> 
  //     </div>
  //       </div>
        
      
        
      
  //       <div className='w-[100%] flex justify-center'>
  //     <div className='bg-white w-[70%] rounded-lg p-3 mt-4'>
  //     <ApexCharts options={BottomRevBarChart} series={BottomRevBarChart.series} type='bar' /> 
  //     </div>
  //     </div>

  //     <div className='w-[100%] flex justify-center'>
  //     <div className='bg-white w-[70%] rounded-lg p-3 mt-4'>
  //     <ApexCharts options={TopCostRevBarChart} series={TopCostRevBarChart.series} type='bar' /> 
  //     </div>
  //     </div>

  //     <div className='w-[100%] flex justify-center'>
  //     <div className='bg-white w-[70%] rounded-lg p-3 mt-4'>
  //     <ApexCharts options={BottomCostRevBarChart} series={BottomCostRevBarChart.series} type='bar' /> 
  //     </div>
  //     </div>

  //     <div className='w-[100%] flex justify-center'>
  //     <div className='bg-white w-[70%] rounded-lg p-3 mt-4'>
  //     <ApexCharts options={TopbyOptIncome} series={TopbyOptIncome.series} type='bar' /> 
  //     </div>
  //     </div>

  //     <div className='w-[100%] flex justify-center'>
  //     <div className='bg-white w-[70%] rounded-lg p-3 mt-4'>
  //     <ApexCharts options={BottombyOptIncome} series={BottombyOptIncome.series} type='bar' /> 
  //     </div>
  //     </div>
      
  //     </div>,
    
  //   //Financials
  //     // eslint-disable-next-line react/jsx-key
  //     <div className='flex flex-wrap justify-between h-[100%] w-[100%]'>
  //       
  //       <div className='bg-white w-[100%] mt-4'>
  //     <ApexCharts options={treemapOptions} series={treemapOptions.series} type='treemap' /> 
  //     </div>

  //     <div className='bg-white w-[100%] mt-4'>
  //     <ApexCharts options={AvrgOpIncOptions} series={AvrgOpIncOptions.series} type='treemap' /> 
  //     </div>

  //     <div className='bg-white w-[100%] mt-4'>
  //     <ApexCharts options={AvrgGrssPrftOptions} series={AvrgGrssPrftOptions.series} type='treemap' /> 
  //     </div>
      
  //     {/* <div className='bg-blue-400 mt-4'>
  //     <ApexChart options={radialTwoOptions} series={radialTwoOptions.series} type={radialTwoOptions.chart.type} /> 
  //     </div>

  //     <div className='bg-blue-400 mt-4'>
  //     <ApexChart options={radialTwoOptions} series={radialTwoOptions.series} type={radialTwoOptions.chart.type} /> 
  //     </div> */}

  //     {/* <div className='bg-black mt-4'>
  //     <ApexChart options={options} series={options.series} type={options.chart.type} /> 
  //     </div> */}
  //     </div>,

  //     // eslint-disable-next-line react/jsx-key
  //     <div className='flex flex-wrap justify-between h-[100%] w-[100%]'>
  //       <div className='w-[100%] flex justify-center'>
  //     <div className='bg-white w-[70%] rounded-lg p-3 mt-4'>
  //     <ApexCharts options={IndvQuarterBarChart} series={IndvQuarterBarChart.series} type='bar' /> 
  //     </div>
  //     </div>

  //     <div className='w-[100%] flex justify-center'>
  //     <div className='bg-white w-[70%] rounded-lg p-3 mt-4'>
  //     <ApexCharts options={heatmapOptions} series={heatmapOptions.series} type={heatmapOptions.chart.type} />
  //     </div>
  //     </div>

  //       {/* <div className='bg-white mt-4'>
  //     <ApexChart options={options} series={options.series} type={options.chart.type} /> 
  //     </div> */}
  //     </div>
  // ]

  const Tabs = [
    <div className='w-[100%] grid grid-cols-2 gap-3'>
      <div className='col-span-2'>
        <MainCard data={eleven} dropdata={list} />
      </div>
    <BarChart bardata={tfo} title="Top Five terms by Revenue" />
    <BarChart bardata={btr} title="Bottom Five terms by Revenue" />
    <BarChart />
    <BarChart />
    <BarChart />
    <BarChart />
    </div>,
    <div className='w-[100%] gap-6 flex flex-col items-center justify-center'>
    <StockCard data={seven} />
    <TreeMapChart />
    <TreeMapChart />
    <TreeMapChart />
    <FunnelChart />
    <FunnelChart />
    </div>,
    <div className='w-[100%] gap-6 flex flex-col items-center justify-center'>
      <HeatmapChart />
      <div className='bg-[#141414] px-2 flex text-center rounded-lg'>
      <Cloud />
      </div>
     
     <div className='col-span-2 w-[80%]'>
     <WorldMap />
     </div>
    </div>
  ]

function removeTag(tag) {
  const updatedTags = selectedTags.filter((selectedTag) => selectedTag !== tag);
  setRegions((prevRegions) => prevRegions.filter((region) => region !== tag));
  setCompanies((prevCompanies) => prevCompanies.filter((company) => company !== tag));
  setSectors((prevSectors) => prevSectors.filter((sector) => sector !== tag));
  setTerms((prevTerms) => prevTerms.filter((term) => term !== tag));
  setCountry((prevCountries) => prevCountries.filter((countrys) => countrys !== tag));
  setSelectedTags(updatedTags);
}

const My_Component = <MdOutlineAccountBalance color='white' />
const My_Component2 = <BiFlag color='white' />
const My_Component3 = <BiSolidCircleThreeQuarter color='white' />
const My_Component4 = <MdOutlineAttachMoney color='white' />


//BiSolidCircleThreeQuarter

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
    <main
      className={`flex min-h-screen bg-[#e3edf7] flex-row`}
    >
    {/* <Head>
        <title>Earning Explore || Data product LLC</title>
     </Head>  */}
     {/* <Fliter /> */}
     <div className='bg-white flex py-8 flex-col text-white sticky top-0 left-0 h-[100vh] px-2 w-[20%]'>
      <div className='border-[#1b254b] border-b-2 py-5 mx-3 flex'>
      <h1 className='font-bold text-[#1b254b] text-xl'>Earning Explorer</h1>
      
      </div>
      <>
      <div className='w-[100%] mt-2 flex'>
      <button onClick={() => setCurrentIndex(0)} className='w-[98%] py-2 rounded-sm flex justify-start px-3  cursor-pointer text-[#051131]'><h1>Main dashboard</h1></button>
      <div className={`w-[2%] rounded-sm ${ currentIndex === 0? 'bg-[#051131]' : 'bg-white'} `}></div>
      </div>
      <div className='w-[100%] mt-2 flex'>
      <button onClick={() => setCurrentIndex(1)} className='w-[98%] py-2 rounded-sm flex justify-start px-3  cursor-pointer text-[#051131]'><h1>Financial Visualization</h1></button>
      <div className={`w-[2%] rounded-sm ${ currentIndex === 1? 'bg-[#051131]' : 'bg-white'} `}></div>
      </div>
      <div className='w-[100%] mt-2 flex'>
      <button onClick={() => setCurrentIndex(2)} className='w-[98%] py-2 rounded-sm flex justify-start px-3  cursor-pointer text-[#051131]'><h1>Terms Visualization</h1></button>
      <div className={`w-[2%] rounded-sm ${ currentIndex === 2? 'bg-[#051131]' : 'bg-white'} `}></div>
      </div>
   
     </>

     {/* <div className='bg-blue-700 cursor-pointer flex justify-center items-center rounded-full h-[5rem] w-[5rem]'>
     <BsChatLeftTextFill size={38} />
     </div> */}
     </div>
     
     <div className='w-[80%] h-[100%] px-5 text-black py-5 flex flex-col items-center'>
      <div className='w-[100%] flex flex-row justify-between items-center'>
      <div className='w-[30%] flex flex-col py-3'>
      <h1 className='text-[0.8rem]'>Pages / { currentIndex === 1 && "Financial Visualization" } { currentIndex === 0 && "Main Dashboard" } { currentIndex === 2 && "Terms Visualization" }</h1>
      <h1 className='text-3xl text-[#1b254b] font-bold'>Earning Explorer</h1>
      </div>
      <div className='w-[50%]'>
        <Query />
      </div>
      </div>
     
     {/* <h1>Regions: {regions}</h1>
     <h1>Country: {country}</h1>
      <h1>Terms: {terms}</h1>
      <h1>Sectors: {sectors}</h1>
      <h1>Companies: {companies}</h1> */}
    <div className='flex gap-2 border-white rounded-full bg-[#051131] mt-4 py-2 px-2'>
     <Fliter data={list} setSelectedTags={setSelectedTags} selectedTags={selectedTags} setRegions={setRegions} regions={regions} />
     
     <Companies data={list} setSelectedTags={setSelectedTags} selectedTags={selectedTags} setCountry={setCompanies} country={companies} />
     <Country data={list} setSelectedTags={setSelectedTags} selectedTags={selectedTags} setCountry={setCountry} country={country} />
     <Terms data={list} setSelectedTags={setSelectedTags} selectedTags={selectedTags} setCountry={setTerms} country={terms} />
     <Sectors data={list} setSelectedTags={setSelectedTags} selectedTags={selectedTags} setCountry={setSectors} country={sectors} />
     </div>

    <div className='grid grid-cols-3 gap-6 mt-4'>
    <Card title="Companies Present Based On Filters" color="bg-blue-800" icon={My_Component} number={card["Companies Present"]} duration={3000} />
    <Card title="Countries Present Based On Filters" color="bg-purple-600" icon={My_Component2} number={card["Countries Present"]} duration={3000} />
    <Card title="Sectors Present Based On Filters" color="bg-orange-500" icon={My_Component3} number={card["Sectors Present"]} duration={3000} />

    <Card title="Total Revenue Across Companies" color="bg-purple-600" icon={My_Component4} number={cardtwo["Total Revenue"]} duration={3000} />
    <Card title="Total Operating Income Across Companies" color="bg-red-400" icon={My_Component4} number={cardtwo["Total Operating Income"]} duration={3000} />
    <Card title="Total Gross Profit Across Companies" color="bg-green-400" icon={My_Component4} number={cardtwo["Total Gross Profit"]} duration={3000} /> 

    <Card title="Average Revenue Across Companies" color="bg-orange-500"  icon={My_Component4} number={cardthree["Average Revenue"]} duration={3000} />
    <Card title="Average Operating Income Across Companies" color="bg-purple-600"  icon={My_Component4} number={cardthree["Average Operating Income"]} duration={3000} />
    <Card title="Average Gross Profit Across Companies" color="bg-blue-800" icon={My_Component4} number={cardthree["Average Gross Profit"]} duration={3000} /> 
    </div>
      

     <div className='flex flex-wrap mt-2 w-[100%] gap-2'>
      {selectedTags.map((tag, index) => (
        <div className='cursor-pointer border-[#051131] text-[#051131] px-4 rounded-full border-[2px]' key={index}>{tag} <button onClick={() => removeTag(tag)}>x</button></div>
      ))}
    </div>

     

     <div className=' h-[100%]  px-10 w-[100%] gap-2'>
     <h1 className='text-xl py-3 text-[#1b254b] font-bold'>Visualization</h1>
     {Tabs[currentIndex]}
     
     </div>
     
     </div>
    </main>
  )
}
