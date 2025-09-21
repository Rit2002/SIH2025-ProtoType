import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import HeroBanner from './components/HeroBanner';
import AlumniSuccessStories from './components/AlumniSuccessStories';
import TestimonialCarousel from './components/TestimonialCarousel';
import StatsSection from './components/StatsSection';
import CallToActionSection from './components/CallToActionSection';

const HomeLanding = () => {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>AlumniConnect - Connect, Network, and Grow Together</title>
        <meta name="description" content="Join thousands of alumni building meaningful connections, advancing careers, and giving back to the community. Your journey continues here." />
        <meta name="keywords" content="alumni network, professional networking, mentorship, career opportunities, university alumni" />
        <meta property="og:title" content="AlumniConnect - Connect, Network, and Grow Together" />
        <meta property="og:description" content="Join thousands of alumni building meaningful connections, advancing careers, and giving back to the community." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="AlumniConnect - Connect, Network, and Grow Together" />
        <meta name="twitter:description" content="Join thousands of alumni building meaningful connections, advancing careers, and giving back to the community." />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-16">
          {/* Hero Section */}
          <HeroBanner />
          
          {/* Alumni Success Stories */}
          <AlumniSuccessStories />
          
          {/* Testimonial Carousel */}
          <TestimonialCarousel />
          
          {/* Stats Section */}
          <StatsSection />
          
          {/* Call to Action Section */}
          <CallToActionSection />
        </main>

        {/* Footer */}
        <footer className="bg-foreground text-background py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Company Info */}
              <div className="lg:col-span-2">
                <div className="flex items-center space-x-2 mb-6">
                  <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">AC</span>
                  </div>
                  <span className="text-xl font-semibold">AlumniConnect</span>
                </div>
                <p className="text-background/80 mb-6 max-w-md">
                  Connecting alumni worldwide to build meaningful relationships, advance careers, and create lasting impact in their communities.
                </p>
                <div className="flex space-x-4">
                  <a href="#" className="text-background/60 hover:text-background transition-colors">
                    <span className="sr-only">Facebook</span>
                    <div className="w-6 h-6 bg-background/20 rounded"></div>
                  </a>
                  <a href="#" className="text-background/60 hover:text-background transition-colors">
                    <span className="sr-only">Twitter</span>
                    <div className="w-6 h-6 bg-background/20 rounded"></div>
                  </a>
                  <a href="#" className="text-background/60 hover:text-background transition-colors">
                    <span className="sr-only">LinkedIn</span>
                    <div className="w-6 h-6 bg-background/20 rounded"></div>
                  </a>
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h3 className="font-semibold mb-4">Quick Links</h3>
                <ul className="space-y-2 text-background/80">
                  <li><a href="/alumni-directory" className="hover:text-background transition-colors">Alumni Directory</a></li>
                  <li><a href="/mentorship-dashboard" className="hover:text-background transition-colors">Mentorship</a></li>
                  <li><a href="/job-portal" className="hover:text-background transition-colors">Job Portal</a></li>
                  <li><a href="/donation-portal" className="hover:text-background transition-colors">Donations</a></li>
                  <li><a href="/photo-vault" className="hover:text-background transition-colors">Photo Vault</a></li>
                </ul>
              </div>

              {/* Contact Info */}
              <div>
                <h3 className="font-semibold mb-4">Contact</h3>
                <ul className="space-y-2 text-background/80">
                  <li>support@alumniconnect.edu</li>
                  <li>+1 (555) 123-4567</li>
                  <li>123 University Ave<br />Campus City, ST 12345</li>
                </ul>
              </div>
            </div>

            <div className="border-t border-background/20 mt-12 pt-8 text-center text-background/60">
              <p>&copy; {new Date()?.getFullYear()} AlumniConnect. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default HomeLanding;