import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EmptyState = ({ type, onAction }) => {
  const getEmptyStateContent = () => {
    switch (type) {
      case 'sent':
        return {
          icon: 'Send',
          title: 'No Sent Requests',
          description: 'You haven\'t sent any mentorship requests yet. Start connecting with alumni to grow your network.',
          actionLabel: 'Browse Alumni',
          actionIcon: 'Users'
        };
      case 'received':
        return {
          icon: 'Inbox',
          title: 'No Received Requests',
          description: 'You haven\'t received any mentorship requests yet. Make sure your profile is complete and visible.',
          actionLabel: 'Update Profile',
          actionIcon: 'User'
        };
      case 'active':
        return {
          icon: 'Users',
          title: 'No Active Mentorships',
          description: 'You don\'t have any active mentorship connections yet. Accept requests or send new ones to get started.',
          actionLabel: 'Find Mentors',
          actionIcon: 'Search'
        };
      default:
        return {
          icon: 'Circle',
          title: 'No Data Available',
          description: 'There\'s nothing to show here right now.',
          actionLabel: 'Refresh',
          actionIcon: 'RefreshCw'
        };
    }
  };

  const content = getEmptyStateContent();

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
        <Icon name={content?.icon} size={32} className="text-muted-foreground" />
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">
        {content?.title}
      </h3>
      <p className="text-muted-foreground text-center max-w-md mb-6">
        {content?.description}
      </p>
      <Button
        variant="default"
        onClick={() => onAction(type)}
        iconName={content?.actionIcon}
        iconSize={16}
      >
        {content?.actionLabel}
      </Button>
    </div>
  );
};

export default EmptyState;