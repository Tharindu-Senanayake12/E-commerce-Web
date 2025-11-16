// src/components/SearchBar.jsx

import React, { useContext, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import { useLocation, useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const { search, setSearch } = useContext(ShopContext);
  const location = useLocation();
  const navigate = useNavigate();

  // Determine if the current page is the homepage.
  // Adjust the path if your homepage is different (e.g., '/home').
  const isHomepage = location.pathname === '/';

  // --- START: This is the key effect that solves all navigation issues ---
  // This effect synchronizes the URL's search parameter with the global state.
  // It runs when the page loads, when the URL changes (e.g., back/forward button),
  // or after a navigation from the chatbot or another part of the app.
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const urlSearch = decodeURIComponent(params.get('search') || '');
    
    // Update the global state only if it's different from the URL's state.
    if (urlSearch !== search) {
      setSearch(urlSearch);
    }
    // We disable the ESLint rule here because we intentionally only want this
    // to run when `location.search` changes, to avoid loops.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);
  // --- END: Key effect ---

  // This function is for live updates. It always updates the global context.
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  // This function handles the "launch" behavior from the homepage.
  const handleKeyPress = (e) => {
    // Only navigate on "Enter" if we are on the homepage.
    if (e.key === 'Enter' && search.trim() !== '' && isHomepage) {
      navigate(`/collection?search=${encodeURIComponent(search.trim())}`);
    }
  };

  const clearSearch = () => {
    setSearch('');
    // If on the collection page, also clear the URL parameter.
    if (location.pathname.startsWith('/collection')) {
      navigate('/collection');
    }
  };

  // Your logic to hide the search bar on certain pages (like /cart) can remain here.
  // ...

  return (
    <div className='border-t border-b bg-gray-50 text-center rounded-3xl'>
      <div className='inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2'>
        <input
          // The input's value is ALWAYS driven by the single source of truth: the global context.
          value={search}
          onChange={handleSearchChange}
          onKeyDown={handleKeyPress}
          className='flex-1 outline-none bg-inherit text-sm'
          type='text'
          placeholder='Search Products'
        />
        <img className='w-4' src={assets.search_icon} alt='Search' />
      </div>

      {search && (
        <img
          onClick={clearSearch}
          className='inline w-3 cursor-pointer ml-2'
          src={assets.cross_icon}
          alt='Clear'
          title='Clear Search'
        />
      )}
    </div>
  );
};

export default SearchBar;