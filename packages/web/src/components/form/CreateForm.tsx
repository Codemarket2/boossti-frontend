import { useState } from 'react';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import Fields from '../field/Fields';
import FormView from './FormView';

interface IProps {
  parentId: string;
}

export default function CreateForm({ parentId }: IProps) {
  const [state, setState] = useState('field');
  return (
    <>
      <div className="text-center my-3">
        <ButtonGroup color="primary" variant="outlined">
          <Button
            onClick={() => setState('field')}
            variant={state === 'field' ? 'contained' : 'outlined'}
          >
            Field View
          </Button>
          <Button
            onClick={() => setState('form')}
            variant={state === 'form' ? 'contained' : 'outlined'}
          >
            Form View
          </Button>
        </ButtonGroup>
      </div>
      {state === 'form' ? (
        <FormView parentId={parentId} />
      ) : (
        <Fields parentId={parentId} title="Form Fields" formBuilder />
      )}
    </>
  );
}
