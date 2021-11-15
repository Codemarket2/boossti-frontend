import { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import parse from 'html-react-parser';
import { useCreateResponse } from '@frontend/shared/hooks/response';
import InputGroup from '../common/InputGroup';
import LoadingButton from '../common/LoadingButton';
import Field from './Field';
import { validateValue } from './validate';
import { onAlert } from '../../utils/alert';

interface IProps {
  form: any;
}

const defualtValue = {
  field: '',
  value: '',
  valueNumber: null,
  valueBoolean: null,
  valueDate: null,
  itemId: null,
};

export default function FormView({ form: { _id, name, fields, settings } }: IProps): any {
  const [values, setValues] = useState([]);
  const [submitState, setSubmitState] = useState({
    validate: false,
    showOnSubmitMessage: false,
    loading: false,
  });
  const { handleCreateResponse, createLoading } = useCreateResponse({ onAlert });

  const onChange = (sValue) => {
    const newValue = { ...defualtValue, ...sValue };
    let newValues = [];
    let changed = false;
    newValues = values.map((oldValue) => {
      if (oldValue.field === newValue.field) {
        changed = true;
        return newValue;
      }
      return oldValue;
    });
    if (!changed) {
      newValues = [...values, newValue];
    }
    setValues(newValues);
  };

  const onSubmit = async () => {
    setSubmitState({ ...submitState, loading: true });
    let validate = false;
    fields?.every((field) => {
      const tempValue = values.filter((value) => value.field === field._id)[0];
      if (tempValue) {
        if (validateValue(true, tempValue, field.options, field.fieldType).error) {
          validate = true;
          return false;
        }
      } else if (field?.options?.required) {
        validate = true;
        return false;
      }
      return true;
    });
    if (validate) {
      setSubmitState({ ...submitState, validate, loading: false });
    } else {
      const payload = { formId: _id, values };
      await handleCreateResponse(payload, fields);
      setSubmitState({
        ...submitState,
        validate: false,
        showOnSubmitMessage: true,
        loading: false,
      });
      setValues([]);
    }
  };

  return (
    <div className="pt-2">
      {settings?.showFormTitle && (
        <InputGroup className="text-center">
          <Typography variant="h4">{name}</Typography>
        </InputGroup>
      )}
      {submitState.showOnSubmitMessage ? (
        <div className="py-5">
          <div className="ck-content">
            {parse(settings?.onSubmitMessage || '<h2 class="text-center">Thank you</h2>')}
          </div>
          <InputGroup className="text-center">
            {settings?.editResponse && (
              <Button onClick={onSubmit} variant="outlined" color="primary" size="small">
                Edit Response
              </Button>
            )}
          </InputGroup>
        </div>
      ) : (
        <Grid container spacing={0}>
          {fields?.map((field) => (
            <Grid item xs={field?.options?.halfWidth ? 6 : 12}>
              <InputGroup key={field._id} className="px-2">
                <Field
                  validate={submitState.validate}
                  {...field}
                  onChange={onChange}
                  value={values.filter((f) => f.field === field._id)[0]}
                />
              </InputGroup>
            </Grid>
          ))}
          {fields?.length > 0 && (
            <Grid item xs={12}>
              <InputGroup className="px-2">
                <LoadingButton
                  loading={submitState.loading || createLoading}
                  onClick={onSubmit}
                  variant="contained"
                  color="primary"
                  size="small"
                >
                  Submit
                </LoadingButton>
              </InputGroup>
            </Grid>
          )}
        </Grid>
      )}
    </div>
  );
}
