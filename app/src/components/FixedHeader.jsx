/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unreachable */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React,{useState} from 'react'
import { BiFlag, BiSolidCircleThreeQuarter } from 'react-icons/bi'
import { MdOutlineAttachMoney, MdOutlineAccountBalance } from 'react-icons/md'
import YearRange from '../Range'
import Fliter from './Fliter'
import Card from './Card'
import Country from './filters/Countries'
import Sectors from './filters/Sectors'
import Companies from './filters/Companies'
import Carousel from './Carousel'
import Query from './Query'
import Terms from './filters/Terms'

function FixedHeader({ yearRange, setYearRange, card, cardtwo, terms, setTerms, sectors, setSectors, regions, companies, setCompanies, setRegions, country, setCountry, cardthree, currentIndex, setCurrentIndex, list }) {

  
  const [selectedTags, setSelectedTags] = useState([]);
  //console.log(yearRange)

  const My_Component = <MdOutlineAccountBalance color='white' />
  const My_Component2 = <BiFlag color='white' />
  const My_Component3 = <BiSolidCircleThreeQuarter color='white' />
  const My_Component4 = <MdOutlineAttachMoney color='white' />

  function removeTag(tag) {
    const updatedTags = selectedTags.filter((selectedTag) => selectedTag !== tag);
    setRegions((prevRegions) => prevRegions.filter((region) => region !== tag));
    setCompanies((prevCompanies) => prevCompanies.filter((company) => company !== tag));
    setSectors((prevSectors) => prevSectors.filter((sector) => sector !== tag));
    setTerms((prevTerms) => prevTerms.filter((term) => term !== tag));
    setCountry((prevCountries) => prevCountries.filter((countrys) => countrys !== tag));
    setSelectedTags(updatedTags);
  }

  const slides = [<div className='grid grid-cols-3 w-[100%] relative gap-6'>
      <Card title="Company Count By User Filter" color="bg-blue-800" number={card?.companies_present} icon={My_Component}  duration={5000} />
      <Card title="Country Count By User Filter" color="bg-purple-600" number={card?.countries_present} icon={My_Component2}  duration={5000} />
      <Card title="Sectors Count By User Filter" color="bg-orange-500" number={card?.sectors_present} icon={My_Component3}  duration={5000} />
      </div>, <div className='grid grid-cols-3 w-[100%] relative gap-6'>
      <Card title="Consolidated Revenue Across Companies By User Filter" color="bg-purple-600" number={cardtwo?.total_revenue} icon={My_Component4}  duration={5000} />
    <Card title="Consolidated Operating Income Across Companies By User Filter" color="bg-purple-600" number={cardtwo?.total_operating_income} icon={My_Component4} duration={5000} />
    <Card title="Consolidated Gross Profit Across Companies By User Filter" color="bg-purple-600" number={cardtwo?.total_gross_profit} icon={My_Component4}  duration={5000} /> 
      </div>, <div className='grid grid-cols-3 w-[100%] relative gap-6'>
      <Card title="Average Revenue Across Companies By User Filter" color="bg-orange-500" number={cardthree?.average_revenue}  icon={My_Component4} duration={5000} />
    <Card title="Average Operating Income Across Companies By User Filter" color="bg-orange-500" number={cardthree?.average_operating_income}  icon={My_Component4} duration={5000} />
    <Card title="Average Gross Profit Across Companies By User Filter" color="bg-orange-500" number={cardthree?.average_gross_profit} icon={My_Component4} duration={5000} /> 
     
      </div>];
    

  return (
    <div className='w-full max-w-[100vw] overflow-hidden relative z-40 bg-[#e3edf7] pb-3 h-full'>
      <div className='w-full sticky top-0 right-0'>
      <div className='w-[100%] flex flex-row justify-between items-center'>
      <div className='w-[30%] flex flex-col py-3'>
      <h1 className='text-3xl text-[#1b254b] font-bold'>FinScope</h1>
      <br/>
      <h1 className='text-sm text-[#1b254b] font-bold'> Interactive Analysis & Visualization of Keyword Trends in Quarterly Financial Reports & Organizational Performance</h1>
      </div>
      <div className='w-[50%] z-50 pt-[2%] pr-5 h-full'>
        <Query />
      </div>
      </div>
     
      <div className='w-[100%] py-1'>
        <YearRange yearRange={yearRange} setYearRange={setYearRange} />
      </div>
    <div className='flex justify-between gap-2 border-white rounded-full bg-[#051131] mt-4 py-2 px-2'>
     <Fliter data={list} setSelectedTags={setSelectedTags} selectedTags={selectedTags} setRegions={setRegions} regions={regions} />
     <Country data={list} setSelectedTags={setSelectedTags} selectedTags={selectedTags} setCountry={setCountry} country={country} />
     <Sectors data={list} setSelectedTags={setSelectedTags} selectedTags={selectedTags} setCountry={setSectors} country={sectors} />
     <Companies data={list} setSelectedTags={setSelectedTags} selectedTags={selectedTags} setCountry={setCompanies} country={companies} />
     <Terms data={list} setSelectedTags={setSelectedTags} selectedTags={selectedTags} setCountry={setTerms} country={terms} />
      </div>
     <div className='flex flex-wrap mt-2 w-[100%] gap-2'>
      {selectedTags.map((tag, index) => (
        <div className='cursor-pointer border-[#051131] text-[#051131] px-4 rounded-full border-[2px]' key={index}>{tag} <button onClick={() => removeTag(tag)}>x</button></div>
      ))}
    </div>
    </div>
    <h4 className='text-xl text-[#1b254b] font-bold'>Data at a Glance</h4>
    <Carousel slides={slides} />
     </div>
  )
}

export default FixedHeader