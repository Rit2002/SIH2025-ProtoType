import React from 'react';
import { Link } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AlumniCard = ({ alumni, viewMode }) => {
  if (viewMode === 'list') {
    return (
      <div className="bg-card border border-border rounded-lg p-4 hover:shadow-card transition-smooth">
        <div className="flex items-center space-x-4">
          <div className="flex-shrink-0">
            <Image
              src={alumni?.avatar}
              alt={alumni?.name}
              className="w-16 h-16 rounded-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-foreground truncate">
                  {alumni?.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  Class of {alumni?.batch} • {alumni?.department}
                </p>
                <div className="flex items-center space-x-4 mt-2">
                  <div className="flex items-center space-x-1">
                    <Icon name="Building2" size={14} className="text-muted-foreground" />
                    <span className="text-sm text-foreground">{alumni?.company}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Briefcase" size={14} className="text-muted-foreground" />
                    <span className="text-sm text-foreground">{alumni?.role}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="MapPin" size={14} className="text-muted-foreground" />
                    <span className="text-sm text-foreground">{alumni?.location}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2 ml-4">
                {alumni?.availableForMentorship && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-success/10 text-success">
                    <Icon name="UserCheck" size={12} className="mr-1" />
                    Mentor
                  </span>
                )}
                <Link to={`/alumni-profile/${alumni?.id}`}>
                  <Button variant="outline" size="sm">
                    View Profile
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-card transition-smooth">
      <div className="aspect-w-16 aspect-h-9 bg-muted">
        <Image
          src={alumni?.avatar}
          alt={alumni?.name}
          className="w-full h-48 object-cover"
        />
      </div>
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-foreground mb-1">
              {alumni?.name}
            </h3>
            <p className="text-sm text-muted-foreground">
              Class of {alumni?.batch} • {alumni?.department}
            </p>
          </div>
          {alumni?.availableForMentorship && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-success/10 text-success">
              <Icon name="UserCheck" size={12} className="mr-1" />
              Mentor
            </span>
          )}
        </div>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center space-x-2">
            <Icon name="Building2" size={16} className="text-muted-foreground" />
            <span className="text-sm text-foreground">{alumni?.company}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Briefcase" size={16} className="text-muted-foreground" />
            <span className="text-sm text-foreground">{alumni?.role}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="MapPin" size={16} className="text-muted-foreground" />
            <span className="text-sm text-foreground">{alumni?.location}</span>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Link to={`/alumni-profile/${alumni?.id}`} className="flex-1">
            <Button variant="outline" size="sm" fullWidth>
              View Profile
            </Button>
          </Link>
          {alumni?.availableForMentorship && (
            <Link to={`/mentorship-request/${alumni?.id}`}>
              <Button variant="default" size="sm">
                <Icon name="MessageCircle" size={14} className="mr-1" />
                Connect
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default AlumniCard;