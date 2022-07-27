import { useAddConstraint } from '@frontend/shared/hooks/form';
import Delete from '@mui/icons-material/Delete';
import AddCircle from '@mui/icons-material/AddCircle';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import React from 'react';
import { onAlert } from '../../../utils/alert';
import InputGroup from '../../common/InputGroup';

interface IProps {
  constraint: any;
  fields: any;
  onCancel: () => void;
  onSave: (newConstraint: any, action: 'create' | 'update') => void;
}

export default function ConstraintForm({ constraint, fields = [], onSave, onCancel }: IProps) {
  const { formik } = useAddConstraint({ onAlert, onSave, constraint });

  return (
    <>
      <Typography>Add Constraint</Typography>
      <form onSubmit={formik.handleSubmit}>
        <InputGroup>
          <TextField
            fullWidth
            name="name"
            size="small"
            label="Constraint name*"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
        </InputGroup>
        <InputGroup>
          <FormControl
            size="small"
            variant="outlined"
            fullWidth
            error={formik.touched.constraintType && Boolean(formik.errors.constraintType)}
          >
            <InputLabel id="constraint-type">Constraint type*</InputLabel>
            <Select
              labelId="constraint-type"
              value={formik.values.constraintType}
              onChange={formik.handleChange}
              label="Constraint type*"
              name="constraintType"
            >
              <MenuItem value="unique">Unique</MenuItem>
            </Select>
            {formik.touched.constraintType && formik.errors.constraintType && (
              <FormHelperText className="text-danger">
                {formik.errors.constraintType}
              </FormHelperText>
            )}
          </FormControl>
        </InputGroup>
        <InputGroup>
          <Typography className="d-flex align-items-center">
            Fields*
            {formik.values.fields.length < fields?.length && (
              <Tooltip title="Add Constraint">
                <IconButton
                  color="primary"
                  onClick={() => formik.setFieldValue('fields', [...formik.values.fields, ''])}
                >
                  <AddCircle />
                </IconButton>
              </Tooltip>
            )}
          </Typography>
          {!(formik.values.fields.length > 0) && formik.errors.fields && (
            <FormHelperText error>{formik.errors.fields}</FormHelperText>
          )}
          {formik.values.fields.map((field, index) => (
            <div key={index}>
              <div className="d-flex align-items-start">
                <div className="w-100">
                  <SelectFields
                    label={`Field ${index + 1}`}
                    fields={fields?.map((f) => ({
                      ...f,
                      disabled: formik.values.fields.includes(f._id) && f?._id !== field,
                    }))}
                    error={!field}
                    value={field}
                    onChange={(newValue) =>
                      formik.setFieldValue(
                        'fields',
                        formik.values.fields.map((f2, i2) => (i2 === index ? newValue : f2)),
                      )
                    }
                  />
                </div>
                <IconButton
                  className="mt-2"
                  color="error"
                  onClick={() =>
                    formik.setFieldValue(
                      'fields',
                      formik.values.fields.filter((_, index3) => index3 !== index),
                    )
                  }
                >
                  <Delete />
                </IconButton>
              </div>
            </div>
          ))}
        </InputGroup>
        <InputGroup>
          <Button type="submit" variant="contained" size="small">
            Save
          </Button>
          <Button onClick={onCancel} size="small" variant="outlined" className="ml-2">
            Cancel
          </Button>
        </InputGroup>
      </form>
    </>
  );
}

const SelectFields = ({
  fields = [],
  label = 'Select field',
  value,
  onChange,
  error,
}: {
  fields: any[];
  label?: string;
  value: string;
  onChange: (newValue: string) => void;
  error: boolean;
}) => {
  return (
    <InputGroup>
      <FormControl size="small" variant="outlined" fullWidth error={error}>
        <InputLabel id={label}>{label}</InputLabel>
        <Select
          labelId={label}
          value={value}
          onChange={({ target }: any) => onChange(target.value)}
          label={label}
        >
          {fields?.map((field) => (
            <MenuItem key={field?._id} value={field?._id} disabled={field?.disabled}>
              {field?.label}
            </MenuItem>
          ))}
        </Select>
        {error && <FormHelperText className="text-danger">Required</FormHelperText>}
      </FormControl>
    </InputGroup>
  );
};
