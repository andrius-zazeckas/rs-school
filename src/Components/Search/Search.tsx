import { ChangeEvent, useContext, useEffect, useState } from 'react';
import './Search.css';
import { SearchContext } from '../Context/SearchContext';

export const Search = () => {
  const { setSearchValue } = useContext(SearchContext);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const savedSearchValue = localStorage.getItem('searchValue');
    if (savedSearchValue) {
      setInputValue(savedSearchValue);
    }
  }, []);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchValue(inputValue.trim());
    localStorage.setItem('searchValue', inputValue.trim());
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="search">
      <h3>Search for a character</h3>
      <div className="search-bar">
        <form onSubmit={handleSearch}>
          <input
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Search for a character"
          />
          <button>Search</button>
        </form>
      </div>
    </div>
  );
};
