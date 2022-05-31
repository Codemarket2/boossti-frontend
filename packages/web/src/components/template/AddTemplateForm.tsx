import { useCreateTemplate } from '@frontend/shared/hooks/template';
import { TextField, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { onAlert } from '../../utils/alert';
import Backdrop from '../common/Backdrop';
import InputGroup from '../common/InputGroup';
import AddField from '../form2/AddField';

interface IProps {
  createCallback: (slug: string) => void;
}

export default function AddTemplateForm({ createCallback }: IProps) {
  const router = useRouter();
  const { handleCreate, createLoading } = useCreateTemplate({ onAlert });
  const [showBackdrop, setShowBackdrop] = useState(false);
  const [title, setTitle] = useState({ value: '', error: false });

  const handleSave = async (widget) => {
    if (title.value) {
      setShowBackdrop(true);
      await handleCreate(
        {
          title: title.value,
          fields: [{ ...widget, options: { ...widget.options, default: true } }],
        },
        createCallback,
        () => setShowBackdrop(false),
      );
    } else {
      setTitle({ ...title, error: true });
    }
  };

  return (
    <div>
      <div className="px-2">
        <InputGroup>
          <TextField
            fullWidth
            size="small"
            label="Title"
            value={title.value}
            onChange={({ target }) =>
              setTitle({ ...title, value: target?.value, error: Boolean(!target?.value) })
            }
            required
            error={title.error}
            helperText={title.error && 'Title is required'}
          />
        </InputGroup>
      </div>
      <Typography className="pl-2 mt-3">Default Widget</Typography>
      <AddField
        isSection
        onSave={handleSave}
        field={null}
        onCancel={() => router.push('/templates')}
      />
      <Backdrop open={createLoading || showBackdrop} />
    </div>
  );
}
