import React from 'react';
import Icon from '../../../components/AppIcon';

const MentorshipStats = ({ stats }) => {
  const statCards = [
    {
      title: 'Total Requests',
      value: stats?.totalRequests,
      icon: 'Users',
      color: 'bg-blue-50 text-blue-600',
      iconBg: 'bg-blue-100'
    },
    {
      title: 'Active Mentorships',
      value: stats?.activeMentorships,
      icon: 'UserCheck',
      color: 'bg-green-50 text-green-600',
      iconBg: 'bg-green-100'
    },
    {
      title: 'Pending Actions',
      value: stats?.pendingActions,
      icon: 'Clock',
      color: 'bg-amber-50 text-amber-600',
      iconBg: 'bg-amber-100'
    },
    {
      title: 'Success Rate',
      value: `${stats?.successRate}%`,
      icon: 'TrendingUp',
      color: 'bg-purple-50 text-purple-600',
      iconBg: 'bg-purple-100'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {statCards?.map((stat, index) => (
        <div key={index} className="bg-card rounded-lg p-6 shadow-card border border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">
                {stat?.title}
              </p>
              <p className="text-2xl font-bold text-foreground">
                {stat?.value}
              </p>
            </div>
            <div className={`p-3 rounded-lg ${stat?.iconBg}`}>
              <Icon 
                name={stat?.icon} 
                size={24} 
                className={stat?.color}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MentorshipStats;