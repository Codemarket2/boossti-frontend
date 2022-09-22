import { useMutation } from '@apollo/client';
import { RESOLVE_CONDITION } from '../../graphql/mutation/response';

export const useResolveCondition = (responseId: string) => {
  const [resolveConditionMutation] = useMutation(RESOLVE_CONDITION);
  const handleResolveCondition = async (conditions) => {
    try {
      const { data } = await resolveConditionMutation({
        variables: { responseId, conditions: JSON.stringify(conditions) },
      });
      return data?.resolveCondition === true;
    } catch (error) {
      alert(`Error while resolving condition, ${error?.message}`);
    }
  };
  return { handleResolveCondition };
};
