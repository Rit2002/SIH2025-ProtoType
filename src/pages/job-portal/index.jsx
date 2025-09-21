import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import FeaturedJobsCarousel from './components/FeaturedJobsCarousel';
import JobFilters from './components/JobFilters';
import JobTabs from './components/JobTabs';
import JobSortOptions from './components/JobSortOptions';
import JobListings from './components/JobListings';
import ApplicationModal from './components/ApplicationModal';


const JobPortal = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [filters, setFilters] = useState({
    company: '',
    domain: '',
    location: '',
    jobType: '',
    experience: '',
    salary: ''
  });
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  const [viewMode, setViewMode] = useState('grid');
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // Mock job data
  const allJobs = [
    {
      id: 'job-1',
      company: 'Google',
      logo: 'https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=100&h=100&fit=crop&crop=center',
      role: 'Senior Software Engineer',
      location: 'Mountain View, CA',
      type: 'Full-time',
      salary: '$180,000 - $250,000',
      experience: '5+ years',
      skills: ['React', 'Node.js', 'Python', 'Machine Learning', 'AWS', 'Docker'],
      description: `Join our team to build next-generation web applications that impact billions of users worldwide. You'll work on cutting-edge technologies and collaborate with some of the brightest minds in the industry.`,featured: true,postedDate: '2025-01-15',
      applicants: 234,
      domain: 'software-engineering'
    },
    {
      id: 'job-2',company: 'Microsoft',logo: 'https://images.unsplash.com/photo-1633409361618-c73427e4e206?w=100&h=100&fit=crop&crop=center',role: 'Product Manager',location: 'Seattle, WA',type: 'Full-time',salary: '$160,000 - $220,000',experience: '3-7 years',
      skills: ['Product Strategy', 'Data Analysis', 'Leadership', 'Agile', 'SQL', 'Figma'],
      description: `Lead product development for Azure cloud services and drive strategic initiatives. Work closely with engineering teams to deliver innovative solutions.`,
      featured: true,
      postedDate: '2025-01-18',
      applicants: 156,
      domain: 'product-management'
    },
    {
      id: 'job-3',company: 'Apple',logo: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=100&h=100&fit=crop&crop=center',role: 'iOS Developer',location: 'Cupertino, CA',type: 'Full-time',salary: '$170,000 - $240,000',experience: '4+ years',
      skills: ['Swift', 'iOS SDK', 'UIKit', 'SwiftUI', 'Core Data', 'Xcode'],
      description: `Create innovative iOS applications that define the future of mobile technology. Join our world-class team of developers.`,
      featured: false,
      postedDate: '2025-01-20',
      applicants: 189,
      domain: 'software-engineering'
    },
    {
      id: 'job-4',company: 'Amazon',logo: 'https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?w=100&h=100&fit=crop&crop=center',role: 'Data Scientist',location: 'Seattle, WA',type: 'Full-time',salary: '$150,000 - $200,000',experience: '3-5 years',
      skills: ['Python', 'Machine Learning', 'SQL', 'TensorFlow', 'AWS', 'Statistics'],
      description: `Analyze large datasets to drive business decisions and build machine learning models that power our recommendation systems.`,
      featured: false,
      postedDate: '2025-01-19',
      applicants: 145,
      domain: 'data-science'
    },
    {
      id: 'job-5',company: 'Meta',logo: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=100&h=100&fit=crop&crop=center',role: 'UX Designer',location: 'Menlo Park, CA',type: 'Full-time',salary: '$140,000 - $190,000',experience: '2-5 years',
      skills: ['Figma', 'Sketch', 'Prototyping', 'User Research', 'Design Systems', 'Adobe Creative Suite'],
      description: `Design intuitive user experiences for billions of users across our family of apps. Shape the future of social connection.`,
      featured: false,
      postedDate: '2025-01-17',
      applicants: 98,
      domain: 'design'
    },
    {
      id: 'job-6',company: 'Netflix',logo: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=100&h=100&fit=crop&crop=center',role: 'Software Engineering Intern',location: 'Los Gatos, CA',type: 'Internship',salary: '$8,000 - $10,000/month',experience: 'Student',
      skills: ['Java', 'Python', 'React', 'Spring Boot', 'Microservices', 'Git'],
      description: `Join our engineering team for a 12-week internship program. Work on real projects that impact millions of Netflix subscribers.`,
      featured: false,
      postedDate: '2025-01-16',
      applicants: 567,
      domain: 'software-engineering'
    },
    {
      id: 'job-7',company: 'Tesla',logo: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=100&h=100&fit=crop&crop=center',role: 'Mechanical Engineer',location: 'Fremont, CA',type: 'Full-time',salary: '$120,000 - $160,000',experience: '2-4 years',
      skills: ['CAD', 'SolidWorks', 'Manufacturing', 'Automotive', 'Materials Science', 'Testing'],
      description: `Design and develop mechanical systems for our electric vehicles. Be part of the sustainable transportation revolution.`,
      featured: false,
      postedDate: '2025-01-14',
      applicants: 234,
      domain: 'engineering'
    },
    {
      id: 'job-8',company: 'Uber',logo: 'https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=100&h=100&fit=crop&crop=center',role: 'Marketing Manager',location: 'San Francisco, CA',type: 'Full-time',salary: '$130,000 - $170,000',experience: '3-6 years',
      skills: ['Digital Marketing', 'Analytics', 'Campaign Management', 'SEO', 'Social Media', 'Growth Hacking'],
      description: `Drive user acquisition and engagement through innovative marketing campaigns. Help us expand our global reach.`,
      featured: false,
      postedDate: '2025-01-13',
      applicants: 87,
      domain: 'marketing'
    },
    {
      id: 'job-9',company: 'Airbnb',logo: 'https://images.unsplash.com/photo-1586880244386-8b3e34c8382c?w=100&h=100&fit=crop&crop=center',role: 'Backend Engineer',location: 'San Francisco, CA',type: 'Full-time',salary: '$165,000 - $220,000',experience: '4+ years',
      skills: ['Java', 'Scala', 'Microservices', 'Kafka', 'Redis', 'PostgreSQL'],
      description: `Build scalable backend systems that power our global marketplace. Work with cutting-edge distributed systems technology.`,
      featured: false,
      postedDate: '2025-01-12',
      applicants: 178,
      domain: 'software-engineering'
    },
    {
      id: 'job-10',company: 'Spotify',logo: 'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=100&h=100&fit=crop&crop=center',role: 'Data Analyst Intern',location: 'New York, NY',type: 'Internship',salary: '$6,000 - $8,000/month',experience: 'Student',
      skills: ['SQL', 'Python', 'Tableau', 'Statistics', 'Excel', 'R'],
      description: `Analyze music streaming data to uncover insights about user behavior and preferences. 10-week summer internship program.`,
      featured: false,
      postedDate: '2025-01-11',
      applicants: 345,
      domain: 'data-science'
    }
  ];

  // Filter and sort jobs
  useEffect(() => {
    let filtered = [...allJobs];

    // Apply tab filter
    if (activeTab !== 'all') {
      if (activeTab === 'full-time') {
        filtered = filtered?.filter(job => job?.type === 'Full-time');
      } else if (activeTab === 'internship') {
        filtered = filtered?.filter(job => job?.type === 'Internship');
      } else if (activeTab === 'contract') {
        filtered = filtered?.filter(job => job?.type === 'Contract');
      }
    }

    // Apply filters
    Object.entries(filters)?.forEach(([key, value]) => {
      if (value) {
        switch (key) {
          case 'company':
            filtered = filtered?.filter(job => 
              job?.company?.toLowerCase()?.includes(value?.toLowerCase())
            );
            break;
          case 'domain':
            filtered = filtered?.filter(job => job?.domain === value);
            break;
          case 'location':
            filtered = filtered?.filter(job => 
              job?.location?.toLowerCase()?.includes(value?.toLowerCase())
            );
            break;
          case 'jobType':
            filtered = filtered?.filter(job => job?.type?.toLowerCase() === value?.toLowerCase());
            break;
          case 'experience':
            // Simple experience filtering logic
            filtered = filtered?.filter(job => {
              const jobExp = job?.experience?.toLowerCase();
              switch (value) {
                case 'entry':
                  return jobExp?.includes('student') || jobExp?.includes('0-2') || jobExp?.includes('entry');
                case 'mid':
                  return jobExp?.includes('3-5') || jobExp?.includes('2-4') || jobExp?.includes('3-6');
                case 'senior':
                  return jobExp?.includes('5+') || jobExp?.includes('4+') || jobExp?.includes('6+');
                case 'lead':
                  return jobExp?.includes('10+') || jobExp?.includes('lead') || jobExp?.includes('principal');
                default:
                  return true;
              }
            });
            break;
          case 'salary':
            // Simple salary filtering logic
            filtered = filtered?.filter(job => {
              if (!job?.salary) return false;
              const salaryText = job?.salary?.toLowerCase();
              switch (value) {
                case '0-50k':
                  return salaryText?.includes('$0') || salaryText?.includes('$1') || salaryText?.includes('$2') || salaryText?.includes('$3') || salaryText?.includes('$4');
                case '50k-100k':
                  return salaryText?.includes('$5') || salaryText?.includes('$6') || salaryText?.includes('$7') || salaryText?.includes('$8') || salaryText?.includes('$9');
                case '100k-150k':
                  return salaryText?.includes('$10') || salaryText?.includes('$11') || salaryText?.includes('$12') || salaryText?.includes('$13') || salaryText?.includes('$14');
                case '150k-200k':
                  return salaryText?.includes('$15') || salaryText?.includes('$16') || salaryText?.includes('$17') || salaryText?.includes('$18') || salaryText?.includes('$19');
                case '200k+':
                  return salaryText?.includes('$20') || salaryText?.includes('$21') || salaryText?.includes('$22') || salaryText?.includes('$23') || salaryText?.includes('$24') || salaryText?.includes('$25');
                default:
                  return true;
              }
            });
            break;
          default:
            break;
        }
      }
    });

    // Apply sorting
    filtered?.sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case 'date':
          aValue = new Date(a.postedDate);
          bValue = new Date(b.postedDate);
          break;
        case 'company':
          aValue = a?.company?.toLowerCase();
          bValue = b?.company?.toLowerCase();
          break;
        case 'role':
          aValue = a?.role?.toLowerCase();
          bValue = b?.role?.toLowerCase();
          break;
        case 'location':
          aValue = a?.location?.toLowerCase();
          bValue = b?.location?.toLowerCase();
          break;
        case 'salary':
          // Extract first number from salary string for comparison
          aValue = parseInt(a?.salary?.match(/\d+/)?.[0] || '0');
          bValue = parseInt(b?.salary?.match(/\d+/)?.[0] || '0');
          break;
        default:
          return 0;
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    setFilteredJobs(filtered);
    setCurrentPage(1);
    setHasMore(filtered?.length > 6);
  }, [activeTab, filters, sortBy, sortOrder]);

  // Get job counts for tabs
  const getJobCounts = () => {
    return {
      all: allJobs?.length,
      fullTime: allJobs?.filter(job => job?.type === 'Full-time')?.length,
      internship: allJobs?.filter(job => job?.type === 'Internship')?.length,
      contract: allJobs?.filter(job => job?.type === 'Contract')?.length
    };
  };

  // Get paginated jobs
  const getPaginatedJobs = () => {
    const itemsPerPage = 6;
    return filteredJobs?.slice(0, currentPage * itemsPerPage);
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleSortChange = (newSortBy, newSortOrder) => {
    setSortBy(newSortBy);
    setSortOrder(newSortOrder);
  };

  const handleApply = (job) => {
    setSelectedJob(job);
    setShowApplicationModal(true);
  };

  const handleApplicationSubmit = (job, applicationData) => {
    console.log('Application submitted for:', job?.role, 'at', job?.company);
    console.log('Application data:', applicationData);
    // Here you would typically send the application to your backend
  };

  const handleLoadMore = () => {
    setLoading(true);
    setTimeout(() => {
      setCurrentPage(prev => prev + 1);
      const itemsPerPage = 6;
      setHasMore(filteredJobs?.length > (currentPage + 1) * itemsPerPage);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Find Your Dream Job
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover exciting career opportunities from top companies. Connect with your alumni network and take the next step in your professional journey.
            </p>
          </div>

          {/* Featured Jobs Carousel */}
          <div className="mb-8">
            <FeaturedJobsCarousel />
          </div>

          {/* Job Filters */}
          <div className="mb-6">
            <JobFilters
              onFiltersChange={handleFiltersChange}
              jobCount={filteredJobs?.length}
            />
          </div>

          {/* Job Tabs */}
          <div className="mb-6">
            <JobTabs
              activeTab={activeTab}
              onTabChange={setActiveTab}
              jobCounts={getJobCounts()}
            />
          </div>

          {/* Sort Options */}
          <div className="mb-6">
            <JobSortOptions
              sortBy={sortBy}
              sortOrder={sortOrder}
              onSortChange={handleSortChange}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
            />
          </div>

          {/* Job Listings */}
          <JobListings
            jobs={getPaginatedJobs()}
            viewMode={viewMode}
            onApply={handleApply}
            loading={loading}
            onLoadMore={handleLoadMore}
            hasMore={hasMore}
          />
        </div>
      </main>
      {/* Application Modal */}
      <ApplicationModal
        job={selectedJob}
        isOpen={showApplicationModal}
        onClose={() => setShowApplicationModal(false)}
        onSubmit={handleApplicationSubmit}
      />
    </div>
  );
};

export default JobPortal;