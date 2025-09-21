import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const SearchBar = ({ onSearch, searchQuery, setSearchQuery }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeSuggestion, setActiveSuggestion] = useState(-1);
  const inputRef = useRef(null);
  const suggestionsRef = useRef(null);

  // Mock alumni data for autocomplete
  const mockAlumni = [
    { id: 1, name: "Sarah Johnson", batch: "2020", company: "Google" },
    { id: 2, name: "Michael Chen", batch: "2019", company: "Microsoft" },
    { id: 3, name: "Emily Rodriguez", batch: "2021", company: "Apple" },
    { id: 4, name: "David Kim", batch: "2018", company: "Amazon" },
    { id: 5, name: "Jessica Williams", batch: "2022", company: "Meta" },
    { id: 6, name: "Robert Taylor", batch: "2017", company: "Tesla" },
    { id: 7, name: "Amanda Davis", batch: "2020", company: "Netflix" },
    { id: 8, name: "James Wilson", batch: "2019", company: "Uber" },
    { id: 9, name: "Lisa Anderson", batch: "2021", company: "Airbnb" },
    { id: 10, name: "Christopher Lee", batch: "2018", company: "Spotify" }
  ];

  useEffect(() => {
    if (searchQuery?.length > 0) {
      const filtered = mockAlumni?.filter(alumni =>
        alumni?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        alumni?.company?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        alumni?.batch?.includes(searchQuery)
      )?.slice(0, 5);
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
    setActiveSuggestion(-1);
  }, [searchQuery]);

  const handleInputChange = (e) => {
    setSearchQuery(e?.target?.value);
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (searchQuery?.trim()) {
      onSearch(searchQuery?.trim());
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion?.name);
    onSearch(suggestion?.name);
    setShowSuggestions(false);
    inputRef?.current?.blur();
  };

  const handleKeyDown = (e) => {
    if (!showSuggestions) return;

    switch (e?.key) {
      case 'ArrowDown':
        e?.preventDefault();
        setActiveSuggestion(prev => 
          prev < suggestions?.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e?.preventDefault();
        setActiveSuggestion(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e?.preventDefault();
        if (activeSuggestion >= 0) {
          handleSuggestionClick(suggestions?.[activeSuggestion]);
        } else {
          handleSubmit(e);
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setActiveSuggestion(-1);
        inputRef?.current?.blur();
        break;
    }
  };

  const handleBlur = (e) => {
    // Delay hiding suggestions to allow for clicks
    setTimeout(() => {
      if (!suggestionsRef?.current?.contains(document.activeElement)) {
        setShowSuggestions(false);
        setActiveSuggestion(-1);
      }
    }, 150);
  };

  const clearSearch = () => {
    setSearchQuery('');
    onSearch('');
    setShowSuggestions(false);
    inputRef?.current?.focus();
  };

  return (
    <div className="relative w-full max-w-2xl">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <Icon 
            name="Search" 
            size={20} 
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
          />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search alumni by name, company, or batch year..."
            value={searchQuery}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
            className="w-full pl-12 pr-12 py-3 border border-border rounded-lg bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-smooth text-base"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-smooth"
            >
              <Icon name="X" size={16} />
            </button>
          )}
        </div>
      </form>
      {/* Autocomplete Suggestions */}
      {showSuggestions && suggestions?.length > 0 && (
        <div 
          ref={suggestionsRef}
          className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-lg shadow-modal z-50 max-h-64 overflow-y-auto"
        >
          {suggestions?.map((suggestion, index) => (
            <button
              key={suggestion?.id}
              onClick={() => handleSuggestionClick(suggestion)}
              className={`w-full px-4 py-3 text-left hover:bg-muted transition-smooth border-b border-border last:border-b-0 ${
                index === activeSuggestion ? 'bg-muted' : ''
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-foreground">{suggestion?.name}</div>
                  <div className="text-sm text-muted-foreground">
                    Class of {suggestion?.batch} • {suggestion?.company}
                  </div>
                </div>
                <Icon name="ArrowUpRight" size={16} className="text-muted-foreground" />
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;