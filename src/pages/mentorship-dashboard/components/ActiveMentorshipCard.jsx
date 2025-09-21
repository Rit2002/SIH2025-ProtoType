import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ActiveMentorshipCard = ({ mentorship, onAction }) => {
  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getLastActivityColor = (days) => {
    if (days <= 3) return 'text-green-600';
    if (days <= 7) return 'text-amber-600';
    return 'text-red-600';
  };

  return (
    <div className="bg-card rounded-lg p-6 shadow-card border border-border hover:shadow-lg transition-smooth">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-4">
          <Image
            src={mentorship?.avatar}
            alt={mentorship?.name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <h3 className="font-semibold text-foreground">{mentorship?.name}</h3>
            <p className="text-sm text-muted-foreground">
              {mentorship?.company} • {mentorship?.role}
            </p>
            <p className="text-sm text-muted-foreground">{mentorship?.domain}</p>
          </div>
        </div>
        <div className="text-right">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
            <Icon name="Circle" size={8} className="mr-1 fill-current" />
            Active
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-sm">
            <Icon name="Calendar" size={14} className="text-muted-foreground" />
            <span className="text-muted-foreground">Started:</span>
            <span className="text-foreground font-medium">
              {formatDate(mentorship?.startDate)}
            </span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <Icon name="MessageCircle" size={14} className="text-muted-foreground" />
            <span className="text-muted-foreground">Messages:</span>
            <span className="text-foreground font-medium">
              {mentorship?.messageCount}
            </span>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-sm">
            <Icon name="Clock" size={14} className="text-muted-foreground" />
            <span className="text-muted-foreground">Last Activity:</span>
            <span className={`font-medium ${getLastActivityColor(mentorship?.lastActivityDays)}`}>
              {mentorship?.lastActivityDays} days ago
            </span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <Icon name="Video" size={14} className="text-muted-foreground" />
            <span className="text-muted-foreground">Sessions:</span>
            <span className="text-foreground font-medium">
              {mentorship?.sessionCount}
            </span>
          </div>
        </div>
      </div>
      {mentorship?.nextSession && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
          <div className="flex items-center space-x-2 text-sm">
            <Icon name="Calendar" size={14} className="text-blue-600" />
            <span className="text-blue-800 font-medium">Next Session:</span>
            <span className="text-blue-700">
              {formatDate(mentorship?.nextSession?.date)} at {mentorship?.nextSession?.time}
            </span>
          </div>
          <p className="text-xs text-blue-600 mt-1">{mentorship?.nextSession?.topic}</p>
        </div>
      )}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Icon name="MapPin" size={14} />
          <span>{mentorship?.location}</span>
        </div>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onAction('message', mentorship?.id)}
            iconName="MessageCircle"
            iconSize={16}
          >
            Message
          </Button>
          <Button
            variant="default"
            size="sm"
            onClick={() => onAction('schedule', mentorship?.id)}
            iconName="Calendar"
            iconSize={16}
          >
            Schedule
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ActiveMentorshipCard;