import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const AlumniSuccessStories = () => {
  const successStories = [
    {
      id: 1,
      name: "Sarah Chen",
      graduationYear: "2018",
      currentRole: "Senior Software Engineer",
      company: "Google",
      image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?cs=srgb&dl=pexels-italo-melo-881954-2379004.jpg&fm=jpg",
      story: "From campus coding competitions to leading AI initiatives at Google. The alumni network opened doors I never imagined.",
      location: "Mountain View, CA"
    },
    {
      id: 2,
      name: "Michael Rodriguez",
      graduationYear: "2015",
      currentRole: "Product Manager",
      company: "Microsoft",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      story: "The mentorship program connected me with industry leaders who guided my transition from engineering to product management.",
      location: "Seattle, WA"
    },
    {
      id: 3,
      name: "Emily Johnson",
      graduationYear: "2020",
      currentRole: "Data Scientist",
      company: "Netflix",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      story: "Through alumni connections, I landed my dream job analyzing viewer patterns and building recommendation systems.",
      location: "Los Gatos, CA"
    },
    {
      id: 4,
      name: "David Park",
      graduationYear: "2017",
      currentRole: "Startup Founder",
      company: "TechFlow Solutions",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      story: "Alumni investors believed in my vision. Today, TechFlow serves over 10,000 businesses worldwide.",
      location: "Austin, TX"
    },
    {
      id: 5,
      name: "Lisa Thompson",
      graduationYear: "2019",
      currentRole: "Marketing Director",
      company: "Adobe",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      story: "The alumni network helped me pivot from finance to marketing, connecting me with mentors who shaped my career path.",
      location: "San Jose, CA"
    },
    {
      id: 6,
      name: "James Wilson",
      graduationYear: "2016",
      currentRole: "Research Scientist",
      company: "Tesla",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      story: "Working on autonomous vehicle technology was always my dream. Alumni connections made it a reality.",
      location: "Palo Alto, CA"
    }
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Alumni Success Stories
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover how our alumni are making their mark across industries and around the world
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {successStories?.map((story) => (
            <div
              key={story?.id}
              className="bg-card rounded-xl shadow-card hover:shadow-modal transition-all duration-300 hover:-translate-y-1 overflow-hidden group cursor-pointer"
            >
              <div className="relative">
                <Image
                  src={story?.image}
                  alt={story?.name}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-semibold">{story?.name}</h3>
                  <p className="text-sm opacity-90">Class of {story?.graduationYear}</p>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Icon name="Briefcase" size={16} className="text-primary" />
                  <span className="font-semibold text-foreground">{story?.currentRole}</span>
                </div>
                
                <div className="flex items-center gap-2 mb-3">
                  <Icon name="Building" size={16} className="text-muted-foreground" />
                  <span className="text-muted-foreground">{story?.company}</span>
                </div>
                
                <div className="flex items-center gap-2 mb-4">
                  <Icon name="MapPin" size={16} className="text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{story?.location}</span>
                </div>
                
                <p className="text-muted-foreground text-sm leading-relaxed">
                  "{story?.story}"
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AlumniSuccessStories;