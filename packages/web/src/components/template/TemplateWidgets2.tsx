import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import EditIcon from '@material-ui/icons/Edit';
import SettingsIcon from '@material-ui/icons/Settings';
import GridOnIcon from '@material-ui/icons/GridOn';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import { useState } from 'react';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import DisplayValue from '../form2/DisplayValue';
import { FormPage } from '../../screens/HomeScreen-new';
import CRUDMenu from '../common/CRUDMenu';

const initialState = {
  showForm: false,
  showMenu: null,
};

interface IProps {
  widget: any;
  authorized: boolean;
}

export default function TemplateWidgets2({ widget, authorized }: IProps) {
  const [state, setState] = useState(initialState);
  return (
    <Paper variant="outlined">
      <Typography variant="h6" className="d-flex align-items-center pl-2">
        Widgets
        <Tooltip title="Add New Widget">
          <IconButton
            color="primary"
            edge="end"
            onClick={() => setState({ ...initialState, showForm: true })}
          >
            <AddCircleIcon />
          </IconButton>
        </Tooltip>
      </Typography>
      {state.showForm && (
        <div className="px-1">
          <FormPage
            slug="widget"
            settings={{ widgetType: 'form' }}
            onCancel={() => setState(initialState)}
            createCallback={(newWidget) => {
              console.log(newWidget);
              setState(initialState);
            }}
          />
        </div>
      )}
      <List dense>
        {widget?.values?.map((value) => (
          <ListItem key={value?._id}>
            <ListItemText
              primary={<DisplayValue field={widget} value={value} />}
              secondary={<WidgetForm formId={value?.response?.values} />}
            />
            {authorized && (
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  onClick={(event) => setState({ ...initialState, showMenu: event.currentTarget })}
                >
                  <MoreVertIcon />
                </IconButton>
              </ListItemSecondaryAction>
            )}
          </ListItem>
        ))}
      </List>
      {state.showMenu && (
        <CRUDMenu
          //   hideDelete={values.field?.options?.default}
          show={state.showMenu}
          onClose={() => setState(initialState)}
          onDelete={() => {
            //   setFields(fields.filter((field) => field._id !== values.field._id));
            //   setValues(initialValues);
          }}
          onEdit={() => {
            // setValues({ ...values, showMenu: null, showForm: true });
          }}
        >
          <MenuItem
            onClick={() => {
              //   setValues({ ...values, showMenu: false, editStyle: true });
            }}
          >
            <ListItemIcon className="mr-n4">
              <EditIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Edit Style" />
          </MenuItem>
          <MenuItem
            onClick={() => {
              //   setValues({ ...values, showMenu: false, editGrid: true });
            }}
          >
            <ListItemIcon className="mr-n4">
              <GridOnIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Grid" />
          </MenuItem>
          <MenuItem
            onClick={() => {
              //   setValues({ ...values, showMenu: false, editForm: true });
            }}
          >
            <ListItemIcon className="mr-n4">
              <EditIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Edit Form" />
          </MenuItem>
          <MenuItem
            onClick={() => {
              //   setValues({ ...values, showMenu: false, showFormSettings: true });
            }}
          >
            <ListItemIcon className="mr-n4">
              <SettingsIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Form Settings" />
          </MenuItem>
        </CRUDMenu>
      )}
    </Paper>
  );
}

const WidgetForm = ({ formId }: { formId: string }) => {
  console.log(formId);

  return <>Form Name</>;
};
