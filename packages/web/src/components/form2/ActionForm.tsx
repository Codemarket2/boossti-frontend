import dynamic from 'next/dynamic';
import { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Switch from '@material-ui/core/Switch';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import DeleteIcon from '@material-ui/icons/Delete';
import { useFormActions } from '@frontend/shared/hooks/form';
import InputGroup from '../common/InputGroup';
import LoadingButton from '../common/LoadingButton';
import { onAlert } from '../../utils/alert';
const RichTextarea = dynamic(() => import('../common/RichTextarea'), { ssr: false });

interface IProps {
  onCancel: () => void;
  fields: any[];
  emailFields: any[];
  onSave: (payload: any, operation: string) => void;
  action: any;
}

export default function ActionForm({ onCancel, fields, emailFields, onSave, action }: IProps) {
  const { formik, setFormValues } = useFormActions({ onAlert, onSave });
  useEffect(() => {
    if (action) {
      formik.setFieldValue('body', 'newValue');
      setFormValues(action);
    }
  }, [action]);
  return (
    <form className="px-2" onSubmit={formik.handleSubmit}>
      <InputGroup>
        <FormControlLabel
          control={
            <Switch
              checked={formik.values.active}
              onChange={formik.handleChange}
              name="active"
              color="primary"
            />
          }
          label="Activate Action"
        />
      </InputGroup>
      <InputGroup>
        <FormControl
          variant="outlined"
          fullWidth
          size="small"
          disabled
          error={Boolean(formik.touched.actionType && formik.errors.actionType)}
        >
          <InputLabel id="actionType-simple-select-outlined-label">Field Type</InputLabel>
          <Select
            labelId="actionType-simple-select-outlined-label"
            id="actionType-simple-select-outlined"
            name="actionType"
            value={formik.values.actionType}
            onChange={formik.handleChange}
            label="Action Type"
          >
            <MenuItem value="sendEmail">Send Email</MenuItem>
          </Select>
          {formik.touched.actionType && formik.errors.actionType && (
            <FormHelperText className="text-danger">{formik.errors.actionType}</FormHelperText>
          )}
        </FormControl>
      </InputGroup>
      <InputGroup>
        <TextField
          fullWidth
          label="Action Name"
          variant="outlined"
          name="name"
          size="small"
          disabled={formik.isSubmitting}
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />
      </InputGroup>
      <InputGroup>
        <TextField
          fullWidth
          label="Sender Email"
          variant="outlined"
          name="senderEmail"
          size="small"
          type="email"
          disabled={formik.isSubmitting}
          value={formik.values.senderEmail}
          onChange={formik.handleChange}
          error={formik.touched.senderEmail && Boolean(formik.errors.senderEmail)}
          helperText={formik.touched.senderEmail && formik.errors.senderEmail}
        />
      </InputGroup>
      <InputGroup>
        {emailFields?.length > 0 ? (
          <FormControlLabel
            control={
              <Switch
                checked={formik.values.useEmailField}
                onChange={formik.handleChange}
                name="useEmailField"
                color="primary"
              />
            }
            label="Use form field as receiver email"
          />
        ) : (
          <FormHelperText>
            Add required Email field to form then use it as receiver email
          </FormHelperText>
        )}
        {formik.values.useEmailField ? (
          <FormControl
            variant="outlined"
            fullWidth
            size="small"
            error={Boolean(formik.touched.emailFieldId && formik.errors.emailFieldId)}
          >
            <InputLabel id="emailFieldId-simple-select-outlined-label">Email Field</InputLabel>
            <Select
              labelId="emailFieldId-simple-select-outlined-label"
              id="emailFieldId-simple-select-outlined"
              name="emailFieldId"
              value={formik.values.emailFieldId}
              onChange={formik.handleChange}
              label="Email Field"
            >
              {emailFields?.map((field) => (
                <MenuItem value={field._id}>{field.label}</MenuItem>
              ))}
            </Select>
            {formik.touched.emailFieldId && formik.errors.emailFieldId && (
              <FormHelperText className="text-danger">{formik.errors.emailFieldId}</FormHelperText>
            )}
          </FormControl>
        ) : (
          <TextField
            fullWidth
            label="Receiver Email"
            variant="outlined"
            name="receiverEmail"
            size="small"
            type="email"
            disabled={formik.isSubmitting}
            value={formik.values.receiverEmail}
            onChange={formik.handleChange}
            error={formik.touched.receiverEmail && Boolean(formik.errors.receiverEmail)}
            helperText={formik.touched.receiverEmail && formik.errors.receiverEmail}
          />
        )}
      </InputGroup>
      <InputGroup>
        <Typography variant="h6" className="d-flex align-items-center pl-2">
          Variables
          <Tooltip title="Add New Action">
            <IconButton
              color="primary"
              onClick={() =>
                formik.setFieldValue('variables', [
                  ...formik.values.variables,
                  { name: '', field: '' },
                ])
              }
            >
              <AddCircleIcon />
            </IconButton>
          </Tooltip>
        </Typography>
        <InputLabel>
          Define Variables and use it in email subject and body. example - {`{{email}}`}
        </InputLabel>
        {formik.values.variables.map((variable, i) => (
          <div className="d-flex align-items-center" key={i}>
            <TextField
              fullWidth
              className="mr-2"
              label="Name"
              variant="outlined"
              name="name"
              size="small"
              disabled={formik.isSubmitting}
              value={variable.name}
              onChange={({ target }) =>
                formik.setFieldValue(
                  'variables',
                  formik.values.variables.map((sV, sI) =>
                    sI === i ? { ...variable, name: target.value } : sV,
                  ),
                )
              }
            />
            <FormControl fullWidth variant="outlined" size="small">
              <InputLabel id="variablefield-simple-select-outlined-label">Field</InputLabel>
              <Select
                labelId="variablefield-simple-select-outlined-label"
                id="variablefield-simple-select-outlined"
                name="value"
                value={variable.field}
                onChange={({ target }) =>
                  formik.setFieldValue(
                    'variables',
                    formik.values.variables.map((sV, sI) =>
                      sI === i ? { ...variable, field: target.value } : sV,
                    ),
                  )
                }
                label="Field"
              >
                {fields?.map((field) => (
                  <MenuItem value={field._id}>{field.label}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <Tooltip title="Delete Variable">
              <IconButton
                color="primary"
                onClick={() =>
                  formik.setFieldValue(
                    'variables',
                    formik.values.variables.filter((sV, sI) => sI !== i),
                  )
                }
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </div>
        ))}
      </InputGroup>
      <InputGroup>
        <TextField
          fullWidth
          label="Email Subject"
          variant="outlined"
          name="subject"
          size="small"
          disabled={formik.isSubmitting}
          value={formik.values.subject}
          onChange={formik.handleChange}
          error={formik.touched.subject && Boolean(formik.errors.subject)}
          helperText={formik.touched.subject && formik.errors.subject}
        />
      </InputGroup>
      <InputGroup>
        <InputLabel>Email Body</InputLabel>
        <RichTextarea
          value={formik.values.body}
          onChange={(newValue) => formik.setFieldValue('body', newValue)}
        />
        {formik.touched.body && formik.errors.body && (
          <FormHelperText className="text-danger">{formik.errors.body}</FormHelperText>
        )}
      </InputGroup>
      <InputGroup>
        <LoadingButton type="submit" size="small" loading={formik.isSubmitting}>
          Save
        </LoadingButton>
        <Button
          className="ml-2"
          variant="outlined"
          size="small"
          disabled={formik.isSubmitting}
          onClick={onCancel}
        >
          Cancel
        </Button>
      </InputGroup>
    </form>
  );
}
