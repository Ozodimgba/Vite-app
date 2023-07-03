/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from 'react';
import Slider, {  } from 'rc-slider';
import 'rc-slider/assets/index.css';

export default function YearRange ({ yearRange, setYearRange}){ 
    

    const handleYearChange = (values) => {
      setYearRange(values);
      console.log(yearRange)
    };

 return (
  <div style={{padding:10 }}>
    <Slider range 
    min={2012} 
    max={2022}
    tipProps={{
      className: 'bg-blue-500 text-white',
    }}
    defaultValue={yearRange}
    onChange={handleYearChange} 
    marks={{
          2012: '2012',
          2013: '2013',
          2014: '2014',
          2015: '2015',
          2016: '2016',
          2017: '2017',
          2018: '2018',
          2019: '2019',
          2020: '2020',
          2021: '2021',
          2022: '2022',
        }} 
    dots={true} />
  </div>
)}