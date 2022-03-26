import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
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
import RichTextarea from '../common/RichTextarea2';
import Field from './Field';
import { defualtValue } from './FormView';

const filter = createFilterOptions();

interface IProps {
  onCancel: () => void;
  fields: any[];
  emailFields: any[];
  nameFields: any[];
  onSave: (payload: any, operation: string) => void;
  action: any;
}

export default function ActionForm({
  onCancel,
  fields,
  emailFields,
  nameFields,
  onSave,
  action,
}: IProps) {
  const { formik, setFormValues } = useFormActions({ onAlert, onSave });
  useEffect(() => {
    if (action) {
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
          error={Boolean(formik.touched.actionType && formik.errors.actionType)}
        >
          <InputLabel id="actionType">Action Type*</InputLabel>
          <Select
            labelId="actionType"
            name="actionType"
            value={formik.values.actionType}
            onChange={formik.handleChange}
            label="Action Type*"
          >
            <MenuItem value="showMessage">Show Message</MenuItem>
            <MenuItem value="sendEmail">Send Email</MenuItem>
            {fields?.some((f) => f.fieldType === 'phoneNumber' && f?.options?.required) && (
              <MenuItem value="sendSms">Send SMS</MenuItem>
            )}
            {fields?.some((f) => f.fieldType === 'email' && f?.options?.required) && (
              <MenuItem value="generateNewUser">Generate New User</MenuItem>
            )}
            <MenuItem value="updateFieldValue">Update field value</MenuItem>
            <MenuItem value="sendInAppNotification">Send In-App Notification</MenuItem>
            <MenuItem value="sendPushNotification">Send Push Notification</MenuItem>
          </Select>
          {formik.touched.actionType && formik.errors.actionType ? (
            <FormHelperText className="text-danger">{formik.errors.actionType}</FormHelperText>
          ) : (
            <FormHelperText>
              Add required phone number field to form then you can use send sms action type
            </FormHelperText>
          )}
        </FormControl>
      </InputGroup>
      <InputGroup>
        <TextField
          fullWidth
          label="Action Name*"
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
      {['sendEmail', 'generateNewUser']?.includes(formik.values.actionType) && (
        <InputGroup>
          <TextField
            fullWidth
            label="Sender Email*"
            variant="outlined"
            name="senderEmail"
            size="small"
            // type="email"
            disabled={formik.isSubmitting}
            value={formik.values.senderEmail}
            onChange={formik.handleChange}
            error={formik.touched.senderEmail && Boolean(formik.errors.senderEmail)}
            helperText={formik.touched.senderEmail && formik.errors.senderEmail}
          />
        </InputGroup>
      )}
      {['sendEmail', 'sendInAppNotification', 'sendPushNotification']?.includes(
        formik.values.actionType,
      ) && (
        <InputGroup>
          <FormControl
            variant="outlined"
            fullWidth
            size="small"
            error={Boolean(formik.touched.receiverType && formik.errors.receiverType)}
          >
            <InputLabel id="receiverType">Receiver*</InputLabel>
            <Select
              labelId="receiverType"
              name="receiverType"
              value={formik.values.receiverType}
              onChange={formik.handleChange}
              label="Receiver*"
            >
              <MenuItem value="formOwner">Form owner</MenuItem>
              <MenuItem value="responseSubmitter">Response submitter</MenuItem>
              {formik.values.actionType === 'sendEmail' && (
                <>
                  <MenuItem value="customEmail">Custom email</MenuItem>
                  {emailFields?.length > 0 && (
                    <MenuItem value="emailField">Form email field</MenuItem>
                  )}
                </>
              )}
            </Select>
            {formik.touched.receiverType && formik.errors.receiverType ? (
              <FormHelperText className="text-danger">{formik.errors.receiverType}</FormHelperText>
            ) : (
              <FormHelperText>
                Add required Email field to form then use it as receiver email
              </FormHelperText>
            )}
          </FormControl>
        </InputGroup>
      )}
      {formik.values.actionType === 'sendEmail' && (
        <>
          {formik.values.receiverType === 'customEmail' && (
            <Autocomplete
              size="small"
              multiple
              value={formik.values.receiverEmails}
              onChange={(e, newValue) => {
                formik.setFieldValue('receiverEmails', newValue);
              }}
              filterOptions={(options, params) => {
                const filtered = filter(options, params);
                const { inputValue } = params;
                const isExisting = options.some((option) => inputValue === option);
                if (inputValue !== '' && !isExisting) {
                  filtered.push(inputValue);
                }
                return filtered;
              }}
              filterSelectedOptions
              renderInput={(params) => (
                <TextField
                  error={formik.touched.receiverEmails && Boolean(formik.errors.receiverEmails)}
                  helperText={formik.touched.receiverEmails && formik.errors.receiverEmails}
                  {...params}
                  variant="outlined"
                  fullWidth
                  label="Receiver Emails*"
                />
              )}
            />
          )}
        </>
      )}
      {(formik.values.receiverType === 'emailField' ||
        formik.values.actionType === 'generateNewUser') && (
        <InputGroup>
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
        </InputGroup>
      )}
      {formik.values.actionType === 'generateNewUser' && (
        <InputGroup>
          <FormControl
            variant="outlined"
            fullWidth
            size="small"
            error={Boolean(formik.touched.nameFieldId && formik.errors.nameFieldId)}
          >
            <InputLabel id="nameFieldId-simple-select-outlined-label">Name Field</InputLabel>
            <Select
              labelId="nameFieldId-simple-select-outlined-label"
              id="nameFieldId-simple-select-outlined"
              name="nameFieldId"
              value={formik.values.nameFieldId}
              onChange={formik.handleChange}
              label="Name Field"
            >
              {nameFields?.map((field) => (
                <MenuItem value={field._id}>{field.label}</MenuItem>
              ))}
            </Select>
            {formik.touched.nameFieldId && formik.errors.nameFieldId && (
              <FormHelperText className="text-danger">{formik.errors.nameFieldId}</FormHelperText>
            )}
          </FormControl>
        </InputGroup>
      )}
      {formik.values.actionType === 'sendSms' && (
        <InputGroup>
          <FormControl
            variant="outlined"
            fullWidth
            size="small"
            error={Boolean(formik.touched.phoneFieldId && formik.errors.phoneFieldId)}
          >
            <InputLabel id="phoneFieldId-simple-select-outlined-label">
              Phone number field
            </InputLabel>
            <Select
              labelId="phoneFieldId-simple-select-outlined-label"
              id="phoneFieldId-simple-select-outlined"
              name="phoneFieldId"
              value={formik.values.phoneFieldId}
              onChange={formik.handleChange}
              label="Phone number field"
            >
              {fields
                ?.filter((f) => f.fieldType === 'phoneNumber' && f?.options?.required)
                ?.map((field) => (
                  <MenuItem value={field._id}>{field.label}</MenuItem>
                ))}
            </Select>
            {formik.touched.phoneFieldId && formik.errors.phoneFieldId && (
              <FormHelperText className="text-danger">{formik.errors.phoneFieldId}</FormHelperText>
            )}
          </FormControl>
        </InputGroup>
      )}
      {formik.values.actionType !== 'updateFieldValue' && (
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
          <Typography>Inbuilt Variables - formName, createdBy, createdAt, pageName</Typography>
          <InputLabel>
            Define Variables and use it in email subject and body. example - {`{{email}}`}
          </InputLabel>
          {formik.values.variables.map((variable, variableIndex) => (
            <div className="d-flex align-items-center" key={variableIndex}>
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
                      sI === variableIndex ? { ...variable, name: target.value } : sV,
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
                      formik.values.variables.map((sV, sI) => {
                        if (sI === variableIndex) {
                          let payload = { ...variable, field: target.value, formId: null };
                          const field = fields?.filter(
                            (f) => f._id === target.value && f?.formId,
                          )[0];
                          if (field) {
                            payload = { ...payload, formId: field.formId };
                          }
                          return payload;
                        }
                        return sV;
                      }),
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
                      formik.values.variables.filter((sV, sI) => sI !== variableIndex),
                    )
                  }
                >
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </div>
          ))}
        </InputGroup>
      )}
      {['sendEmail', 'generateNewUser'].includes(formik.values.actionType) && (
        <InputGroup>
          <TextField
            fullWidth
            label="Email Subject*"
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
      )}
      {['sendEmail', 'showMessage', 'generateNewUser', 'sendInAppNotification'].includes(
        formik.values.actionType,
      ) && (
        <InputGroup>
          <InputLabel>
            {formik.values.actionType === 'sendInAppNotification' ? 'description' : 'Email Body'}*
          </InputLabel>
          <RichTextarea
            value={formik.values.body}
            onChange={(newValue) => formik.setFieldValue('body', newValue)}
          />
          {formik.touched.body && formik.errors.body && (
            <FormHelperText className="text-danger">{formik.errors.body}</FormHelperText>
          )}
        </InputGroup>
      )}
      {['sendSms', 'sendPushNotification'].includes(formik.values.actionType) && (
        <InputGroup>
          <TextField
            fullWidth
            label="Message*"
            variant="outlined"
            name="body"
            size="small"
            rows={4}
            multiline
            disabled={formik.isSubmitting}
            value={formik.values.body}
            onChange={formik.handleChange}
            error={formik.touched.body && Boolean(formik.errors.body)}
            helperText={formik.touched.body && formik.errors.body}
          />
        </InputGroup>
      )}
      {formik.values.actionType === 'updateFieldValue' && (
        <InputGroup>
          <Typography variant="h6" className="d-flex align-items-center pl-2">
            Fields
            <Tooltip title="Add New Action">
              <IconButton
                color="primary"
                onClick={() =>
                  formik.setFieldValue('fields', [
                    ...formik.values.fields,
                    { field: '', formId: null, value: null },
                  ])
                }
              >
                <AddCircleIcon />
              </IconButton>
            </Tooltip>
          </Typography>
          {formik.values.fields.map((variable, variableIndex) => (
            <div key={variableIndex}>
              <>
                <div className="d-flex align-items-center mt-3 mb-2">
                  <FormControl fullWidth variant="outlined" size="small">
                    <InputLabel id="variablefield-simple-select-outlined-label">Field</InputLabel>
                    <Select
                      labelId="variablefield-simple-select-outlined-label"
                      id="variablefield-simple-select-outlined"
                      name="value"
                      value={variable.field}
                      onChange={({ target }) =>
                        formik.setFieldValue(
                          'fields',
                          formik.values.fields.map((sV, sI) => {
                            if (sI === variableIndex) {
                              let payload = { ...variable, field: target.value, formId: null };
                              const field = fields?.filter(
                                (f) => f._id === target.value && f?.formId,
                              )[0];
                              if (field) {
                                payload = { ...payload, formId: field.formId };
                              }
                              return payload;
                            }
                            return sV;
                          }),
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
                          'fields',
                          formik.values.fields.filter((sV, sI) => sI !== variableIndex),
                        )
                      }
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </div>
                <Field
                  {...fields?.filter((f) => f?._id === variable.field)[0]}
                  label="Value"
                  validate
                  value={variable.value}
                  onChangeValue={(newValue) =>
                    formik.setFieldValue(
                      'fields',
                      formik.values.fields.map((sV, sI) =>
                        sI === variableIndex
                          ? { ...variable, value: { ...defualtValue, ...newValue } }
                          : sV,
                      ),
                    )
                  }
                />
              </>
            </div>
          ))}
        </InputGroup>
      )}
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
