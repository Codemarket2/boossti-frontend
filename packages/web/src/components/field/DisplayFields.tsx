import { Typography } from '@material-ui/core';
import { useGetListItemBySlug } from '@frontend/shared/hooks/list';
import Skeleton from '@material-ui/lab/Skeleton';
import Paper from '@material-ui/core/Paper';
import FieldValues from './FieldValues';
import ErrorLoading from '../common/ErrorLoading';
import NotFound from '../common/NotFound';
import AuthRequired from '../common/AuthRequired';

interface IProps {
  slug: string;
  checkAuth?: boolean;
}

export default function DisplayFields({ slug, checkAuth = true }: IProps) {
  const { data, error } = useGetListItemBySlug({ slug });

  if (error || !data) {
    return (
      <ErrorLoading>
        <Skeleton variant="text" height={100} />
      </ErrorLoading>
    );
  }

  if (!data?.getListItemBySlug && checkAuth) {
    return <NotFound />;
  }
  if (!data?.getListItemBySlug) {
    return null;
  }

  const FieldsValueComponent = (
    <Paper elevation={0} className="mt-2 p-2">
      <Typography align="center" variant="h3">
        {data?.getListItemBySlug?.title}
      </Typography>
      <FieldValues
        parentId={data?.getListItemBySlug?._id}
        typeId={data?.getListItemBySlug?.types[0]?._id}
        previewMode
        layouts={JSON.parse(data?.getListItemBySlug?.layouts) || {}}
      />
    </Paper>
  );

  return checkAuth && data?.getListItemBySlug?.authenticateUser ? (
    <AuthRequired>{FieldsValueComponent}</AuthRequired>
  ) : (
    FieldsValueComponent
  );
}
