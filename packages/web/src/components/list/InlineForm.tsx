import dynamic from 'next/dynamic';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputGroup from '../common/InputGroup';
import LoadingButton from '../common/LoadingButton';

const RichTextarea = dynamic(() => import('../common/RichTextarea'), { ssr: false });

interface IProps {
  label: string;
  fieldName: string;
  onCancel: () => void;
  multiline?: boolean;
  formik: any;
  formLoading?: boolean;
}

export default function InlineForm({
  label = 'Value',
  onCancel,
  multiline,
  formik,
  fieldName,
  formLoading = false,
}: IProps) {
  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <InputGroup>
          {multiline ? (
            <RichTextarea
              value={formik.values[fieldName].includes('-n-e-w') ? '' : formik.values[fieldName]}
              onChange={(value) => formik.setFieldValue(fieldName, value)}
            />
          ) : (
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              name={fieldName}
              label={label}
              multiline={multiline}
              rows={multiline ? 4 : null}
              disabled={formik.isSubmitting}
              value={formik.values[fieldName].includes('-n-e-w') ? '' : formik.values[fieldName]}
              onChange={formik.handleChange}
              error={formik.touched[fieldName] && Boolean(formik.errors[fieldName])}
              helperText={formik.touched[fieldName] && formik.errors[fieldName]}
            />
          )}
        </InputGroup>
        <InputGroup>
          <LoadingButton type="submit" loading={formLoading} size="small">
            Save
          </LoadingButton>
          <Button
            className="ml-2"
            disabled={formLoading}
            variant="outlined"
            size="small"
            onClick={onCancel}>
            Cancel
          </Button>
        </InputGroup>
      </form>
    </div>
  );
}
