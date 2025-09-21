import React from 'react';
import Icon from '../../../components/AppIcon';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const FilterSidebar = ({ 
  filters, 
  onFilterChange, 
  isOpen, 
  onToggle, 
  resultCount 
}) => {
  const batchOptions = [
    { value: '2024', label: '2024' },
    { value: '2023', label: '2023' },
    { value: '2022', label: '2022' },
    { value: '2021', label: '2021' },
    { value: '2020', label: '2020' },
    { value: '2019', label: '2019' },
    { value: '2018', label: '2018' },
    { value: '2017', label: '2017' },
    { value: '2016', label: '2016' },
    { value: '2015', label: '2015' }
  ];

  const departmentOptions = [
    { value: 'computer-science', label: 'Computer Science' },
    { value: 'electrical-engineering', label: 'Electrical Engineering' },
    { value: 'mechanical-engineering', label: 'Mechanical Engineering' },
    { value: 'business-administration', label: 'Business Administration' },
    { value: 'civil-engineering', label: 'Civil Engineering' },
    { value: 'chemical-engineering', label: 'Chemical Engineering' },
    { value: 'mathematics', label: 'Mathematics' },
    { value: 'physics', label: 'Physics' },
    { value: 'economics', label: 'Economics' },
    { value: 'psychology', label: 'Psychology' }
  ];

  const locationOptions = [
    { value: 'san-francisco', label: 'San Francisco, CA' },
    { value: 'new-york', label: 'New York, NY' },
    { value: 'seattle', label: 'Seattle, WA' },
    { value: 'austin', label: 'Austin, TX' },
    { value: 'boston', label: 'Boston, MA' },
    { value: 'chicago', label: 'Chicago, IL' },
    { value: 'los-angeles', label: 'Los Angeles, CA' },
    { value: 'denver', label: 'Denver, CO' },
    { value: 'atlanta', label: 'Atlanta, GA' },
    { value: 'miami', label: 'Miami, FL' }
  ];

  const companyOptions = [
    { value: 'google', label: 'Google' },
    { value: 'microsoft', label: 'Microsoft' },
    { value: 'apple', label: 'Apple' },
    { value: 'amazon', label: 'Amazon' },
    { value: 'meta', label: 'Meta' },
    { value: 'tesla', label: 'Tesla' },
    { value: 'netflix', label: 'Netflix' },
    { value: 'uber', label: 'Uber' },
    { value: 'airbnb', label: 'Airbnb' },
    { value: 'spotify', label: 'Spotify' }
  ];

  const domainOptions = [
    { value: 'technology', label: 'Technology' },
    { value: 'finance', label: 'Finance' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'education', label: 'Education' },
    { value: 'consulting', label: 'Consulting' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'design', label: 'Design' },
    { value: 'research', label: 'Research' },
    { value: 'sales', label: 'Sales' },
    { value: 'operations', label: 'Operations' }
  ];

  const handleClearFilters = () => {
    onFilterChange({
      batch: [],
      department: [],
      location: [],
      company: [],
      domain: []
    });
  };

  const hasActiveFilters = Object.values(filters)?.some(filter => filter?.length > 0);

  const sidebarContent = (
    <div className="space-y-6">
      {/* Filter Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Filters</h3>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">
            {resultCount} results
          </span>
          {hasActiveFilters && (
            <button
              onClick={handleClearFilters}
              className="text-sm text-primary hover:text-accent transition-smooth"
            >
              Clear all
            </button>
          )}
        </div>
      </div>

      {/* Batch Filter */}
      <div className="space-y-3">
        <h4 className="font-medium text-foreground">Graduation Year</h4>
        <Select
          placeholder="Select batch years"
          multiple
          searchable
          clearable
          options={batchOptions}
          value={filters?.batch}
          onChange={(value) => onFilterChange({ ...filters, batch: value })}
        />
      </div>

      {/* Department Filter */}
      <div className="space-y-3">
        <h4 className="font-medium text-foreground">Department</h4>
        <Select
          placeholder="Select departments"
          multiple
          searchable
          clearable
          options={departmentOptions}
          value={filters?.department}
          onChange={(value) => onFilterChange({ ...filters, department: value })}
        />
      </div>

      {/* Location Filter */}
      <div className="space-y-3">
        <h4 className="font-medium text-foreground">Location</h4>
        <Select
          placeholder="Select locations"
          multiple
          searchable
          clearable
          options={locationOptions}
          value={filters?.location}
          onChange={(value) => onFilterChange({ ...filters, location: value })}
        />
      </div>

      {/* Company Filter */}
      <div className="space-y-3">
        <h4 className="font-medium text-foreground">Company</h4>
        <Select
          placeholder="Select companies"
          multiple
          searchable
          clearable
          options={companyOptions}
          value={filters?.company}
          onChange={(value) => onFilterChange({ ...filters, company: value })}
        />
      </div>

      {/* Domain Filter */}
      <div className="space-y-3">
        <h4 className="font-medium text-foreground">Domain</h4>
        <Select
          placeholder="Select domains"
          multiple
          searchable
          clearable
          options={domainOptions}
          value={filters?.domain}
          onChange={(value) => onFilterChange({ ...filters, domain: value })}
        />
      </div>

      {/* Available for Mentorship */}
      <div className="space-y-3">
        <h4 className="font-medium text-foreground">Availability</h4>
        <Checkbox
          label="Available for mentorship"
          checked={filters?.mentorship || false}
          onChange={(e) => onFilterChange({ ...filters, mentorship: e?.target?.checked })}
        />
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-80 bg-card border-r border-border h-full overflow-y-auto">
        <div className="p-6">
          {sidebarContent}
        </div>
      </div>

      {/* Mobile Filter Button */}
      <button
        onClick={onToggle}
        className="lg:hidden fixed bottom-6 right-6 bg-primary text-primary-foreground rounded-full p-4 shadow-modal z-50 transition-smooth hover:bg-accent"
      >
        <Icon name="Filter" size={20} />
      </button>

      {/* Mobile Sidebar Overlay */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div 
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={onToggle}
          />
          <div className="absolute right-0 top-0 h-full w-80 bg-card shadow-modal overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-foreground">Filters</h3>
                <button
                  onClick={onToggle}
                  className="p-2 hover:bg-muted rounded-md transition-smooth"
                >
                  <Icon name="X" size={20} />
                </button>
              </div>
              {sidebarContent}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FilterSidebar;