import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const FilterBar = ({ 
  activeTab, 
  filters, 
  onFilterChange, 
  onBulkAction, 
  selectedItems, 
  onSelectAll,
  totalItems 
}) => {
  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'pending', label: 'Pending' },
    { value: 'approved', label: 'Approved' },
    { value: 'declined', label: 'Declined' }
  ];

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'name', label: 'Name A-Z' },
    { value: 'company', label: 'Company A-Z' }
  ];

  const domainOptions = [
    { value: 'all', label: 'All Domains' },
    { value: 'technology', label: 'Technology' },
    { value: 'finance', label: 'Finance' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'education', label: 'Education' },
    { value: 'consulting', label: 'Consulting' },
    { value: 'marketing', label: 'Marketing' }
  ];

  const getBulkActions = () => {
    if (activeTab === 'received') {
      return [
        { value: 'approve', label: 'Approve Selected', icon: 'Check' },
        { value: 'decline', label: 'Decline Selected', icon: 'X' }
      ];
    }
    return [
      { value: 'archive', label: 'Archive Selected', icon: 'Archive' }
    ];
  };

  return (
    <div className="bg-card rounded-lg p-4 shadow-card border border-border mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        {/* Left side - Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
          <Select
            options={statusOptions}
            value={filters?.status}
            onChange={(value) => onFilterChange('status', value)}
            className="w-full sm:w-40"
          />
          
          <Select
            options={domainOptions}
            value={filters?.domain}
            onChange={(value) => onFilterChange('domain', value)}
            className="w-full sm:w-40"
          />
          
          <Select
            options={sortOptions}
            value={filters?.sort}
            onChange={(value) => onFilterChange('sort', value)}
            className="w-full sm:w-40"
          />
        </div>

        {/* Right side - Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
          {/* Bulk Selection */}
          {totalItems > 0 && (
            <div className="flex items-center space-x-3">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedItems?.length === totalItems}
                  onChange={onSelectAll}
                  className="rounded border-border text-primary focus:ring-primary"
                />
                <span className="text-sm text-muted-foreground">
                  Select All ({selectedItems?.length}/{totalItems})
                </span>
              </label>
            </div>
          )}

          {/* Bulk Actions */}
          {selectedItems?.length > 0 && (
            <div className="flex items-center space-x-2">
              {getBulkActions()?.map((action) => (
                <Button
                  key={action?.value}
                  variant="outline"
                  size="sm"
                  onClick={() => onBulkAction(action?.value)}
                  iconName={action?.icon}
                  iconSize={16}
                >
                  {action?.label}
                </Button>
              ))}
            </div>
          )}

          {/* Search */}
          <div className="relative">
            <Icon 
              name="Search" 
              size={16} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
            />
            <input
              type="text"
              placeholder="Search..."
              value={filters?.search}
              onChange={(e) => onFilterChange('search', e?.target?.value)}
              className="pl-10 pr-4 py-2 border border-border rounded-md bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-smooth w-full sm:w-64"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;