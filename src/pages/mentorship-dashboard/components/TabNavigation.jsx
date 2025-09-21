import React from 'react';
import Icon from '../../../components/AppIcon';

const TabNavigation = ({ activeTab, onTabChange, counts }) => {
  const tabs = [
    {
      id: 'sent',
      label: 'Sent Requests',
      icon: 'Send',
      count: counts?.sent
    },
    {
      id: 'received',
      label: 'Received Requests',
      icon: 'Inbox',
      count: counts?.received
    },
    {
      id: 'active',
      label: 'Active Mentorships',
      icon: 'Users',
      count: counts?.active
    }
  ];

  return (
    <div className="mb-6">
      {/* Desktop Tabs */}
      <div className="hidden md:flex border-b border-border">
        {tabs?.map((tab) => (
          <button
            key={tab?.id}
            onClick={() => onTabChange(tab?.id)}
            className={`flex items-center space-x-2 px-6 py-3 border-b-2 font-medium text-sm transition-smooth ${
              activeTab === tab?.id
                ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
            }`}
          >
            <Icon name={tab?.icon} size={16} />
            <span>{tab?.label}</span>
            {tab?.count > 0 && (
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                activeTab === tab?.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground'
              }`}>
                {tab?.count}
              </span>
            )}
          </button>
        ))}
      </div>
      {/* Mobile Dropdown */}
      <div className="md:hidden">
        <select
          value={activeTab}
          onChange={(e) => onTabChange(e?.target?.value)}
          className="w-full px-4 py-3 border border-border rounded-md bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
        >
          {tabs?.map((tab) => (
            <option key={tab?.id} value={tab?.id}>
              {tab?.label} {tab?.count > 0 && `(${tab?.count})`}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default TabNavigation;