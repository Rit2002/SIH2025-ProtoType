import React from 'react';
import Image from '../../../components/AppImage';

const PhotoGrid = ({ photos, onPhotoClick }) => {
  if (!photos || photos?.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-4">
          <span className="text-4xl">📷</span>
        </div>
        <h3 className="text-lg font-medium text-foreground mb-2">No Photos Found</h3>
        <p className="text-muted-foreground">
          No photos available for the selected batch and event.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
      {photos?.map((photo, index) => (
        <div
          key={photo?.id}
          className="aspect-square bg-muted rounded-lg overflow-hidden cursor-pointer group hover:shadow-lg transition-all duration-200 hover:scale-105"
          onClick={() => onPhotoClick(photo, index)}
        >
          <Image
            src={photo?.thumbnail}
            alt={photo?.caption || `Photo ${index + 1}`}
            className="w-full h-full object-cover group-hover:brightness-110 transition-all duration-200"
          />
          {photo?.caption && (
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 flex items-end">
              <div className="p-2 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200 truncate w-full">
                {photo?.caption}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default PhotoGrid;