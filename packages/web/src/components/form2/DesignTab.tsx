import { useState } from 'react';
import DesignVariables from './DesignVariables';
import Design from './Design';
import Backdrop from '../common/Backdrop';

export default function DesignTab({ form, onChange }: any) {
  const [state, setState] = useState({ showVariables: false, showBackdrop: false });

  const onVariableChange = (newVariable) => {
    onChange({ ...form?.settings?.design, variables: newVariable });
  };

  if (state.showVariables) {
    return (
      <DesignVariables
        fields={form?.fields}
        variables={form?.settings?.design?.variables}
        onVariableChange={onVariableChange}
        onClickBack={() => setState({ ...state, showVariables: false })}
      />
    );
  }

  return (
    <>
      <Backdrop open={state.showBackdrop} />
      <Design
        onClickVariables={() => setState({ ...state, showVariables: true })}
        onClickEdit={() => {
          setState({ ...state, showBackdrop: true });
          window.location.href = `/forms/${form?._id}/design`;
        }}
        value={form?.settings?.design?.value}
      />
    </>
  );
}
