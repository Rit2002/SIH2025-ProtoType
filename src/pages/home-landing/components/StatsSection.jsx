import React from 'react';
import Icon from '../../../components/AppIcon';

const StatsSection = () => {
  const stats = [
    {
      icon: "Users",
      number: "15,000+",
      label: "Alumni Connected",
      description: "Active members across the globe",
      color: "text-primary"
    },
    {
      icon: "Building",
      number: "500+",
      label: "Partner Companies",
      description: "Top employers hiring our alumni",
      color: "text-secondary"
    },
    {
      icon: "MapPin",
      number: "50+",
      label: "Countries",
      description: "Global alumni presence",
      color: "text-accent"
    },
    {
      icon: "TrendingUp",
      number: "98%",
      label: "Success Rate",
      description: "Alumni satisfaction with connections",
      color: "text-success"
    },
    {
      icon: "DollarSign",
      number: "$2.5M+",
      label: "Donations Raised",
      description: "Supporting student scholarships",
      color: "text-warning"
    },
    {
      icon: "UserCheck",
      number: "1,200+",
      label: "Mentorship Pairs",
      description: "Active mentor-mentee relationships",
      color: "text-error"
    }
  ];

  return (
    <section className="py-20 bg-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Our Impact in Numbers
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            See how our alumni community is making a difference worldwide
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stats?.map((stat, index) => (
            <div
              key={index}
              className="bg-card rounded-xl shadow-card hover:shadow-modal transition-all duration-300 hover:-translate-y-1 p-8 text-center group"
            >
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted/30 mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <Icon name={stat?.icon} size={32} className={stat?.color} />
              </div>
              
              <div className="mb-2">
                <div className={`text-4xl font-bold ${stat?.color} mb-2`}>
                  {stat?.number}
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {stat?.label}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {stat?.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Join the Growing Community
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Every day, more alumni discover opportunities, build connections, and create lasting impact through our platform. Your success story could be next.
            </p>
            <div className="flex items-center justify-center space-x-8 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Icon name="Clock" size={16} />
                <span>Updated in real-time</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Shield" size={16} />
                <span>Verified profiles</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Globe" size={16} />
                <span>Global network</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;