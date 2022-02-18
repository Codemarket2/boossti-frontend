import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { useState } from 'react';
import { useUpdateListItemFields } from '@frontend/shared/hooks/list';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import ListIcon from '@material-ui/icons/List';
import SettingsIcon from '@material-ui/icons/Settings';
import CRUDMenu from '../common/CRUDMenu';
import CommentLikeShare from '../common/commentLikeShare/CommentLikeShare';
import { defualtValue, filterValues, FormView } from '../form2/FormView';
import { onAlert } from '../../utils/alert';
import StyleDrawer from '../style/StyleDrawer';
import { SelectFormDrawer } from '../form2/SelectForm';
import ResponseCount from '../response/ResponseCount';
import FieldViewWrapper from '../form2/FieldViewWrapper';
import EditFormDrawer from '../form2/EditFormDrawer';
import { convertToSlug } from '../field/LeftNavigation';
import Overlay from '../common/Overlay';
import CustomFormSettings from '../form2/CustomFormSettings';
import DisplayValue from '../form2/DisplayValue';

interface IProps {
  listItem: any;
  previewMode: boolean;
}

const initialState = {
  showMenu: null,
  showForm: false,
  field: null,
  drawer: false,
  selectForm: false,
  editForm: false,
  showFormSettings: false,
};

export default function ListItemsFieldsValue({ listItem, previewMode = false }: IProps) {
  const { onFieldsChange } = useUpdateListItemFields({ listItem, onAlert });
  const [state, setState] = useState(initialState);

  const handleRemoveStyle = (field: any, styleKey: string) => {
    if (field?.options?.style) {
      const { [styleKey]: removedStyle, ...restStyles } = field?.options?.style;
      handleEditStyle(field._id, restStyles);
    }
  };

  const handleSubmit = (fieldId: string, values: any) => {
    onFieldsChange(
      listItem?.fields.map((field) =>
        field._id === fieldId ? { ...field, options: { ...field?.options, values } } : field,
      ),
    );
    setState(initialState);
  };

  const handleEditStyle = (fieldId: string, style: any) => {
    onFieldsChange(
      listItem?.fields.map((field) =>
        field._id === fieldId ? { ...field, options: { ...field?.options, style } } : field,
      ),
    );
  };

  const handleSelectForm = (fieldId: string, formId: string) => {
    onFieldsChange(
      listItem?.fields.map((field) =>
        field._id === fieldId
          ? {
              ...field,
              options: {
                ...field?.options,
                values: [{ ...defualtValue, value: formId, field: fieldId }],
              },
            }
          : field,
      ),
    );
    setState(initialState);
  };

  const handleEditFormSettings = (fieldId: string, settings: any) => {
    onFieldsChange(
      listItem?.fields.map((field) =>
        field._id === fieldId ? { ...field, options: { ...field?.options, settings } } : field,
      ),
    );
  };

  const handleToggleCustomSettings = (fieldId: string, customSettings: boolean) => {
    onFieldsChange(
      listItem?.fields.map((field) =>
        field._id === fieldId
          ? { ...field, options: { ...field?.options, customSettings } }
          : field,
      ),
    );
  };

  return (
    <>
      <Grid container>
        {listItem?.fields?.map((field) => (
          <Grid
            key={field._id}
            xs={field?.options?.grid?.xs || 12}
            sm={field?.options?.grid?.sm}
            md={field?.options?.grid?.md}
            lg={field?.options?.grid?.lg}
            xl={field?.options?.grid?.xl}
            item
          >
            <Typography className="d-flex align-items-center" id={convertToSlug(field?.label)}>
              {field?.label}
              {!previewMode && (
                <Tooltip title="Actions">
                  <IconButton
                    color="primary"
                    onClick={(e) => setState({ ...state, showMenu: e.target, field })}
                  >
                    <MoreHorizIcon />
                  </IconButton>
                </Tooltip>
              )}
            </Typography>
            {state.drawer && field._id === state.field?._id ? (
              <StyleDrawer
                onClose={() => setState(initialState)}
                open={state.drawer}
                styles={field?.options?.style || {}}
                handleResetStyle={() => handleEditStyle(field._id, {})}
                onStyleChange={(value) =>
                  handleEditStyle(
                    field._id,
                    field?.options?.style ? { ...field?.options?.style, ...value } : value,
                  )
                }
                removeStyle={(styleKey) => handleRemoveStyle(field, styleKey)}
              />
            ) : null}
            {state.showForm && field._id === state.field?._id ? (
              <FormView
                fields={[field]}
                handleSubmit={(values) => handleSubmit(field._id, values)}
                onCancel={() => setState(initialState)}
                initialValues={field?.options?.values || []}
              />
            ) : (
              <div>
                {field?.options?.values &&
                  filterValues(field?.options?.values, field).map((value, i) => (
                    <div key={i} style={field?.options?.style ? field?.options?.style : {}}>
                      {field?.fieldType === 'form' ? (
                        <>
                          <ResponseCount
                            settings={field?.options?.settings}
                            formId={value?.value}
                            parentId={listItem?._id}
                          />
                          <FieldViewWrapper
                            _id={value?.value}
                            parentId={listItem?._id}
                            customSettings={{
                              ...field?.options?.settings,
                              useCustomSettings: field?.options?.customSettings,
                            }}
                          />
                        </>
                      ) : (
                        <DisplayValue field={field} value={value} />
                      )}
                    </div>
                  ))}
              </div>
            )}
            {field?.options?.showCommentBox && <CommentLikeShare parentId={field._id} />}
          </Grid>
        ))}
        <CRUDMenu
          hideDelete={!state.field?.options?.values}
          hideEdit={!state.field?.options?.values || state.field?.fieldType === 'form'}
          show={state.showMenu}
          onClose={() => setState(initialState)}
          onEdit={() => setState({ ...state, showMenu: false, showForm: true })}
          onDelete={() => {
            handleSubmit(state.field?._id, null);
          }}
        >
          {state.field?.fieldType === 'form' ? (
            <>
              {state.field?.options?.values && (
                <MenuItem onClick={() => setState({ ...state, showMenu: false, editForm: true })}>
                  <ListItemIcon className="mr-n4">
                    <EditIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Edit Form" />
                </MenuItem>
              )}
              <MenuItem onClick={() => setState({ ...state, showMenu: false, selectForm: true })}>
                <ListItemIcon className="mr-n4">
                  <ListIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Select Form" />
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setState({
                    ...state,
                    showFormSettings: true,
                    showMenu: false,
                  });
                }}
              >
                <ListItemIcon className="mr-n4">
                  <SettingsIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Form Settings" />
              </MenuItem>
            </>
          ) : (
            !state.field?.options?.values && (
              <MenuItem onClick={() => setState({ ...state, showMenu: false, showForm: true })}>
                <ListItemIcon className="mr-n4">
                  <AddCircleIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Add Value" />
              </MenuItem>
            )
          )}
          <MenuItem onClick={() => setState({ ...state, showMenu: false, drawer: true })}>
            <ListItemIcon className="mr-n4">
              <EditIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Edit style" />
          </MenuItem>
        </CRUDMenu>
      </Grid>
      {state.selectForm && (
        <SelectFormDrawer
          open={state.selectForm}
          onClose={() => setState(initialState)}
          onSelect={(formId) => handleSelectForm(state.field?._id, formId)}
        />
      )}
      {state.editForm && (
        <EditFormDrawer
          formId={state.field?.options?.values[0]?.value}
          open={state.editForm}
          onClose={() => setState(initialState)}
        />
      )}
      <Overlay
        open={state.showFormSettings}
        title={`Form Settings - ${state.field?.label ? state.field.label : ''}`}
        onClose={() => {
          setState({ ...state, showFormSettings: false });
        }}
      >
        <CustomFormSettings
          settings={state.field?.options?.settings}
          customSettings={state.field?.options?.customSettings}
          toggleCustomSettings={(value) => {
            handleToggleCustomSettings(state.field?._id, value);
          }}
          onSettingsChange={(value) => {
            handleEditFormSettings(state.field?._id, value);
          }}
        />
      </Overlay>
    </>
  );
}
