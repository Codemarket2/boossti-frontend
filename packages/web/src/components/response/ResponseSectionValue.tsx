import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import { generateObjectId } from '@frontend/shared/utils/objectId';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import { useState } from 'react';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import CRUDMenu from '../common/CRUDMenu';
import { FormView } from '../form2/FormView';
import DisplayValue from '../form2/DisplayValue';
import BackdropComponent from '../common/Backdrop';
import ResponseCount from './ResponseCount';
import FieldViewWrapper from '../form2/FieldViewWrapper';
import CommentLikeShare from '../common/commentLikeShare/CommentLikeShare';

interface IProps {
  section: any;
  handleUpdateSection: any;
  authorized: boolean;
}

const initialState = {
  showForm: false,
  showMenu: null,
  field: null,
  value: null,
  loading: false,
};

export default function ResponseSections({ handleUpdateSection, section, authorized }: IProps) {
  const [state, setState] = useState(initialState);

  const handleSubmit = async (newValues: any) => {
    let values = section?.values ? [...section.values] : [];
    const newValue = newValues[0];
    if (state.value) {
      values = values?.map((v) => (v._id === newValue._id ? { ...v, ...newValue } : v));
    } else {
      values = [...values, { ...newValue, _id: generateObjectId() }];
    }
    const response = await handleUpdateSection({ values }, () => setState(initialState));
    return response;
  };

  const handleDelete = async () => {
    setState({ ...state, loading: true });
    let values = section?.values ? [...section.values] : [];
    values = values.filter((v) => v._id !== state.value._id);
    await handleUpdateSection({ values });
    setState(initialState);
  };

  return (
    <div className="p-2">
      <BackdropComponent open={state.loading} />
      <Grid container>
        {section?.fields?.map((field) => (
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
                <ResponseCount formId={field.form._id} />
                <FieldViewWrapper _id={field.form._id} />
              </>
            ) : (
              <>
                {state.showForm && state.field?._id === field?._id ? (
                  <FormView
                    fields={[field]}
                    handleSubmit={(values) => handleSubmit(values)}
                    onCancel={() => setState(initialState)}
                    initialValues={state?.value ? [state?.value] : []}
                  />
                ) : (
                  <>
                    <Typography className="d-flex align-items-center mt-2">
                      {field?.label}
                      {authorized &&
                        (field.options?.multipleValues ||
                          !section.values?.some((v) => v.field === field._id)) && (
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
                {section.values
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
