import React from 'react';
import JobCard from './JobCard';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const JobListings = ({ jobs, viewMode, onApply, loading, onLoadMore, hasMore }) => {
  if (loading && jobs?.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading jobs...</p>
        </div>
      </div>
    );
  }

  if (jobs?.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="Search" size={24} className="text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">No jobs found</h3>
        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
          We couldn't find any jobs matching your current filters. Try adjusting your search criteria or clearing some filters.
        </p>
        <Button variant="outline" iconName="RotateCcw" iconPosition="left">
          Clear Filters
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Job Grid/List */}
      <div className={`${
        viewMode === 'grid' ?'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6' :'space-y-4'
      }`}>
        {jobs?.map((job) => (
          <JobCard
            key={job?.id}
            job={job}
            onApply={onApply}
          />
        ))}
      </div>
      {/* Load More Button */}
      {hasMore && (
        <div className="text-center pt-8">
          <Button
            variant="outline"
            size="lg"
            onClick={onLoadMore}
            loading={loading}
            iconName="Plus"
            iconPosition="left"
          >
            {loading ? 'Loading...' : 'Load More Jobs'}
          </Button>
        </div>
      )}
      {/* Results Summary */}
      <div className="text-center text-sm text-muted-foreground pt-4 border-t border-border">
        Showing {jobs?.length} job{jobs?.length !== 1 ? 's' : ''}
        {!hasMore && jobs?.length > 0 && ' (all results)'}
      </div>
    </div>
  );
};

export default JobListings;