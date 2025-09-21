import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PaymentMethodSelector = ({ selectedMethod, onMethodChange }) => {
  const [isMetaMaskConnected, setIsMetaMaskConnected] = useState(false);

  const paymentMethods = [
    {
      id: 'card',
      name: 'Credit/Debit Card',
      icon: 'CreditCard',
      description: 'Visa, Mastercard, American Express',
      available: true
    },
    {
      id: 'upi',
      name: 'UPI Payment',
      icon: 'Smartphone',
      description: 'Google Pay, PhonePe, Paytm',
      available: true
    },
    {
      id: 'metamask',
      name: 'MetaMask Wallet',
      icon: 'Wallet',
      description: 'Cryptocurrency donations',
      available: true
    },
    {
      id: 'bank',
      name: 'Bank Transfer',
      icon: 'Building',
      description: 'Direct bank account transfer',
      available: true
    }
  ];

  const handleMetaMaskConnect = async () => {
    try {
      // Mock MetaMask connection
      setIsMetaMaskConnected(true);
      onMethodChange('metamask');
    } catch (error) {
      console.error('MetaMask connection failed:', error);
    }
  };

  return (
    <div className="bg-card rounded-lg p-6 border border-border">
      <h3 className="text-lg font-semibold text-foreground mb-4">Payment Method</h3>
      <div className="space-y-3">
        {paymentMethods?.map((method) => (
          <div
            key={method?.id}
            className={`border rounded-lg p-4 cursor-pointer transition-smooth ${
              selectedMethod === method?.id
                ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
            } ${!method?.available ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={() => method?.available && onMethodChange(method?.id)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${
                  selectedMethod === method?.id ? 'bg-primary text-primary-foreground' : 'bg-muted'
                }`}>
                  <Icon name={method?.icon} size={20} />
                </div>
                <div>
                  <div className="font-medium text-foreground">{method?.name}</div>
                  <div className="text-sm text-muted-foreground">{method?.description}</div>
                </div>
              </div>
              
              {selectedMethod === method?.id && (
                <Icon name="Check" size={20} className="text-primary" />
              )}
            </div>

            {/* MetaMask Connection Status */}
            {method?.id === 'metamask' && selectedMethod === 'metamask' && (
              <div className="mt-3 pt-3 border-t border-border">
                {!isMetaMaskConnected ? (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleMetaMaskConnect}
                    iconName="Link"
                    iconPosition="left"
                    className="w-full"
                  >
                    Connect MetaMask Wallet
                  </Button>
                ) : (
                  <div className="flex items-center space-x-2 text-sm text-success">
                    <Icon name="CheckCircle" size={16} />
                    <span>Wallet Connected: 0x1234...5678</span>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
      {/* Security Badges */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-center space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Icon name="Shield" size={16} className="text-success" />
            <span>SSL Secured</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Lock" size={16} className="text-success" />
            <span>256-bit Encryption</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="CheckCircle" size={16} className="text-success" />
            <span>PCI Compliant</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethodSelector;