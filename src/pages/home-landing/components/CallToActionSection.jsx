import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const CallToActionSection = () => {
  const features = [
    {
      icon: "Users",
      title: "Connect with Alumni",
      description: "Find and connect with fellow graduates from your batch and across different years"
    },
    {
      icon: "UserCheck",
      title: "Find Mentors",
      description: "Get guidance from experienced professionals in your field of interest"
    },
    {
      icon: "Briefcase",
      title: "Discover Opportunities",
      description: "Access exclusive job openings and internships shared by the community"
    },
    {
      icon: "Heart",
      title: "Give Back",
      description: "Support your alma mater and help current students achieve their dreams"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Ready to Reconnect with Your
              <span className="text-primary block">Alumni Community?</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of alumni who are already building meaningful connections, advancing their careers, and making a difference in their communities.
            </p>

            {/* Features Grid */}
            <div className="grid sm:grid-cols-2 gap-6 mb-8">
              {features?.map((feature, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon name={feature?.icon} size={20} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{feature?.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature?.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/alumni-directory" className="flex-1">
                <Button variant="default" size="lg" className="w-full" iconName="ArrowRight" iconPosition="right">
                  Get Started Today
                </Button>
              </Link>
              <Link to="/mentorship-dashboard" className="flex-1">
                <Button variant="outline" size="lg" className="w-full" iconName="MessageCircle" iconPosition="left">
                  Find a Mentor
                </Button>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="mt-8 pt-8 border-t border-border">
              <div className="flex items-center justify-between text-center">
                <div>
                  <div className="text-2xl font-bold text-primary">15,000+</div>
                  <div className="text-xs text-muted-foreground">Active Alumni</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">500+</div>
                  <div className="text-xs text-muted-foreground">Companies</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">2,500+</div>
                  <div className="text-xs text-muted-foreground">Connections Made</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">98%</div>
                  <div className="text-xs text-muted-foreground">Satisfaction Rate</div>
                </div>
              </div>
            </div>
          </div>

          {/* Visual */}
          <div className="relative">
            <div className="relative z-10">
              <Image
                src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Alumni networking event and community gathering"
                className="w-full h-96 lg:h-[500px] object-cover rounded-2xl shadow-2xl"
              />
            </div>
            
            {/* Floating Cards */}
            <div className="absolute -top-6 -left-6 bg-card rounded-xl shadow-modal p-4 max-w-xs hidden lg:block">
              <div className="flex items-center space-x-3">
                <Image
                  src="https://images.pixabay.com/photo/2016/11/21/12/42/beard-1845166_1280.jpg?auto=compress&cs=tinysrgb&w=100"
                  alt="Alumni member"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <div className="font-semibold text-sm">John Smith</div>
                  <div className="text-xs text-muted-foreground">Just connected with Sarah</div>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-6 -right-6 bg-card rounded-xl shadow-modal p-4 max-w-xs hidden lg:block">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="Briefcase" size={16} className="text-primary" />
                <span className="text-sm font-semibold">New Job Posted</span>
              </div>
              <div className="text-xs text-muted-foreground">
                Senior Developer at TechCorp
              </div>
            </div>

            {/* Background Elements */}
            <div className="absolute -top-8 -right-8 w-full h-full bg-secondary/10 rounded-2xl -z-10"></div>
            <div className="absolute -bottom-8 -left-8 w-full h-full bg-accent/10 rounded-2xl -z-20"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToActionSection;