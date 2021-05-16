import React, { useState } from 'react';
import { useOnBoarding } from '@frontend/shared/hooks/onBoarding';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';

export default function OnBoarding() {
  const { state, handleContinue, handleSelectRole } = useOnBoarding();

  if (state.step === 2) {
    return <Step2 handleContinue={handleContinue} />;
  }
  if (state.step === 3) {
    return <Step3 />;
  }
  return <Step1 handleSelectRole={handleSelectRole} />;
}
