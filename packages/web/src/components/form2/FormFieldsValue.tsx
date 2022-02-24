import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import { generateObjectId } from '@frontend/shared/utils/objectId';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import { useState } from 'react';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import CRUDMenu from '../common/CRUDMenu';
import { FormView } from './FormView';
import DisplayValue from './DisplayValue';
import BackdropComponent from '../common/Backdrop';
import CommentLikeShare from '../common/commentLikeShare/CommentLikeShare';
import { DisplayForm } from './FormSection';

interface IProps {
  fields: any;
  values: any;
  handleValueChange: any;
  authorized: boolean;
  pageId?: string;
}

const initialState = {
  showForm: false,
  showMenu: null,
  field: null,
  value: null,
  loading: false,
};

export default function FormFieldsValue({
  fields = [],
  values = [],
  handleValueChange,
  authorized,
  pageId,
}: IProps) {
  const [state, setState] = useState(initialState);

  const setInitialState = () => setState(initialState);

  const handleSubmit = async (tempValues: any) => {
    let newValues = values ? [...values] : [];
    const newValue = tempValues[0];
    if (state.value) {
      newValues = newValues?.map((v) => (v._id === newValue._id ? { ...v, ...newValue } : v));
    } else {
      newValues = [...newValues, { ...newValue, _id: generateObjectId() }];
    }
    const response = await handleValueChange({ values: newValues }, setInitialState);
    return response;
  };

  const handleDelete = async () => {
    setState({ ...state, loading: true });
    let newValues = values ? [...values] : [];
    newValues = newValues.filter((v) => v._id !== state.value._id);
    await handleValueChange({ values: newValues }, setInitialState);
  };

  return (
    <div className="p-2">
      <BackdropComponent open={state.loading} />
      <Grid container>
        {fields?.map((field) => (
          <Grid
            key={field._id}
            xs={field?.options?.grid?.xs || 12}
            sm={field?.options?.grid?.sm}
            md={field?.options?.grid?.md}
            lg={field?.options?.grid?.lg}
            xl={field?.options?.grid?.xl}
            item
          >
            {field.fieldType === 'form' ? (
              <>
                <Typography className="mt-2">{field.label}</Typography>
                {field.options?.formId && (
                  <DisplayForm
                    formId={field.options?.formId}
                    parentId={pageId}
                    authorized={authorized}
                    customSettings={
                      field?.options?.customSettings
                        ? {
                            ...field?.options?.settings,
                            customSettings: field?.options?.customSettings,
                          }
                        : null
                    }
                  />
                )}
              </>
            ) : (
              <>
                {state.showForm && state.field?._id === field?._id ? (
                  <FormView
                    fields={[field]}
                    handleSubmit={(tempValues) => handleSubmit(tempValues)}
                    onCancel={() => setState(initialState)}
                    initialValues={state?.value ? [state?.value] : []}
                  />
                ) : (
                  <>
                    <Typography className="d-flex align-items-center mt-2">
                      {field?.label}
                      {authorized &&
                        (field.options?.multipleValues ||
                          !values?.some((v) => v.field === field._id)) && (
                          <Tooltip title="Actions">
                            <IconButton
                              edge="end"
                              color="primary"
                              onClick={(e) => setState({ ...initialState, field, showForm: true })}
                            >
                              <AddCircleIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        )}
                    </Typography>
                  </>
                )}
                {values
                  ?.filter((v) => v.field === field._id)
                  ?.map((value) => (
                    <>
                      {authorized && (
                        <Tooltip title="Actions">
                          <IconButton
                            edge="start"
                            onClick={(e) =>
                              setState({ ...initialState, showMenu: e.target, field, value })
                            }
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      )}
                      <DisplayValue key={value?._id} value={value} field={field} />
                    </>
                  ))}
              </>
            )}
            {field?.options?.showCommentBox && <CommentLikeShare parentId={field._id} />}
          </Grid>
        ))}
      </Grid>
      {authorized && (
        <CRUDMenu
          show={state.showMenu}
          onClose={() => setState(initialState)}
          onEdit={() => setState({ ...state, showMenu: null, showForm: true })}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}
