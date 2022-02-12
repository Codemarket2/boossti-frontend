import { useGetResponses } from '@frontend/shared/hooks/response';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MoreIcon from '@material-ui/icons/MoreHoriz';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import TuneIcon from '@material-ui/icons/Tune';
import Tooltip from '@material-ui/core/Tooltip';
import Info from '@material-ui/icons/Info';
import { useState } from 'react';
import { useGetFieldValues } from '@frontend/shared/hooks/field';
import ErrorLoading from '../common/ErrorLoading';
import Backdrop from '../common/Backdrop';
import EditFormDrawer from '../form2/EditFormDrawer';
import FieldViewWrapper from '../form2/FieldViewWrapper';
import SelectFormSection from './SelectFormSection';
import ResponseCount from '../form2/ResponseCount';
import { convertToSlug } from './LeftNavigation';
import Response from '../form2/Response';

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

export default function FormSection({ field, parentId, authorized }: IProps): any {
  const [state, setState] = useState(initialState);
  const { data, error } = useGetFieldValues({ parentId, field: field._id });

  const options = JSON.parse(field?.options);

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
      <div className="d-flex align-items-center">
        <Typography>{field.label}</Typography>
        {authorized && (
          <IconButton onClick={(event) => setState({ ...state, show: event.currentTarget })}>
            <MoreIcon />
          </IconButton>
        )}
      </div>

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
      {data?.getFieldValues?.data[0]?.value && (
        <DisplayForm
          formId={data?.getFieldValues?.data[0]?.value}
          parentId={parentId}
          authorized={authorized}
          allowOthers={field.allowOthers}
          customSettings={{
            ...options?.settings,
            useCustomSettings: options?.customSettings,
          }}
        />
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

const DisplayForm = ({
  formId,
  parentId,
  allowOthers,
  authorized,
  customSettings,
}: {
  formId: string;
  parentId: string;
  allowOthers: boolean;
  authorized: boolean;
  customSettings: any;
}) => {
  const { data, error } = useGetResponses(formId, parentId);

  if (error || !data) {
    return <ErrorLoading error={error} />;
  }

  return (
    <>
      {allowOthers ? (
        <>
          <ResponseCount formId={formId} parentId={parentId} />
          <FieldViewWrapper _id={formId} parentId={parentId} customSettings={customSettings} />
        </>
      ) : authorized && !(data?.getResponses && data?.getResponses?.count > 0) ? (
        <FieldViewWrapper _id={formId} parentId={parentId} customSettings={customSettings} />
      ) : (
        <>
          {data?.getResponses?.data?.[0]?._id && (
            <Response hideNavigation hideAuthor responseId={data?.getResponses?.data?.[0]?._id} />
          )}
        </>
      )}
    </>
  );
};

export const Form2Section = ({
  field,
  parentId,
  authorized,
}: {
  field: any;
  parentId: string;
  authorized: boolean;
}) => {
  const options = JSON.parse(field?.options);
  const formId = options?.formId;

  return (
    <>
      <Typography id={convertToSlug(field.label)}>
        {field.label}
        {authorized && (
          <Tooltip title="You can edit this field from template">
            <Info className="ml-1" fontSize="small" />
          </Tooltip>
        )}
      </Typography>
      <DisplayForm
        formId={formId}
        parentId={parentId}
        authorized={authorized}
        allowOthers={field.allowOthers}
        customSettings={{
          ...options?.settings,
          useCustomSettings: options?.customSettings,
        }}
      />
    </>
  );
};
