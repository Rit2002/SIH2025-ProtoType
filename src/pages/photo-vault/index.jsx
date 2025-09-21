import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import BatchSelector from './components/BatchSelector';
import EventTabs from './components/EventTabs';
import PhotoGrid from './components/PhotoGrid';
import PhotoModal from './components/PhotoModal';
import SearchBar from './components/SearchBar';
import StatsCard from './components/StatsCard';

const PhotoVault = () => {
  const [selectedBatch, setSelectedBatch] = useState('2023');
  const [activeEvent, setActiveEvent] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filteredPhotos, setFilteredPhotos] = useState([]);

  // Mock data for batches
  const batches = [
    { year: '2023', photoCount: 245 },
    { year: '2022', photoCount: 189 },
    { year: '2021', photoCount: 156 },
    { year: '2020', photoCount: 203 },
    { year: '2019', photoCount: 178 },
    { year: '2018', photoCount: 167 }
  ];

  // Mock data for events
  const events = [
    { id: 'all', name: 'All Events', photoCount: 245 },
    { id: 'graduation', name: 'Graduation', photoCount: 89 },
    { id: 'sports', name: 'Sports Day', photoCount: 67 },
    { id: 'cultural', name: 'Cultural Fest', photoCount: 45 },
    { id: 'orientation', name: 'Orientation', photoCount: 44 }
  ];

  // Mock photo data
  const mockPhotos = [
    {
      id: 1,
      thumbnail: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=300&h=300&fit=crop',
      fullSize: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200&h=800&fit=crop',
      caption: 'Graduation Ceremony 2023',
      date: 'May 15, 2023',
      event: 'graduation',
      batch: '2023'
    },
    {
      id: 2,
      thumbnail: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=300&h=300&fit=crop',
      fullSize: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1200&h=800&fit=crop',
      caption: 'Class Photo - Computer Science',
      date: 'May 14, 2023',
      event: 'graduation',
      batch: '2023'
    },
    {
      id: 3,
      thumbnail: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop',
      fullSize: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&h=800&fit=crop',
      caption: 'Annual Sports Day - Basketball Finals',
      date: 'March 20, 2023',
      event: 'sports',
      batch: '2023'
    },
    {
      id: 4,
      thumbnail: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=300&h=300&fit=crop',
      fullSize: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&h=800&fit=crop',
      caption: 'Study Group Session',
      date: 'February 10, 2023',
      event: 'all',
      batch: '2023'
    },
    {
      id: 5,
      thumbnail: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=300&h=300&fit=crop',
      fullSize: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=1200&h=800&fit=crop',
      caption: 'Cultural Festival Performance',
      date: 'January 25, 2023',
      event: 'cultural',
      batch: '2023'
    },
    {
      id: 6,
      thumbnail: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=300&h=300&fit=crop',
      fullSize: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1200&h=800&fit=crop',
      caption: 'Library Study Session',
      date: 'December 15, 2022',
      event: 'all',
      batch: '2023'
    },
    {
      id: 7,
      thumbnail: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=300&h=300&fit=crop',
      fullSize: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1200&h=800&fit=crop',
      caption: 'New Student Orientation',
      date: 'August 20, 2023',
      event: 'orientation',
      batch: '2023'
    },
    {
      id: 8,
      thumbnail: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=300&h=300&fit=crop',
      fullSize: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=1200&h=800&fit=crop',
      caption: 'Campus Tour Group',
      date: 'August 21, 2023',
      event: 'orientation',
      batch: '2023'
    },
    {
      id: 9,
      thumbnail: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=300&h=300&fit=crop',
      fullSize: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&h=800&fit=crop',
      caption: 'Team Building Activity',
      date: 'September 10, 2023',
      event: 'all',
      batch: '2023'
    },
    {
      id: 10,
      thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop',
      fullSize: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=800&fit=crop',
      caption: 'Academic Excellence Awards',
      date: 'April 30, 2023',
      event: 'graduation',
      batch: '2023'
    },
    {
      id: 11,
      thumbnail: 'https://images.unsplash.com/photo-1529390079861-591de354faf5?w=300&h=300&fit=crop',
      fullSize: 'https://images.unsplash.com/photo-1529390079861-591de354faf5?w=1200&h=800&fit=crop',
      caption: 'Dance Performance - Cultural Night',
      date: 'January 26, 2023',
      event: 'cultural',
      batch: '2023'
    },
    {
      id: 12,
      thumbnail: 'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=300&h=300&fit=crop',
      fullSize: 'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=1200&h=800&fit=crop',
      caption: 'Football Championship',
      date: 'March 22, 2023',
      event: 'sports',
      batch: '2023'
    }
  ];

  // Filter photos based on selected batch, event, and search query
  useEffect(() => {
    let filtered = mockPhotos?.filter(photo => photo?.batch === selectedBatch);

    if (activeEvent !== 'all') {
      filtered = filtered?.filter(photo => photo?.event === activeEvent);
    }

    if (searchQuery) {
      filtered = filtered?.filter(photo =>
        photo?.caption?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        photo?.event?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        photo?.date?.toLowerCase()?.includes(searchQuery?.toLowerCase())
      );
    }

    setFilteredPhotos(filtered);
  }, [selectedBatch, activeEvent, searchQuery]);

  const handlePhotoClick = (photo, index) => {
    setSelectedPhoto(photo);
    setCurrentPhotoIndex(index);
    setIsModalOpen(true);
  };

  const handleNextPhoto = () => {
    const nextIndex = (currentPhotoIndex + 1) % filteredPhotos?.length;
    setCurrentPhotoIndex(nextIndex);
    setSelectedPhoto(filteredPhotos?.[nextIndex]);
  };

  const handlePreviousPhoto = () => {
    const prevIndex = currentPhotoIndex === 0 ? filteredPhotos?.length - 1 : currentPhotoIndex - 1;
    setCurrentPhotoIndex(prevIndex);
    setSelectedPhoto(filteredPhotos?.[prevIndex]);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPhoto(null);
  };

  const totalPhotos = batches?.reduce((sum, batch) => sum + batch?.photoCount, 0);
  const currentBatchData = batches?.find(batch => batch?.year === selectedBatch);

  return (
    <>
      <Helmet>
        <title>Photo Vault - AlumniConnect</title>
        <meta name="description" content="Explore institutional memories through organized batch-wise photo galleries and event archives." />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-16">
          {/* Hero Section */}
          <div className="bg-gradient-to-r from-primary to-accent text-white py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  Photo Vault
                </h1>
                <p className="text-xl opacity-90 max-w-2xl mx-auto">
                  Preserving institutional memories through organized galleries of our shared experiences and milestones
                </p>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="py-12 bg-muted">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <StatsCard
                  title="Total Photos"
                  value={totalPhotos?.toLocaleString()}
                  icon="Camera"
                  description="Across all batches"
                />
                <StatsCard
                  title="Batch Years"
                  value={batches?.length}
                  icon="Calendar"
                  description="From 2018 to 2023"
                />
                <StatsCard
                  title="Event Categories"
                  value={events?.length - 1}
                  icon="Tag"
                  description="Different event types"
                />
                <StatsCard
                  title="Current Batch"
                  value={currentBatchData?.photoCount || 0}
                  icon="Image"
                  description={`Class of ${selectedBatch}`}
                />
              </div>
            </div>
          </div>

          {/* Filters and Search */}
          <div className="py-8 bg-card border-b border-border">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <BatchSelector
                    selectedBatch={selectedBatch}
                    onBatchChange={setSelectedBatch}
                    batches={batches}
                  />
                </div>
                <SearchBar
                  onSearch={setSearchQuery}
                  placeholder="Search photos by caption, event, or date..."
                />
              </div>
            </div>
          </div>

          {/* Event Tabs */}
          <div className="py-6 bg-card">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <EventTabs
                events={events}
                activeEvent={activeEvent}
                onEventChange={setActiveEvent}
              />
            </div>
          </div>

          {/* Photo Gallery */}
          <div className="py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  {activeEvent === 'all' ? 'All Photos' : events?.find(e => e?.id === activeEvent)?.name} - Class of {selectedBatch}
                </h2>
                <p className="text-muted-foreground">
                  {filteredPhotos?.length} photo{filteredPhotos?.length !== 1 ? 's' : ''} found
                  {searchQuery && ` for "${searchQuery}"`}
                </p>
              </div>

              <PhotoGrid
                photos={filteredPhotos}
                onPhotoClick={handlePhotoClick}
              />
            </div>
          </div>
        </main>

        {/* Photo Modal */}
        <PhotoModal
          photo={selectedPhoto}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onNext={handleNextPhoto}
          onPrevious={handlePreviousPhoto}
          currentIndex={currentPhotoIndex}
          totalPhotos={filteredPhotos?.length}
        />
      </div>
    </>
  );
};

export default PhotoVault;