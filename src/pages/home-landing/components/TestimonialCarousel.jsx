import React, { useState, useEffect } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TestimonialCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const testimonials = [
    {
      id: 1,
      name: "Alexandra Martinez",
      role: "VP of Engineering",
      company: "Stripe",
      graduationYear: "2014",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      quote: "AlumniConnect transformed my career trajectory. The mentorship I received from senior alumni was invaluable in helping me navigate the tech industry and eventually land my dream role at Stripe.",
      rating: 5
    },
    {
      id: 2,
      name: "Robert Kim",
      role: "Investment Director",
      company: "Sequoia Capital",
      graduationYear: "2012",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      quote: "The network I built through this platform has been instrumental in my venture capital career. I've sourced deals, found co-investors, and built lasting professional relationships.",
      rating: 5
    },
    {
      id: 3,
      name: "Maria Gonzalez",
      role: "Chief Marketing Officer",
      company: "Airbnb",
      graduationYear: "2016",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      quote: "From job referrals to strategic partnerships, AlumniConnect has been my go-to platform for professional growth. The quality of connections here is unmatched.",
      rating: 5
    },
    {
      id: 4,
      name: "Thomas Anderson",
      role: "Senior Consultant",
      company: "McKinsey & Company",
      graduationYear: "2013",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      quote: "The platform\'s mentorship program connected me with industry leaders who provided guidance that was crucial for my consulting career. Highly recommend to all alumni.",
      rating: 5
    }
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === testimonials?.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials?.length]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? testimonials?.length - 1 : currentIndex - 1);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToNext = () => {
    setCurrentIndex(currentIndex === testimonials?.length - 1 ? 0 : currentIndex + 1);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon
        key={index}
        name="Star"
        size={16}
        className={index < rating ? "text-warning fill-current" : "text-muted-foreground"}
      />
    ));
  };

  return (
    <section className="py-20 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            What Alumni Say
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Hear from our community members about their experiences and success stories
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Main Testimonial */}
          <div className="bg-muted/30 rounded-2xl p-8 lg:p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5"></div>
            <div className="relative z-10">
              <div className="mb-6">
                <Image
                  src={testimonials?.[currentIndex]?.image}
                  alt={testimonials?.[currentIndex]?.name}
                  className="w-20 h-20 rounded-full object-cover mx-auto mb-4 ring-4 ring-primary/20"
                />
                <div className="flex justify-center mb-4">
                  {renderStars(testimonials?.[currentIndex]?.rating)}
                </div>
              </div>

              <blockquote className="text-lg lg:text-xl text-foreground leading-relaxed mb-8 italic">
                "{testimonials?.[currentIndex]?.quote}"
              </blockquote>

              <div className="text-center">
                <h4 className="text-xl font-semibold text-foreground mb-1">
                  {testimonials?.[currentIndex]?.name}
                </h4>
                <p className="text-muted-foreground mb-1">
                  {testimonials?.[currentIndex]?.role} at {testimonials?.[currentIndex]?.company}
                </p>
                <p className="text-sm text-muted-foreground">
                  Class of {testimonials?.[currentIndex]?.graduationYear}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between mt-8">
            <Button
              variant="outline"
              size="icon"
              onClick={goToPrevious}
              className="w-12 h-12"
            >
              <Icon name="ChevronLeft" size={20} />
            </Button>

            {/* Dots Indicator */}
            <div className="flex space-x-2">
              {testimonials?.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'bg-primary scale-125' :'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={goToNext}
              className="w-12 h-12"
            >
              <Icon name="ChevronRight" size={20} />
            </Button>
          </div>

          {/* Auto-play indicator */}
          <div className="flex items-center justify-center mt-4 text-sm text-muted-foreground">
            <Icon name={isAutoPlaying ? "Play" : "Pause"} size={14} className="mr-2" />
            <span>{isAutoPlaying ? "Auto-playing" : "Paused"}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialCarousel;