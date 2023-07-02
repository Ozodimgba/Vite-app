/* eslint-disable react/prop-types */
import { useEffect } from "react";
import Terms from "./filters/Terms";

const MainCard = ({ data, dropdata }) => {

    if (!data) {
      return null; // or render a fallback component/error message
    }
    
    const { 
      "Average Revenue": AvrgRev,
      "Average Revenue Cost": AvrgRevCost,
      "Average Operating Income": AvrgOprInc
    } = data;
  
   
  
    // function formatNumberWithTwoDecimals(number) {
    //   const formattedNumber = Number(number).toFixed(2);
    //   return formattedNumber;
    // }
  
    const formatNumber = (val) => {
      if (val >= 1000000000000) {
        // Trillion or more
        return `${(val / 1000000000000).toFixed(2)}T`;
      } else if (val >= 1000000000) {
        // Billion or more
        return `${(val / 1000000000).toFixed(2)}B`;
      } else if (val >= 1000000) {
        // Million or more
        return `${(val / 1000000).toFixed(2)}M`;
      } else if (val >= 1000) {
        // Thousand or more
        return `${(val / 1000).toFixed(2)}K`;
      } else {
        // Less than thousand
        return val;
      }
    };
  
    return (
      <div className="p-4 px-10 w-[100%] flex justify-between bg-white py-10 rounded-md shadow-md">
        <div className="text-black bg-black">
        
        <Terms data={dropdata} />
        </div>
        <div className="flex flex-col items-center justify-between mb-4">
          <div className="flex items-center">
          <span>Average Revenue</span>
        
          </div>
          <span className='font-bold text-2xl'>{formatNumber(AvrgRev)}</span>
        </div>
  
        <div className="flex flex-col items-center justify-between mb-4">
          <div className="flex items-center">
            <span>Average Revenue Cost</span>
          </div>
          <span className='font-bold text-2xl'>{formatNumber(AvrgRevCost)}</span>
        </div>
        <div className="flex flex-col items-center justify-between mb-4">
          <span>Average Operating Income</span>
          <span className='font-bold text-2xl'>{formatNumber(AvrgOprInc)}</span>
        </div>
      </div>
    );
  };
  
  export default MainCard;
  