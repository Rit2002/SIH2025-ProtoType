import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import MentorshipStats from './components/MentorshipStats';
import TabNavigation from './components/TabNavigation';
import FilterBar from './components/FilterBar';
import RequestCard from './components/RequestCard';
import ActiveMentorshipCard from './components/ActiveMentorshipCard';
import EmptyState from './components/EmptyState';

const MentorshipDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('sent');
  const [selectedItems, setSelectedItems] = useState([]);
  const [filters, setFilters] = useState({
    status: 'all',
    domain: 'all',
    sort: 'newest',
    search: ''
  });

  // Mock data for mentorship requests and connections
  const mockSentRequests = [
    {
      id: 1,
      name: "Sarah Johnson",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      company: "Google",
      role: "Senior Software Engineer",
      graduationYear: "2015",
      domain: "Technology",
      location: "San Francisco, CA",
      status: "pending",
      requestDate: "2025-01-15T10:30:00Z",
      message: `Hi Sarah! I'm currently working as a junior developer and would love to learn from your experience at Google. I'm particularly interested in understanding how to advance in my career and develop leadership skills in tech. Would you be open to mentoring me?`
    },
    {
      id: 2,
      name: "Michael Chen",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      company: "Microsoft",
      role: "Product Manager",
      graduationYear: "2012",
      domain: "Technology",
      location: "Seattle, WA",
      status: "approved",
      requestDate: "2025-01-10T14:20:00Z",
      message: `Hello Michael, I'm transitioning from engineering to product management and would greatly appreciate your guidance. Your experience at Microsoft would be invaluable in helping me understand the PM role better.`
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      company: "Goldman Sachs",
      role: "Investment Banker",
      graduationYear: "2014",
      domain: "Finance",
      location: "New York, NY",
      status: "declined",
      requestDate: "2025-01-05T09:15:00Z",
      message: `Dear Emily, I'm interested in breaking into investment banking and would love to learn about your journey at Goldman Sachs. Any insights on the industry and career progression would be extremely helpful.`
    }
  ];

  const mockReceivedRequests = [
    {
      id: 4,
      name: "David Kim",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      company: "Startup Inc",
      role: "Junior Developer",
      graduationYear: "2022",
      domain: "Technology",
      location: "Austin, TX",
      status: "pending",
      requestDate: "2025-01-18T16:45:00Z",
      message: `Hi! I'm a recent graduate working at a startup and would love your mentorship. I'm particularly interested in learning about scaling engineering teams and best practices for software development. Your experience would be incredibly valuable.`
    },
    {
      id: 5,
      name: "Lisa Wang",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      company: "Consulting Firm",
      role: "Analyst",
      graduationYear: "2023",
      domain: "Consulting",
      location: "Chicago, IL",
      status: "pending",
      requestDate: "2025-01-17T11:30:00Z",
      message: `Hello! I'm working as a consultant and would appreciate your guidance on career development. I'm interested in understanding how to build strong client relationships and advance in the consulting industry.`
    }
  ];

  const mockActiveMentorships = [
    {
      id: 6,
      name: "Alex Thompson",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      company: "Amazon",
      role: "Senior Data Scientist",
      graduationYear: "2020",
      domain: "Technology",
      location: "Seattle, WA",
      startDate: "2024-12-01T00:00:00Z",
      messageCount: 24,
      sessionCount: 6,
      lastActivityDays: 2,
      nextSession: {
        date: "2025-01-25T00:00:00Z",
        time: "2:00 PM",
        topic: "Career Planning & Goal Setting"
      }
    },
    {
      id: 7,
      name: "Rachel Green",
      avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face",
      company: "McKinsey & Company",
      role: "Senior Consultant",
      graduationYear: "2016",
      domain: "Consulting",
      location: "Boston, MA",
      startDate: "2024-11-15T00:00:00Z",
      messageCount: 18,
      sessionCount: 4,
      lastActivityDays: 5,
      nextSession: null
    }
  ];

  const mockStats = {
    totalRequests: mockSentRequests?.length + mockReceivedRequests?.length,
    activeMentorships: mockActiveMentorships?.length,
    pendingActions: mockReceivedRequests?.filter(r => r?.status === 'pending')?.length,
    successRate: 75
  };

  const tabCounts = {
    sent: mockSentRequests?.length,
    received: mockReceivedRequests?.length,
    active: mockActiveMentorships?.length
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSelectedItems([]);
  };

  const handleSelectAll = () => {
    const currentData = getCurrentTabData();
    if (selectedItems?.length === currentData?.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(currentData?.map(item => item?.id));
    }
  };

  const handleBulkAction = (action) => {
    console.log(`Performing ${action} on items:`, selectedItems);
    // Implement bulk action logic here
    setSelectedItems([]);
  };

  const handleRequestAction = (action, requestId) => {
    console.log(`Performing ${action} on request ${requestId}`);
    // Implement individual action logic here
    
    switch (action) {
      case 'approve':
        // Handle approval logic
        break;
      case 'decline':
        // Handle decline logic
        break;
      case 'message':
        // Navigate to messaging interface
        break;
      case 'schedule':
        // Navigate to scheduling interface
        break;
      default:
        break;
    }
  };

  const handleEmptyStateAction = (type) => {
    switch (type) {
      case 'sent': navigate('/alumni-directory');
        break;
      case 'received':
        // Navigate to profile edit
        break;
      case 'active': navigate('/alumni-directory');
        break;
      default:
        window.location?.reload();
        break;
    }
  };

  const getCurrentTabData = () => {
    switch (activeTab) {
      case 'sent':
        return mockSentRequests;
      case 'received':
        return mockReceivedRequests;
      case 'active':
        return mockActiveMentorships;
      default:
        return [];
    }
  };

  const filterData = (data) => {
    let filtered = [...data];

    // Filter by status
    if (filters?.status !== 'all') {
      filtered = filtered?.filter(item => item?.status === filters?.status);
    }

    // Filter by domain
    if (filters?.domain !== 'all') {
      filtered = filtered?.filter(item => 
        item?.domain?.toLowerCase() === filters?.domain?.toLowerCase()
      );
    }

    // Filter by search
    if (filters?.search) {
      const searchTerm = filters?.search?.toLowerCase();
      filtered = filtered?.filter(item =>
        item?.name?.toLowerCase()?.includes(searchTerm) ||
        item?.company?.toLowerCase()?.includes(searchTerm) ||
        item?.domain?.toLowerCase()?.includes(searchTerm)
      );
    }

    // Sort data
    switch (filters?.sort) {
      case 'newest':
        filtered?.sort((a, b) => new Date(b.requestDate || b.startDate) - new Date(a.requestDate || a.startDate));
        break;
      case 'oldest':
        filtered?.sort((a, b) => new Date(a.requestDate || a.startDate) - new Date(b.requestDate || b.startDate));
        break;
      case 'name':
        filtered?.sort((a, b) => a?.name?.localeCompare(b?.name));
        break;
      case 'company':
        filtered?.sort((a, b) => a?.company?.localeCompare(b?.company));
        break;
      default:
        break;
    }

    return filtered;
  };

  const currentData = filterData(getCurrentTabData());

  const renderTabContent = () => {
    if (currentData?.length === 0) {
      return <EmptyState type={activeTab} onAction={handleEmptyStateAction} />;
    }

    if (activeTab === 'active') {
      return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {currentData?.map((mentorship) => (
            <ActiveMentorshipCard
              key={mentorship?.id}
              mentorship={mentorship}
              onAction={handleRequestAction}
            />
          ))}
        </div>
      );
    }

    return (
      <div className="space-y-4">
        {currentData?.map((request) => (
          <div key={request?.id} className="relative">
            <input
              type="checkbox"
              checked={selectedItems?.includes(request?.id)}
              onChange={(e) => {
                if (e?.target?.checked) {
                  setSelectedItems(prev => [...prev, request?.id]);
                } else {
                  setSelectedItems(prev => prev?.filter(id => id !== request?.id));
                }
              }}
              className="absolute top-4 left-4 z-10 rounded border-border text-primary focus:ring-primary"
            />
            <div className="pl-10">
              <RequestCard
                request={request}
                type={activeTab}
                onAction={handleRequestAction}
              />
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Mentorship Dashboard
            </h1>
            <p className="text-muted-foreground">
              Manage your mentorship requests and connections
            </p>
          </div>

          {/* Stats Overview */}
          <MentorshipStats stats={mockStats} />

          {/* Tab Navigation */}
          <TabNavigation
            activeTab={activeTab}
            onTabChange={handleTabChange}
            counts={tabCounts}
          />

          {/* Filter Bar */}
          <FilterBar
            activeTab={activeTab}
            filters={filters}
            onFilterChange={handleFilterChange}
            onBulkAction={handleBulkAction}
            selectedItems={selectedItems}
            onSelectAll={handleSelectAll}
            totalItems={currentData?.length}
          />

          {/* Tab Content */}
          {renderTabContent()}
        </div>
      </main>
    </div>
  );
};

export default MentorshipDashboard;