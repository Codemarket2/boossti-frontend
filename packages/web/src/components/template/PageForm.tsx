import { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import { useRouter } from 'next/router';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
// import { useGetFields } from '@frontend/shared/hooks/field';
import { useCRUDPages } from '@frontend/shared/hooks/template';
import LoadingButton from '../common/LoadingButton';
import InputGroup from '../common/InputGroup';
import ImagePicker from '../common/ImagePicker';
import { onAlert } from '../../utils/alert';
import Backdrop from '../common/Backdrop';
import ErrorLoading from '../common/ErrorLoading';
// import FieldValueForm2 from '../field/FieldValueForm2';

interface IProps {
  typeSlug: string;
  parentId: string;
  template: string;
  item?: any;
  updateCallBack?: (arg: string) => void;
  onCancel?: () => void;
}

export default function PageForm({
  typeSlug,
  template,
  item = null,
  updateCallBack,
  onCancel,
  parentId,
}: IProps) {
  const router = useRouter();
  const [extraFields, setExtraFields] = useState([]);
  const createCallBack = (itemSlug) => {
    router.push(`/${typeSlug}/${itemSlug}`);
  };
  const { state, setState, formik, setFormValues, CRUDLoading } = useCRUDPages({
    onAlert,
    template,
    createCallBack,
    updateCallBack,
  });

  useEffect(() => {
    if (item) {
      setFormValues(item);
    }
  }, [item]);

  const defaultOnCancel = () => {
    router.push(`/${typeSlug}`);
  };

  // useEffect(() => {
  //   if (data && data.getFields) {
  //     const newFields = data.getFields.map((field) => ({
  //       value: '',
  //       media: [],
  //       tempMedia: [],
  //       tempMediaFiles: [],
  //       itemId: null,
  //       fieldType: field.fieldType,
  //       parentId,
  //       field: field._id,
  //       label: field.label,
  //       template: field.fieldType === 'type' ? field.template : null,
  //     }));
  //     setExtraFields(newFields);
  //   }
  // }, [data]);

  // if (error || !data || !data.getFields) {
  //   return <ErrorLoading error={error} />;
  // }

  return (
    <>
      <Backdrop open={CRUDLoading || formik.isSubmitting} />
      <Paper className="px-3" variant="outlined">
        <form onSubmit={formik.handleSubmit}>
          <InputGroup>
            <TextField
              size="small"
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
              size="small"
              fullWidth
              variant="outlined"
              label="Description*"
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
          {/* {extraFields.map((field, index) => (
            <div className="my-4" key={field._id}>
              <FieldValueForm2
                label={field.label}
                fieldType={field.fieldType}
                value={field.value}
                onChange={(newValue) => {
                  if (field.fieldType === 'type') {
                    setExtraFields(
                      extraFields.map((oldValue, i) =>
                        i === index ? { ...oldValue, itemId: newValue } : oldValue,
                      ),
                    );
                  } else {
                    setExtraFields(
                      extraFields.map((oldValue, i) =>
                        i === index ? { ...oldValue, value: newValue } : oldValue,
                      ),
                    );
                  }
                }}
                itemId={field.itemId}
                template={field.template ? field.template._id : null}
                typeSlug={field.template ? field.template.slug : null}
                mediaState={field}
                setMediaState={(newValue) =>
                  setExtraFields(
                    extraFields.map((oldValue, i) =>
                      i === index ? { ...oldValue, ...newValue } : oldValue,
                    ),
                  )
                }
              />
            </div>
          ))} */}
          <InputGroup>
            <LoadingButton type="submit" color="primary" loading={formik.isSubmitting}>
              {formik.values.edit ? 'Submit' : 'Submit'}
            </LoadingButton>
            <Button
              onClick={onCancel ? onCancel : defaultOnCancel}
              className="ml-2"
              disabled={formik.isSubmitting}
              color="primary"
              variant="outlined"
            >
              Cancel
            </Button>
          </InputGroup>
        </form>
      </Paper>
    </>
  );
}
