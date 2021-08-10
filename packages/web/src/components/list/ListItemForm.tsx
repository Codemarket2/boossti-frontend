import { useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import { useRouter } from 'next/router';
import Button from '@material-ui/core/Button';
import Link from 'next/link';
import InputLabel from '@material-ui/core/InputLabel';
import { useCRUDListItems } from '@frontend/shared/hooks/list';
import LoadingButton from '../common/LoadingButton';
import InputGroup from '../common/InputGroup';
import ImagePicker from '../common/ImagePicker';
import { onAlert } from '../../utils/alert';
import Backdrop from '../common/Backdrop';

interface IProps {
  typeSlug: string;
  types: [string];
  item?: any;
  updateCallBack?: () => void;
  onCancel?: () => void;
}
export default function ListItemForm({
  typeSlug,
  types,
  item = null,
  updateCallBack,
  onCancel,
}: IProps) {
  const router = useRouter();
  const createCallBack = (itemSlug) => {
    router.push(`/types/${typeSlug}/${itemSlug}`);
  };
  const { state, setState, formik, setFormValues, CRUDLoading } = useCRUDListItems({
    onAlert,
    types,
    createCallBack,
    updateCallBack,
  });

  useEffect(() => {
    if (item) {
      setFormValues(item);
    }
  }, [item]);

  const defaultOnCancel = () => {
    router.push(`/types/${typeSlug}`);
  };

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
              label="Description*"
              name="description"
              type="text"
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
              color="primary">
              Cancel
            </Button>
          </InputGroup>
        </form>
      </Paper>
    </>
  );
}
