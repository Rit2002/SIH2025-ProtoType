import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DonationConfirmation = ({ donationData, onNewDonation }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2,
    })?.format(amount);
  };

  const formatDate = (date) => {
    return new Date(date)?.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getPaymentMethodName = (method) => {
    const methods = {
      'card': 'Credit/Debit Card',
      'upi': 'UPI Payment',
      'metamask': 'MetaMask Wallet',
      'bank': 'Bank Transfer'
    };
    return methods?.[method] || method;
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Success Header */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-success rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="CheckCircle" size={32} color="white" />
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Thank You for Your Donation!</h2>
        <p className="text-muted-foreground">
          Your generous contribution will make a real difference in supporting our mission.
        </p>
      </div>
      {/* Donation Summary Card */}
      <div className="bg-card rounded-lg p-6 border border-border mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Donation Summary</h3>
        
        <div className="space-y-4">
          {/* Amount */}
          <div className="flex justify-between items-center py-3 border-b border-border">
            <span className="text-muted-foreground">Donation Amount</span>
            <span className="text-xl font-bold text-primary">
              {formatCurrency(donationData?.amount)}
            </span>
          </div>

          {/* Type */}
          <div className="flex justify-between items-center py-3 border-b border-border">
            <span className="text-muted-foreground">Donation Type</span>
            <span className="font-medium text-foreground capitalize">
              {donationData?.type === 'recurring' ? 'Monthly Recurring' : 'One-time'}
            </span>
          </div>

          {/* Payment Method */}
          <div className="flex justify-between items-center py-3 border-b border-border">
            <span className="text-muted-foreground">Payment Method</span>
            <span className="font-medium text-foreground">
              {getPaymentMethodName(donationData?.paymentMethod)}
            </span>
          </div>

          {/* Transaction ID */}
          <div className="flex justify-between items-center py-3 border-b border-border">
            <span className="text-muted-foreground">Transaction ID</span>
            <span className="font-mono text-sm text-foreground">
              TXN-{Date.now()?.toString()?.slice(-8)}
            </span>
          </div>

          {/* Date */}
          <div className="flex justify-between items-center py-3">
            <span className="text-muted-foreground">Date & Time</span>
            <span className="font-medium text-foreground">
              {formatDate(new Date())}
            </span>
          </div>
        </div>
      </div>
      {/* Next Steps */}
      <div className="bg-muted rounded-lg p-6 mb-6">
        <h4 className="font-semibold text-foreground mb-3 flex items-center">
          <Icon name="Info" size={20} className="mr-2 text-primary" />
          What Happens Next?
        </h4>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex items-start">
            <Icon name="Mail" size={16} className="mr-2 mt-0.5 text-primary flex-shrink-0" />
            A confirmation email with your tax receipt will be sent to your email address
          </li>
          <li className="flex items-start">
            <Icon name="Bell" size={16} className="mr-2 mt-0.5 text-primary flex-shrink-0" />
            You'll receive updates on how your donation is making an impact
          </li>
          {donationData?.type === 'recurring' && (
            <li className="flex items-start">
              <Icon name="Repeat" size={16} className="mr-2 mt-0.5 text-primary flex-shrink-0" />
              Your monthly donation will be processed automatically on the same date each month
            </li>
          )}
          <li className="flex items-start">
            <Icon name="Award" size={16} className="mr-2 mt-0.5 text-primary flex-shrink-0" />
            {donationData?.isAnonymous ? 
              "Your donation will remain anonymous as requested" : 
              "Your name will be added to our donor wall (you can opt out anytime)"
            }
          </li>
        </ul>
      </div>
      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button
          variant="outline"
          onClick={() => window.print()}
          iconName="Download"
          iconPosition="left"
        >
          Download Receipt
        </Button>
        
        <Button
          variant="default"
          onClick={onNewDonation}
          iconName="Heart"
          iconPosition="left"
        >
          Make Another Donation
        </Button>
      </div>
      {/* Social Share */}
      <div className="text-center mt-8 pt-6 border-t border-border">
        <p className="text-sm text-muted-foreground mb-4">
          Help us spread the word about our mission
        </p>
        <div className="flex justify-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            iconName="Share2"
            iconPosition="left"
          >
            Share
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DonationConfirmation;