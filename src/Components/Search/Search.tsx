import { useState } from 'react';
import './Search.css';

interface SearchProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
}

export default function Search(props: SearchProps) {
  const [searchValue, setSearchValue] = useState(() => {
    const savedSearchValue = localStorage.getItem('searchValue');
    return savedSearchValue || props.searchValue;
  });

  const handleSearchValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleSearch = () => {
    localStorage.setItem('searchValue', searchValue.trim());
    props.onSearchChange(searchValue);
  };

  return (
    <div className="search">
      <h3>Search for a character</h3>
      <div className="search-bar">
        <input value={searchValue} onChange={handleSearchValueChange} />
        <button onClick={handleSearch}>Search</button>
      </div>
    </div>
  );
}
