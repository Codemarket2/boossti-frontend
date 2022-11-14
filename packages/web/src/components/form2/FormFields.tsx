/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-props-no-spreading */
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import GridIcon from '@mui/icons-material/GridOn';
import EditIcon from '@mui/icons-material/Edit';
import SettingsIcon from '@mui/icons-material/Settings';
// import ShareIcon from '@mui/icons-material/Share';
// import FileCopyIcon from '@mui/icons-material/FileCopy';
// import { generateObjectId } from '@frontend/shared/utils/objectId';
import { IField } from '@frontend/shared/types';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useState } from 'react';
import CRUDMenu from '../common/CRUDMenu';
import AddField from './field/AddField';
// import EditField from './EditField';
import EditFieldGrid from './EditFieldGrid';
import EditFormDrawer from './EditFormDrawer';
import CustomFormSettings from './CustomFormSettings';
import StyleDrawer from '../style/StyleDrawer';
import DisplaySettings from './DisplaySettings';

export function convertToSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '');
}

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

export const initialValues = {
  showMenu: null,
  field: null,
  showForm: false,
  editStyle: false,
  editGrid: false,
  editForm: false,
  showFormSettings: false,
};

type IProps = {
  fields: any[];
  setFields: (newFields: any[]) => void;
  title?: string;
  isWorkflow?: boolean;
  previewMode?: boolean;
  parentPageFields?: any;
  parentFields?: any;
  tabName?: string;
  showWidgetExpand?: boolean;
  selectedField?: string;
  isTab?: boolean;
  formId?: string;
  onClickField?: (field: IField) => void;
  selectedFieldId?: string;
};

export default function FormFields({
  fields = [],
  setFields,
  title = 'Fields',
  isWorkflow = false,
  previewMode = false,
  parentPageFields = [],
  tabName = 'form',
  showWidgetExpand = false,
  selectedField,
  parentFields = [],
  isTab,
  formId,
  onClickField,
  selectedFieldId,
}: IProps): any {
  const [state, setState] = useState(initialValues);
  const [isExpanded, setIsExpanded] = useState<boolean[]>([]);

  function onDragEnd(result) {
    if (!result.destination) {
      return;
    }
    if (result.destination.index === result.source.index) {
      return;
    }
    const newFields = reorder(fields, result.source.index, result.destination.index);
    setFields(newFields);
  }

  const onSave = (field, action) => {
    if (action === 'create') {
      setFields([...fields, field]);
    } else if (action === 'update') {
      setFields(
        fields.map((oldField) => {
          if (oldField._id === field._id) {
            return {
              ...oldField,
              ...field,
              options: { ...oldField.options, ...field.options },
            };
          }
          return oldField;
        }),
      );
    }
    setState(initialValues);
  };

  const handleOnClickField = (field: IField) => {
    if (onClickField) {
      onClickField(field);
    }
  };

  const handleEditFormSettings = (fieldId: string, settings: any) => {
    setFields(
      fields?.map((field) => {
        if (field._id === fieldId) {
          return {
            ...field,
            options: { ...field?.options, settings: { ...field?.options?.settings, ...settings } },
          };
        }
        return field;
      }),
    );
  };

  const handleEditStyle = (fieldId: string, style: any) => {
    setFields(
      fields.map((field) =>
        field._id === fieldId ? { ...field, options: { ...field?.options, style } } : field,
      ),
    );
  };

  return (
    <Paper variant="outlined">
      {state.editGrid ? (
        <EditFieldGrid
          field={fields.filter((f) => f._id === state.field._id)[0]}
          onFieldChange={(updatedField) => {
            setFields(
              fields?.map((field) => (field._id === updatedField._id ? updatedField : field)),
            );
          }}
          onClose={() => setState(initialValues)}
        />
      ) : (
        <>
          {!previewMode && (
            <>
              {!state.showFormSettings && tabName === 'setting' ? (
                <Typography variant="h5" className="d-flex align-items-center pl-2">
                  Manage Field Settings
                </Typography>
              ) : (
                <Typography variant="h5" className="d-flex align-items-center pl-2">
                  {title}
                  <Tooltip title="Add New Field">
                    <IconButton
                      disabled={state.showForm}
                      color="primary"
                      onClick={() => setState({ ...initialValues, showForm: true })}
                      size="large"
                    >
                      <AddCircleIcon />
                    </IconButton>
                  </Tooltip>
                </Typography>
              )}
              <Divider />
            </>
          )}
          {state.showForm && (
            <AddField
              field={state.field}
              onSave={onSave}
              onCancel={() => setState(initialValues)}
              isWorkflow={isWorkflow}
              parentFields={parentFields}
              isTab={isTab}
              formId={formId}
            />
          )}
          <List dense>
            {!isWorkflow && (
              <>
                <ListItem button>
                  <ListItemText primary="ID" secondary={!previewMode && 'System generated'} />
                </ListItem>
                <ListItem button>
                  <ListItemText
                    primary="createdAt"
                    secondary={!previewMode && 'date System generated'}
                  />
                </ListItem>
                <ListItem button>
                  <ListItemText
                    primary="createdBy"
                    secondary={!previewMode && 'user System generated'}
                  />
                </ListItem>
              </>
            )}
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="list">
                {(provided, snapshot) => (
                  <div ref={provided.innerRef} {...provided.droppableProps}>
                    {fields?.map((field: any, index: number) => {
                      const expanded = isExpanded[index] || false;
                      return (
                        <>
                          <Draggable key={field._id} draggableId={field._id} index={index}>
                            {(draggableProvided, draggableSnapshot) => (
                              <div>
                                <ListItem
                                  button
                                  onClick={() => handleOnClickField(field)}
                                  selected={
                                    draggableSnapshot.isDragging ||
                                    field?._id === state?.field?._id ||
                                    selectedFieldId === field._id
                                  }
                                  ref={draggableProvided.innerRef}
                                  {...draggableProvided.draggableProps}
                                  {...draggableProvided.dragHandleProps}
                                >
                                  <ListItemText
                                    primary={`${field.label}${field?.options?.required ? '*' : ''}`}
                                    secondary={
                                      (!previewMode || isWorkflow) && getFieldSecondaryText(field)
                                    }
                                  />
                                  {!snapshot.isDraggingOver && (
                                    <ListItemSecondaryAction>
                                      {showWidgetExpand && (
                                        <IconButton
                                          edge="end"
                                          onClick={(event) => {
                                            setIsExpanded({
                                              ...isExpanded,
                                              [index]: !expanded,
                                            });
                                          }}
                                          size="large"
                                        >
                                          {expanded ? '\u25BC' : '\u25B6'}
                                        </IconButton>
                                      )}
                                      {!previewMode && (
                                        <IconButton
                                          edge="end"
                                          onClick={(event) =>
                                            setState({
                                              ...initialValues,
                                              showMenu: event.currentTarget,
                                              field,
                                            })
                                          }
                                          size="large"
                                        >
                                          <MoreVertIcon />
                                        </IconButton>
                                      )}
                                    </ListItemSecondaryAction>
                                  )}
                                </ListItem>
                                {field?.fieldType === 'form' && expanded && (
                                  <DisplaySettings field={field} />
                                )}
                              </div>
                            )}
                          </Draggable>
                        </>
                      );
                    })}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </List>
          <CRUDMenu
            hideDelete={state.field?.options?.default}
            show={state.showMenu}
            onClose={() => setState(initialValues)}
            onDelete={() => {
              setFields(fields.filter((field) => field._id !== state.field._id));
              setState(initialValues);
            }}
            onEdit={() => {
              setState({ ...state, showMenu: null, showForm: true });
            }}
          >
            <MenuItem onClick={() => setState({ ...state, showMenu: false, editStyle: true })}>
              <ListItemIcon className="mr-n3">
                <EditIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Edit Style" />
            </MenuItem>
            <MenuItem onClick={() => setState({ ...state, showMenu: false, editGrid: true })}>
              <ListItemIcon className="mr-n3">
                <GridIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Grid" />
            </MenuItem>
            {state.field?.fieldType === 'form' && (
              <>
                {state.field?.form?._id && (
                  <>
                    <MenuItem
                      onClick={() => setState({ ...state, showMenu: false, editForm: true })}
                    >
                      <ListItemIcon className="mr-n3">
                        <EditIcon fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary="Edit Form" />
                    </MenuItem>
                    <MenuItem
                      onClick={() =>
                        setState({ ...state, showMenu: false, showFormSettings: true })
                      }
                    >
                      <ListItemIcon className="mr-n3">
                        <SettingsIcon fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary="Form Settings" />
                    </MenuItem>
                  </>
                )}
              </>
            )}
          </CRUDMenu>
        </>
      )}
      {state.editStyle && (
        <StyleDrawer
          onClose={() => setState(initialValues)}
          open={state.editStyle}
          styles={fields?.filter((f) => f._id === state?.field?._id)?.pop()?.options?.style || {}}
          onStylesChange={(value) => handleEditStyle(state?.field._id, value)}
        />
      )}
      {state.editForm && (
        <EditFormDrawer
          formId={state.field?.form?._id}
          open={state.editForm}
          onClose={() => setState(initialValues)}
        />
      )}
      {state.showFormSettings && (
        <CustomFormSettings
          isWidget={isWorkflow}
          fields={fields}
          formId={state.field?.form?._id}
          open={state.showFormSettings}
          onClose={() => setState(initialValues)}
          settings={fields?.filter((f) => f._id === state.field?._id)[0]?.options?.settings}
          onSettingsChange={(value) => handleEditFormSettings(state.field?._id, value)}
          parentPageFields={parentPageFields}
        />
      )}
    </Paper>
  );
}

const getFieldSecondaryText = (field) => {
  let secondaryText = field?.fieldType;

  if (['form', 'response'].includes(field?.fieldType) && field?.form?.name) {
    secondaryText += ` ${field?.form?.name}`;
  } else if (field?.fieldType === 'template' && field?.template?.title) {
    secondaryText += ` ${field?.template?.title}`;
  } else if (field?.fieldType === 'number' && field?.options?.physicalQuantity) {
    secondaryText += ` ${field?.options?.physicalQuantity}`;
    if (field?.options?.unit) {
      secondaryText += ` ${field?.options?.unit}`;
    }
  }
  return secondaryText;
};
