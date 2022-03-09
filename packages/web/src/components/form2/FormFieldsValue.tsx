// import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import { generateObjectId } from '@frontend/shared/utils/objectId';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import { useEffect, useState } from 'react';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { WidthProvider, Responsive } from 'react-grid-layout';
import CRUDMenu from '../common/CRUDMenu';
import { FormView } from './FormView';
import DisplayValue from './DisplayValue';
import BackdropComponent from '../common/Backdrop';
import CommentLikeShare from '../common/commentLikeShare/CommentLikeShare';
import FormViewWrapper from './FormViewWrapper';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

const ResponsiveReactGridLayout = WidthProvider(Responsive);

interface IProps {
  fields: any;
  values: any;
  handleValueChange: any;
  authorized: boolean;
  pageId?: string;
  layouts: any;
  disableGrid?: boolean;
  onLayoutChange?: (layouts: any) => void;
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
  layouts = {},
  disableGrid = true,
  onLayoutChange,
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
      <ResponsiveReactGridLayout
        className="layout"
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
        rowHeight={30}
        layouts={layouts}
        onLayoutChange={(newLayout, newLayouts) => {
          if (onLayoutChange && !disableGrid) onLayoutChange(newLayouts);
        }}
        isDraggable={authorized && !disableGrid}
        isResizable={authorized && !disableGrid}
      >
        {fields?.map((field) => (
          <div style={{ marginBottom: '20px' }} key={field._id}>
            <div style={field?.options?.style || {}}>
              {field.fieldType === 'form' ? (
                <>
                  {/* <Typography className="mt-2">{field.label}</Typography> */}
                  {field.form?._id && (
                    <FormViewWrapper
                      formId={field.form?._id}
                      parentId={pageId}
                      layouts={layouts}
                      customSettings={field?.options?.settings?.active && field?.options?.settings}
                      isPageOwner={authorized}
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
                                onClick={(e) =>
                                  setState({ ...initialState, field, showForm: true })
                                }
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
            </div>
          </div>
        ))}
      </ResponsiveReactGridLayout>
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
