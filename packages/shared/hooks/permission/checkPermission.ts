import { useQuery } from '@apollo/client';
import { useSelector } from 'react-redux';
import { CHECK_PERMISSION } from '../../graphql/query/permission';

type permissionActionType = 'CREATE' | 'EDIT' | 'DELETE' | 'VIEW';

interface IUseCheckPermissions {
  actionType: permissionActionType;
  formId?: string;
  responseId?: string;
}

export const useCheckPermission = ({ actionType, formId, responseId }: IUseCheckPermissions) => {
  const { auth, setting } = useSelector((state: any) => state);
  const { data, error, loading } = useQuery<{ checkPermission: boolean }>(CHECK_PERMISSION, {
    variables: { actionType, formId, responseId, appId: setting?.appResponse?._id },
    fetchPolicy: 'cache-and-network',
  });

  return { loading, error, hasPermission: auth?.admin || data?.checkPermission };
};
