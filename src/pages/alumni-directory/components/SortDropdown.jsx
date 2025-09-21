import React from 'react';
import Select from '../../../components/ui/Select';

const SortDropdown = ({ sortBy, onSortChange }) => {
  const sortOptions = [
    { value: 'name-asc', label: 'Name (A-Z)' },
    { value: 'name-desc', label: 'Name (Z-A)' },
    { value: 'batch-desc', label: 'Batch (Newest First)' },
    { value: 'batch-asc', label: 'Batch (Oldest First)' },
    { value: 'company-asc', label: 'Company (A-Z)' },
    { value: 'location-asc', label: 'Location (A-Z)' }
  ];

  return (
    <div className="w-48">
      <Select
        placeholder="Sort by"
        options={sortOptions}
        value={sortBy}
        onChange={onSortChange}
      />
    </div>
  );
};

export default SortDropdown;