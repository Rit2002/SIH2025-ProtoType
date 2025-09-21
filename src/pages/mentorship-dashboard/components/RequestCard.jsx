import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const RequestCard = ({ request, type, onAction }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'approved':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'declined':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const renderActions = () => {
    if (type === 'received' && request?.status === 'pending') {
      return (
        <div className="flex space-x-2">
          <Button
            variant="default"
            size="sm"
            onClick={() => onAction('approve', request?.id)}
            iconName="Check"
            iconSize={16}
          >
            Approve
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onAction('decline', request?.id)}
            iconName="X"
            iconSize={16}
          >
            Decline
          </Button>
        </div>
      );
    }

    if (request?.status === 'approved') {
      return (
        <Button
          variant="outline"
          size="sm"
          onClick={() => onAction('message', request?.id)}
          iconName="MessageCircle"
          iconSize={16}
        >Message
                  </Button>
      );
    }

    return null;
  };

  return (
    <div className="bg-card rounded-lg p-6 shadow-card border border-border hover:shadow-lg transition-smooth">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-4">
          <Image
            src={request?.avatar}
            alt={request?.name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <h3 className="font-semibold text-foreground">{request?.name}</h3>
            <p className="text-sm text-muted-foreground">
              {request?.company} • Class of {request?.graduationYear}
            </p>
            <p className="text-sm text-muted-foreground">{request?.domain}</p>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(request?.status)}`}>
          {request?.status?.charAt(0)?.toUpperCase() + request?.status?.slice(1)}
        </span>
      </div>
      <div className="mb-4">
        <h4 className="font-medium text-foreground mb-2">
          {type === 'sent' ? 'Your Request:' : 'Request Details:'}
        </h4>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {request?.message}
        </p>
      </div>
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <div className="flex items-center space-x-4">
          <span className="flex items-center space-x-1">
            <Icon name="Calendar" size={14} />
            <span>Requested {formatDate(request?.requestDate)}</span>
          </span>
          <span className="flex items-center space-x-1">
            <Icon name="MapPin" size={14} />
            <span>{request?.location}</span>
          </span>
        </div>
        {renderActions()}
      </div>
    </div>
  );
};

export default RequestCard;