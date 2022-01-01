import moment from 'moment';
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
import CRUDMenu from '../common/CRUDMenu';
import DisplayRichText from '../common/DisplayRichText';
import CommentLikeShare from '../common/commentLikeShare/CommentLikeShare';
import ImageList from '../post/ImageList';
import { filterValues, FormView } from '../form2/FormView';
import { onAlert } from '../../utils/alert';

interface IProps {
  listItem: any;
  previewMode: boolean;
}

const initialState = {
  showMenu: null,
  showForm: false,
  field: null,
};

export default function ListItemsFieldsValue({ listItem, previewMode = false }: IProps) {
  const { onFieldsChange } = useUpdateListItemFields({ listItem, onAlert });
  const [state, setState] = useState(initialState);

  const handleSubmit = (fieldId: string, values: any) => {
    onFieldsChange(
      listItem?.fields.map((field) =>
        field._id === fieldId ? { ...field, options: { ...field?.options, values } } : field,
      ),
    );
    setState(initialState);
  };

  return (
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
          {!previewMode && (
            <Typography className="d-flex align-items-center">
              {field?.label}
              <Tooltip title="Actions">
                <IconButton
                  color="primary"
                  onClick={(e) => setState({ ...state, showMenu: e.target, field })}
                >
                  <MoreHorizIcon />
                </IconButton>
              </Tooltip>
            </Typography>
          )}
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
                  <div key={i}>
                    <ShowValue field={field} value={value} />
                  </div>
                ))}
            </div>
          )}
          {field?.options?.showCommentBox && <CommentLikeShare parentId={field._id} />}
        </Grid>
      ))}
      <CRUDMenu
        hideDelete={!state.field?.options?.values}
        hideEdit={!state.field?.options?.values}
        show={state.showMenu}
        onClose={() => setState(initialState)}
        onEdit={() => setState({ ...state, showMenu: false, showForm: true })}
        onDelete={() => {
          handleSubmit(state.field?._id, null);
        }}
      >
        {!state.field?.options?.values && (
          <MenuItem onClick={() => setState({ ...state, showMenu: false, showForm: true })}>
            <ListItemIcon className="mr-n4">
              <AddCircleIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Add Value" />
          </MenuItem>
        )}
      </CRUDMenu>
    </Grid>
  );
}

interface IProps2 {
  field: any;
  value: any;
}

export const ShowValue = ({ field, value }: IProps2) => {
  switch (field.fieldType) {
    case 'text':
    case 'textarea':
    case 'select':
    case 'email':
    case 'password':
      return <>{value?.value}</>;
    case 'url':
      return <a href={value?.value}>{value?.value}</a>;
    case 'richTextarea':
      return <DisplayRichText value={value?.value} />;
    case 'date':
      return <>{value?.valueDate && moment(value?.valueDate).format('L')}</>;
    case 'dateTime':
      return <>{value?.valueDate && moment(value?.valueDate).format('lll')}</>;
    case 'number':
    case 'phoneNumber':
      return <>{value?.valueNumber}</>;
    case 'checkbox':
      return <>{value?.valueBoolean?.toString()}</>;
    case 'image':
      return <ImageList media={value?.media} />;
    default:
      return <>{value?.value}</>;
  }
};
