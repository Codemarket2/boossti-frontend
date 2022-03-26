import { useCreateTemplate } from '@frontend/shared/hooks/template';
import { Typography } from '@material-ui/core';
import { useState } from 'react';
import { onAlert } from '../../utils/alert';
import Backdrop from '../common/Backdrop';
import AddField from '../form2/AddField';

interface IProps {
  createCallback: (slug: string) => void;
}

export default function AddTemplateForm({ createCallback }: IProps) {
  const { handleCreate, createLoading } = useCreateTemplate({ onAlert });
  const [showBackdrop, setShowBackdrop] = useState(false);

  return (
    <div>
      <Typography className="pl-2 mt-3">Default Widget</Typography>
      <AddField
        isSection
        onSave={async (widget) => {
          setShowBackdrop(true);
          await handleCreate(
            {
              title: widget?.label,
              fields: [{ ...widget, options: { ...widget.options, default: true } }],
            },
            createCallback,
            () => setShowBackdrop(false),
          );
        }}
        field={null}
      />
      <Backdrop open={createLoading || showBackdrop} />
    </div>
  );
}
