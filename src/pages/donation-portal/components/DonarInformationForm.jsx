import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';
import Button from '../../../components/ui/Button';

const DonorInformationForm = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    graduationYear: '',
    message: '',
    isAnonymous: false,
    receiveUpdates: true,
    taxReceipt: true
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors?.[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.firstName?.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData?.lastName?.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!formData?.email?.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (formData?.graduationYear && (formData?.graduationYear < 1950 || formData?.graduationYear > new Date()?.getFullYear())) {
      newErrors.graduationYear = 'Please enter a valid graduation year';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <div className="bg-card rounded-lg p-6 border border-border">
      <h3 className="text-lg font-semibold text-foreground mb-4">Donor Information</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            type="text"
            name="firstName"
            label="First Name"
            placeholder="Enter your first name"
            value={formData?.firstName}
            onChange={handleInputChange}
            error={errors?.firstName}
            required
          />
          <Input
            type="text"
            name="lastName"
            label="Last Name"
            placeholder="Enter your last name"
            value={formData?.lastName}
            onChange={handleInputChange}
            error={errors?.lastName}
            required
          />
        </div>

        {/* Contact Information */}
        <Input
          type="email"
          name="email"
          label="Email Address"
          placeholder="Enter your email address"
          value={formData?.email}
          onChange={handleInputChange}
          error={errors?.email}
          required
        />

        <Input
          type="tel"
          name="phone"
          label="Phone Number"
          placeholder="Enter your phone number"
          value={formData?.phone}
          onChange={handleInputChange}
          error={errors?.phone}
        />

        {/* Alumni Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            type="text"
            name="company"
            label="Current Company"
            placeholder="Enter your current company"
            value={formData?.company}
            onChange={handleInputChange}
          />
          <Input
            type="number"
            name="graduationYear"
            label="Graduation Year"
            placeholder="e.g., 2015"
            value={formData?.graduationYear}
            onChange={handleInputChange}
            error={errors?.graduationYear}
            min="1950"
            max={new Date()?.getFullYear()}
          />
        </div>

        {/* Message */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Message (Optional)
          </label>
          <textarea
            name="message"
            rows={4}
            placeholder="Share a message with your donation..."
            value={formData?.message}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-smooth resize-none"
          />
        </div>

        {/* Privacy Options */}
        <div className="space-y-3 pt-4 border-t border-border">
          <Checkbox
            name="isAnonymous"
            label="Make this donation anonymous"
            description="Your name will not appear on the donor wall"
            checked={formData?.isAnonymous}
            onChange={handleInputChange}
          />
          
          <Checkbox
            name="receiveUpdates"
            label="Receive updates about campaigns"
            description="Get email updates about fundraising progress and impact"
            checked={formData?.receiveUpdates}
            onChange={handleInputChange}
          />
          
          <Checkbox
            name="taxReceipt"
            label="Send tax receipt"
            description="Receive a tax-deductible donation receipt via email"
            checked={formData?.taxReceipt}
            onChange={handleInputChange}
          />
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <Button
            type="submit"
            variant="default"
            size="lg"
            loading={isLoading}
            iconName="Heart"
            iconPosition="left"
            className="w-full"
          >
            Complete Donation
          </Button>
        </div>
      </form>
    </div>
  );
};

export default DonorInformationForm;