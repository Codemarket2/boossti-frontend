import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { useSendEmail } from '@frontend/shared/hooks/email/sendEmail';
import {
  MenuItem,
  FormControlLabel,
  FormGroup,
  Select,
  FormControl,
  InputLabel,
  Switch,
} from '@mui/material';
import { useGetAllMailingList } from '@frontend/shared/hooks/email/createMailingList';
import InputGroup from '../common/InputGroup';
import RichTextarea from '../common/RichTextarea2';
import LoadingButton from '../common/LoadingButton';
import MultipleEmails from '../common/MultipleEmails';

export default function EmailForm() {
  const { formik, formLoading } = useSendEmail();
  const { mailingList, error, loading } = useGetAllMailingList();
  const [state, setState] = useState({
    value: '',
    receiverEmail: [],
    error: null,
    resetEmails: true,
  });
  const [checked, setChecked] = React.useState(false);
  const [verified, setVerified] = React.useState(['info@boossti.com', 'contact@boossti.com']);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    formik.handleSubmit();
    setState({
      value: '',
      receiverEmail: [],
      error: null,
      resetEmails: false,
    });
  };
  return (
    <>
      <div style={{ display: 'flex' }}>
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                checked={checked}
                onChange={handleChange}
                inputProps={{ 'aria-label': 'controlled' }}
              />
            }
            label="Select Mailing List"
          />
        </FormGroup>
        <FormGroup style={{ marginLeft: '40px' }}>
          <FormControlLabel
            control={
              <Switch
                checked={formik.values.sendIndividual}
                name="sendIndividual"
                onChange={formik.handleChange}
                inputProps={{ 'aria-label': 'controlled' }}
              />
            }
            label="Send Email one by one"
          />
        </FormGroup>
      </div>
      <form className="px-2" onSubmit={handleSubmit}>
        <InputGroup>
          <TextField
            fullWidth
            label="Send Email Label"
            variant="outlined"
            name="sendEmailLabel"
            size="small"
            placeholder="Enter Label for  your Email Address"
            value={formik.values.sendEmailLabel}
            onChange={formik.handleChange}
            error={formik.touched.sendEmailLabel && Boolean(formik.errors.sendEmailLabel)}
            helperText={formik.touched.sendEmailLabel && formik.errors.sendEmailLabel}
          />
        </InputGroup>
        <InputGroup>
          <TextField
            fullWidth
            label="From"
            variant="outlined"
            name="senderEmail"
            size="small"
            type="email"
            placeholder="Enter your Email Address"
            value={formik.values.senderEmail}
            onChange={formik.handleChange}
            error={formik.touched.senderEmail && Boolean(formik.errors.senderEmail)}
            helperText={formik.touched.senderEmail && formik.errors.senderEmail}
          />
        </InputGroup>
        {/* <FormControl fullWidth>
          <InputLabel id="from">Select Mailing List</InputLabel>
          <Select
            labelId="from"
            name="senderEmail"
            label="From"
            required
            value={formik.values.senderEmail}
            onChange={formik.handleChange}
          >
            {verified?.map((list, i) => (
              <MenuItem key={i} value={list}>
                {list}
              </MenuItem>
            ))}
          </Select>
        </FormControl> */}
        {checked ? (
          <FormControl fullWidth>
            <InputLabel id="mailinglist">Select Mailing List</InputLabel>
            <Select
              labelId="mailinglist"
              name="mailingList"
              label="Select Mailing List"
              value={formik.values.mailingList}
              onChange={formik.handleChange}
            >
              {mailingList?.map((list, i) => (
                <MenuItem key={i} value={list.listName}>
                  <em>{list.listName} -</em> {list.contacts.length} emails
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        ) : (
          <MultipleEmails formik={formik} state={state} setState={setState} />
        )}

        <InputGroup>
          <TextField
            fullWidth
            label="Subject"
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
        </InputGroup>
        <InputGroup>
          <LoadingButton type="submit" size="small" loading={formLoading}>
            Send
          </LoadingButton>
        </InputGroup>
      </form>
    </>
  );
}
