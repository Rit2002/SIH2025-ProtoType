import React from 'react';
import Icon from '../../../components/AppIcon';

const JobTabs = ({ activeTab, onTabChange, jobCounts }) => {
  const tabs = [
    {
      id: 'all',
      label: 'All Jobs',
      icon: 'Briefcase',
      count: jobCounts?.all || 0
    },
    {
      id: 'full-time',
      label: 'Full-time',
      icon: 'Clock',
      count: jobCounts?.fullTime || 0
    },
    {
      id: 'internship',
      label: 'Internships',
      icon: 'GraduationCap',
      count: jobCounts?.internship || 0
    },
    {
      id: 'contract',
      label: 'Contract',
      icon: 'FileText',
      count: jobCounts?.contract || 0
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-1 shadow-card">
      <div className="flex flex-wrap gap-1">
        {tabs?.map((tab) => (
          <button
            key={tab?.id}
            onClick={() => onTabChange(tab?.id)}
            className={`flex items-center gap-2 px-4 py-3 rounded-md text-sm font-medium transition-smooth flex-1 min-w-0 ${
              activeTab === tab?.id
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted'
            }`}
          >
            <Icon name={tab?.icon} size={16} className="flex-shrink-0" />
            <span className="truncate">{tab?.label}</span>
            <span
              className={`px-2 py-0.5 rounded-full text-xs font-medium flex-shrink-0 ${
                activeTab === tab?.id
                  ? 'bg-primary-foreground/20 text-primary-foreground'
                  : 'bg-muted text-muted-foreground'
              }`}
            >
              {tab?.count}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default JobTabs;