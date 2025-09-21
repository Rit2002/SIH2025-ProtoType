import React, { useEffect } from 'react';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const PhotoModal = ({ photo, isOpen, onClose, onNext, onPrevious, currentIndex, totalPhotos }) => {
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!isOpen) return;
      
      switch (e?.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          onPrevious();
          break;
        case 'ArrowRight':
          onNext();
          break;
        default:
          break;
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [isOpen, onClose, onNext, onPrevious]);

  // Handle background click to close modal
  const handleBackgroundClick = (e) => {
    if (e?.target === e?.currentTarget) {
      onClose();
    }
  };

  if (!isOpen || !photo) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center p-2 sm:p-4"
      onClick={handleBackgroundClick}
    >
      {/* Close Button - More Prominent */}
      <Button
        variant="ghost"
        size="icon"
        onClick={onClose}
        className="absolute top-2 right-2 sm:top-4 sm:right-4 text-white hover:bg-white hover:bg-opacity-20 z-20 w-10 h-10 sm:w-12 sm:h-12 bg-black bg-opacity-50 rounded-full"
        aria-label="Close modal"
      >
        <Icon name="X" size={24} className="sm:w-6 sm:h-6" />
      </Button>
      {/* Navigation Buttons */}
      {totalPhotos > 1 && (
        <>
          <Button
            variant="ghost"
            size="icon"
            onClick={onPrevious}
            className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white hover:bg-opacity-20 z-20 w-10 h-10 sm:w-12 sm:h-12 bg-black bg-opacity-50 rounded-full"
            aria-label="Previous photo"
          >
            <Icon name="ChevronLeft" size={28} className="sm:w-8 sm:h-8" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onNext}
            className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white hover:bg-opacity-20 z-20 w-10 h-10 sm:w-12 sm:h-12 bg-black bg-opacity-50 rounded-full"
            aria-label="Next photo"
          >
            <Icon name="ChevronRight" size={28} className="sm:w-8 sm:h-8" />
          </Button>
        </>
      )}
      {/* Photo Container - Improved sizing */}
      <div className="max-w-5xl w-full max-h-full flex flex-col items-center justify-center px-4 sm:px-8">
        <div className="relative w-full max-h-[70vh] sm:max-h-[75vh] flex items-center justify-center mb-4">
          <Image
            src={photo?.fullSize}
            alt={photo?.caption || 'Photo'}
            className="max-w-full max-h-full w-auto h-auto object-contain rounded-lg shadow-2xl"
            onClick={(e) => e?.stopPropagation()}
          />
        </div>

        {/* Photo Info */}
        <div className="text-center text-white max-w-3xl w-full">
          {photo?.caption && (
            <h3 className="text-lg sm:text-xl font-medium mb-2 px-4">{photo?.caption}</h3>
          )}
          <div className="flex items-center justify-center flex-wrap gap-2 sm:gap-4 text-sm opacity-75 px-4">
            <span className="bg-white bg-opacity-20 px-2 py-1 rounded">{currentIndex + 1} of {totalPhotos}</span>
            {photo?.date && <span className="bg-white bg-opacity-20 px-2 py-1 rounded">{photo?.date}</span>}
            {photo?.event && <span className="bg-white bg-opacity-20 px-2 py-1 rounded capitalize">{photo?.event}</span>}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 mt-4" onClick={(e) => e?.stopPropagation()}>
          <Button
            variant="outline"
            size="sm"
            iconName="Download"
            iconPosition="left"
            className="text-white border-white hover:bg-white hover:text-black transition-colors duration-200"
          >
            <span className="hidden sm:inline">Download</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            iconName="Share"
            iconPosition="left"
            className="text-white border-white hover:bg-white hover:text-black transition-colors duration-200"
          >
            <span className="hidden sm:inline">Share</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PhotoModal;