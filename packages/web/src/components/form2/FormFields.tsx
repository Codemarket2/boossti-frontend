/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-props-no-spreading */
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import GridIcon from '@material-ui/icons/GridOn';
import EditIcon from '@material-ui/icons/Edit';
import SettingsIcon from '@material-ui/icons/Settings';
// import ShareIcon from '@material-ui/icons/Share';
// import FileCopyIcon from '@material-ui/icons/FileCopy';
// import { generateObjectId } from '@frontend/shared/utils/objectId';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useState } from 'react';
import { useRouter } from 'next/router';
import CRUDMenu from '../common/CRUDMenu';
import AddField from './AddField';
import EditField from './EditField';
import EditFieldGrid from './EditFieldGrid';
import EditFormDrawer from './EditFormDrawer';
import CustomFormSettings from './CustomFormSettings';
import StyleDrawer from '../style/StyleDrawer';

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

const initialValues = {
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
  isSection?: boolean;
  previewMode?: boolean;
  parentPageFields?: any;
};

export default function FormFields({
  fields = [],
  setFields,
  title = 'Fields',
  isSection = false,
  previewMode = false,
  parentPageFields = [],
}: IProps): any {
  const [values, setValues] = useState(initialValues);
  const router = useRouter();

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
    } else {
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
    setValues(initialValues);
  };

  const handleNavigate = (fieldLabel) => {
    if (isSection) {
      const url = `${window.location.origin}${window.location.pathname}#${convertToSlug(
        fieldLabel,
      )}`;
      router.push(url);
    }
  };

  const handleEditFormSettings = (fieldId: string, settings: any) => {
    setFields(
      fields.map((field) => {
        if (field._id === fieldId) {
          return { ...field, options: { ...field?.options, settings } };
        }
        return field;
      }),
    );
  };

  // const handleDuplicateField = () => {
  //   const newField = { ...values.field, _id: generateObjectId() };
  //   setFields([...fields, newField]);
  //   setValues(initialValues);
  // };

  // const handleShareSection = (fieldLabel) => {
  //   if (isSection && fieldLabel) {
  //     const url = `${window.location.origin}/page/${router.query?.itemSlug}#${convertToSlug(
  //       fieldLabel,
  //     )}`;
  //     if ('clipboard' in navigator) {
  //       navigator.clipboard.writeText(url);
  //     } else {
  //       document?.execCommand('copy', true, url);
  //     }
  //     setValues(initialValues);
  //   }
  // };

  const handleRemoveStyle = (field: any, styleKey: string) => {
    if (field?.options?.style) {
      const { [styleKey]: removedStyle, ...restStyles } = field?.options?.style;
      handleEditStyle(field._id, restStyles);
    }
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
      {values.editGrid ? (
        <EditFieldGrid
          field={fields.filter((f) => f._id === values.field._id)[0]}
          onFieldChange={(updatedField) => {
            setFields(
              fields?.map((field) => (field._id === updatedField._id ? updatedField : field)),
            );
          }}
          onClose={() => setValues(initialValues)}
        />
      ) : values.showForm && values.field ? (
        <EditField
          field={fields.filter((f) => f._id === values.field._id)[0]}
          onFieldChange={(updatedField) => {
            setFields(
              fields?.map((field) => (field._id === updatedField._id ? updatedField : field)),
            );
          }}
          onClose={() => setValues(initialValues)}
          isSection={isSection}
        />
      ) : (
        <>
          {!previewMode && (
            <>
              <Typography variant="h5" className="d-flex align-items-center pl-2">
                {title}
                <Tooltip title="Add New Field">
                  <IconButton
                    color="primary"
                    onClick={() => setValues({ ...initialValues, showForm: true })}
                  >
                    <AddCircleIcon />
                  </IconButton>
                </Tooltip>
              </Typography>
              <Divider />
            </>
          )}
          {values.showForm && (
            <AddField
              field={values.field}
              onSave={onSave}
              onCancel={() => setValues(initialValues)}
              isSection={isSection}
            />
          )}
          <List dense>
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="list">
                {(provided, snapshot) => (
                  <div ref={provided.innerRef} {...provided.droppableProps}>
                    {fields?.map((field: any, index: number) => (
                      <Draggable key={field._id} draggableId={field._id} index={index}>
                        {(draggableProvided, draggableSnapshot) => (
                          <ListItem
                            button
                            onClick={() => handleNavigate(field.label)}
                            selected={
                              draggableSnapshot.isDragging || field?._id === values?.field?._id
                            }
                            ref={draggableProvided.innerRef}
                            {...draggableProvided.draggableProps}
                            {...draggableProvided.dragHandleProps}
                          >
                            <ListItemText
                              primary={field.label}
                              secondary={
                                !previewMode &&
                                ((field?.fieldType === 'form' && field?.form?.name) ||
                                  field.fieldType)
                              }
                            />
                            {!(previewMode || snapshot.isDraggingOver) && (
                              <ListItemSecondaryAction>
                                <IconButton
                                  edge="end"
                                  onClick={(event) =>
                                    setValues({
                                      ...initialValues,
                                      showMenu: event.currentTarget,
                                      field,
                                    })
                                  }
                                >
                                  <MoreVertIcon />
                                </IconButton>
                              </ListItemSecondaryAction>
                            )}
                          </ListItem>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </List>
          <CRUDMenu
            show={values.showMenu}
            onClose={() => setValues(initialValues)}
            onDelete={() => {
              setFields(fields.filter((field) => field._id !== values.field._id));
              setValues(initialValues);
            }}
            onEdit={() => {
              setValues({ ...values, showMenu: null, showForm: true });
            }}
          >
            <MenuItem onClick={() => setValues({ ...values, showMenu: false, editStyle: true })}>
              <ListItemIcon className="mr-n4">
                <EditIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Edit Style" />
            </MenuItem>
            <MenuItem onClick={() => setValues({ ...values, showMenu: false, editGrid: true })}>
              <ListItemIcon className="mr-n4">
                <GridIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Grid" />
            </MenuItem>
            {values.field?.fieldType === 'form' && (
              <>
                {values.field?.form?._id && (
                  <>
                    <MenuItem
                      onClick={() => setValues({ ...values, showMenu: false, editForm: true })}
                    >
                      <ListItemIcon className="mr-n4">
                        <EditIcon fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary="Edit Form" />
                    </MenuItem>
                    <MenuItem
                      onClick={() =>
                        setValues({ ...values, showMenu: false, showFormSettings: true })
                      }
                    >
                      <ListItemIcon className="mr-n4">
                        <SettingsIcon fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary="Form Settings" />
                    </MenuItem>
                  </>
                )}
              </>
            )}
            {/* <MenuItem onClick={handleDuplicateField}>
              <ListItemIcon className="mr-n4">
                <FileCopyIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Duplicate" />
            </MenuItem>
            {isSection && (
              <MenuItem onClick={() => handleShareSection(values?.field?.label)}>
                <ListItemIcon className="mr-n4">
                  <ShareIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Share" />
              </MenuItem>
            )} */}
          </CRUDMenu>
        </>
      )}
      {values.editStyle && (
        <StyleDrawer
          onClose={() => setValues(initialValues)}
          open={values.editStyle}
          styles={fields?.filter((f) => f._id === values?.field?._id)?.pop()?.options?.style || {}}
          handleResetStyle={() => handleEditStyle(values?.field._id, {})}
          onStyleChange={(value) =>
            handleEditStyle(
              values?.field._id,
              values?.field?.options?.style
                ? { ...values?.field?.options?.style, ...value }
                : value,
            )
          }
          removeStyle={(styleKey) => handleRemoveStyle(values?.field, styleKey)}
        />
      )}
      {values.editForm && (
        <EditFormDrawer
          formId={values.field?.form?._id}
          open={values.editForm}
          onClose={() => setValues(initialValues)}
        />
      )}
      {values.showFormSettings && (
        <CustomFormSettings
          isSection={isSection}
          fields={fields}
          formId={values.field?.form?._id}
          open={values.showFormSettings}
          onClose={() => setValues(initialValues)}
          settings={fields?.filter((f) => f._id === values.field?._id)[0]?.options?.settings}
          onSettingsChange={(value) => handleEditFormSettings(values.field?._id, value)}
          parentPageFields={parentPageFields}
        />
      )}
    </Paper>
  );
}
