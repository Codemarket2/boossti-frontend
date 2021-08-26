import { useGetListTypeBySlug, useDeleteListType } from '@frontend/shared/hooks/list';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
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

interface IProps {
  slug: any;
}

export default function Screen({ slug }: IProps) {
  const router = useRouter();
  const [state, setState] = useState({ fieldName: '' });

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
    <UserLayout authRequired>
      <div className="d-flex justify-content-between align-content-center align-items-center">
        <Breadcrumbs>
          <Link href="/types">Types</Link>
          <Typography color="textPrimary">
            {data.getListTypeBySlug.title.includes('-n-e-w')
              ? 'Title'
              : data.getListTypeBySlug.title}
          </Typography>
        </Breadcrumbs>
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
          <Typography variant="h4" className="d-flex align-items-center">
            {data.getListTypeBySlug.title.includes('-n-e-w')
              ? 'Title'
              : data.getListTypeBySlug.title}
            <Tooltip title="Edit Title">
              <IconButton onClick={() => onEdit('title')}>
                <EditIcon />
              </IconButton>
            </Tooltip>
          </Typography>
        )}
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
          <Typography className="d-flex align-items-center">
            {data.getListTypeBySlug.description || 'Description'}
            <Tooltip title="Edit Description">
              <IconButton onClick={() => onEdit('description')}>
                <EditIcon />
              </IconButton>
            </Tooltip>
          </Typography>
        )}
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
              <Tooltip title="Edit Description">
                <IconButton onClick={() => onEdit('media')}>
                  <EditIcon />
                </IconButton>
              </Tooltip>
            </Typography>
            <ImageList media={data.getListTypeBySlug.media} />
          </>
        )}
      </Paper>
      <Fields parentId={data.getListTypeBySlug._id} />
      <ListItems
        types={[data.getListTypeBySlug._id]}
        name={data.getListTypeBySlug.title}
        slug={data.getListTypeBySlug.slug}
      />
      <Backdrop open={deleteLoading || CRUDLoading} />
    </UserLayout>
  );
}
