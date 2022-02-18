import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { useOnBoarding } from '@frontend/shared/hooks/onBoarding';
import Step1 from '../components/onboarding/Step1';
import Step2 from '../components/onboarding/Step2';
import Step3 from '../components/onboarding/Step3';

export default function OnBoarding() {
  const user = useSelector(({ auth }: any) => auth.user);
  const { state, handleContinue, handleSelectRole, handleSubscribe } = useOnBoarding();
  const router = useRouter();

  useEffect(() => {
    if (user && user.subscription && user.subscription.active) {
      router.push('/dashboard');
    }
  }, [user]);

  if (state.step === 2) {
    return <Step2 handleContinue={handleContinue} />;
  }
  if (state.step === 3) {
    return <Step3 handleSubscribe={handleSubscribe} />;
  }
  return <Step1 handleSelectRole={handleSelectRole} />;
}
