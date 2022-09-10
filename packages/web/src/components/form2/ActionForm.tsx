import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import { useEffect } from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Switch from '@mui/material/Switch';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import { useFormActions } from '@frontend/shared/hooks/form';
import { useSelector } from 'react-redux';
import LoadingButton from '../common/LoadingButton';
import InputGroup from '../common/InputGroup';
import { onAlert } from '../../utils/alert';
import RichTextarea from '../common/RichTextarea2';
import Field from './Field';
import { defaultValue } from './FormView';

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
  const { formik, setFormValues, edit } = useFormActions({ onAlert, onSave });
  useEffect(() => {
    if (action) {
      setFormValues(action);
    }
  }, [action]);

  const settingTheme = useSelector(({ setting }: any) => setting.theme);

  useEffect(() => {
    const array = [];
    if (settingTheme.palette) {
      Object.keys(settingTheme.palette).forEach((key, index) => {
        if (typeof settingTheme.palette[key] === 'string') {
          array.push({ name: key, field: '' });
        } else {
          Object.keys(settingTheme.palette[key]).map((skey) =>
            array.push({
              name: key.concat(skey.charAt(0).toUpperCase() + skey.slice(1)),
              field: '',
            }),
          );
        }
      });
      formik.setFieldValue('colorValues', array);
    }
  }, []);

  return (
    <>
      <Paper variant="outlined" className="bg-light">
        <form className="px-2" onSubmit={formik.handleSubmit}>
          <Typography variant="h5" className="pt-2 pl-2" data-testid="action-form-title">
            {edit ? 'Edit' : 'Add'} Action
          </Typography>
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
          <Card className="p-2 my-2" variant="outlined">
            <InputGroup>
              <TextField
                inputProps={{ 'data-testid': 'action-name-input' }}
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
          </Card>
          <Card className="p-2 my-2" variant="outlined">
            <InputGroup>
              <FormControl
                variant="outlined"
                fullWidth
                size="small"
                error={Boolean(formik.touched.triggerType && formik.errors.triggerType)}
              >
                <InputLabel id="triggerType">Trigger Type</InputLabel>
                <Select
                  inputProps={{ 'data-testid': 'trigger-type-input' }}
                  labelId="triggerType"
                  name="triggerType"
                  value={formik.values.triggerType}
                  onChange={formik.handleChange}
                  label="Trigger Type"
                >
                  <MenuItem value="onCreate">On Create</MenuItem>
                  <MenuItem value="onUpdate">On Update</MenuItem>
                  <MenuItem value="onDelete">On Delete</MenuItem>
                  <MenuItem value="onView">On View</MenuItem>
                </Select>
                {formik.touched.triggerType && formik.errors.triggerType && (
                  <FormHelperText className="text-danger">
                    {formik.errors.triggerType}
                  </FormHelperText>
                )}
              </FormControl>
            </InputGroup>
          </Card>
          <Card className="p-2 my-2" variant="outlined">
            <InputGroup>
              <FormControl
                variant="outlined"
                fullWidth
                size="small"
                error={Boolean(formik.touched.actionType && formik.errors.actionType)}
              >
                <InputLabel id="actionType">Action Type*</InputLabel>
                <Select
                  inputProps={{ 'data-testid': 'action-type-input' }}
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
                  <MenuItem value="onPaletteChange">On Palette Change</MenuItem>
                  <MenuItem value="createCognitoGroup">Create Cognito Group</MenuItem>
                  <MenuItem value="updateCognitoGroup">Update Cognito Group</MenuItem>
                  <MenuItem value="deleteCognitoGroup">Delete Cognito Group</MenuItem>
                  <MenuItem value="createCognitoUser">Create Cognito User</MenuItem>
                  <MenuItem value="updateCognitoUser">Update Cognito User</MenuItem>
                  <MenuItem value="deleteCognitoUser">Delete Cognito User</MenuItem>
                  <MenuItem value="linkedinInviteAutomation">LinkedIn Invite Automation </MenuItem>
                  {fields?.some(
                    (field) => field?.fieldType === 'link' && field?.options?.required,
                  ) ? (
                    <MenuItem value="createSeoReport">Create Lighthouse SEO Audit Report</MenuItem>
                  ) : (
                    <MenuItem disabled value="createSeoReport">
                      Create Lighthouse SEO Audit Report
                    </MenuItem>
                  )}
                  <MenuItem value="createSubDomainRoute53">
                    Create sub domain on AWS route53
                  </MenuItem>
                  <MenuItem value="updateSubDomainRoute53">
                    Update sub domain on AWS route53
                  </MenuItem>
                  <MenuItem value="deleteSubDomainRoute53">
                    Delete sub domain on AWS route53
                  </MenuItem>
                </Select>
                {formik.touched.actionType && formik.errors.actionType ? (
                  <FormHelperText className="text-danger">
                    {formik.errors.actionType}
                  </FormHelperText>
                ) : (
                  <FormHelperText>
                    Add required phone number field to form then you can use send sms action type
                  </FormHelperText>
                )}
              </FormControl>
            </InputGroup>
          </Card>
          <Card className="p-2 my-2" variant="outlined">
            <Typography fontWeight="bold">Inputs</Typography>
            {['createSeoReport']?.includes(formik.values.actionType) && (
              <>
                <div className="d-flex align-items-center">
                  <FormControl
                    fullWidth
                    variant="outlined"
                    size="small"
                    error={Boolean(formik.touched.websiteUrl && formik.errors.websiteUrl)}
                  >
                    <InputLabel id="websiteUrl">Website URL Field</InputLabel>
                    <Select
                      labelId="websiteUrl"
                      id="websiteUrl"
                      name="websiteUrl"
                      value={formik.values.websiteUrl}
                      onChange={formik.handleChange}
                      label="Website URL Field"
                    >
                      {fields?.map((field) => {
                        if (field?.label) {
                          if (field?.label.toUpperCase().includes('URL')) {
                            return (
                              <MenuItem value={field._id} key={field._id}>
                                {field.label}
                              </MenuItem>
                            );
                          }
                        }
                        return null;
                      })}
                    </Select>
                  </FormControl>
                </div>
                <div className="d-flex align-items-center mt-3">
                  <FormControl
                    fullWidth
                    variant="outlined"
                    size="small"
                    error={Boolean(formik.touched.report && formik.errors.report)}
                  >
                    <InputLabel id="report">Lighthouse Report Field</InputLabel>
                    <Select
                      labelId="report"
                      id="report"
                      name="report"
                      value={formik.values.report}
                      onChange={formik.handleChange}
                      label="Lighthouse Report Field"
                    >
                      {fields?.map((field) => {
                        if (field?.fieldType === 'lighthouseReport') {
                          return (
                            <MenuItem value={field._id} key={field._id}>
                              {field.label}
                            </MenuItem>
                          );
                        }
                        return null;
                      })}
                    </Select>
                  </FormControl>
                </div>
                <div className="d-flex align-items-center mt-3">
                  <FormControl
                    fullWidth
                    variant="outlined"
                    size="small"
                    error={Boolean(formik.touched.responseLink && formik.errors.responseLink)}
                  >
                    <InputLabel id="responseLink">Response Link</InputLabel>
                    <Select
                      labelId="responseLink"
                      id="responseLink"
                      name="responseLink"
                      value={formik.values.responseLink}
                      onChange={formik.handleChange}
                      label="Response Link"
                    >
                      {fields?.map((field) => {
                        if (field?.fieldType === 'link') {
                          return (
                            <MenuItem value={field._id} key={field._id}>
                              {field.label}
                            </MenuItem>
                          );
                        }
                        return null;
                      })}
                    </Select>
                  </FormControl>
                </div>
                <div className="d-flex align-items-center mt-3">
                  <FormControl
                    fullWidth
                    variant="outlined"
                    size="small"
                    error={Boolean(
                      formik.touched.reportScreenshoot && formik.errors.reportScreenshoot,
                    )}
                  >
                    <InputLabel id="reportScreenshoot">Report Screenshoot Field</InputLabel>
                    <Select
                      labelId="reportScreenshoot"
                      id="reportScreenshoot"
                      name="reportScreenshoot"
                      value={formik.values.reportScreenshoot}
                      onChange={formik.handleChange}
                      label="Report Screenshoot Field"
                    >
                      {fields?.map((field) => {
                        if (field?.fieldType === 'image') {
                          return (
                            <MenuItem value={field._id} key={field._id}>
                              {field.label}
                            </MenuItem>
                          );
                        }
                        return null;
                      })}
                    </Select>
                  </FormControl>
                </div>
              </>
            )}
            {['createCognitoGroup', 'updateCognitoGroup', 'deleteCognitoGroup']?.includes(
              formik.values.actionType,
            ) && (
              <>
                <div className="d-flex align-items-center">
                  <FormControl
                    fullWidth
                    variant="outlined"
                    size="small"
                    error={Boolean(
                      formik.touched.cognitoGroupName && formik.errors.cognitoGroupName,
                    )}
                  >
                    <InputLabel id="groupName">Cognito Group Name</InputLabel>
                    <Select
                      labelId="groupName"
                      id="groupName"
                      name="cognitoGroupName"
                      value={formik.values.cognitoGroupName}
                      onChange={formik.handleChange}
                      label="Cognito Group Name"
                    >
                      {fields?.map((field) => {
                        if (field?.label) {
                          if (field?.label.toUpperCase().includes('NAME')) {
                            return (
                              <MenuItem value={field._id} key={field._id}>
                                {field.label}
                              </MenuItem>
                            );
                          }
                        }
                        return null;
                      })}
                    </Select>
                  </FormControl>
                </div>
                <div className="d-flex align-items-center mt-3">
                  <FormControl
                    fullWidth
                    variant="outlined"
                    size="small"
                    error={Boolean(
                      formik.touched.cognitoGroupDesc && formik.errors.cognitoGroupDesc,
                    )}
                  >
                    <InputLabel id="groupDesc">Cognito Group Description</InputLabel>
                    <Select
                      labelId="groupDesc"
                      id="groupDesc"
                      name="cognitoGroupDesc"
                      value={formik.values.cognitoGroupDesc}
                      onChange={formik.handleChange}
                      label="Cognito Group Description"
                    >
                      {fields?.map((field) => {
                        if (field?.label) {
                          if (field?.label.toUpperCase().includes('DESCRIPTION')) {
                            return (
                              <MenuItem value={field._id} key={field._id}>
                                {field.label}
                              </MenuItem>
                            );
                          }
                        }
                        return null;
                      })}
                    </Select>
                  </FormControl>
                </div>
              </>
            )}
            {['createCognitoUser', 'updateCognitoUser', 'deleteCognitoUser']?.includes(
              formik?.values?.actionType,
            ) && (
              <>
                <div className="d-flex mt-3 align-items-center">
                  <FormControl
                    fullWidth
                    variant="outlined"
                    size="small"
                    error={Boolean(
                      formik.touched.cognitoGroupName && formik.errors.cognitoGroupName,
                    )}
                  >
                    <InputLabel id="firstName">First Name</InputLabel>
                    <Select
                      labelId="firstName"
                      id="firstName"
                      name="firstName"
                      value={formik.values.firstName}
                      onChange={formik.handleChange}
                      label="First Name"
                    >
                      {fields?.map((field) => {
                        if (field?.label) {
                          if (field?.label.toUpperCase().includes('NAME')) {
                            return (
                              <MenuItem value={field._id} key={field._id}>
                                {field.label}
                              </MenuItem>
                            );
                          }
                        }
                        return null;
                      })}
                    </Select>
                  </FormControl>
                </div>
                <div className="d-flex mt-3 align-items-center">
                  <FormControl
                    fullWidth
                    variant="outlined"
                    size="small"
                    error={Boolean(
                      formik.touched.cognitoGroupName && formik.errors.cognitoGroupName,
                    )}
                  >
                    <InputLabel id="lastName">Last Name</InputLabel>
                    <Select
                      labelId="lastName"
                      id="lastName"
                      name="lastName"
                      value={formik.values.lastName}
                      onChange={formik.handleChange}
                      label="Last Name"
                    >
                      {fields?.map((field) => {
                        if (field?.label) {
                          if (field?.label.toUpperCase().includes('NAME')) {
                            return (
                              <MenuItem value={field._id} key={field._id}>
                                {field.label}
                              </MenuItem>
                            );
                          }
                        }
                        return null;
                      })}
                    </Select>
                  </FormControl>
                </div>
                <div className="d-flex mt-3 align-items-center">
                  <FormControl
                    fullWidth
                    variant="outlined"
                    size="small"
                    error={Boolean(
                      formik.touched.cognitoGroupName && formik.errors.cognitoGroupName,
                    )}
                  >
                    <InputLabel id="userEmail">User Email</InputLabel>
                    <Select
                      labelId="userEmail"
                      id="userEmail"
                      name="userEmail"
                      value={formik.values.userEmail}
                      onChange={formik.handleChange}
                      label="User Email"
                    >
                      {fields?.map((field) => {
                        if (field?.label) {
                          if (field?.label.toUpperCase().includes('EMAIL')) {
                            return (
                              <MenuItem value={field._id} key={field._id}>
                                {field.label}
                              </MenuItem>
                            );
                          }
                        }
                        return null;
                      })}
                    </Select>
                  </FormControl>
                </div>
              </>
            )}
            {[
              'createCognitoGroup',
              'updateCognitoGroup',
              'deleteCognitoGroup',
              'createCognitoUser',
              'updateCognitoUser',
              'deleteCognitoUser',
            ]?.includes(formik?.values?.actionType) && (
              <>
                <InputGroup>
                  <TextField
                    fullWidth
                    label="User Pool Id*"
                    variant="outlined"
                    name="userPoolId"
                    size="small"
                    // type="email"
                    disabled={formik.isSubmitting}
                    value={formik.values.userPoolId}
                    onChange={formik.handleChange}
                    error={formik.touched.userPoolId && Boolean(formik.errors.userPoolId)}
                    helperText={formik.touched.userPoolId && formik.errors.userPoolId}
                  />
                </InputGroup>
              </>
            )}
            {['sendEmail', 'generateNewUser']?.includes(formik.values.actionType) && (
              <InputGroup>
                <TextField
                  inputProps={{ 'data-testid': 'sender-email-input' }}
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
                    inputProps={{ 'data-testid': 'receiver-type-input' }}
                    labelId="receiverType"
                    name="receiverType"
                    value={formik.values.receiverType}
                    onChange={formik.handleChange}
                    label="Receiver*"
                  >
                    <MenuItem value="formOwner">Form owner</MenuItem>
                    <MenuItem value="responseSubmitter">Response submitter</MenuItem>
                    <MenuItem value="customEmail">Custom email</MenuItem>
                    <MenuItem value="emailField" disabled={!(emailFields?.length > 0)}>
                      Form email field
                    </MenuItem>
                  </Select>
                  {formik.touched.receiverType && formik.errors.receiverType ? (
                    <FormHelperText className="text-danger">
                      {formik.errors.receiverType}
                    </FormHelperText>
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
                    options={[]}
                    filterSelectedOptions
                    renderInput={(params) => (
                      <TextField
                        error={
                          formik.touched.receiverEmails && Boolean(formik.errors.receiverEmails)
                        }
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
                  <InputLabel id="emailFieldId-simple-select-outlined-label">
                    Email Field
                  </InputLabel>
                  <Select
                    labelId="emailFieldId-simple-select-outlined-label"
                    id="emailFieldId-simple-select-outlined"
                    name="emailFieldId"
                    value={formik.values.emailFieldId}
                    onChange={formik.handleChange}
                    label="Email Field"
                  >
                    {emailFields?.map((field) => (
                      <MenuItem value={field._id} key={field._id}>
                        {field.label}
                      </MenuItem>
                    ))}
                  </Select>
                  {formik.touched.emailFieldId && formik.errors.emailFieldId && (
                    <FormHelperText className="text-danger">
                      {formik.errors.emailFieldId}
                    </FormHelperText>
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
                      <MenuItem value={field._id} key={field._id}>
                        {field.label}
                      </MenuItem>
                    ))}
                  </Select>
                  {formik.touched.nameFieldId && formik.errors.nameFieldId && (
                    <FormHelperText className="text-danger">
                      {formik.errors.nameFieldId}
                    </FormHelperText>
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
                        <MenuItem value={field._id} key={field._id}>
                          {field.label}
                        </MenuItem>
                      ))}
                  </Select>
                  {formik.touched.phoneFieldId && formik.errors.phoneFieldId && (
                    <FormHelperText className="text-danger">
                      {formik.errors.phoneFieldId}
                    </FormHelperText>
                  )}
                </FormControl>
              </InputGroup>
            )}
            {[
              'showMessage',
              'sendEmail',
              'sendSms',
              'generateNewUser',
              'sendInAppNotification',
              'sendPushNotification',
            ]?.includes(formik.values.actionType) && (
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
                      size="large"
                    >
                      <AddCircleIcon />
                    </IconButton>
                  </Tooltip>
                </Typography>
                <Typography>
                  Inbuilt Variables - formName, createdBy, createdAt, pageName
                </Typography>
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
                          <MenuItem value={field._id} key={`field-${field._id}`}>
                            {field.label}
                          </MenuItem>
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
            {formik.values.actionType === 'onPaletteChange' && (
              <InputGroup>
                <Typography variant="h6" className="d-flex align-items-center pl-2">
                  Color Values
                </Typography>
                {formik.values.colorValues.map((colorValues, colorValuesIndex) => {
                  return (
                    <div className="d-flex align-items-center pb-3" key={colorValuesIndex}>
                      <TextField
                        fullWidth
                        className="mr-2"
                        label="Name"
                        variant="outlined"
                        name="name"
                        size="small"
                        disabled
                        value={colorValues.name}
                      />
                      <FormControl fullWidth variant="outlined" size="small">
                        <InputLabel id="variablefield-simple-select-outlined-label">
                          Field
                        </InputLabel>
                        <Select
                          labelId="variablefield-simple-select-outlined-label"
                          id="variablefield-simple-select-outlined"
                          name="value"
                          value={colorValues.field}
                          onChange={({ target }) =>
                            formik.setFieldValue(
                              'colorValues',
                              formik.values.colorValues.map((sV, sI) => {
                                if (sI === colorValuesIndex) {
                                  let payload = {
                                    ...colorValues,
                                    field: target.value,
                                    formId: null,
                                  };
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
                            <MenuItem value={field._id} key={field._id}>
                              {field.label}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </div>
                  );
                })}
              </InputGroup>
            )}
            {['sendEmail', 'generateNewUser'].includes(formik.values.actionType) && (
              <InputGroup>
                <TextField
                  inputProps={{ 'data-testid': 'subject-input' }}
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
                  {formik.values.actionType === 'sendInAppNotification'
                    ? 'description'
                    : 'Email Body'}
                  *
                </InputLabel>
                <RichTextarea
                  testId="body-input"
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
                      size="large"
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
                          <InputLabel id="variablefield-simple-select-outlined-label">
                            Field
                          </InputLabel>
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
                                    let payload = {
                                      ...variable,
                                      field: target.value,
                                      formId: null,
                                    };
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
                              <MenuItem value={field._id} key={field._id}>
                                {field.label}
                              </MenuItem>
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
                            size="large"
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </div>
                      <Field
                        field={{
                          ...fields?.filter((f) => f?._id === variable.field)[0],
                          label: 'value',
                        }}
                        // label="Value"
                        validate
                        value={variable.value}
                        onChangeValue={(newValue) =>
                          formik.setFieldValue(
                            'fields',
                            formik.values.fields.map((sV, sI) =>
                              sI === variableIndex
                                ? { ...variable, value: { ...defaultValue, ...newValue } }
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
            {[
              'createSubDomainRoute53',
              'updateSubDomainRoute53',
              'deleteSubDomainRoute53',
            ].includes(formik.values.actionType) && (
              <InputGroup>
                <FormControl
                  variant="outlined"
                  fullWidth
                  size="small"
                  error={Boolean(formik.touched.domain && formik.errors.domain)}
                >
                  <InputLabel id="domain-simple-select-outlined-label">Domain name</InputLabel>
                  <Select
                    labelId="domain-simple-select-outlined-label"
                    id="domain-simple-select-outlined"
                    name="domain"
                    value={formik.values.domain}
                    onChange={formik.handleChange}
                    label="Domain name"
                  >
                    {fields
                      ?.filter((f) => f.fieldType === 'text' && f?.options?.required)
                      ?.map((field) => (
                        <MenuItem value={field._id} key={field._id}>
                          {field.label}
                        </MenuItem>
                      ))}
                  </Select>
                  {formik.touched.domain && formik.errors.domain && (
                    <FormHelperText className="text-danger">{formik.errors.domain}</FormHelperText>
                  )}
                </FormControl>
              </InputGroup>
            )}
          </Card>
          {['createSubDomainRoute53', 'updateSubDomainRoute53', 'deleteSubDomainRoute53'].includes(
            formik.values.actionType,
          ) && (
            <Card className="p-2 my-2" variant="outlined">
              <Typography fontWeight="bold">Outputs</Typography>
              <InputGroup>
                <FormControl
                  variant="outlined"
                  fullWidth
                  size="small"
                  error={Boolean(formik.touched.distributionId && formik.errors.distributionId)}
                >
                  <InputLabel id="distributionId-simple-select-outlined-label">
                    Distribution ID
                  </InputLabel>
                  <Select
                    labelId="distributionId-simple-select-outlined-label"
                    id="distributionId-simple-select-outlined"
                    name="distributionId"
                    value={formik.values.distributionId}
                    onChange={formik.handleChange}
                    label="Distribution ID"
                  >
                    {fields
                      ?.filter((f) => f.fieldType === 'text')
                      ?.map((field) => (
                        <MenuItem value={field._id} key={field._id}>
                          {field.label}
                        </MenuItem>
                      ))}
                  </Select>
                  {formik.touched.distributionId && formik.errors.distributionId && (
                    <FormHelperText className="text-danger">
                      {formik.errors.distributionId}
                    </FormHelperText>
                  )}
                </FormControl>
              </InputGroup>
            </Card>
          )}
          {['linkedinInviteAutomation'].includes(formik.values.actionType) && (
            <>
              <div className="d-flex align-items-center">
                <FormControl
                  fullWidth
                  variant="outlined"
                  size="small"
                  error={Boolean(formik.touched.cognitoGroupName && formik.errors.cognitoGroupName)}
                >
                  <InputLabel id="linkedinEmail">LinkedIn Email</InputLabel>
                  <Select
                    labelId="linkedinEmail"
                    id="linkedinEmail"
                    name="linkedinEmail"
                    value={formik.values.linkedinEmail}
                    onChange={formik.handleChange}
                    label="LinkedIn Email"
                  >
                    {fields
                      ?.filter((f) => f.fieldType === 'email' && f?.options?.required)
                      ?.map((field) => (
                        <MenuItem value={field._id} key={field._id}>
                          {field.label}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </div>
              <div className="d-flex align-items-center mt-3">
                <FormControl
                  fullWidth
                  variant="outlined"
                  size="small"
                  error={Boolean(formik.touched.cognitoGroupDesc && formik.errors.cognitoGroupDesc)}
                >
                  <InputLabel id="linkedinPassword">LinkedIn Password</InputLabel>
                  <Select
                    labelId="linkedinPassword"
                    id="linkedinPassword"
                    name="linkedinPassword"
                    value={formik.values.linkedinPassword}
                    onChange={formik.handleChange}
                    label=">LinkedIn Password"
                  >
                    {fields
                      ?.filter((f) => f.fieldType === 'password' && f?.options?.required)
                      ?.map((field) => (
                        <MenuItem value={field._id} key={field._id}>
                          {field.label}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </div>
              <div className="d-flex align-items-center mt-3">
                <FormControl
                  fullWidth
                  variant="outlined"
                  size="small"
                  error={Boolean(formik.touched.cognitoGroupDesc && formik.errors.cognitoGroupDesc)}
                >
                  <InputLabel id="keyword">Keyword</InputLabel>
                  <Select
                    labelId="keyword"
                    id="keyword"
                    name="keyword"
                    value={formik.values.keyword}
                    onChange={formik.handleChange}
                    label=">Keyword"
                  >
                    {fields
                      ?.filter((f) => f.fieldType === 'text' && f?.options?.required)
                      ?.map((field) => (
                        <MenuItem value={field._id} key={field._id}>
                          {field.label}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </div>
              <div className="d-flex align-items-center mt-3">
                <FormControl
                  fullWidth
                  variant="outlined"
                  size="small"
                  error={Boolean(formik.touched.cognitoGroupDesc && formik.errors.cognitoGroupDesc)}
                >
                  <InputLabel id="tag">Tag</InputLabel>
                  <Select
                    labelId="tag"
                    id="tag"
                    name="tag"
                    value={formik.values.tag}
                    onChange={formik.handleChange}
                    label="Tag"
                  >
                    {fields
                      ?.filter((f) => f.fieldType === 'text' && f?.options?.required)
                      ?.map((field) => (
                        <MenuItem value={field._id} key={field._id}>
                          {field.label}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </div>
              <div className="d-flex align-items-center mt-3">
                <FormControl
                  fullWidth
                  variant="outlined"
                  size="small"
                  error={Boolean(formik.touched.cognitoGroupDesc && formik.errors.cognitoGroupDesc)}
                >
                  <InputLabel id="noOfInvites">No. Of Invites</InputLabel>
                  <Select
                    labelId="noOfInvites"
                    id="noOfInvites"
                    name="noOfInvites"
                    value={formik.values.noOfInvites}
                    onChange={formik.handleChange}
                    label="noOfInvites"
                  >
                    {fields
                      ?.filter((f) => f.fieldType === 'number' && f?.options?.required)
                      ?.map((field) => (
                        <MenuItem value={field._id} key={field._id}>
                          {field.label}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </div>
            </>
          )}
          <InputGroup>
            <LoadingButton
              data-testid="save-button"
              type="submit"
              size="small"
              loading={formik.isSubmitting}
            >
              Save
            </LoadingButton>
            <Button
              data-testid="cancel-button"
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
      </Paper>
    </>
  );
}

const actionTypes = [
  'showMessage',
  'sendEmail',
  'sendSms',
  'generateNewUser',
  'updateFieldValue',
  'sendInAppNotification',
  'sendPushNotification',
  'onPaletteChange',
  'createCognitoGroup',
  'updateCognitoGroup',
  'deleteCognitoGroup',
  'createCognitoUser',
  'updateCognitoUser',
  'deleteCognitoUser',
  'createSeoReport',
  'createSubDomainRoute53',
  'updateSubDomainRoute53',
  'deleteSubDomainRoute53',
  'linkedinInviteAutomation',
];
