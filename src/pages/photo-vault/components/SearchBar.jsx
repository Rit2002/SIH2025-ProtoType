import React, { useState, useEffect } from 'react';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const SearchBar = ({ onSearch, placeholder = "Search by year, batch, or event..." }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const mockSuggestions = [
    "Class of 2020",
    "Class of 2019",
    "Class of 2018",
    "Graduation Ceremony",
    "Annual Sports Day",
    "Cultural Festival",
    "Alumni Meet 2023",
    "Farewell Party",
    "Orientation Day",
    "Tech Fest"
  ];

  useEffect(() => {
    if (searchQuery?.length > 0) {
      const filtered = mockSuggestions?.filter(suggestion =>
        suggestion?.toLowerCase()?.includes(searchQuery?.toLowerCase())
      );
      setSuggestions(filtered?.slice(0, 5));
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchQuery]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    onSearch(query);
    setShowSuggestions(false);
  };

  const handleSuggestionClick = (suggestion) => {
    handleSearch(suggestion);
  };

  return (
    <div className="relative w-full max-w-md">
      <div className="relative">
        <Icon 
          name="Search" 
          size={16} 
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground z-10" 
        />
        <Input
          type="search"
          placeholder={placeholder}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e?.target?.value)}
          onKeyPress={(e) => {
            if (e?.key === 'Enter') {
              handleSearch(searchQuery);
            }
          }}
          className="pl-10 pr-4"
        />
      </div>
      {/* Search Suggestions */}
      {showSuggestions && suggestions?.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-md shadow-modal z-20">
          {suggestions?.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="w-full px-4 py-2 text-left hover:bg-muted transition-colors duration-150 first:rounded-t-md last:rounded-b-md"
            >
              <div className="flex items-center space-x-2">
                <Icon name="Search" size={14} className="text-muted-foreground" />
                <span className="text-sm">{suggestion}</span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;