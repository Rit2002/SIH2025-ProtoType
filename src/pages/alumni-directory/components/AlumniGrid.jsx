import React from 'react';
import AlumniCard from './AlumniCard';
import Icon from '../../../components/AppIcon';


const AlumniGrid = ({ alumni, viewMode, loading }) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading alumni...</p>
        </div>
      </div>
    );
  }

  if (alumni?.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Users" size={24} className="text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium text-foreground mb-2">No alumni found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search criteria or filters to find more results.
          </p>
        </div>
      </div>
    );
  }

  if (viewMode === 'list') {
    return (
      <div className="space-y-4">
        {alumni?.map((alumnus) => (
          <AlumniCard
            key={alumnus?.id}
            alumni={alumnus}
            viewMode={viewMode}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {alumni?.map((alumnus) => (
        <AlumniCard
          key={alumnus?.id}
          alumni={alumnus}
          viewMode={viewMode}
        />
      ))}
    </div>
  );
};

export default AlumniGrid;