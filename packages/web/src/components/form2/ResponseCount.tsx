import { useGetResponses } from '@frontend/shared/hooks/response';
import { useGetForm } from '@frontend/shared/hooks/form';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Box from '@material-ui/core/Box';
import LinearProgress, { LinearProgressProps } from '@material-ui/core/LinearProgress';
import { useState } from 'react';
import ErrorLoading from '../common/ErrorLoading';
import ResponseList from './ResponseList';
import { useEffect } from 'react';

interface IProps {
  formId: any;
  parentId?: string;
  settings?: any;
}

export default function ResponseCount({ formId, parentId, settings }: IProps): any {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { data, error, loading } = useGetResponses(formId, parentId);
  const { data: formData, error: errorData } = useGetForm(formId);
  let progress;
  console.log(settings);
  if (settings == undefined || settings.minValue == '') {
    progress = 0;
  } else {
    progress = (data?.getResponses?.count / settings?.minValue) * 100;
  }
  useEffect(() => {
    progress = (data?.getResponses?.count / settings?.minValue) * 100;
  }, [data?.getResponses?.count]);
  function LinearProgressWithLabel(props: LinearProgressProps & { value: number }) {
    return (
      <Box style={{ display: 'flex', alignItems: 'center' }}>
        <Box style={{ width: '100%' }}>
          <LinearProgress variant="determinate" {...props} />
        </Box>
        <Box style={{ minWidth: 35 }}>
          <Typography variant="body2">{`${Math.round(progress)}%`}</Typography>
        </Box>
      </Box>
    );
  }

  if (error?.message?.includes("has coerced Null value for NonNull type 'ID!'")) {
    return null;
  }

  if (error || !data || loading || !formData?.getForm) {
    return <ErrorLoading error={error || errorData} />;
  }

  return (
    <>
      <div className="text-center mt-2">
        {settings != null && settings?.minValue ? (
          <LinearProgressWithLabel value={progress} />
        ) : (
          <Button variant="outlined" onClick={handleOpen}>
            {`${data?.getResponses?.count || 0} Responses`}
          </Button>
        )}
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
