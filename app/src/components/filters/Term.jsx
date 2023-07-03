/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';

function Term({ data, term, setTerm }) {
  

  // Function to handle the selection change
  const handleTermChange = (event) => {
    setTerm(event.target.value);
  };

  return (
    <div>
      <select className='bg-[#051131] w-[18%] rounded-xl text-white' value={term} onChange={handleTermChange}>
        {/* map of the dropdown list */}
        <option value={`All`}>All Term</option>
        {/* Add more options as needed */}
        {data?.Terms.map((item, index) => (
        <option disabled={term === item} value={`${item}`}>{item}</option>
      ))}
      </select>
    </div>
  );
}

export default Term;
