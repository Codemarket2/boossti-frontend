import React, { useState } from 'react';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';

export default function OnBoarding() {
  const [state, setState] = useState({ step: 1, role: null });

  const handleSelectRole = (role) => {
    setState({ ...state, role: role, step: 2 });
  };

  const handleContinue = (step) => {
    setState({ ...state, step: step });
  };

  if (state.step === 2) {
    return <Step2 handleContinue={handleContinue} />;
  } else if (state.step === 3) {
    return <Step3 />;
  } else {
    return <Step1 handleSelectRole={handleSelectRole} />;
  }
}
