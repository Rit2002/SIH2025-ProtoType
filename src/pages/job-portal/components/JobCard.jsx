import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const JobCard = ({ job, onApply }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);

  const handleBookmark = (e) => {
    e?.stopPropagation();
    setIsBookmarked(!isBookmarked);
  };

  const handleApply = (e) => {
    e?.stopPropagation();
    onApply(job);
  };

  const getTimeAgo = (dateString) => {
    const now = new Date();
    const posted = new Date(dateString);
    const diffInHours = Math.floor((now - posted) / (1000 * 60 * 60));
    
    if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays}d ago`;
    }
  };

  const getSalaryRange = (salary) => {
    if (!salary) return null;
    return salary;
  };

  const truncateDescription = (text, maxLength = 120) => {
    if (text?.length <= maxLength) return text;
    return text?.substring(0, maxLength) + '...';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-card hover:shadow-modal transition-smooth cursor-pointer group">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-4">
          {/* Company Logo */}
          <div className="w-12 h-12 bg-muted rounded-lg p-2 flex-shrink-0">
            <Image
              src={job?.logo}
              alt={`${job?.company} logo`}
              className="w-full h-full object-contain"
            />
          </div>
          
          {/* Job Title & Company */}
          <div className="min-w-0 flex-1">
            <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-smooth line-clamp-1">
              {job?.role}
            </h3>
            <p className="text-muted-foreground font-medium">{job?.company}</p>
          </div>
        </div>

        {/* Bookmark Button */}
        <button
          onClick={handleBookmark}
          className="p-2 hover:bg-muted rounded-lg transition-smooth flex-shrink-0"
          aria-label={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
        >
          <Icon
            name={isBookmarked ? "Bookmark" : "BookmarkPlus"}
            size={20}
            className={isBookmarked ? 'text-primary fill-current' : 'text-muted-foreground'}
          />
        </button>
      </div>
      {/* Job Details */}
      <div className="space-y-3 mb-4">
        {/* Location, Type, Experience */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Icon name="MapPin" size={16} />
            <span>{job?.location}</span>
          </div>
          
          <div className="flex items-center gap-1">
            <Icon name="Clock" size={16} />
            <span>{job?.type}</span>
          </div>
          
          {job?.experience && (
            <div className="flex items-center gap-1">
              <Icon name="TrendingUp" size={16} />
              <span>{job?.experience}</span>
            </div>
          )}
          
          <div className="flex items-center gap-1">
            <Icon name="Calendar" size={16} />
            <span>{getTimeAgo(job?.postedDate)}</span>
          </div>
        </div>

        {/* Salary */}
        {getSalaryRange(job?.salary) && (
          <div className="flex items-center gap-2">
            <Icon name="DollarSign" size={16} className="text-success" />
            <span className="text-success font-medium">{getSalaryRange(job?.salary)}</span>
          </div>
        )}

        {/* Description */}
        <div className="text-muted-foreground text-sm">
          <p>
            {showFullDescription ? job?.description : truncateDescription(job?.description)}
            {job?.description?.length > 120 && (
              <button
                onClick={(e) => {
                  e?.stopPropagation();
                  setShowFullDescription(!showFullDescription);
                }}
                className="text-primary hover:underline ml-1 font-medium"
              >
                {showFullDescription ? 'Show less' : 'Show more'}
              </button>
            )}
          </p>
        </div>
      </div>
      {/* Skills */}
      <div className="mb-4">
        <div className="flex flex-wrap gap-2">
          {job?.skills?.slice(0, 4)?.map((skill, index) => (
            <span
              key={index}
              className="bg-muted text-muted-foreground px-2 py-1 rounded-md text-xs font-medium"
            >
              {skill}
            </span>
          ))}
          {job?.skills?.length > 4 && (
            <span className="bg-muted text-muted-foreground px-2 py-1 rounded-md text-xs font-medium">
              +{job?.skills?.length - 4} more
            </span>
          )}
        </div>
      </div>
      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          {job?.applicants && (
            <div className="flex items-center gap-1">
              <Icon name="Users" size={16} />
              <span>{job?.applicants} applicants</span>
            </div>
          )}
          
          {job?.featured && (
            <span className="bg-secondary text-secondary-foreground px-2 py-1 rounded-full text-xs font-medium">
              Featured
            </span>
          )}
        </div>

        <Button
          variant="default"
          size="sm"
          onClick={handleApply}
          iconName="ExternalLink"
          iconPosition="right"
          iconSize={16}
        >
          Apply
        </Button>
      </div>
    </div>
  );
};

export default JobCard;