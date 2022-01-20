import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import MoreIcon from '@material-ui/icons/MoreHoriz';
import IconButton from '@material-ui/core/IconButton';
import AddCircle from '@material-ui/icons/AddCircle';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Carousel from 'react-material-ui-carousel';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { useGetFieldValues, useGetFields, useDeleteFieldValue } from '@frontend/shared/hooks/field';
import Info from '@material-ui/icons/Info';
import Tooltip from '@material-ui/core/Tooltip';
import Skeleton from '@material-ui/lab/Skeleton';
import { convertToSlug } from './LeftNavigation';
import ErrorLoading from '../common/ErrorLoading';
import FieldValueForm from './FieldValueForm';
import CRUDMenu from '../common/CRUDMenu';
import Backdrop from '../common/Backdrop';
import { onAlert } from '../../utils/alert';
import FieldValueCard from './FieldValueCard';
import Share from '../share/Share';
import FormSection from './FormSection';
import FieldViewWrapper from '../form2/FieldViewWrapper';
import ResponseCount from '../form2/ResponseCount';

const initialState = {
  showForm: false,
  showMenu: null,
  selectedFieldValue: null,
  edit: false,
  expanded: false,
  expandId: '',
  showAddMenu: false,
  addTarget: null,
};

function ItemOneFields({
  field,
  parentId,
  guest,
  setFieldValueCount,
  toggleLeftNavigation,
  previewMode,
}: any) {
  const [state, setState] = useState(initialState);
  const { attributes, admin } = useSelector(({ auth }: any) => auth);
  const currentUserId = attributes['custom:_id'];
  const deleteCallback = () => {
    setState({ ...state, showMenu: null, selectedFieldValue: null, edit: false });
  };

  const { data, error } = useGetFieldValues({ parentId, field: field._id });
  const { handleDelete, deleteLoading } = useDeleteFieldValue({
    onAlert,
    parentId,
    field: field._id,
  });

  const formProps = {
    field: field._id,
    relationId: field.relationId,
    parentId,
    typeId: field.typeId ? field.typeId._id : null,
    typeSlug: field.typeId ? field.typeId.slug : null,
    fieldType: field.fieldType,
    label: field.label,
    onCancel: () => {
      toggleLeftNavigation(false);
      setState(initialState);
    },
  };

  useEffect(() => {
    if (data && data.getFieldValues) {
      setFieldValueCount(data.getFieldValues.data.length);
    }
  }, [data]);

  const onClickAdd = async (edit = false) => {
    if (field.fieldType === 'contentBox' || field.fieldType === 'contentBuilder') {
      setState(initialState);
      alert('Content builder is disabled delete this section or change the type to rich textarea');
    } else if (edit) {
      setState({ ...state, edit: true, showMenu: null });
    } else {
      setState({ ...initialState, showForm: true });
    }
  };

  if (error || !data || !data.getFieldValues) {
    return (
      <ErrorLoading error={error}>
        <Skeleton variant="text" height={100} />
      </ErrorLoading>
    );
  }

  const hasAlreadyAdded =
    data.getFieldValues.data.filter((v) => v.createdBy._id === currentUserId).length > 0;

  let showAddButton =
    data.getFieldValues.data.length === 0 ||
    (field.multipleValues &&
      !guest &&
      !state.showForm &&
      (field.oneUserMultipleValues || !hasAlreadyAdded));

  if (
    showAddButton &&
    !field.multipleValues &&
    !field.oneUserMultipleValues &&
    !(currentUserId === field.createdBy._id || admin)
  ) {
    showAddButton = false;
  }

  return (
    <div>
      {!previewMode && (
        <>
          <Menu
            anchorEl={state.addTarget}
            keepMounted
            open={Boolean(state.showAddMenu)}
            onClose={() => setState({ ...state, showAddMenu: false, addTarget: null })}
          >
            <MenuItem onClick={() => onClickAdd(false)}>
              <ListItemIcon className="mr-n4">
                <AddCircle fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Add New Value" />
            </MenuItem>
            <MenuItem>
              <ListItemIcon className="mr-n4">
                <Share itemSlug={convertToSlug(field.label)} />
              </ListItemIcon>
              <ListItemText primary="Share" />
            </MenuItem>
          </Menu>
          <div className="d-flex align-items-center">
            <Typography id={convertToSlug(field.label)}>{field.label}</Typography>
            {showAddButton && (
              <Tooltip title="More Actions">
                <IconButton
                  onClick={(event) =>
                    setState({ ...initialState, showAddMenu: true, addTarget: event.currentTarget })
                  }
                >
                  <MoreIcon />
                </IconButton>
              </Tooltip>
            )}
          </div>
          {state.showForm && <FieldValueForm {...formProps} />}
        </>
      )}
      <FieldValueMap
        values={data.getFieldValues.data || []}
        selectedValue={
          state.selectedFieldValue && state.edit ? state.selectedFieldValue?._id : null
        }
        onSelect={(target, sfieldValue) =>
          setState({
            ...state,
            showMenu: target,
            selectedFieldValue: sfieldValue,
          })
        }
        previewMode={previewMode}
        field={field}
        formProps={formProps}
      />
      <CRUDMenu
        show={state.showMenu}
        onClose={() => setState(initialState)}
        onDelete={() => {
          setState({ ...state, showMenu: false });
          handleDelete(
            state.selectedFieldValue._id,
            state.selectedFieldValue.relationId,
            deleteCallback,
          );
        }}
        onEdit={() => onClickAdd(true)}
      />
      <Backdrop open={deleteLoading} />
    </div>
  );
}

type Props3 = {
  values: any[];
  selectedValue: string;
  onSelect: (arg1: any, arg2: any) => void;
  field: any;
  formProps: any;
  previewMode: boolean;
};

const FieldValueMap = ({
  values = [],
  selectedValue = '',
  onSelect,
  field,
  previewMode,
  formProps = {},
}: Props3) => {
  const FMap = values.map((fieldValue, index) => (
    <div key={fieldValue._id}>
      {selectedValue === fieldValue._id ? (
        <FieldValueForm edit {...formProps} fieldValue={fieldValue} />
      ) : (
        <FieldValueCard
          index={index}
          fieldValue={fieldValue}
          field={field}
          previewMode={previewMode}
          onSelect={onSelect}
        />
      )}
      {/* <p className="text-center w-100">
        {index + 1} / {values?.length}
      </p> */}
    </div>
  ));

  return values?.length > 1 ? (
    <Carousel
      // index={parseInt(query.index)}
      NextIcon={
        <img
          style={{ width: 30, transform: 'rotate(180deg)' }}
          src="https://images.zerodown.com//website/foyer/static/images/carousel-arrow.png?tr=w-128,h-128,pr-true,f-auto"
        />
      }
      PrevIcon={
        <img
          style={{ width: 30 }}
          src="https://images.zerodown.com//website/foyer/static/images/carousel-arrow.png?tr=w-128,h-128,pr-true,f-auto"
        />
      }
      navButtonsProps={{
        style: {
          padding: 0,
          backgroundColor: 'inherit',
          width: 30,
          height: 30,
          // marginTop: 15,
        },
      }}
      navButtonsWrapperProps={{
        // Move the buttons to the bottom. Unsetting top here to override default style.
        style: {
          top: 50,
        },
      }}
      fullHeightHover={false}
      autoPlay={false}
      animation="slide"
      navButtonsAlwaysVisible
    >
      {FMap}
    </Carousel>
  ) : (
    <>{FMap}</>
  );
};

interface IProps {
  parentId: string;
  typeId: string;
  guest?: boolean;
  isPublish?: boolean;
  setFields?: (arg: any) => void;
  setFieldValueCount?: (arg: any, arg2: any) => void;
  pushToAnchor?: () => void;
  toggleLeftNavigation?: (value: boolean) => void;
  layouts: any;
  previewMode?: boolean;
}

export default function FieldValues({
  parentId,
  typeId,
  guest = false,
  setFields = (arg: any) => {},
  setFieldValueCount = (index: number, value: number) => {},
  pushToAnchor = () => {},
  toggleLeftNavigation,
  layouts,
  previewMode,
}: IProps): any {
  const { data, error } = useGetFields(typeId);

  useEffect(() => {
    if (data && data.getFields) {
      setFields(data.getFields);
      pushToAnchor();
    }
  }, [data]);

  if (error || !data || !data.getFields) {
    return (
      <ErrorLoading error={error}>
        <Skeleton variant="text" height={100} />
      </ErrorLoading>
    );
  }

  return (
    <Grid container>
      {data.getFields.map((field, index) => {
        let gridProps: any = { xs: 12 };
        if (layouts && layouts[field._id]) {
          Object.keys(layouts[field._id]).forEach(function (key) {
            if (layouts[field._id][key] && layouts[field._id][key] > 0) {
              const size = layouts[field._id][key];
              gridProps = { ...gridProps, [key]: size };
            }
          });
        }
        return (
          <Grid key={field._id} {...gridProps} item>
            {field.fieldType === 'form2' ? (
              <>
                <Typography id={convertToSlug(field.label)}>
                  {field.label}
                  <Tooltip title="You can edit this field from template">
                    <Info className="ml-1" fontSize="small" />
                  </Tooltip>
                </Typography>
                <ResponseCount formId={JSON.parse(field?.options)?.formId} parentId={parentId} />
                <FieldViewWrapper
                  _id={JSON.parse(field?.options)?.formId}
                  parentId={parentId}
                  customSettings={null}
                />
              </>
            ) : field.fieldType === 'form' ? (
              <FormSection field={field} parentId={parentId} previewMode={previewMode} />
            ) : (
              <ItemOneFields
                toggleLeftNavigation={(value) => {
                  if (toggleLeftNavigation) {
                    toggleLeftNavigation(value);
                  }
                }}
                parentId={parentId}
                field={field}
                previewMode={previewMode}
                guest={guest}
                setFieldValueCount={(value) => setFieldValueCount(index, value)}
              />
            )}
          </Grid>
        );
      })}
    </Grid>
  );
}
