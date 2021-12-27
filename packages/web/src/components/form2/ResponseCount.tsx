import { useUpdateForm } from '@frontend/shared/hooks/form';
import { useGetResponses } from '@frontend/shared/hooks/response';
import { Backdrop, Button, Fade, Modal, Typography } from '@material-ui/core';
import { useState } from 'react';
import { onAlert } from '../../utils/alert';
import ErrorLoading from '../common/ErrorLoading';
import ResponseList from './ResponseList';

interface IProps {
  formId: any;
}

export default function ResponseCount({ formId }: IProps): any {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { data, error, loading } = useGetResponses(formId);
  const { state } = useUpdateForm({
    onAlert,
    _id: formId,
  });
  if (error || !data || loading) {
    return <ErrorLoading error={error} />;
  }

  return (
    <>
      {data?.getResponses?.count && (
        <Button
          variant="outlined"
          onClick={handleOpen}
        >{`${data?.getResponses?.count} Response`}</Button>
      )}
      {state && !error && (
        <>
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 700,
            }}
          >
            <Fade in={open}>
              <ResponseList form={state} />
            </Fade>
          </Modal>
        </>
      )}
    </>
  );
}
