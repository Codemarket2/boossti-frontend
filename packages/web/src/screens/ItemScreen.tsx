import { useState } from 'react';
import { useGetListItemBySlug, useDeleteListItem } from '@frontend/shared/hooks/list';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Typography from '@material-ui/core/Typography';
import UserLayout from '../components/common/UserLayout';
import Breadcrumbs from '../components/common/Breadcrumbs';
import ErrorLoading from '../components/common/ErrorLoading';
import Backdrop from '../components/common/Backdrop';
import ListItemForm from '../components/list/ListItemForm';
import ImageList from '../components/post/ImageList';
import NotFound from '../components/common/NotFound';
import { onAlert } from '../utils/alert';

interface IProps {
  slug: any;
  typeSlug: any;
}

export default function Screen({ slug, typeSlug }: IProps) {
  const router = useRouter();
  const deleteCallBack = () => {
    router.push(`/types/${typeSlug}`);
  };
  const { handleDelete, deleteLoading } = useDeleteListItem({ onAlert });

  const [state, setState] = useState({ item: null });

  const { data, loading, error } = useGetListItemBySlug({ slug });
  if (error || !data) {
    return <ErrorLoading error={error} />;
  } else if (!data.getListItemBySlug) {
    return <NotFound />;
  }

  return (
    <UserLayout authRequired>
      <Breadcrumbs>
        <Link href="/types">Types</Link>
        <Link href={`/types/${data.getListItemBySlug.types[0].slug}`}>
          <a>{data.getListItemBySlug.types[0].name}</a>
        </Link>
        <Typography color="textPrimary">{data.getListItemBySlug.title}</Typography>
      </Breadcrumbs>

      {state.item ? (
        <ListItemForm
          item={state.item}
          typeSlug={typeSlug}
          types={[data.getListItemBySlug.types[0]._id]}
          updateCallBack={() => setState({ ...state, item: null })}
          onCancel={() => setState({ ...state, item: null })}
        />
      ) : (
        <Paper variant="outlined" className="p-2 pb-5">
          <div className="d-flex justify-content-between align-content-center align-items-center">
            <Typography variant="h4">{data.getListItemBySlug.title}</Typography>
            <div className="d-flex align-content-center align-items-center">
              <Tooltip title="Edit">
                <Button
                  onClick={() => setState({ ...state, item: { ...data.getListItemBySlug } })}
                  className="mr-2"
                  size="small"
                  variant="outlined"
                  component="span"
                  color="primary"
                  startIcon={<EditIcon />}>
                  Edit
                </Button>
              </Tooltip>
              <Tooltip title="Delete">
                <Button
                  onClick={() => handleDelete(data.getListItemBySlug._id, deleteCallBack)}
                  size="small"
                  variant="outlined"
                  component="span"
                  color="primary"
                  startIcon={<DeleteIcon />}>
                  Delete
                </Button>
              </Tooltip>
            </div>
          </div>
          <Typography>{data.getListItemBySlug.description}</Typography>
          <ImageList media={data.getListItemBySlug.media} />
        </Paper>
      )}
      <Backdrop open={deleteLoading} />
    </UserLayout>
  );
}
