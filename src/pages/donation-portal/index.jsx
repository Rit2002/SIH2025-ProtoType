import React, { useState } from 'react';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import DonationAmountSelector from './components/DonationAmountSelector';
import FundraisingProgress from './components/FundraisingProgress';
import PaymentMethodSelector from './components/PaymentMethodSelector';
import DonorInformationForm from './components/DonarInformationForm';
import DonorWall from './components/DonorWall';
import DonationConfirmation from './components/DonationConfirmation';

const DonationPortal = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [donationData, setDonationData] = useState({
    amount: 0,
    type: 'one-time',
    paymentMethod: '',
    donorInfo: null
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const steps = [
    { id: 1, title: 'Amount', icon: 'IndianRupee' },
    { id: 2, title: 'Payment', icon: 'CreditCard' },
    { id: 3, title: 'Information', icon: 'User' },
    { id: 4, title: 'Confirmation', icon: 'CheckCircle' }
  ];

  const handleAmountChange = (amount) => {
    setDonationData(prev => ({ ...prev, amount }));
  };

  const handleDonationTypeChange = (type) => {
    setDonationData(prev => ({ ...prev, type }));
  };

  const handlePaymentMethodChange = (method) => {
    setDonationData(prev => ({ ...prev, paymentMethod: method }));
  };

  const handleDonorInfoSubmit = async (donorInfo) => {
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setDonationData(prev => ({ ...prev, donorInfo }));
    setCurrentStep(4);
    setIsProcessing(false);
  };

  const handleNewDonation = () => {
    setCurrentStep(1);
    setDonationData({
      amount: 0,
      type: 'one-time',
      paymentMethod: '',
      donorInfo: null
    });
  };

  const canProceedToNext = () => {
    switch (currentStep) {
      case 1:
        return donationData?.amount > 0;
      case 2:
        return donationData?.paymentMethod !== '';
      case 3:
        return donationData?.donorInfo !== null;
      default:
        return false;
    }
  };

  const handleNextStep = () => {
    if (canProceedToNext() && currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 via-secondary/5 to-background py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Support Our Mission
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Your generous donations help us provide scholarships, improve facilities, and create opportunities for current and future students. Every contribution makes a difference.
              </p>
            </div>

            {/* Impact Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
              {[
                { label: 'Students Supported', value: '2,450', icon: 'GraduationCap' },
                { label: 'Scholarships Awarded', value: '₹98L', icon: 'Award' },
                { label: 'Projects Funded', value: '156', icon: 'Lightbulb' },
                { label: 'Alumni Donors', value: '3,200', icon: 'Heart' }
              ]?.map((stat, index) => (
                <div key={index} className="bg-card rounded-lg p-6 text-center border border-border">
                  <Icon name={stat?.icon} size={32} className="text-primary mx-auto mb-3" />
                  <div className="text-2xl font-bold text-foreground mb-1">{stat?.value}</div>
                  <div className="text-sm text-muted-foreground">{stat?.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {currentStep < 4 && (
              <>
                {/* Progress Steps */}
                <div className="mb-8">
                  <div className="flex items-center justify-center space-x-4 mb-6">
                    {steps?.map((step, index) => (
                      <React.Fragment key={step?.id}>
                        <div className={`flex items-center space-x-2 ${
                          currentStep >= step?.id ? 'text-primary' : 'text-muted-foreground'
                        }`}>
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                            currentStep >= step?.id 
                              ? 'bg-primary border-primary text-primary-foreground' 
                              : 'border-muted-foreground'
                          }`}>
                            {currentStep > step?.id ? (
                              <Icon name="Check" size={16} />
                            ) : (
                              <Icon name={step?.icon} size={16} />
                            )}
                          </div>
                          <span className="text-sm font-medium hidden sm:block">{step?.title}</span>
                        </div>
                        {index < steps?.length - 1 && (
                          <div className={`w-8 h-0.5 ${
                            currentStep > step?.id ? 'bg-primary' : 'bg-muted'
                          }`} />
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>

                {/* Step Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Main Form Area */}
                  <div className="lg:col-span-2">
                    {currentStep === 1 && (
                      <DonationAmountSelector
                        selectedAmount={donationData?.amount}
                        onAmountChange={handleAmountChange}
                        donationType={donationData?.type}
                        onDonationTypeChange={handleDonationTypeChange}
                      />
                    )}

                    {currentStep === 2 && (
                      <PaymentMethodSelector
                        selectedMethod={donationData?.paymentMethod}
                        onMethodChange={handlePaymentMethodChange}
                      />
                    )}

                    {currentStep === 3 && (
                      <DonorInformationForm
                        onSubmit={handleDonorInfoSubmit}
                        isLoading={isProcessing}
                      />
                    )}

                    {/* Navigation Buttons */}
                    {currentStep < 3 && (
                      <div className="flex justify-between mt-6">
                        <Button
                          variant="outline"
                          onClick={handlePreviousStep}
                          disabled={currentStep === 1}
                          iconName="ChevronLeft"
                          iconPosition="left"
                        >
                          Previous
                        </Button>
                        <Button
                          variant="default"
                          onClick={handleNextStep}
                          disabled={!canProceedToNext()}
                          iconName="ChevronRight"
                          iconPosition="right"
                        >
                          Continue
                        </Button>
                      </div>
                    )}
                  </div>

                  {/* Sidebar */}
                  <div className="space-y-6">
                    <FundraisingProgress />
                    
                    {/* Donation Summary */}
                    {donationData?.amount > 0 && (
                      <div className="bg-card rounded-lg p-6 border border-border">
                        <h3 className="text-lg font-semibold text-foreground mb-4">Your Donation</h3>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Amount</span>
                            <span className="font-semibold text-foreground">
                              ₹{donationData?.amount}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Type</span>
                            <span className="font-medium text-foreground capitalize">
                              {donationData?.type === 'recurring' ? 'Monthly' : 'One-time'}
                            </span>
                          </div>
                          {donationData?.paymentMethod && (
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Payment</span>
                              <span className="font-medium text-foreground">
                                {donationData?.paymentMethod === 'card' && 'Credit Card'}
                                {donationData?.paymentMethod === 'upi' && 'UPI'}
                                {donationData?.paymentMethod === 'metamask' && 'MetaMask'}
                                {donationData?.paymentMethod === 'bank' && 'Bank Transfer'}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}

            {/* Confirmation Step */}
            {currentStep === 4 && (
              <DonationConfirmation
                donationData={donationData}
                onNewDonation={handleNewDonation}
              />
            )}
          </div>
        </section>

        {/* Donor Wall Section */}
        {currentStep < 4 && (
          <section className="py-12 bg-muted/30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <DonorWall />
            </div>
          </section>
        )}

        {/* Trust Indicators */}
        <section className="py-8 bg-card border-t border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-foreground mb-4">Secure & Trusted</h3>
              <div className="flex flex-wrap justify-center items-center space-x-8 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <Icon name="Shield" size={20} className="text-success" />
                  <span>SSL Encrypted</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Lock" size={20} className="text-success" />
                  <span>PCI Compliant</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="CheckCircle" size={20} className="text-success" />
                  <span>Tax Deductible</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Users" size={20} className="text-success" />
                  <span>Trusted by 3,200+ Alumni</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      {/* Footer */}
      <footer className="bg-foreground text-background py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Icon name="GraduationCap" size={20} color="white" />
                </div>
                <span className="text-xl font-semibold">AlumniConnect</span>
              </div>
              <p className="text-background/80 mb-4">
                Connecting alumni with their alma mater and fellow graduates through meaningful contributions and community engagement.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-background/80">
                <li><a href="/home-landing" className="hover:text-background transition-smooth">Home</a></li>
                <li><a href="/alumni-directory" className="hover:text-background transition-smooth">Directory</a></li>
                <li><a href="/mentorship-dashboard" className="hover:text-background transition-smooth">Mentorship</a></li>
                <li><a href="/job-portal" className="hover:text-background transition-smooth">Jobs</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-background/80">
                <li>Email: donations@alumniconnect.edu</li>
                <li>Phone: (555) 123-4567</li>
                <li>Address: 123 University Ave</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-background/20 mt-8 pt-8 text-center text-background/60">
            <p>&copy; {new Date()?.getFullYear()} AlumniConnect. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default DonationPortal;