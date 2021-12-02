import { useState } from 'react';
import LayoutVariables from './LayoutVariables';
import Design from './Design';
import Backdrop from '../common/Backdrop';

export default function Layout({ form, onChange }: any) {
  const [state, setState] = useState({ showVariables: false, showBackdrop: false });

  const onVariableChange = (newVariable) => {
    onChange({ ...form?.settings?.layout, variables: newVariable });
  };

  if (state.showVariables) {
    return (
      <LayoutVariables
        field={form?.fields}
        variables={form?.settings?.layout?.variables}
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
        value={form?.settings?.layout?.value}
      />
    </>
  );
}
