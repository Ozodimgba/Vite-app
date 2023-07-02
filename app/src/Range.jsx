import { useState } from 'react';
import Slider, {  } from 'rc-slider';
import 'rc-slider/assets/index.css';

export default function YearRange (){ 
    const [yearRange, setYearRange] = useState([2012, 2022]);

    const handleYearChange = (values) => {
      setYearRange(values);
      console.log(values)
    };

 return (
  <div style={{padding:10 }}>
    <Slider range 
    min={2012} 
    max={2022}
    defaultValue={yearRange}
    onChange={handleYearChange} 
    marks={{
          2012: '2012',
          2013: '2013',
          2014: '2014',
          2016: '2016',
          2018: '2018',
          2020: '2020',
          2022: '2022',
        }} 
    dots={true} />
  </div>
)}