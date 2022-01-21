import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MoreIcon from '@material-ui/icons/MoreHoriz';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import TuneIcon from '@material-ui/icons/Tune';
import { useState } from 'react';
import { useGetFieldValues } from '@frontend/shared/hooks/field';
import ErrorLoading from '../common/ErrorLoading';
import Backdrop from '../common/Backdrop';
import EditFormDrawer from '../form2/EditFormDrawer';
import FieldViewWrapper from '../form2/FieldViewWrapper';
import SelectFormSection from './SelectFormSection';
import ResponseCount from '../form2/ResponseCount';

interface IProps {
  field: any;
  parentId: string;
  authorized?: boolean;
}

const initialState = {
  show: null,
  formId: null,
  edit: false,
  select: false,
  backdrop: false,
};

export default function FormC({ field, parentId, authorized }: IProps): any {
  const [state, setState] = useState(initialState);
  const { data, error } = useGetFieldValues({ parentId, field: field._id });

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
      {authorized && (
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
