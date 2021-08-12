import { useGetListTypeBySlug, useDeleteListType } from '@frontend/shared/hooks/list';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import UserLayout from '../components/common/UserLayout';
import Breadcrumbs from '../components/common/Breadcrumbs';
import ErrorLoading from '../components/common/ErrorLoading';
import ListItems from '../components/list/ListItems';
import ListTypeForm from '../components/list/ListTypeForm';
import ImageList from '../components/post/ImageList';
import NotFound from '../components/common/NotFound';
import Backdrop from '../components/common/Backdrop';
import ActionButtons from '../components/list/ActionButtons';
import { onAlert } from '../utils/alert';
import Fields from '../components/list/Fields';

interface IProps {
  slug: any;
}

export default function Screen({ slug }: IProps) {
  const router = useRouter();

  const deleteCallBack = () => {
    router.push(`/types`);
  };

  const updateCallBack = (newSlug) => {
    setState({ ...state, vType: null });
    if (newSlug !== slug) {
      router.push(`/types/${newSlug}`);
    }
  };

  const { data, loading, error } = useGetListTypeBySlug({ slug });
  const { handleDelete, deleteLoading } = useDeleteListType({ onAlert });

  const [state, setState] = useState({ vType: null });

  if (error || !data) {
    return <ErrorLoading error={error} />;
  } else if (!data.getListTypeBySlug) {
    return <NotFound />;
  }

  return (
    <UserLayout authRequired>
      <Breadcrumbs>
        <Link href="/types">Types</Link>
        <Typography color="textPrimary">{data.getListTypeBySlug.title}</Typography>
      </Breadcrumbs>
      {state.vType ? (
        <ListTypeForm
          vType={state.vType}
          updateCallBack={updateCallBack}
          onCancel={() => setState({ ...state, vType: null })}
        />
      ) : (
        <>
          <Paper variant="outlined" className="p-2 mb-2">
            <div className="d-flex justify-content-between align-content-center align-items-center">
              <Typography variant="h4">{data.getListTypeBySlug.title}</Typography>
              <ActionButtons
                onEdit={() => setState({ ...state, vType: { ...data.getListTypeBySlug } })}
                onDelete={() => {
                  if (data.getListTypeBySlug.inUse) {
                    alert("This type is being used in some form, you can't delete");
                  } else {
                    handleDelete(data.getListTypeBySlug._id, deleteCallBack);
                  }
                }}
              />
            </div>
            <Typography>{data.getListTypeBySlug.description}</Typography>
            <ImageList media={data.getListTypeBySlug.media} />
          </Paper>
          <Fields />
          <ListItems
            types={[data.getListTypeBySlug._id]}
            name={data.getListTypeBySlug.title}
            slug={data.getListTypeBySlug.slug}
          />
        </>
      )}
      <Backdrop open={deleteLoading} />
    </UserLayout>
  );
}
