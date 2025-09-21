import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ApplicationModal = ({ job, isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    resume: null,
    coverLetter: '',
    linkedinUrl: '',
    portfolioUrl: '',
    expectedSalary: '',
    availableStartDate: '',
    additionalInfo: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleFileChange = (e) => {
    const file = e?.target?.files?.[0];
    if (file) {
      if (file?.size > 5 * 1024 * 1024) { // 5MB limit
        setErrors(prev => ({ ...prev, resume: 'File size must be less than 5MB' }));
        return;
      }
      if (!['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']?.includes(file?.type)) {
        setErrors(prev => ({ ...prev, resume: 'Only PDF and Word documents are allowed' }));
        return;
      }
      setFormData(prev => ({ ...prev, resume: file }));
      setErrors(prev => ({ ...prev, resume: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.fullName?.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData?.email?.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData?.phone?.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    if (!formData?.resume) {
      newErrors.resume = 'Resume is required';
    }

    if (!formData?.coverLetter?.trim()) {
      newErrors.coverLetter = 'Cover letter is required';
    } else if (formData?.coverLetter?.length < 100) {
      newErrors.coverLetter = 'Cover letter must be at least 100 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      onSubmit(job, formData);
      onClose();
      
      // Reset form
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        resume: null,
        coverLetter: '',
        linkedinUrl: '',
        portfolioUrl: '',
        expectedSalary: '',
        availableStartDate: '',
        additionalInfo: ''
      });
    } catch (error) {
      console.error('Application submission failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-lg shadow-modal max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-muted rounded-lg p-2">
              <Image
                src={job?.logo}
                alt={`${job?.company} logo`}
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">{job?.role}</h2>
              <p className="text-muted-foreground">{job?.company}</p>
            </div>
          </div>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            disabled={isSubmitting}
          >
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
          <div className="space-y-6">
            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Personal Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Full Name"
                  type="text"
                  required
                  value={formData?.fullName}
                  onChange={(e) => handleInputChange('fullName', e?.target?.value)}
                  error={errors?.fullName}
                  placeholder="Enter your full name"
                />
                
                <Input
                  label="Email Address"
                  type="email"
                  required
                  value={formData?.email}
                  onChange={(e) => handleInputChange('email', e?.target?.value)}
                  error={errors?.email}
                  placeholder="your.email@example.com"
                />
              </div>

              <Input
                label="Phone Number"
                type="tel"
                required
                value={formData?.phone}
                onChange={(e) => handleInputChange('phone', e?.target?.value)}
                error={errors?.phone}
                placeholder="+1 (555) 123-4567"
              />
            </div>

            {/* Documents */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Documents</h3>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Resume/CV <span className="text-error">*</span>
                </label>
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary transition-smooth">
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="hidden"
                    id="resume-upload"
                  />
                  <label htmlFor="resume-upload" className="cursor-pointer">
                    <Icon name="Upload" size={24} className="text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">
                      {formData?.resume ? formData?.resume?.name : 'Click to upload your resume'}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      PDF, DOC, or DOCX (max 5MB)
                    </p>
                  </label>
                </div>
                {errors?.resume && (
                  <p className="text-error text-sm mt-1">{errors?.resume}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Cover Letter <span className="text-error">*</span>
                </label>
                <textarea
                  value={formData?.coverLetter}
                  onChange={(e) => handleInputChange('coverLetter', e?.target?.value)}
                  placeholder="Tell us why you're interested in this position and what makes you a great fit..."
                  rows={6}
                  className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-smooth resize-none"
                />
                <div className="flex justify-between items-center mt-1">
                  {errors?.coverLetter && (
                    <p className="text-error text-sm">{errors?.coverLetter}</p>
                  )}
                  <p className="text-xs text-muted-foreground ml-auto">
                    {formData?.coverLetter?.length}/500 characters
                  </p>
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Additional Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="LinkedIn Profile"
                  type="url"
                  value={formData?.linkedinUrl}
                  onChange={(e) => handleInputChange('linkedinUrl', e?.target?.value)}
                  placeholder="https://linkedin.com/in/yourprofile"
                />
                
                <Input
                  label="Portfolio/Website"
                  type="url"
                  value={formData?.portfolioUrl}
                  onChange={(e) => handleInputChange('portfolioUrl', e?.target?.value)}
                  placeholder="https://yourportfolio.com"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Expected Salary"
                  type="text"
                  value={formData?.expectedSalary}
                  onChange={(e) => handleInputChange('expectedSalary', e?.target?.value)}
                  placeholder="$80,000 - $100,000"
                />
                
                <Input
                  label="Available Start Date"
                  type="date"
                  value={formData?.availableStartDate}
                  onChange={(e) => handleInputChange('availableStartDate', e?.target?.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Additional Information
                </label>
                <textarea
                  value={formData?.additionalInfo}
                  onChange={(e) => handleInputChange('additionalInfo', e?.target?.value)}
                  placeholder="Any additional information you'd like to share..."
                  rows={3}
                  className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-smooth resize-none"
                />
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 pt-6 mt-6 border-t border-border">
            <Button
              type="button"
              variant="ghost"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              loading={isSubmitting}
              iconName="Send"
              iconPosition="right"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Application'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApplicationModal;