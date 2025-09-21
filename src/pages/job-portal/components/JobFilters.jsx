import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';

const JobFilters = ({ onFiltersChange, jobCount }) => {
  const [filters, setFilters] = useState({
    company: '',
    domain: '',
    location: '',
    jobType: '',
    experience: '',
    salary: ''
  });

  const [isExpanded, setIsExpanded] = useState(false);

  const companyOptions = [
    { value: '', label: 'All Companies' },
    { value: 'google', label: 'Google' },
    { value: 'microsoft', label: 'Microsoft' },
    { value: 'apple', label: 'Apple' },
    { value: 'amazon', label: 'Amazon' },
    { value: 'meta', label: 'Meta' },
    { value: 'netflix', label: 'Netflix' },
    { value: 'tesla', label: 'Tesla' },
    { value: 'uber', label: 'Uber' },
    { value: 'airbnb', label: 'Airbnb' },
    { value: 'spotify', label: 'Spotify' }
  ];

  const domainOptions = [
    { value: '', label: 'All Domains' },
    { value: 'software-engineering', label: 'Software Engineering' },
    { value: 'product-management', label: 'Product Management' },
    { value: 'data-science', label: 'Data Science' },
    { value: 'design', label: 'Design' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'sales', label: 'Sales' },
    { value: 'finance', label: 'Finance' },
    { value: 'operations', label: 'Operations' },
    { value: 'consulting', label: 'Consulting' },
    { value: 'research', label: 'Research' }
  ];

  const locationOptions = [
    { value: '', label: 'All Locations' },
    { value: 'san-francisco', label: 'San Francisco, CA' },
    { value: 'new-york', label: 'New York, NY' },
    { value: 'seattle', label: 'Seattle, WA' },
    { value: 'austin', label: 'Austin, TX' },
    { value: 'boston', label: 'Boston, MA' },
    { value: 'chicago', label: 'Chicago, IL' },
    { value: 'los-angeles', label: 'Los Angeles, CA' },
    { value: 'denver', label: 'Denver, CO' },
    { value: 'remote', label: 'Remote' },
    { value: 'hybrid', label: 'Hybrid' }
  ];

  const jobTypeOptions = [
    { value: '', label: 'All Types' },
    { value: 'full-time', label: 'Full-time' },
    { value: 'internship', label: 'Internship' },
    { value: 'contract', label: 'Contract' },
    { value: 'part-time', label: 'Part-time' }
  ];

  const experienceOptions = [
    { value: '', label: 'All Experience Levels' },
    { value: 'entry', label: 'Entry Level (0-2 years)' },
    { value: 'mid', label: 'Mid Level (3-5 years)' },
    { value: 'senior', label: 'Senior Level (6-10 years)' },
    { value: 'lead', label: 'Lead/Principal (10+ years)' }
  ];

  const salaryOptions = [
    { value: '', label: 'All Salary Ranges' },
    { value: '0-50k', label: '$0 - $50,000' },
    { value: '50k-100k', label: '$50,000 - $100,000' },
    { value: '100k-150k', label: '$100,000 - $150,000' },
    { value: '150k-200k', label: '$150,000 - $200,000' },
    { value: '200k+', label: '$200,000+' }
  ];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const clearAllFilters = () => {
    const clearedFilters = {
      company: '',
      domain: '',
      location: '',
      jobType: '',
      experience: '',
      salary: ''
    };
    setFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  const hasActiveFilters = Object.values(filters)?.some(value => value !== '');

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-card">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Icon name="Filter" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Filter Jobs</h3>
          <span className="bg-muted text-muted-foreground px-2 py-1 rounded-full text-sm font-medium">
            {jobCount} jobs
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              iconName="X"
              iconPosition="left"
              iconSize={16}
            >
              Clear All
            </Button>
          )}
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
            iconPosition="right"
            iconSize={16}
            className="md:hidden"
          >
            {isExpanded ? 'Less' : 'More'} Filters
          </Button>
        </div>
      </div>
      {/* Filter Grid */}
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 ${
        !isExpanded ? 'hidden md:grid' : 'grid'
      }`}>
        <Select
          label="Company"
          options={companyOptions}
          value={filters?.company}
          onChange={(value) => handleFilterChange('company', value)}
          searchable
          className="w-full"
        />

        <Select
          label="Domain"
          options={domainOptions}
          value={filters?.domain}
          onChange={(value) => handleFilterChange('domain', value)}
          searchable
          className="w-full"
        />

        <Select
          label="Location"
          options={locationOptions}
          value={filters?.location}
          onChange={(value) => handleFilterChange('location', value)}
          searchable
          className="w-full"
        />

        <Select
          label="Job Type"
          options={jobTypeOptions}
          value={filters?.jobType}
          onChange={(value) => handleFilterChange('jobType', value)}
          className="w-full"
        />

        <Select
          label="Experience"
          options={experienceOptions}
          value={filters?.experience}
          onChange={(value) => handleFilterChange('experience', value)}
          className="w-full"
        />

        <Select
          label="Salary Range"
          options={salaryOptions}
          value={filters?.salary}
          onChange={(value) => handleFilterChange('salary', value)}
          className="w-full"
        />
      </div>
      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="mt-6 pt-4 border-t border-border">
          <div className="flex items-center gap-2 mb-3">
            <Icon name="Tag" size={16} className="text-muted-foreground" />
            <span className="text-sm font-medium text-muted-foreground">Active Filters:</span>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {Object.entries(filters)?.map(([key, value]) => {
              if (!value) return null;
              
              const getLabel = (key, value) => {
                const optionsMap = {
                  company: companyOptions,
                  domain: domainOptions,
                  location: locationOptions,
                  jobType: jobTypeOptions,
                  experience: experienceOptions,
                  salary: salaryOptions
                };
                
                const option = optionsMap?.[key]?.find(opt => opt?.value === value);
                return option ? option?.label : value;
              };

              return (
                <span
                  key={key}
                  className="inline-flex items-center gap-1 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm"
                >
                  {getLabel(key, value)}
                  <button
                    onClick={() => handleFilterChange(key, '')}
                    className="hover:bg-primary/20 rounded-full p-0.5 transition-smooth"
                    aria-label={`Remove ${key} filter`}
                  >
                    <Icon name="X" size={12} />
                  </button>
                </span>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default JobFilters;