import Link from 'next/link';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Paper from '@material-ui/core/Paper';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Skeleton from '@material-ui/lab/Skeleton';
import Badge from '@material-ui/core/Badge';
import { useState } from 'react';
import { useUpdateItemLayout } from '@frontend/shared/hooks/list';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import GridIcon from '@material-ui/icons/GridOn';
import EditIcon from '@material-ui/icons/Edit';
import { onAlert } from '../../utils/alert';

const breakpoints = [
  { name: 'xs', label: 'Extra Small' },
  { name: 'sm', label: 'Small' },
  { name: 'md', label: 'Medium' },
  { name: 'lg', label: 'Large' },
  { name: 'xl', label: 'Extra Large' },
];

export function convertToSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '');
}

interface IProps {
  style?: any;
  slug: string;
  fields: any[];
  fieldValueCount: any;
  onClick?: () => void;
  setEditValue?: (val: string) => void;
  layouts: any;
  itemSlug: string;
  _id: string;
  children: any;
  previewMode?: boolean;
}

const initialState = { selectedField: null, showMenu: null, showGrid: false };

export default function LeftNavigation({
  style,
  slug,
  fields,
  fieldValueCount,
  onClick = () => {},
  setEditValue = () => {},
  layouts,
  _id,
  itemSlug,
  children,
  previewMode = false,
}: IProps): any {
  const [state, setState] = useState(initialState);
  const { handleUpdateLayout } = useUpdateItemLayout({ slug: itemSlug, onAlert, layouts, _id });

  const onChange = ({ target }) => {
    if (state.selectedField && target?.value < 13 && target?.value > -1) {
      const otherValues = layouts[state.selectedField?._id] || {};
      const newLayouts = {
        ...layouts,
        [state.selectedField?._id]: { ...otherValues, [target.name]: target.value },
      };
      handleUpdateLayout(newLayouts);
    }
  };

  return (
    <div style={style}>
      <Paper variant="outlined">
        {state.showGrid ? (
          <>
            <Typography variant="h5" className="d-flex align-items-center">
              <Tooltip title="Go Back">
                <IconButton onClick={() => setState(initialState)}>
                  <ArrowBackIcon />
                </IconButton>
              </Tooltip>
              {state.selectedField?.label}
            </Typography>
            <Divider />
            <div className="p-2">
              {breakpoints.map((point) => (
                <TextField
                  key={point.name}
                  className="my-2"
                  fullWidth
                  size="small"
                  label={point.label}
                  name={point.name}
                  variant="outlined"
                  type="number"
                  value={
                    layouts[state.selectedField?._id] &&
                    layouts[state.selectedField?._id][point.name]
                      ? layouts[state.selectedField?._id][point.name]
                      : ''
                  }
                  onChange={onChange}
                />
              ))}
            </div>
          </>
        ) : (
          <List component="nav" dense>
            <ListItem button>
              <Link href={`${slug}#title`}>
                <ListItemText primary="Title" />
              </Link>
            </ListItem>
            {!previewMode && (
              <>
                <ListItem button>
                  <Link href={`#seo`}>
                    <ListItemText primary="seo" />
                  </Link>
                  <Tooltip
                    onClick={() => {
                      setEditValue('seo');
                    }}
                    title="Edit seo"
                  >
                    <IconButton size="small">
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </ListItem>
              </>
            )}
            {fields.length < 1 ? (
              <div className="px-3">
                <Skeleton height={70} />
              </div>
            ) : (
              fields.map((fieldType, index) => (
                <ListItem button key={fieldType._id} onClick={onClick}>
                  {fieldValueCount[index] > 0 && (
                    <ListItemIcon className="mr-n5">
                      <Badge badgeContent={fieldValueCount[index]} color="primary" />
                    </ListItemIcon>
                  )}
                  <Link href={`${slug}#${convertToSlug(fieldType.label)}`}>
                    <ListItemText primary={fieldType.label} />
                  </Link>
                  {!previewMode && (
                    <ListItemSecondaryAction>
                      <IconButton
                        edge="end"
                        aria-label="more"
                        onClick={({ currentTarget }) =>
                          setState({ ...state, selectedField: fieldType, showMenu: currentTarget })
                        }
                      >
                        <MoreVertIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  )}
                </ListItem>
              ))
            )}
          </List>
        )}
      </Paper>
      {children}
      <Menu
        id="simple-menu"
        anchorEl={state.showMenu}
        open={Boolean(state.showMenu)}
        onClose={() => setState(initialState)}
      >
        <MenuItem onClick={() => setState({ ...state, showMenu: false, showGrid: true })}>
          <ListItemIcon className="mr-n4">
            <GridIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary=" Edit Grid" />
        </MenuItem>
      </Menu>
    </div>
  );
}
