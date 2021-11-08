import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MoreVert from '@material-ui/icons/MoreVert';
import Divider from '@material-ui/core/Divider';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import TuneIcon from '@material-ui/icons/Tune';
import { useState } from 'react';
import { useGetFieldValuesByItem, useCreateFieldValue } from '@frontend/shared/hooks/field';
import ErrorLoading from '../common/ErrorLoading';
import Backdrop from '../common/Backdrop';
import CreateFormModal from './CreateFormModal';
import FormView from './FormView';

interface IProps {
  field: any;
  parentId: string;
}

const initialState = {
  show: null,
  fieldId: null,
  backdrop: false,
};

export default function Form({ field, parentId }: IProps): any {
  const [state, setState] = useState(initialState);
  const { data, error } = useGetFieldValuesByItem({ parentId, field: field._id });
  const { handleCreateField } = useCreateFieldValue();

  const handleEditForm = async () => {
    let fieldId = '';
    if (data?.getFieldValuesByItem?.count > 0) {
      const fieldValue = data?.getFieldValuesByItem?.data[0];
      fieldId = fieldValue._id;
    } else {
      setState({ ...initialState, backdrop: true });
      const payload = { parentId, field: field._id, value: '' };
      const response = await handleCreateField(payload);
      const fieldValue = response?.data?.createFieldValue?.data[0];
      fieldId = fieldValue._id;
    }
    setState({ ...initialState, fieldId });
  };

  if (error || !data || !data.getFieldValuesByItem) {
    return <ErrorLoading error={error} />;
  }
  return (
    <div>
      <Divider />
      <div className="d-flex justify-content-between align-items-center">
        <Typography variant="h5">{field.label}</Typography>
        <IconButton onClick={(event) => setState({ ...state, show: event.currentTarget })}>
          <MoreVert />
        </IconButton>
      </div>
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
      </Menu>
      {data?.getFieldValuesByItem?.data[0] && (
        <FormView parentId={data?.getFieldValuesByItem?.data[0]._id} />
      )}
      {state.fieldId && (
        <CreateFormModal parentId={state.fieldId} open onClose={() => setState(initialState)} />
      )}
      {state.backdrop && <Backdrop open={state.backdrop} />}
    </div>
  );
}
