import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const DonationAmountSelector = ({ selectedAmount, onAmountChange, donationType, onDonationTypeChange }) => {
  const [customAmount, setCustomAmount] = useState('');

  const presetAmounts = [1000, 2500, 5000, 10000, 25000, 50000];

  const handlePresetClick = (amount) => {
    onAmountChange(amount);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (e) => {
    const value = e?.target?.value;
    setCustomAmount(value);
    if (value && !isNaN(value) && parseFloat(value) > 0) {
      onAmountChange(parseFloat(value));
    }
  };

  return (
    <div className="bg-card rounded-lg p-6 border border-border">
      <h3 className="text-lg font-semibold text-foreground mb-4">Select Donation Amount</h3>
      {/* Donation Type Toggle */}
      <div className="flex bg-muted rounded-lg p-1 mb-6">
        <button
          onClick={() => onDonationTypeChange('one-time')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-smooth ${
            donationType === 'one-time' ?'bg-primary text-primary-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
          }`}
        >
          One-time
        </button>
        <button
          onClick={() => onDonationTypeChange('recurring')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-smooth ${
            donationType === 'recurring' ?'bg-primary text-primary-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
          }`}
        >
          Monthly
        </button>
      </div>
      {/* Preset Amount Buttons */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        {presetAmounts?.map((amount) => (
          <Button
            key={amount}
            variant={selectedAmount === amount ? 'default' : 'outline'}
            onClick={() => handlePresetClick(amount)}
            className="h-12"
          >
            ₹{amount}
          </Button>
        ))}
      </div>
      {/* Custom Amount Input */}
      <div className="mb-4">
        <Input
          type="number"
          label="Custom Amount"
          placeholder="Enter amount"
          value={customAmount}
          onChange={handleCustomAmountChange}
          min="1"
          step="0.01"
        />
      </div>
      {/* Selected Amount Display */}
      {selectedAmount > 0 && (
        <div className="bg-muted rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-primary">₹{selectedAmount}</div>
          <div className="text-sm text-muted-foreground">
            {donationType === 'recurring' ? 'per month' : 'one-time donation'}
          </div>
        </div>
      )}
    </div>
  );
};

export default DonationAmountSelector;