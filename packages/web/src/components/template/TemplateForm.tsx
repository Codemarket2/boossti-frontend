import { useCRUDTemplates } from '@frontend/shared/hooks/template';
import { useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import { useRouter } from 'next/router';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import LoadingButton from '../common/LoadingButton';
import InputGroup from '../common/InputGroup';
import ImagePicker from '../common/ImagePicker';
import { onAlert } from '../../utils/alert';
import Backdrop from '../common/Backdrop';

interface IProps {
  vType?: any;
  updateCallBack?: (arg: string) => void;
  onCancel?: () => void;
}

export default function TemplateForm({ vType = null, updateCallBack, onCancel }: IProps) {
  const router = useRouter();
  const createCallBack = (slug) => {
    router.push(`/${slug}`);
  };

  const defaultOnCancel = () => {
    router.push('/templates');
  };

  const { state, setState, formik, CRUDLoading, setFormValues } = useCRUDTemplates({
    onAlert,
    createCallBack,
    updateCallBack,
  });

  useEffect(() => {
    if (vType) {
      setFormValues(vType);
    }
  }, [vType]);
  return (
    <>
      <Backdrop open={CRUDLoading || formik.isSubmitting} />
      <Paper className="px-3" variant="outlined">
        <form onSubmit={formik.handleSubmit}>
          <InputGroup>
            <TextField
              fullWidth
              variant="outlined"
              label="Title*"
              name="title"
              type="text"
              disabled={formik.isSubmitting}
              value={formik.values.title}
              onChange={formik.handleChange}
              error={formik.touched.title && Boolean(formik.errors.title)}
              helperText={formik.touched.title && formik.errors.title}
            />
          </InputGroup>
          <InputGroup>
            <TextField
              fullWidth
              variant="outlined"
              label="Description"
              name="description"
              type="text"
              multiline
              rows={4}
              disabled={formik.isSubmitting}
              value={formik.values.description}
              onChange={formik.handleChange}
              error={formik.touched.description && Boolean(formik.errors.description)}
              helperText={formik.touched.description && formik.errors.description}
            />
          </InputGroup>
          <InputGroup>
            <InputLabel htmlFor="my-input">Images/Video</InputLabel>
            <ImagePicker state={state} setState={setState} />
          </InputGroup>

          <InputGroup>
            <LoadingButton type="submit" color="primary" loading={formik.isSubmitting}>
              {formik.values.edit ? 'Update' : 'Create'}
            </LoadingButton>
            <Button
              onClick={onCancel || defaultOnCancel}
              className="ml-2"
              disabled={formik.isSubmitting}
              color="primary"
            >
              Cancel
            </Button>
          </InputGroup>
        </form>
      </Paper>
    </>
  );
}
