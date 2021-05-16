import React from 'react';
import { useOnBoarding } from '@frontend/shared/hooks/onBoarding';
import Step1 from '../components/on-boarding/Step1';
import Step2 from '../components/on-boarding/Step2';
import Step3 from '../components/on-boarding/Step3';
import Screen from '../components/common/Screen';

export default function OnboardingScreen() {
  return (
    <Screen safeArea>
      <Steps />
    </Screen>
  );
}

const Steps = () => {
  const { state, handleContinue, handleSelectRole } = useOnBoarding();
  if (state.step === 2) {
    return <Step2 handleContinue={handleContinue} />;
  }
  if (state.step === 3) {
    return <Step3 />;
  }
  return <Step1 handleSelectRole={handleSelectRole} />;
};
