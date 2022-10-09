import { useMutation } from '@apollo/client';
import { useSelector } from 'react-redux';
import { RESOLVE_CONDITION } from '../../graphql/mutation/response';

export const useResolveCondition = (responseId: string) => {
  const [resolveConditionMutation] = useMutation(RESOLVE_CONDITION);
  const setting = useSelector((state: any) => state?.setting);

  const handleResolveCondition = async (conditions) => {
    try {
      const { data } = await resolveConditionMutation({
        variables: {
          responseId,
          conditions: JSON.stringify(conditions),
          appId: setting?.appResponse?._id,
        },
      });
      return data?.resolveCondition === true;
    } catch (error) {
      alert(`Error while resolving condition, ${error?.message}`);
    }
  };
  return { handleResolveCondition };
};
