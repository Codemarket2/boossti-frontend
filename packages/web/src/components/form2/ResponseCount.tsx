import { useGetResponses } from '@frontend/shared/hooks/response';
import { useGetForm } from '@frontend/shared/hooks/form';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import { useState } from 'react';
import ErrorLoading from '../common/ErrorLoading';
import ResponseList from './ResponseList';

interface IProps {
  formId: any;
  parentId?: string;
}

export default function ResponseCount({ formId, parentId }: IProps): any {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { data, error, loading } = useGetResponses(formId, parentId);
  const { data: formData, error: errorData } = useGetForm(formId);

  if (error || !data || loading || !formData?.getForm) {
    return <ErrorLoading error={error || errorData} />;
  }

  return (
    <>
      <div className="text-center mt-2">
        <Button variant="outlined" onClick={handleOpen}>
          {`${data?.getResponses?.count || 0} Responses`}
        </Button>
      </div>
      {open && (
        <Dialog fullScreen open={open} onClose={handleClose}>
          <div className="p-2">
            <div className="d-flex mb-2">
              <Typography variant="h5" className="flex-grow-1">
                Responses
              </Typography>
              <Button
                startIcon={<CloseIcon />}
                onClick={handleClose}
                size="small"
                color="primary"
                variant="contained"
                style={{ right: 0 }}
              >
                Close
              </Button>
            </div>
            <ResponseList form={formData?.getForm} hideDelete parentId={parentId} />
          </div>
        </Dialog>
      )}
    </>
  );
}
