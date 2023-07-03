/* eslint-disable no-extra-semi */
/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect} from 'react'


function Term({ term, setTerm, data }) {
    const [list, setList] = useState(['list'])
    
  

    function handleTagSelection(tag) {
        setTerm(tag)
      };
  
    
    // const handleClick = () => {
    //   const value = 'Example Value'; // The value to be pushed
    //   onValueChange(value);
    // };

    
    if (typeof selectedTags === 'undefined') {
      // Handle the case where selectedTags is undefined
      return null; // or render a fallback UI
    }
    

  return (
    <div className='flex flex-wrap '>
    {/* Render the selected tags */}
    
    {/* Render the dropdown */}
    <select className='bg-[#051131] w-[100%] rounded-xl text-white' onChange={(event) => handleTagSelection(event.target.value)}>
      {/* map of the dropdown list */}
      <option disabled={term === `All`} value={`All`}>All Terms</option>
      {data?.Terms.map((item, index) => (
        <option disabled={term === `${item}`} value={`${item}`}>{item}</option>
      ))}
      {/* Add more options as needed */}
    </select>
   
    
  </div>
  )
}

export default Term