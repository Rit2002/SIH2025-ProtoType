import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import FilterSidebar from './components/FilterSidebar';
import SearchBar from './components/SearchBar';
import ViewToggle from './components/ViewToggle';
import SortDropdown from './components/SortDropdown';
import AlumniGrid from './components/AlumniGrid';
import Icon from '../../components/AppIcon';

const AlumniDirectory = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    batch: [],
    department: [],
    location: [],
    company: [],
    domain: [],
    mentorship: false
  });
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('name-asc');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [filteredAlumni, setFilteredAlumni] = useState([]);

  // Mock alumni data
  const mockAlumni = [
    {
      id: 1,
      name: "Sarah Johnson",
      batch: "2020",
      department: "Computer Science",
      company: "Google",
      role: "Senior Software Engineer",
      location: "San Francisco, CA",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
      availableForMentorship: true,
      domain: "technology"
    },
    {
      id: 2,
      name: "Michael Chen",
      batch: "2019",
      department: "Electrical Engineering",
      company: "Microsoft",
      role: "Principal Engineer",
      location: "Seattle, WA",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      availableForMentorship: true,
      domain: "technology"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      batch: "2021",
      department: "Business Administration",
      company: "Apple",
      role: "Product Manager",
      location: "Austin, TX",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
      availableForMentorship: false,
      domain: "technology"
    },
    {
      id: 4,
      name: "David Kim",
      batch: "2018",
      department: "Computer Science",
      company: "Amazon",
      role: "Staff Software Engineer",
      location: "Seattle, WA",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      availableForMentorship: true,
      domain: "technology"
    },
    {
      id: 5,
      name: "Jessica Williams",
      batch: "2022",
      department: "Psychology",
      company: "Meta",
      role: "UX Researcher",
      location: "New York, NY",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face",
      availableForMentorship: true,
      domain: "design"
    },
    {
      id: 6,
      name: "Robert Taylor",
      batch: "2017",
      department: "Mechanical Engineering",
      company: "Tesla",
      role: "Senior Design Engineer",
      location: "Austin, TX",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
      availableForMentorship: false,
      domain: "technology"
    },
    {
      id: 7,
      name: "Amanda Davis",
      batch: "2020",
      department: "Economics",
      company: "Netflix",
      role: "Data Scientist",
      location: "Los Angeles, CA",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=face",
      availableForMentorship: true,
      domain: "technology"
    },
    {
      id: 8,
      name: "James Wilson",
      batch: "2019",
      department: "Business Administration",
      company: "Uber",
      role: "Operations Manager",
      location: "San Francisco, CA",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=face",
      availableForMentorship: true,
      domain: "operations"
    },
    {
      id: 9,
      name: "Lisa Anderson",
      batch: "2021",
      department: "Computer Science",
      company: "Airbnb",
      role: "Frontend Developer",
      location: "San Francisco, CA",
      avatar: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=400&fit=crop&crop=face",
      availableForMentorship: false,
      domain: "technology"
    },
    {
      id: 10,
      name: "Christopher Lee",
      batch: "2018",
      department: "Mathematics",
      company: "Spotify",
      role: "Machine Learning Engineer",
      location: "New York, NY",
      avatar: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400&h=400&fit=crop&crop=face",
      availableForMentorship: true,
      domain: "technology"
    },
    {
      id: 11,
      name: "Rachel Green",
      batch: "2016",
      department: "Chemical Engineering",
      company: "Johnson & Johnson",
      role: "Research Scientist",
      location: "Boston, MA",
      avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop&crop=face",
      availableForMentorship: true,
      domain: "research"
    },
    {
      id: 12,
      name: "Mark Thompson",
      batch: "2015",
      department: "Civil Engineering",
      company: "Bechtel Corporation",
      role: "Project Manager",
      location: "Denver, CO",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face",
      availableForMentorship: false,
      domain: "operations"
    }
  ];

  // Filter and sort alumni based on current criteria
  useEffect(() => {
    setLoading(true);
    
    setTimeout(() => {
      let filtered = [...mockAlumni];

      // Apply search filter
      if (searchQuery) {
        filtered = filtered?.filter(alumni =>
          alumni?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
          alumni?.company?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
          alumni?.batch?.includes(searchQuery) ||
          alumni?.role?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
          alumni?.location?.toLowerCase()?.includes(searchQuery?.toLowerCase())
        );
      }

      // Apply filters
      if (filters?.batch?.length > 0) {
        filtered = filtered?.filter(alumni => filters?.batch?.includes(alumni?.batch));
      }
      if (filters?.department?.length > 0) {
        filtered = filtered?.filter(alumni => 
          filters?.department?.includes(alumni?.department?.toLowerCase()?.replace(/\s+/g, '-'))
        );
      }
      if (filters?.location?.length > 0) {
        filtered = filtered?.filter(alumni => 
          filters?.location?.includes(alumni?.location?.toLowerCase()?.replace(/\s+/g, '-')?.replace(',', ''))
        );
      }
      if (filters?.company?.length > 0) {
        filtered = filtered?.filter(alumni => 
          filters?.company?.includes(alumni?.company?.toLowerCase())
        );
      }
      if (filters?.domain?.length > 0) {
        filtered = filtered?.filter(alumni => 
          filters?.domain?.includes(alumni?.domain)
        );
      }
      if (filters?.mentorship) {
        filtered = filtered?.filter(alumni => alumni?.availableForMentorship);
      }

      // Apply sorting
      filtered?.sort((a, b) => {
        switch (sortBy) {
          case 'name-asc':
            return a?.name?.localeCompare(b?.name);
          case 'name-desc':
            return b?.name?.localeCompare(a?.name);
          case 'batch-desc':
            return parseInt(b?.batch) - parseInt(a?.batch);
          case 'batch-asc':
            return parseInt(a?.batch) - parseInt(b?.batch);
          case 'company-asc':
            return a?.company?.localeCompare(b?.company);
          case 'location-asc':
            return a?.location?.localeCompare(b?.location);
          default:
            return 0;
        }
      });

      setFilteredAlumni(filtered);
      setLoading(false);
    }, 300);
  }, [searchQuery, filters, sortBy]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const toggleFilterSidebar = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  return (
    <>
      <Helmet>
        <title>Alumni Directory - AlumniConnect</title>
        <meta name="description" content="Discover and connect with alumni from your institution. Search by name, company, batch year, and more." />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        
        <div className="pt-16 flex h-screen">
          {/* Filter Sidebar */}
          <FilterSidebar
            filters={filters}
            onFilterChange={handleFilterChange}
            isOpen={isFilterOpen}
            onToggle={toggleFilterSidebar}
            resultCount={filteredAlumni?.length}
          />

          {/* Main Content */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Header Section */}
            <div className="bg-card border-b border-border px-6 py-6">
              <div className="max-w-7xl mx-auto">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                  <div>
                    <h1 className="text-3xl font-bold text-foreground mb-2">Alumni Directory</h1>
                    <p className="text-muted-foreground">
                      Connect with {mockAlumni?.length}+ alumni from our community
                    </p>
                  </div>
                  
                  {/* Search Bar */}
                  <div className="flex-1 max-w-2xl lg:mx-8">
                    <SearchBar
                      onSearch={handleSearch}
                      searchQuery={searchQuery}
                      setSearchQuery={setSearchQuery}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Controls Section */}
            <div className="bg-card border-b border-border px-6 py-4">
              <div className="max-w-7xl mx-auto">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-muted-foreground">
                      {filteredAlumni?.length} alumni found
                    </span>
                    {(searchQuery || Object.values(filters)?.some(f => Array.isArray(f) ? f?.length > 0 : f)) && (
                      <button
                        onClick={() => {
                          setSearchQuery('');
                          setFilters({
                            batch: [],
                            department: [],
                            location: [],
                            company: [],
                            domain: [],
                            mentorship: false
                          });
                        }}
                        className="text-sm text-primary hover:text-accent transition-smooth flex items-center space-x-1"
                      >
                        <Icon name="X" size={14} />
                        <span>Clear all filters</span>
                      </button>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <SortDropdown
                      sortBy={sortBy}
                      onSortChange={setSortBy}
                    />
                    <ViewToggle
                      viewMode={viewMode}
                      onViewChange={setViewMode}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Alumni Grid */}
            <div className="flex-1 overflow-y-auto">
              <div className="max-w-7xl mx-auto px-6 py-8">
                <AlumniGrid
                  alumni={filteredAlumni}
                  viewMode={viewMode}
                  loading={loading}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AlumniDirectory;