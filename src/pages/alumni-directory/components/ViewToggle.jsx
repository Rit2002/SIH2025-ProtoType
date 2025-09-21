import React from 'react';

import Button from '../../../components/ui/Button';

const ViewToggle = ({ viewMode, onViewChange }) => {
  return (
    <div className="flex items-center space-x-1 bg-muted rounded-lg p-1">
      <Button
        variant={viewMode === 'grid' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => onViewChange('grid')}
        iconName="Grid3X3"
        iconSize={16}
        className="px-3"
      >
        Grid
      </Button>
      <Button
        variant={viewMode === 'list' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => onViewChange('list')}
        iconName="List"
        iconSize={16}
        className="px-3"
      >
        List
      </Button>
    </div>
  );
};

export default ViewToggle;