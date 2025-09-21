import React from 'react';
import Icon from '../../../components/AppIcon';

const FundraisingProgress = () => {
  const campaigns = [
    {
      id: 1,
      title: "Student Scholarship Fund",
      description: "Supporting deserving students with financial assistance for their education",
      goal: 2500000,
      raised: 1625000,
      donors: 156,
      daysLeft: 45,
      category: "Education"
    },
    {
      id: 2,
      title: "Campus Infrastructure Development",
      description: "Modernizing campus facilities and creating better learning environments",
      goal: 5000000,
      raised: 3390000,
      donors: 89,
      daysLeft: 30,
      category: "Infrastructure"
    },
    {
      id: 3,
      title: "Research & Innovation Lab",
      description: "Establishing state-of-the-art research facilities for cutting-edge projects",
      goal: 3750000,
      raised: 1445000,
      donors: 67,
      daysLeft: 60,
      category: "Research"
    }
  ];

  const calculateProgress = (raised, goal) => {
    return Math.min((raised / goal) * 100, 100);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })?.format(amount);
  };

  return (
    <div className="bg-card rounded-lg p-6 border border-border">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Active Campaigns</h3>
        <Icon name="Target" size={20} className="text-primary" />
      </div>
      <div className="space-y-6">
        {campaigns?.map((campaign) => {
          const progress = calculateProgress(campaign?.raised, campaign?.goal);
          
          return (
            <div key={campaign?.id} className="border border-border rounded-lg p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h4 className="font-medium text-foreground mb-1">{campaign?.title}</h4>
                  <p className="text-sm text-muted-foreground mb-2">{campaign?.description}</p>
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground">
                    {campaign?.category}
                  </span>
                </div>
              </div>
              {/* Progress Bar */}
              <div className="mb-3">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-medium text-foreground">{progress?.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>
              {/* Campaign Stats */}
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-lg font-semibold text-foreground">
                    {formatCurrency(campaign?.raised)}
                  </div>
                  <div className="text-xs text-muted-foreground">Raised</div>
                </div>
                <div>
                  <div className="text-lg font-semibold text-foreground">
                    {formatCurrency(campaign?.goal)}
                  </div>
                  <div className="text-xs text-muted-foreground">Goal</div>
                </div>
                <div>
                  <div className="text-lg font-semibold text-foreground">
                    {campaign?.donors}
                  </div>
                  <div className="text-xs text-muted-foreground">Donors</div>
                </div>
              </div>
              {/* Days Left */}
              <div className="mt-3 flex items-center justify-center text-sm text-muted-foreground">
                <Icon name="Clock" size={14} className="mr-1" />
                {campaign?.daysLeft} days left
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FundraisingProgress;