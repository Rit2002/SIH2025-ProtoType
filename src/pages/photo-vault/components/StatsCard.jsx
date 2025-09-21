import React from 'react';
import Icon from '../../../components/AppIcon';

const StatsCard = ({ title, value, icon, description }) => {
  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-card transition-shadow duration-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold text-foreground mt-1">{value}</p>
          {description && (
            <p className="text-xs text-muted-foreground mt-1">{description}</p>
          )}
        </div>
        <div className="w-12 h-12 bg-primary bg-opacity-10 rounded-lg flex items-center justify-center">
          <Icon name={icon} size={24} className="text-primary" />
        </div>
      </div>
    </div>
  );
};

export default StatsCard;