import React,{ useState } from 'react'

function SideBar({ currentIndex, setCurrentIndex }) {
    
  return (
    <div className='bg-white flex py-8 flex-col text-white sticky top-0 left-0 h-[100vh] px-2 w-[20%]'>
      <div className='flex flex-col border-[#1b254b] pb-4 border-b-2 mx-3'>
      <div className='w-[70%]'>
      <img src='logo.png' />
      </div>
      
      </div>
      <>
      <div className='w-[100%] mt-2 flex'>
      <button onClick={() => setCurrentIndex(0)} className={`w-[98%] py-2 rounded-sm flex justify-start px-3  cursor-pointer text-[#051131] ${ currentIndex === 0? 'font-bold' : 'font-normal'}`}><h1>Main dashboard</h1></button>
      <div className={`w-[2%] rounded-sm ${ currentIndex === 0? 'bg-[#051131]' : 'bg-white'} `}></div>
      </div>
      <div className='w-[100%] mt-2 flex'>
      <button onClick={() => setCurrentIndex(1)} className={`w-[98%] py-2 rounded-sm flex justify-start px-3  cursor-pointer text-[#051131] ${ currentIndex === 1? 'font-bold' : 'font-normal'}`}><h1>Financial Visualization</h1></button>
      <div className={`w-[2%] rounded-sm ${ currentIndex === 1? 'bg-[#051131]' : 'bg-white'} `}></div>
      </div>
      <div className='w-[100%] mt-2 flex'>
      <button onClick={() => setCurrentIndex(2)} className={`w-[98%] py-2 rounded-sm flex justify-start px-3  cursor-pointer text-[#051131] ${ currentIndex === 2? 'font-bold' : 'font-normal'}`}><h1>Terms Visualization</h1></button>
      <div className={`w-[2%] rounded-sm ${ currentIndex === 2? 'bg-[#051131]' : 'bg-white'} `}></div>
      </div>
   
     </>

     </div>
  )
}

export default SideBar