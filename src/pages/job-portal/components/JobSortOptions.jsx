import React from 'react';
import Icon from '../../../components/AppIcon';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';

const JobSortOptions = ({ sortBy, sortOrder, onSortChange, viewMode, onViewModeChange }) => {
  const sortOptions = [
    { value: 'date', label: 'Date Posted' },
    { value: 'company', label: 'Company Name' },
    { value: 'role', label: 'Job Title' },
    { value: 'location', label: 'Location' },
    { value: 'salary', label: 'Salary Range' }
  ];

  const handleSortByChange = (value) => {
    onSortChange(value, sortOrder);
  };

  const handleSortOrderToggle = () => {
    const newOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    onSortChange(sortBy, newOrder);
  };

  const getSortOrderIcon = () => {
    if (sortBy === 'date') {
      return sortOrder === 'desc' ? 'ArrowDown' : 'ArrowUp';
    }
    return sortOrder === 'asc' ? 'ArrowUp' : 'ArrowDown';
  };

  const getSortOrderLabel = () => {
    if (sortBy === 'date') {
      return sortOrder === 'desc' ? 'Newest First' : 'Oldest First';
    }
    return sortOrder === 'asc' ? 'A to Z' : 'Z to A';
  };

  return (
    <div className="flex items-center justify-between gap-4 bg-card border border-border rounded-lg p-4 shadow-card">
      {/* Sort Controls */}
      <div className="flex items-center gap-3">
        <Icon name="ArrowUpDown" size={16} className="text-muted-foreground" />
        <span className="text-sm font-medium text-foreground">Sort by:</span>
        
        <div className="flex items-center gap-2">
          <Select
            options={sortOptions}
            value={sortBy}
            onChange={handleSortByChange}
            className="min-w-[140px]"
          />
          
          <Button
            variant="ghost"
            size="sm"
            onClick={handleSortOrderToggle}
            iconName={getSortOrderIcon()}
            iconPosition="left"
            iconSize={16}
            className="whitespace-nowrap"
          >
            {getSortOrderLabel()}
          </Button>
        </div>
      </div>

      {/* View Mode Toggle */}
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-foreground hidden sm:block">View:</span>
        <div className="flex items-center bg-muted rounded-md p-1">
          <button
            onClick={() => onViewModeChange('grid')}
            className={`p-2 rounded transition-smooth ${
              viewMode === 'grid' ?'bg-card text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
            }`}
            aria-label="Grid view"
          >
            <Icon name="Grid3X3" size={16} />
          </button>
          <button
            onClick={() => onViewModeChange('list')}
            className={`p-2 rounded transition-smooth ${
              viewMode === 'list' ?'bg-card text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
            }`}
            aria-label="List view"
          >
            <Icon name="List" size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobSortOptions;