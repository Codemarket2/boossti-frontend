import { useCRUDListTypes } from '@frontend/shared/hooks/list';
import { useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import { useRouter } from 'next/router';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
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

export default function ListTypeForm({ vType = null, updateCallBack, onCancel }: IProps) {
  const router = useRouter();
  const createCallBack = (slug) => {
    router.push(`/${slug}`);
  };

  const defaultOnCancel = () => {
    router.push('/types');
  };

  const { state, setState, formik, CRUDLoading, setFormValues } = useCRUDListTypes({
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
              onClick={onCancel ? onCancel : defaultOnCancel}
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
