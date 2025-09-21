import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import DonationPortal from './pages/donation-portal';
import MentorshipDashboard from './pages/mentorship-dashboard';
import HomeLanding from './pages/home-landing';
import AlumniDirectory from './pages/alumni-directory';
import PhotoVault from './pages/photo-vault';
import JobPortal from './pages/job-portal';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<HomeLanding />} />
        <Route path="/donation-portal" element={<DonationPortal />} />
        <Route path="/mentorship-dashboard" element={<MentorshipDashboard />} />
        <Route path="/home-landing" element={<HomeLanding />} />
        <Route path="/alumni-directory" element={<AlumniDirectory />} />
        <Route path="/photo-vault" element={<PhotoVault />} />
        <Route path="/job-portal" element={<JobPortal />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
