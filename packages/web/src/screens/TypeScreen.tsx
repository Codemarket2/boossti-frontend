import parse from 'html-react-parser';
import { useGetListTypeBySlug, useDeleteListType } from '@frontend/shared/hooks/list';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import { useCRUDListTypes } from '@frontend/shared/hooks/list';
import UserLayout from '../components/common/UserLayout';
import Breadcrumbs from '../components/common/Breadcrumbs';
import ErrorLoading from '../components/common/ErrorLoading';
import ListItems from '../components/list/ListItems';
import ImageList from '../components/post/ImageList';
import NotFound from '../components/common/NotFound';
import Backdrop from '../components/common/Backdrop';
import ActionButtons from '../components/list/ActionButtons';
import { onAlert } from '../utils/alert';
import Fields from '../components/field/Fields';
import InlineForm from '../components/list/InlineForm';
import MediaForm from '../components/list/MediaForm';
import CommentButton from '../components/comment/CommentButton';
import ListItemForm from '../components/list/ListItemForm';
import ListItemsGrid from '../components/list/ListItemsGrid';

interface IProps {
  slug: any;
}

const buttonLabels = ['List View', 'Grid View', 'Form View'];

export default function Screen({ slug }: IProps) {
  const router = useRouter();

  const [state, setState] = useState({
    fieldName: '',
    view: buttonLabels[1],
    showMenu: false,
    selectedIndex: 0,
  });
  const [fields, setFields] = useState([]);

  const deleteCallBack = () => {
    router.push(`/types`);
  };

  const updateCallBack = (newSlug) => {
    setState({ ...state, fieldName: '' });
    if (newSlug !== slug) {
      router.push(`/types/${newSlug}`);
    }
  };

  const { data, loading, error } = useGetListTypeBySlug({ slug });
  const { handleDelete, deleteLoading } = useDeleteListType({ onAlert });

  const {
    state: crudState,
    setState: setCrudState,
    formik,
    CRUDLoading,
    setFormValues,
  } = useCRUDListTypes({
    onAlert,
    updateCallBack,
  });

  const onCancel = () => {
    setState({ ...state, fieldName: '' });
  };

  const onEdit = (fieldName) => {
    setFormValues(data.getListTypeBySlug);
    setState({ ...state, fieldName });
  };

  if (error || !data) {
    return <ErrorLoading error={error} />;
  } else if (!data.getListTypeBySlug) {
    return <NotFound />;
  }

  return (
    <UserLayout container={false} authRequired>
      <div className="px-3">
        <div className="d-flex justify-content-between align-content-center align-items-center">
          <Breadcrumbs>
            <Link href="/types">Types</Link>
            <Typography color="textPrimary">
              {data.getListTypeBySlug.title.includes('-n-e-w')
                ? 'Title'
                : data.getListTypeBySlug.title}
            </Typography>
          </Breadcrumbs>
          <div className="d-flex">
            {buttonLabels.map(
              (buttonLabel) =>
                buttonLabel !== state.view && (
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    className="mr-2"
                    onClick={() => setState({ ...state, view: buttonLabel })}>
                    {buttonLabel}
                  </Button>
                ),
            )}
            <ActionButtons
              hideEdit
              onDelete={() => {
                if (data.getListTypeBySlug.inUse) {
                  alert("This type is being used in some form, you can't delete");
                } else {
                  handleDelete(data.getListTypeBySlug._id, deleteCallBack);
                }
              }}
            />
          </div>
        </div>
        <Grid container spacing={1}>
          <Grid item sm={3} xs={12}>
            <Paper variant="outlined" className="p-2 mb-2">
              {state.fieldName === 'title' ? (
                <InlineForm
                  fieldName={state.fieldName}
                  label="Title"
                  onCancel={onCancel}
                  formik={formik}
                  formLoading={CRUDLoading}
                />
              ) : (
                <div>
                  <Typography className="d-flex align-items-center">
                    Title
                    <Tooltip title="Edit Title">
                      <IconButton onClick={() => onEdit('title')}>
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Typography>
                  <Typography variant="h4" className="d-flex align-items-center">
                    {data.getListTypeBySlug.title.includes('-n-e-w')
                      ? 'Title'
                      : data.getListTypeBySlug.title}
                  </Typography>
                </div>
              )}
              <Divider className="my-2" />
              {state.fieldName === 'description' ? (
                <InlineForm
                  label="Description"
                  onCancel={onCancel}
                  multiline
                  fieldName={state.fieldName}
                  formik={formik}
                  formLoading={CRUDLoading}
                />
              ) : (
                <div>
                  <Typography className="d-flex align-items-center">
                    Description
                    <Tooltip title="Edit Description">
                      <IconButton onClick={() => onEdit('description')}>
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Typography>
                  <div className="ck-content">{parse(data.getListTypeBySlug.description)}</div>
                  <CommentButton parentId={data.getListTypeBySlug._id} />
                </div>
              )}
              <Divider className="my-2" />
              {state.fieldName === 'media' ? (
                <MediaForm
                  state={crudState}
                  setState={setCrudState}
                  onCancel={onCancel}
                  onSave={formik.handleSubmit}
                  loading={CRUDLoading}
                />
              ) : (
                <>
                  <Typography className="d-flex align-items-center">
                    Media
                    <Tooltip title="Edit Media">
                      <IconButton onClick={() => onEdit('media')}>
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Typography>
                  <ImageList media={data.getListTypeBySlug.media} />
                </>
              )}
            </Paper>
            <Fields setFields={setFields} parentId={data.getListTypeBySlug._id} />
          </Grid>
          <Grid item xs>
            {state.view === 'Form View' ? (
              <ListItemForm
                typeSlug={data.getListTypeBySlug.slug}
                types={[data.getListTypeBySlug._id]}
                parentId={data.getListTypeBySlug._id}
              />
            ) : state.view === 'Grid View' ? (
              <ListItemsGrid fields={fields} types={[data.getListTypeBySlug._id]} />
            ) : (
              <ListItems
                types={[data.getListTypeBySlug._id]}
                name={data.getListTypeBySlug.title}
                slug={data.getListTypeBySlug.slug}
              />
            )}
          </Grid>
        </Grid>
      </div>
      <Backdrop open={deleteLoading || CRUDLoading} />
    </UserLayout>
  );
}
