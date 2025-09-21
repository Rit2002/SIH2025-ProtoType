import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const FeaturedJobsCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const featuredJobs = [
    {
      id: 'featured-1',
      company: 'Google',
      logo: 'https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=100&h=100&fit=crop&crop=center',
      role: 'Senior Software Engineer',
      location: 'Mountain View, CA',
      type: 'Full-time',
      salary: '$180,000 - $250,000',
      skills: ['React', 'Node.js', 'Python', 'Machine Learning'],
      description: 'Join our team to build next-generation web applications that impact billions of users worldwide.',
      featured: true,
      postedDate: '2025-01-15',
      applicants: 234
    },
    {
      id: 'featured-2',
      company: 'Microsoft',
      logo: 'https://images.unsplash.com/photo-1633409361618-c73427e4e206?w=100&h=100&fit=crop&crop=center',
      role: 'Product Manager',
      location: 'Seattle, WA',
      type: 'Full-time',
      salary: '$160,000 - $220,000',
      skills: ['Product Strategy', 'Data Analysis', 'Leadership', 'Agile'],
      description: 'Lead product development for Azure cloud services and drive strategic initiatives.',
      featured: true,
      postedDate: '2025-01-18',
      applicants: 156
    },
    {
      id: 'featured-3',
      company: 'Apple',
      logo: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=100&h=100&fit=crop&crop=center',
      role: 'iOS Developer',
      location: 'Cupertino, CA',
      type: 'Full-time',
      salary: '$170,000 - $240,000',
      skills: ['Swift', 'iOS SDK', 'UIKit', 'SwiftUI'],
      description: 'Create innovative iOS applications that define the future of mobile technology.',
      featured: true,
      postedDate: '2025-01-20',
      applicants: 189
    }
  ];

  useEffect(() => {
    if (isAutoPlaying) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % featuredJobs.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isAutoPlaying, featuredJobs.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredJobs.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredJobs.length) % featuredJobs.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  const currentJob = featuredJobs[currentSlide];

  return (
    <div className="relative bg-gradient-to-r from-primary to-accent rounded-xl overflow-hidden shadow-card">
      <div className="relative h-80 md:h-96">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
        </div>

        {/* Content */}
        <div className="relative h-full flex items-center">
          <div className="w-full px-8 md:px-12">
            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* Company Logo */}
              <div className="flex-shrink-0">
                <div className="w-20 h-20 md:w-24 md:h-24 bg-white rounded-xl p-4 shadow-modal">
                  <Image
                    src={currentJob.logo}
                    alt={`${currentJob.company} logo`}
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>

              {/* Job Details */}
              <div className="flex-1 text-center md:text-left text-white">
                <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                  <span className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm font-medium">
                    Featured
                  </span>
                  <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                    {currentJob.type}
                  </span>
                </div>
                
                <h3 className="text-2xl md:text-3xl font-bold mb-2">{currentJob.role}</h3>
                <p className="text-xl font-semibold mb-2">{currentJob.company}</p>
                
                <div className="flex items-center justify-center md:justify-start gap-4 mb-4 text-white/90">
                  <div className="flex items-center gap-1">
                    <Icon name="MapPin" size={16} />
                    <span className="text-sm">{currentJob.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Icon name="DollarSign" size={16} />
                    <span className="text-sm">{currentJob.salary}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Icon name="Users" size={16} />
                    <span className="text-sm">{currentJob.applicants} applicants</span>
                  </div>
                </div>

                <p className="text-white/90 mb-6 max-w-2xl">{currentJob.description}</p>

                {/* Skills */}
                <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-6">
                  {currentJob.skills.slice(0, 4).map((skill, index) => (
                    <span
                      key={index}
                      className="bg-white/20 text-white px-3 py-1 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Apply Button */}
                <Button
                  variant="secondary"
                  size="lg"
                  iconName="ExternalLink"
                  iconPosition="right"
                  className="shadow-modal"
                >
                  Apply Now
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-smooth"
          aria-label="Previous job"
        >
          <Icon name="ChevronLeft" size={20} />
        </button>
        
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-smooth"
          aria-label="Next job"
        >
          <Icon name="ChevronRight" size={20} />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {featuredJobs.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-smooth ${
                index === currentSlide ? 'bg-white' : 'bg-white/40'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedJobsCarousel;