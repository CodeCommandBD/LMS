import React, { useState } from 'react'
import { assets } from '../../assets/assets'
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState(data? data:'');
  const onSearchHandler = (e) => {
    e.preventDefault();
    navigate(`/search/${input}`);
  }
  return (
    <form onSubmit={onSearchHandler} className='flex items-center max-w-xl w-full md:h-14 h-10 bg-white rounded border border-gray-300 pl-5'>
      <img src={assets.search_icon} alt="search" className='w-5 h-5 '/>
      <input type="text" placeholder="Search" className='w-full h-full bg-transparent outline-none px-2' />
      <button type='submit' className='bg-blue-600 text-white  rounded md:px-10 px-7 md:py-3 py-2 mx-1'>Search</button>
    </form>
  )
}

export default SearchBar