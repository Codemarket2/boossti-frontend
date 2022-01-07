import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';
import CloseIcon from '@material-ui/icons/Close';
import { useGetForms } from '@frontend/shared/hooks/form';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useState } from 'react';
import { useUpdateFieldValue, useCreateFieldValue } from '@frontend/shared/hooks/field';
import LoadingButton from '../common/LoadingButton';
import InputGroup from '../common/InputGroup';

interface IProps {
  open: boolean;
  formData: any;
  parentId: String;
  field: String;
  onClose: () => void;
}

export default function SelectFormDrawer({
  open,
  parentId,
  formData,
  field,
  onClose,
}: IProps): any {
  const { data } = useGetForms({});
  const { handleUpdateField } = useUpdateFieldValue();
  const { handleCreateField } = useCreateFieldValue();
  const [formId, setFormId] = useState('');
  const [save, setSave] = useState(false);

  const onSave = async () => {
    if (formData?.getFieldValuesByItem?.data[0]) {
      const payload = {
        ...formData?.getFieldValuesByItem?.data[0],
        value: formId,
      };
      console.log('payload', payload);
      await handleUpdateField(payload);
    } else {
      const payload = {
        parentId,
        field,
        value: formId,
      };
      await handleCreateField(payload);
    }
  };
  let options = [];
  if (data) {
    options = data.getForms.data.map((form) => ({
      title: form.name,
      value: form._id,
    }));
  }

  return (
    <Drawer anchor="right" open={open}>
      <div style={{ minWidth: '100vw' }} className="p-2">
        <div style={{ marginBottom: '50px' }}>
          <Button
            startIcon={<CloseIcon />}
            onClick={onClose}
            size="small"
            color="primary"
            variant="contained"
            className="position-absolute m-2"
            style={{ right: 0 }}
          >
            Close
          </Button>
        </div>
        <div>
          <div>
            <h1>Select form</h1>
            <InputGroup>
              <FormControl variant="outlined" fullWidth size="small">
                <Autocomplete
                  id="select-forms"
                  options={options}
                  multiple={true}
                  getOptionLabel={(option) => option.title}
                  style={{ width: '50%' }}
                  onClose={() => {
                    setSave(true);
                  }}
                  renderTags={(params) => (
                    <div>
                      {params[params.length - 1].title}
                      {setFormId(params[params.length - 1].value)}
                    </div>
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Select Forms"
                      variant="outlined"
                      style={{ width: '50%' }}
                    />
                  )}
                />

                {save && (
                  <InputGroup>
                    <>
                      <LoadingButton
                        type="submit"
                        size="small"
                        onClick={() => {
                          onSave();
                          setSave(false);
                        }}
                      >
                        Save
                      </LoadingButton>
                      <Button
                        className="ml-2"
                        variant="outlined"
                        size="small"
                        onClick={() => {
                          setSave(false);
                        }}
                      >
                        Cancel
                      </Button>
                    </>
                  </InputGroup>
                )}
              </FormControl>
            </InputGroup>
          </div>
        </div>
      </div>
    </Drawer>
  );
}
