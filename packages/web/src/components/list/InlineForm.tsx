import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useCRUDFieldValue } from '@frontend/shared/hooks/field';
import { useGetListItemsByType } from '@frontend/shared/hooks/list';
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider, KeyboardDatePicker, DatePicker } from '@material-ui/pickers';
import InputGroup from '../common/InputGroup';
import LoadingButton from '../common/LoadingButton';
import { onAlert } from '../../utils/alert';
import { useEffect } from 'react';
import moment from 'moment';

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
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            name={fieldName}
            label={label}
            multiline={multiline}
            rows={multiline ? 4 : null}
            disabled={formik.isSubmitting}
            value={formik.values[fieldName]}
            onChange={formik.handleChange}
            error={formik.touched[fieldName] && Boolean(formik.errors[fieldName])}
            helperText={formik.touched[fieldName] && formik.errors[fieldName]}
          />
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
