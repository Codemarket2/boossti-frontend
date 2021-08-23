import { useState } from 'react';
import { useGetListItemBySlug, useDeleteListItem } from '@frontend/shared/hooks/list';
import { useCRUDListItems } from '@frontend/shared/hooks/list';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import Typography from '@material-ui/core/Typography';
import UserLayout from '../components/common/UserLayout';
import Breadcrumbs from '../components/common/Breadcrumbs';
import ErrorLoading from '../components/common/ErrorLoading';
import Backdrop from '../components/common/Backdrop';
import ListItemForm from '../components/list/ListItemForm';
import ImageList from '../components/post/ImageList';
import NotFound from '../components/common/NotFound';
import FieldValues from '../components/field/FieldValues';
import ActionButtons from '../components/list/ActionButtons';
import InlineForm from '../components/list/InlineForm';
import { onAlert } from '../utils/alert';

interface IProps {
  slug: any;
  typeSlug: any;
}

export default function Screen({ slug, typeSlug }: IProps) {
  const router = useRouter();
  const [state, setState] = useState({ item: null, fieldName: '' });
  const deleteCallBack = () => {
    router.push(`/types/${typeSlug}`);
  };

  const updateCallBack = (newSlug) => {
    setState({ ...state, item: null, fieldName: '' });
    if (newSlug !== slug) {
      router.push(`/types/${typeSlug}/${newSlug}`);
    }
  };
  const { handleDelete, deleteLoading } = useDeleteListItem({ onAlert });

  const { data, loading, error } = useGetListItemBySlug({ slug });

  const {
    state: crudState,
    setState: setCrudState,
    formik,
    setFormValues,
    CRUDLoading,
  } = useCRUDListItems({
    onAlert,
    updateCallBack,
  });

  const onCancel = () => {
    setState({ ...state, fieldName: '' });
  };

  const onEdit = (fieldName) => {
    setFormValues(data.getListItemBySlug);
    setState({ ...state, fieldName });
  };

  if (error || !data) {
    return <ErrorLoading error={error} />;
  } else if (!data.getListItemBySlug) {
    return <NotFound />;
  }

  return (
    <UserLayout authRequired>
      <div className="d-flex justify-content-between align-content-center align-items-center">
        <Breadcrumbs>
          <Link href="/types">Types</Link>
          <Link href={`/types/${data.getListItemBySlug.types[0].slug}`}>
            <a>{data.getListItemBySlug.types[0].title}</a>
          </Link>
          <Typography color="textPrimary">{data.getListItemBySlug.title}</Typography>
        </Breadcrumbs>
        <ActionButtons
          onEdit={() => setState({ ...state, item: { ...data.getListItemBySlug } })}
          onDelete={() => handleDelete(data.getListItemBySlug._id, deleteCallBack)}
        />
      </div>
      {state.item ? (
        <ListItemForm
          item={state.item}
          typeSlug={typeSlug}
          types={[data.getListItemBySlug.types[0]._id]}
          updateCallBack={updateCallBack}
          onCancel={() => setState({ ...state, item: null })}
        />
      ) : (
        <>
          <Paper variant="outlined" className="p-2 pb-5">
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
                {data.getListItemBySlug.title}
                <Tooltip title="Edit Title">
                  <IconButton onClick={() => onEdit('title')}>
                    <EditIcon />
                  </IconButton>
                </Tooltip>
              </Typography>
            )}
            {state.fieldName === 'description' ? (
              <InlineForm
                fieldName={state.fieldName}
                label="Title"
                onCancel={onCancel}
                formik={formik}
                formLoading={CRUDLoading}
              />
            ) : (
              <Typography>
                {data.getListItemBySlug.description || 'Description'}
                <Tooltip title="Edit Description">
                  <IconButton onClick={() => onEdit('description')}>
                    <EditIcon />
                  </IconButton>
                </Tooltip>
              </Typography>
            )}
            <Typography className="d-flex align-items-center">
              Media
              <Tooltip title="Edit Description">
                <IconButton
                  onClick={() => setState({ ...state, item: { ...data.getListItemBySlug } })}>
                  <EditIcon />
                </IconButton>
              </Tooltip>
            </Typography>
            <ImageList media={data.getListItemBySlug.media} />
            <FieldValues
              parentId={data.getListItemBySlug._id}
              typeId={data.getListItemBySlug.types[0]._id}
            />
          </Paper>
        </>
      )}
      <Backdrop open={deleteLoading || CRUDLoading || formik.isSubmitting} />
    </UserLayout>
  );
}
