import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useContactForm } from '@frontend/shared/hooks/contact';
import LoadingButton from '../common/LoadingButton';
import InputGroup from '../common/InputGroup';

const StyledPaper = styled('div')(({ theme }) => ({
  padding: '1%',
}));

export default function ContactForm() {
  const { formik, formLoading } = useContactForm();
  const [formValues, setFormValues] = useState([{ fieldName: '', fieldValue: '' }]);
  const addFormFields = () => {
    setFormValues([...formValues, { fieldName: '', fieldValue: '' }]);
  };
  const handleChange = (i, e) => {
    const newFormValues = [...formValues];
    newFormValues[i][e.target.name] = e.target.value;
    setFormValues(newFormValues);
  };

  const removeFormFields = (i) => {
    const newFormValues = [...formValues];
    newFormValues.splice(i, 1);
    setFormValues(newFormValues);
  };

  useEffect(() => {
    formik.setFieldValue('extraField', formValues);
  }, [formValues]);

  return (
    <StyledPaper>
      {/* <Typography>Contact Form</Typography> */}

      <div>
        <Grid container spacing={1}>
          <Grid item lg={6}>
            <InputGroup>
              <TextField
                fullWidth
                label="First Name"
                variant="outlined"
                name="firstName"
                size="small"
                type="text"
                placeholder="Enter Title"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                helperText={formik.touched.firstName && formik.errors.firstName}
              />
            </InputGroup>
          </Grid>
          <Grid item lg={6}>
            <InputGroup>
              <TextField
                fullWidth
                label="Last Name"
                variant="outlined"
                name="lastName"
                size="small"
                type="text"
                placeholder="Enter Last Name"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                helperText={formik.touched.lastName && formik.errors.lastName}
              />
            </InputGroup>
          </Grid>
        </Grid>
        <Grid container spacing={1}>
          <Grid item lg={6}>
            <InputGroup>
              <TextField
                fullWidth
                label="Title"
                variant="outlined"
                name="title"
                size="small"
                type="text"
                placeholder="Enter Title"
                value={formik.values.title}
                onChange={formik.handleChange}
                error={formik.touched.title && Boolean(formik.errors.title)}
                helperText={formik.touched.title && formik.errors.title}
              />
            </InputGroup>
          </Grid>
          <Grid item lg={6}>
            <InputGroup>
              <TextField
                fullWidth
                label="Business Name"
                variant="outlined"
                name="businessName"
                size="small"
                type="text"
                placeholder="Enter Business Name"
                value={formik.values.businessName}
                onChange={formik.handleChange}
                error={formik.touched.businessName && Boolean(formik.errors.businessName)}
                helperText={formik.touched.businessName && formik.errors.businessName}
              />
            </InputGroup>
          </Grid>
        </Grid>
        <Grid container spacing={1}>
          <Grid item lg={6}>
            <InputGroup>
              <TextField
                fullWidth
                label="Phone Number"
                variant="outlined"
                name="phone"
                size="small"
                type="text"
                placeholder="Enter Phone Number"
                value={formik.values.phone}
                onChange={formik.handleChange}
                error={formik.touched.phone && Boolean(formik.errors.phone)}
                helperText={formik.touched.phone && formik.errors.phone}
              />
            </InputGroup>
          </Grid>
          <Grid item lg={6}>
            <InputGroup>
              <TextField
                fullWidth
                label="Email Address"
                variant="outlined"
                name="email"
                size="small"
                type="email"
                placeholder="Enter Email Address"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </InputGroup>
          </Grid>
        </Grid>
        <Grid container spacing={1}>
          <Grid item lg={6}>
            <InputGroup>
              <TextField
                fullWidth
                label="City"
                variant="outlined"
                name="city"
                size="small"
                type="text"
                placeholder="Enter City Name"
                value={formik.values.city}
                onChange={formik.handleChange}
                error={formik.touched.city && Boolean(formik.errors.city)}
                helperText={formik.touched.city && formik.errors.city}
              />
            </InputGroup>
          </Grid>
          <Grid item lg={6}>
            <InputGroup>
              <TextField
                fullWidth
                label="Collection Name"
                variant="outlined"
                name="groupName"
                size="small"
                type="text"
                placeholder="Enter Collection Name"
                value={formik.values.groupName}
                onChange={formik.handleChange}
                error={formik.touched.groupName && Boolean(formik.errors.groupName)}
                helperText={formik.touched.groupName && formik.errors.groupName}
              />
            </InputGroup>
          </Grid>
        </Grid>

        <Typography>Extra Fields</Typography>
        {formValues.map((element, index) => (
          <Grid container key={index} spacing={1}>
            <Grid item xs={6}>
              <InputGroup>
                <TextField
                  fullWidth
                  label="Field Name"
                  variant="outlined"
                  name="fieldName"
                  size="small"
                  type="text"
                  placeholder="Enter Field Name"
                  value={element.fieldName}
                  onChange={(e) => handleChange(index, e)}
                  //  error={formik.touched.email && Boolean(formik.errors.email)}
                  //  helperText={formik.touched.email && formik.errors.email}
                />
              </InputGroup>
            </Grid>
            <Grid item xs={5}>
              <InputGroup>
                <TextField
                  fullWidth
                  label="Field Value"
                  variant="outlined"
                  name="fieldValue"
                  size="small"
                  type="text"
                  placeholder="Enter Field Value"
                  value={element.fieldValue}
                  onChange={(e) => handleChange(index, e)}
                  //  error={formik.touched.email && Boolean(formik.errors.email)}
                  //  helperText={formik.touched.email && formik.errors.email}
                />
              </InputGroup>
            </Grid>
            <Grid
              item
              xs={1}
              style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            >
              {index === 0 ? (
                <IconButton onClick={() => addFormFields()} size="large">
                  <AddIcon />
                </IconButton>
              ) : null}
              {index ? (
                <IconButton onClick={() => removeFormFields(index)} size="large">
                  <DeleteIcon />
                </IconButton>
              ) : null}
            </Grid>
          </Grid>
        ))}
        <InputGroup>
          <LoadingButton onClick={() => formik.handleSubmit()} size="small" loading={formLoading}>
            Save
          </LoadingButton>
        </InputGroup>
      </div>
    </StyledPaper>
  );
}
