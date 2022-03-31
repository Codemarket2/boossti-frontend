// import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import { generateObjectId } from '@frontend/shared/utils/objectId';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import { useEffect, useState } from 'react';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { WidthProvider, Responsive } from 'react-grid-layout';
import CRUDMenu from '../common/CRUDMenu';
import { FormView } from './FormView';
import DisplayValue from './DisplayValue';
import BackdropComponent from '../common/Backdrop';
import CommentLikeShare from '../common/commentLikeShare/CommentLikeShare';
import StarRating from '../starRating/starRating';
import FormViewWrapper from './FormViewWrapper';
import Overlay from '../common/Overlay';

import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

const ResponsiveReactGridLayout = WidthProvider(Responsive);

interface IProps {
  fields: any;
  values: any;
  handleValueChange: any;
  authorized: boolean;
  pageId?: string;
  workFlowFormReponseParentId?: string;
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
  workFlowFormReponseParentId,
  layouts = {},
  disableGrid = true,
  onLayoutChange,
}: IProps) {
  const [state, setState] = useState(initialState);
  const [showOverlay, setShowOverlay] = useState({ show: false, id: '' });
  const [showViewMore, setShowViewMore] = useState({});
  const setInitialState = () => setState(initialState);
  const [breakPoint, setBreakPoint] = useState('');
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
  const [heights, setHeights] = useState({});
  useEffect(() => {
    if (layouts?.[breakPoint]?.length > 0) {
      let newHeights = {};
      fields.forEach((val, i) => {
        // if (layouts && breakPoint) {
        let gridHeight;
        if (layouts?.[breakPoint]) {
          gridHeight = layouts?.[breakPoint][i]?.h * 35;
          const key = layouts?.[breakPoint][i]?.i;
          newHeights = { ...newHeights, [key]: gridHeight };
        }
        // }
        val = { ...val, height: gridHeight };
        return val;
      });
      setHeights(newHeights);
    }
  }, [breakPoint]);

  // fields = fields.map((val, i) => {
  //   let gridHeight = 0;
  //   if (layouts && breakPoint) {
  //     if (layouts?.[breakPoint]) {
  //       gridHeight = layouts?.[breakPoint][i].h * 35;
  //     }
  //   }
  //   val = { ...val, height: gridHeight };
  //   return val;
  // });

  return (
    <div className="p-2">
      <BackdropComponent open={state.loading} />
      {/* {JSON.stringify(heights)} */}
      <ResponsiveReactGridLayout
        onBreakpointChange={(newBreakpoint, newCols) => setBreakPoint(newBreakpoint)}
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
        {fields?.map((field, i) => (
          <div style={{ height: `${heights[field._id]}px`, overflowY: 'scroll' }} key={field._id}>
            <div style={field?.options?.style || {}}>
              {field.fieldType === 'form' ? (
                <>
                  <Typography className="mt-2">{field.label}</Typography>
                  {/* <h1>{JSON.stringify(showViewMore)}</h1> */}
                  {field.form?._id && (
                    <FormViewWrapper
                      formId={field.form?._id}
                      parentId={pageId}
                      workFlowFormReponseParentId={workFlowFormReponseParentId}
                      layouts={layouts}
                      customSettings={field?.options?.settings?.active && field?.options?.settings}
                      isPageOwner={authorized}
                      // gridHeight={heights[field._id]}
                      // setShowViewMore={(val) => {
                      // setShowViewMore({ ...showViewMore, [i]: val });
                      // console.log('hel', showViewMore);
                      // }}
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
                                size="large"
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
                              size="large"
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
              <StarRating parentId={field._id} />
            </div>
            {showOverlay.show && showOverlay.id == field._id && (
              <Overlay
                open={showOverlay.show}
                onClose={() => {
                  setShowOverlay({ ...showOverlay, show: false });
                }}
              >
                <div style={{ padding: '20px' }}>
                  {field.fieldType === 'form' ? (
                    <>
                      <Typography className="mt-2">{field.label}</Typography>
                      {field.form?._id && (
                        <FormViewWrapper
                          formId={field.form?._id}
                          parentId={pageId}
                          layouts={layouts}
                          customSettings={
                            field?.options?.settings?.active && field?.options?.settings
                          }
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
                                    size="large"
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
                                  size="large"
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
                  <StarRating parentId={field._id} />
                </div>
              </Overlay>
            )}

            {/* {showViewMore[i] && (
              <Button
                style={{ display: 'block', bottom: '0', position: 'fixed', right: '0' }}
                size="small"
                onClick={() => {
                  setShowOverlay({ ...showOverlay, show: true, id: field._id });
                }}
                color="primary"
                variant="contained"
              >
                view more
              </Button>
            )} */}
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
