import React from 'react';
import { useNavigate } from 'react-router-dom';
import { OnboardingWizard } from '@/components/onboarding/OnboardingWizard';
import { useAuth } from '@/contexts/AuthContext';

const OnboardingPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleComplete = () => {
    // Navigate to appropriate dashboard
    const dashboardPath = user?.role === 'au_pair' 
      ? '/dashboard/au-pair'
      : '/dashboard/host-family';
    navigate(dashboardPath);
  };

  return <OnboardingWizard onComplete={handleComplete} />;
};

export default OnboardingPage;