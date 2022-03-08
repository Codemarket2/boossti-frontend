import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { useSendEmail } from '@frontend/shared/hooks/email/sendEmail';
import InputGroup from '../common/InputGroup';
import RichTextarea from '../common/RichTextarea2';
import LoadingButton from '../common/LoadingButton';
import MultipleEmails from '../common/MultipleEmails';
import { useGetAllMailingList } from '@frontend/shared/hooks/email/createMailingList';
import {
  MenuItem,
  FormControlLabel,
  FormGroup,
  Select,
  FormControl,
  InputLabel,
  Switch,
} from '@material-ui/core';

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
  console.log(formik.values);
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
        {/* <InputGroup>
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
        </InputGroup> */}
        <FormControl fullWidth>
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
        </FormControl>
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
                  <em>{list.listName} - </em> {list.contacts.length} emails
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
