import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MoreVert from '@material-ui/icons/MoreVert';
import Divider from '@material-ui/core/Divider';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import TuneIcon from '@material-ui/icons/Tune';
import { useEffect, useState } from 'react';
import {
  useGetFieldValuesByItem,
  useCreateFieldValue,
  useUpdateFieldValue,
} from '@frontend/shared/hooks/field';
import { useCreateForm } from '@frontend/shared/hooks/form';
import ErrorLoading from '../common/ErrorLoading';
import Backdrop from '../common/Backdrop';
import EditFormDrawer from './EditFormDrawer';
import FieldViewWrapper from './FieldViewWrapper';
import { onAlert } from '../../utils/alert';
import SelectFormDrawer from './SelectFormDrawer';
import ResponseCount from './ResponseCount';

interface IProps {
  field: any;
  parentId: string;
  previewMode?: boolean;
}

const initialState = {
  show: null,
  fieldId: null,
  edit: false,
  select: false,
  backdrop: false,
};

export default function FormC({ field, parentId, previewMode = false }: IProps): any {
  const [state, setState] = useState(initialState);
  const { data, error } = useGetFieldValuesByItem({ parentId, field: field._id });

  const { handleCreateField } = useCreateFieldValue();
  const { handleUpdateField } = useUpdateFieldValue();
  const { handleCreateForm } = useCreateForm({ onAlert });

  const handleEditForm = async () => {
    try {
      setState({ ...initialState, backdrop: true });
      let fieldId = null;
      if (data?.getFieldValuesByItem?.count > 0) {
        if (
          data?.getFieldValuesByItem?.data[0]?.value &&
          data?.getFieldValuesByItem?.data[0]?.value !== ''
        ) {
          fieldId = data?.getFieldValuesByItem?.data[0]?.value;
        } else {
          const formRes = await handleCreateForm('Form Name');
          const payload = {
            ...data?.getFieldValuesByItem?.data[0],
            value: formRes?.data?.createForm?._id,
          };
          const updateRes = await handleUpdateField(payload);
          fieldId = updateRes?.data?.updateFieldValue?.value;
        }
      } else {
        const formRes = await handleCreateForm('Form Name');
        const payload = { parentId, field: field._id, value: formRes?.data?.createForm?._id };
        const response = await handleCreateField(payload);
        fieldId = response?.data?.createFieldValue?.value;
      }
      setState({ ...initialState, edit: true, fieldId });
    } catch (err) {
      alert(`Error ${err.message}`);
      setState({ ...state, backdrop: false });
    }
  };

  const handleSelectForm = async () => {
    try {
      setState({ ...initialState, backdrop: true });
      const fieldId = data?.getFieldValuesByItem?.data[0]?.value;
      setState({ ...initialState, select: true, fieldId });
    } catch (err) {
      alert(`Error ${err.message}`);
      setState({ ...state, backdrop: false });
    }
  };

  if (error || !data || !data.getFieldValuesByItem) {
    return <ErrorLoading error={error} />;
  }
  return (
    <div>
      {!previewMode && (
        <>
          <Divider />
          <div className="d-flex justify-content-between align-items-center">
            <Typography variant="h5">{field.label}</Typography>

            <IconButton onClick={(event) => setState({ ...state, show: event.currentTarget })}>
              <MoreVert />
            </IconButton>
          </div>
        </>
      )}
      <Menu
        anchorEl={state.show}
        keepMounted
        open={Boolean(state.show)}
        onClose={() => setState({ ...state, show: null })}
      >
        <MenuItem onClick={handleEditForm}>
          <ListItemIcon className="mr-n4">
            <TuneIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Edit Form" />
        </MenuItem>
        <MenuItem onClick={handleSelectForm}>
          <ListItemIcon className="mr-n4">
            <TuneIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Select Form" />
        </MenuItem>
      </Menu>
      {data?.getFieldValuesByItem?.data[0]?.value && (
        <>
          <ResponseCount formId={data?.getFieldValuesByItem?.data[0]?.value} parentId={parentId} />
          <FieldViewWrapper _id={data?.getFieldValuesByItem?.data[0]?.value} parentId={parentId} />
        </>
      )}
      {state.fieldId && state.edit && (
        <EditFormDrawer formId={state.fieldId} open onClose={() => setState(initialState)} />
      )}
      {state.select && (
        <SelectFormDrawer
          formData={data}
          field={field._id}
          parentId={parentId}
          open
          onClose={() => setState(initialState)}
        />
      )}
      {state.backdrop && <Backdrop open={state.backdrop} />}
    </div>
  );
}
