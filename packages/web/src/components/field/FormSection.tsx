import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MoreIcon from '@material-ui/icons/MoreHoriz';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import TuneIcon from '@material-ui/icons/Tune';
import { useState } from 'react';
import {
  useGetFieldValues,
  useCreateFieldValue,
  useUpdateFieldValue,
} from '@frontend/shared/hooks/field';
import { useCreateForm } from '@frontend/shared/hooks/form';
import ErrorLoading from '../common/ErrorLoading';
import Backdrop from '../common/Backdrop';
import EditFormDrawer from '../form2/EditFormDrawer';
import FieldViewWrapper from '../form2/FieldViewWrapper';
import { onAlert } from '../../utils/alert';
import SelectFormSection from './SelectFormSection';
import ResponseCount from '../form2/ResponseCount';

interface IProps {
  field: any;
  parentId: string;
  previewMode?: boolean;
}

const initialState = {
  show: null,
  formId: null,
  edit: false,
  select: false,
  backdrop: false,
};

export default function FormC({ field, parentId, previewMode = false }: IProps): any {
  const [state, setState] = useState(initialState);
  const { data, error } = useGetFieldValues({ parentId, field: field._id });

  const { handleCreateField } = useCreateFieldValue();
  const { handleUpdateField } = useUpdateFieldValue();
  const { handleCreateForm } = useCreateForm({ onAlert });

  // const handleEditForm = async () => {
  //   try {
  //     setState({ ...initialState, backdrop: true });
  //     let fieldId = null;
  //     if (data?.getFieldValues?.count > 0) {
  //       if (data?.getFieldValues?.data[0]?.value && data?.getFieldValues?.data[0]?.value !== '') {
  //         fieldId = data?.getFieldValues?.data[0]?.value;
  //       } else {
  //         const formRes = await handleCreateForm('Form Name');
  //         const payload = {
  //           ...data?.getFieldValues?.data[0],
  //           value: formRes?.data?.createForm?._id,
  //         };
  //         const updateRes = await handleUpdateField(payload);
  //         fieldId = updateRes?.data?.updateFieldValue?.value;
  //       }
  //     } else {
  //       const formRes = await handleCreateForm('Form Name');
  //       const payload = { parentId, field: field._id, value: formRes?.data?.createForm?._id };
  //       const response = await handleCreateField(payload);
  //       fieldId = response?.data?.createFieldValue?.value;
  //     }
  //     setState({ ...initialState, edit: true, fieldId });
  //   } catch (err) {
  //     setState({ ...state, backdrop: false });
  //     alert(`Error ${err.message}`);
  //   }
  // };

  const handleSelectForm = async () => {
    try {
      setState({ ...initialState, backdrop: true });
      const formId = data?.getFieldValues?.data[0]?.value;
      setState({ ...initialState, select: true, formId });
    } catch (err) {
      alert(`Error ${err.message}`);
      setState({ ...state, backdrop: false });
    }
  };

  if (error || !data || !data.getFieldValues) {
    return <ErrorLoading error={error} />;
  }

  return (
    <div>
      {!previewMode && (
        <div className="d-flex align-items-center">
          <Typography>{field.label}</Typography>
          <IconButton onClick={(event) => setState({ ...state, show: event.currentTarget })}>
            <MoreIcon />
          </IconButton>
        </div>
      )}
      <Menu
        anchorEl={state.show}
        keepMounted
        open={Boolean(state.show)}
        onClose={() => setState({ ...state, show: null })}
      >
        {data?.getFieldValues?.data[0]?.value && (
          <MenuItem
            onClick={() =>
              setState({
                ...initialState,
                edit: true,
                formId: data?.getFieldValues?.data[0]?.value,
              })
            }
          >
            <ListItemIcon className="mr-n4">
              <TuneIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Edit Form" />
          </MenuItem>
        )}
        <MenuItem onClick={handleSelectForm}>
          <ListItemIcon className="mr-n4">
            <TuneIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Select Form" />
        </MenuItem>
      </Menu>
      {data?.getFieldValues?.data[0]?.value}
      {data?.getFieldValues?.data[0]?.value && (
        <>
          <ResponseCount formId={data?.getFieldValues?.data[0]?.value} parentId={parentId} />
          <FieldViewWrapper
            _id={data?.getFieldValues?.data[0]?.value}
            parentId={parentId}
            customSettings={null}
          />
        </>
      )}
      {state.formId && state.edit && (
        <EditFormDrawer formId={state.formId} open onClose={() => setState(initialState)} />
      )}
      {state.select && (
        <SelectFormSection
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
