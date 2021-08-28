import {
  useGetFieldValuesByItem,
  useGetFieldsByType,
  useDeleteFieldValue,
} from '@frontend/shared/hooks/field';
import FieldsSkeleton from './FieldsSkeleton';
import ErrorLoading from '../common/ErrorLoading';
import Tooltip from '@material-ui/core/Tooltip';
import Collapse from '@material-ui/core/Collapse';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import AddCircle from '@material-ui/icons/AddCircle';
import FieldValueForm from './FieldValueForm';
import MoreHoriz from '@material-ui/icons/MoreHoriz';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import { useState } from 'react';
import Link from 'next/link';
import CRUDMenu from '../common/CRUDMenu';
import Backdrop from '../common/Backdrop';
import ImageList from '../post/ImageList';
import ItemScreen from '../list/ItemScreen';
import { onAlert } from '../../utils/alert';
import { useSelector } from 'react-redux';
import moment from 'moment';

const initialState = {
  showForm: false,
  showMenu: null,
  selectedFieldValue: null,
  edit: false,
  expanded: false,
};

function ItemOneFields({ field, parentId, hideCreatedBy = false, guest }) {
  const [state, setState] = useState(initialState);
  const { attributes, admin } = useSelector(({ auth }: any) => auth);
  const currentUserId = attributes['custom:_id'];

  const deleteCallback = () => {
    setState({ ...state, showMenu: null, selectedFieldValue: null, edit: false });
  };

  const { data, error, loading } = useGetFieldValuesByItem({ parentId, field: field._id });
  const { handleDelete, deleteLoading } = useDeleteFieldValue({
    onAlert,
    parentId,
    field: field._id,
  });

  const formProps = {
    field: field._id,
    parentId: parentId,
    typeId: field.typeId ? field.typeId._id : null,
    fieldType: field.fieldType,
    label: field.label,
    onCancel: () => setState(initialState),
  };

  if (!error && (!data || !data.getFieldValuesByItem)) {
    return <FieldsSkeleton />;
  } else if (error) {
    return <ErrorLoading error={error} />;
  }

  const hasAlreadyAdded =
    data.getFieldValuesByItem.data.filter((v) => v.createdBy._id === currentUserId).length > 0;

  return (
    <div key={field._id} className="mt-4">
      <Divider />
      <Typography variant="h5" className="d-flex align-items-center">
        {field.label}
        {(data.getFieldValuesByItem.data.length === 0 || field.multipleValues) &&
          (field.oneUserMultipleValues || !hasAlreadyAdded) &&
          !guest &&
          !state.showForm && (
            <Tooltip title="Add New Value">
              <IconButton
                color="primary"
                onClick={() => setState({ ...initialState, showForm: true })}>
                <AddCircle />
              </IconButton>
            </Tooltip>
          )}
      </Typography>
      {state.showForm && <FieldValueForm {...formProps} />}
      <List component="div">
        {data.getFieldValuesByItem.data.map((fieldValue, index) =>
          state.selectedFieldValue &&
          state.selectedFieldValue._id === fieldValue._id &&
          state.edit ? (
            <FieldValueForm {...formProps} fieldValue={fieldValue} />
          ) : (
            <>
              <ListItem key={fieldValue._id}>
                <ListItemText
                  secondary={
                    <span style={{ paddingLeft: 10 }}>
                      {field.fieldType === 'date' ? (
                        moment(fieldValue.value).format('L')
                      ) : field.fieldType === 'type' ? (
                        <div>
                          <IconButton
                            onClick={() => setState({ ...state, expanded: !state.expanded })}>
                            {state.expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                          </IconButton>
                          <Link href={`/types/${field.typeId.slug}/${fieldValue.itemId.slug}`}>
                            {fieldValue.itemId.title}
                          </Link>
                          <Collapse in={state.expanded} timeout="auto" unmountOnExit>
                            <ItemScreen
                              hideBreadcrumbs
                              typeSlug={field.typeId.slug}
                              slug={fieldValue.itemId.slug}
                            />
                          </Collapse>
                        </div>
                      ) : field.fieldType === 'url' ? (
                        <a target="_blank" href={fieldValue.value}>
                          {fieldValue.value}
                        </a>
                      ) : field.fieldType === 'media' ? (
                        <ImageList media={fieldValue.media} />
                      ) : (
                        fieldValue.value
                      )}
                    </span>
                  }
                  primary={
                    field.multipleValues && !hideCreatedBy ? (
                      <Link href={`/user/${fieldValue.createdBy._id}`}>
                        <Chip
                          avatar={
                            <Avatar
                              alt={fieldValue.createdBy.name}
                              src={fieldValue.createdBy.picture}
                            />
                          }
                          label={<span>{fieldValue.createdBy.name}</span>}
                          style={{ border: 'none', marginBottom: 10 }}
                          variant="outlined"
                        />
                      </Link>
                    ) : null
                  }
                />
                {(currentUserId === fieldValue.createdBy._id || (admin && !hideCreatedBy)) && (
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      onClick={(event) =>
                        setState({
                          ...state,
                          showMenu: event.currentTarget,
                          selectedFieldValue: fieldValue,
                        })
                      }>
                      <MoreHoriz />
                    </IconButton>
                  </ListItemSecondaryAction>
                )}
              </ListItem>
              {data.getFieldValuesByItem.data.length - 1 !== index && (
                <Divider key={fieldValue._id} />
              )}
            </>
          ),
        )}
      </List>
      <CRUDMenu
        show={state.showMenu}
        onClose={() => setState(initialState)}
        onDelete={() => handleDelete(state.selectedFieldValue._id, deleteCallback)}
        onEdit={() => setState({ ...state, edit: true, showMenu: null })}
      />
      <Backdrop open={deleteLoading} />
    </div>
  );
}

export default function ItemsFieldsMap({ parentId, typeId, hideCreatedBy = false, guest = false }) {
  const { data, loading, error } = useGetFieldsByType({ parentId: typeId });

  if (!error && (!data || !data.getFieldsByType)) {
    return <FieldsSkeleton />;
  } else if (error) {
    return <ErrorLoading error={error} />;
  }

  return (
    <>
      {data.getFieldsByType.data.map((field) => (
        <ItemOneFields
          parentId={parentId}
          field={field}
          key={field._id}
          hideCreatedBy={hideCreatedBy}
          guest={guest}
        />
      ))}
    </>
  );
}
