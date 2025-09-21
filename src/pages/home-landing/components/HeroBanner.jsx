import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const HeroBanner = () => {
  return (
    <section className="relative bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 py-20 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
              Connect with Your
              <span className="text-primary block">Alumni Network</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
              Join thousands of alumni building meaningful connections, advancing careers, and giving back to the community. Your journey continues here.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/alumni-directory">
                <Button variant="default" size="lg" className="w-full sm:w-auto">
                  Join Now
                </Button>
              </Link>
              <Link to="/alumni-directory">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Explore Directory
                </Button>
              </Link>
            </div>
            <div className="mt-12 grid grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-primary">15K+</div>
                <div className="text-sm text-muted-foreground">Alumni Connected</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">500+</div>
                <div className="text-sm text-muted-foreground">Companies</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">50+</div>
                <div className="text-sm text-muted-foreground">Countries</div>
              </div>
            </div>
          </div>
          
          {/* Hero Image */}
          <div className="relative">
            <div className="relative z-10">
              <Image
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Alumni networking and collaboration"
                className="w-full h-96 lg:h-[500px] object-cover rounded-2xl shadow-2xl"
              />
            </div>
            <div className="absolute -top-4 -right-4 w-full h-full bg-secondary/20 rounded-2xl"></div>
            <div className="absolute -bottom-4 -left-4 w-full h-full bg-accent/20 rounded-2xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;