/* eslint-disable no-unused-vars */
import { useState } from 'react';
import axios from 'axios';
import { MdCancel } from 'react-icons/md'


function Query() {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');

  const handleQueryChange = (e) => {
    setQuery(e.target.value);
    console.log(e.target.value)
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("clicked", e.target.value)
    sendQuery()
    .then(error => console.log(error));
    console.log("submitted")
  };

  const sendQuery = async () => {
    
    try {
      const response = await axios.post(
        'https://data-value-tool.up.railway.app/chatbot-query',
        { query: query }
      );
      console.log(query)
      // Set the response data to state
      setResponse(JSON.parse(response.data));
    } catch (error) {
      // Handle any errors here
      console.error(error);
    }
  };

  return (
    <div className='w-[100%] my-2'>
      <form onSubmit={handleSubmit}>
      <div className='bg-white w-[100%] flex justify-between pl-6 pr-2 py-2 rounded-full'>
        <input
          type="text"
          value={query}
          onChange={handleQueryChange}
          placeholder="Send a message"
          className='w-[70%] bg-white border-white'
          style={{ outline: 'none' }}
        />
        <button className='bg-blue-700 text-white rounded-full px-3 py-2' type="submit">Send Query</button>
     </div>
      </form>
      {response? <div className='bg-white absolute border-[1px] border-blue-600 mt-2 p-2  rounded-lg transform transition-transform duration-500 ease-out animate-slide-down'>
      {response && <h1>{response.Response}</h1>}
      <div className='flex justify-end px-1 w-[100%]'> <MdCancel onClick={() => setResponse('')} color='#1652f0' className='cursor-pointer' size={20} /> </div>
      </div> : null}
    </div>
  );
}

export default Query