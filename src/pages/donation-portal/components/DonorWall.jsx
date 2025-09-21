import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const DonorWall = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const donors = [
    {
      id: 1,
      name: "Sarah Johnson",
      amount: 50000,
      message: "Proud to support the next generation of innovators. Education is the foundation of progress.",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      graduationYear: "2015",
      company: "Tech Innovations Inc.",
      donationType: "recurring",
      date: "2024-09-15"
    },
    {
      id: 2,
      name: "Michael Chen",
      amount: 25000,
      message: "Happy to give back to the institution that shaped my career.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      graduationYear: "2018",
      company: "Global Solutions Ltd.",
      donationType: "one-time",
      date: "2024-09-18"
    },
    {
      id: 3,
      name: "Anonymous Donor",
      amount: 125000,
      message: "Investing in the future through education.",
      avatar: null,
      graduationYear: null,
      company: null,
      donationType: "one-time",
      date: "2024-09-10"
    },
    {
      id: 4,
      name: "Emily Rodriguez",
      amount: 37500,
      message: "Grateful for the opportunities this institution provided. Excited to help current students achieve their dreams.",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      graduationYear: "2012",
      company: "Creative Design Studio",
      donationType: "recurring",
      date: "2024-09-12"
    },
    {
      id: 5,
      name: "David Park",
      amount: 15000,
      message: "Small contribution, big impact!",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      graduationYear: "2020",
      company: "StartUp Ventures",
      donationType: "one-time",
      date: "2024-09-19"
    },
    {
      id: 6,
      name: "Lisa Thompson",
      amount: 75000,
      message: "Education transforms lives. Proud to be part of this mission.",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      graduationYear: "2010",
      company: "Healthcare Solutions",
      donationType: "recurring",
      date: "2024-09-08"
    }
  ];

  const categories = [
    { id: 'all', label: 'All Donors', count: donors?.length },
    { id: 'recurring', label: 'Monthly Donors', count: donors?.filter(d => d?.donationType === 'recurring')?.length },
    { id: 'major', label: 'Major Donors (₹50,000+)', count: donors?.filter(d => d?.amount >= 50000)?.length }
  ];

  const filteredDonors = donors?.filter(donor => {
    if (selectedCategory === 'all') return true;
    if (selectedCategory === 'recurring') return donor?.donationType === 'recurring';
    if (selectedCategory === 'major') return donor?.amount >= 50000;
    return true;
  });

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })?.format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const totalDonations = donors?.reduce((sum, donor) => sum + donor?.amount, 0);

  return (
    <div className="bg-card rounded-lg p-6 border border-border">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Donor Wall</h3>
          <p className="text-sm text-muted-foreground">
            Recognizing our generous contributors - Total raised: {formatCurrency(totalDonations)}
          </p>
        </div>
        <Icon name="Award" size={20} className="text-primary" />
      </div>
      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories?.map((category) => (
          <button
            key={category?.id}
            onClick={() => setSelectedCategory(category?.id)}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-smooth ${
              selectedCategory === category?.id
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80'
            }`}
          >
            {category?.label} ({category?.count})
          </button>
        ))}
      </div>
      {/* Donors Grid */}
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {filteredDonors?.map((donor) => (
          <div key={donor?.id} className="border border-border rounded-lg p-4 hover:shadow-card transition-smooth">
            <div className="flex items-start space-x-4">
              {/* Avatar */}
              <div className="flex-shrink-0">
                {donor?.avatar ? (
                  <Image
                    src={donor?.avatar}
                    alt={donor?.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                    <Icon name="User" size={20} className="text-muted-foreground" />
                  </div>
                )}
              </div>

              {/* Donor Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h4 className="font-medium text-foreground">{donor?.name}</h4>
                    {donor?.graduationYear && (
                      <p className="text-sm text-muted-foreground">
                        Class of {donor?.graduationYear}
                        {donor?.company && ` • ${donor?.company}`}
                      </p>
                    )}
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-primary">{formatCurrency(donor?.amount)}</div>
                    <div className="text-xs text-muted-foreground">
                      {donor?.donationType === 'recurring' ? 'Monthly' : 'One-time'}
                    </div>
                  </div>
                </div>

                {/* Message */}
                {donor?.message && (
                  <p className="text-sm text-muted-foreground mb-2 italic">
                    "{donor?.message}"
                  </p>
                )}

                {/* Date and Type */}
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Donated on {formatDate(donor?.date)}</span>
                  {donor?.donationType === 'recurring' && (
                    <div className="flex items-center space-x-1">
                      <Icon name="Repeat" size={12} />
                      <span>Recurring</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {filteredDonors?.length === 0 && (
        <div className="text-center py-8">
          <Icon name="Users" size={48} className="text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">No donors found in this category.</p>
        </div>
      )}
    </div>
  );
};

export default DonorWall;