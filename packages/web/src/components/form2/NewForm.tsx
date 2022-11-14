import { useCreateForm } from '@frontend/shared/hooks/form';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { onAlert } from '../../utils/alert';
import BackdropComponent from '../common/Backdrop';
import Breadcrumbs from '../common/Breadcrumbs';
import InputGroup from '../common/InputGroup';
import AddField from './field/AddField';

interface INewForm {
  isWorkflow?: boolean;
}

export default function NewForm({ isWorkflow }: INewForm) {
  const [state, setState] = useState({ name: '', field: null, validate: false });
  const [showBackdrop, setShowBackdrop] = useState(false);
  const { handleCreateForm, createLoading } = useCreateForm({ onAlert });

  const router = useRouter();

  const onSuccess = (form) => {
    router.push(`/form/${form.slug}`);
  };

  const onFailure = () => {
    setShowBackdrop(false);
  };

  const onSave = async (newField) => {
    const field = {
      ...newField,
      options: { ...newField.options, default: true, required: true },
    };
    delete field?.isWidget;
    if (!state.name) {
      setState({ ...state, field, validate: true });
    } else {
      setShowBackdrop(true);
      setState({ ...state, field });
      const payload: any = { name: state.name, fields: [field] };
      if (isWorkflow) {
        payload.settings = { isWorkflow: true };
      }
      await handleCreateForm(payload, onSuccess, onFailure);
    }
  };

  return (
    <div>
      <Breadcrumbs>
        <Link href="/feed">{isWorkflow ? 'Workflows' : 'Forms'}</Link>
        <Typography color="textPrimary">New</Typography>
      </Breadcrumbs>
      <Paper variant="outlined">
        <div className="px-2">
          <InputGroup>
            <TextField
              fullWidth
              label={`${isWorkflow ? 'Workflow' : 'Form'} Name`}
              variant="outlined"
              name="name"
              size="small"
              value={state.name}
              onChange={({ target: { value } }) => setState({ ...state, name: value })}
              error={state.validate && !state.name}
              helperText={state.validate && !state.name && 'Form name is required'}
            />
          </InputGroup>
          <Typography>{isWorkflow ? 'First Form' : 'Default Form Field'}</Typography>
        </div>
        <AddField
          isDefault
          field={state.field}
          onSave={onSave}
          onCancel={() => router.push('/feed')}
          isWorkflow={isWorkflow}
        />
      </Paper>
      <BackdropComponent open={showBackdrop || createLoading} />
    </div>
  );
}
