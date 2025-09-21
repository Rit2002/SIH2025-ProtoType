import React from 'react';
import Button from '../../../components/ui/Button';

const EventTabs = ({ events, activeEvent, onEventChange }) => {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {events?.map((event) => (
        <Button
          key={event?.id}
          variant={activeEvent === event?.id ? "default" : "outline"}
          size="sm"
          onClick={() => onEventChange(event?.id)}
          className="flex-shrink-0"
        >
          {event?.name}
          <span className="ml-2 text-xs opacity-75">
            ({event?.photoCount})
          </span>
        </Button>
      ))}
    </div>
  );
};

export default EventTabs;