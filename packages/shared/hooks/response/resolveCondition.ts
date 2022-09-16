import { useMutation } from '@apollo/client';
import { RESOLVE_CONDITION } from '../../graphql/mutation/response';

export const useResolveCondition = (responseId: string) => {
  const [resolveConditionMutation] = useMutation(RESOLVE_CONDITION);
  const handleResolveCondition = async (conditions) => {
    try {
      const { data } = await resolveConditionMutation({ variables: { responseId, conditions } });
      // debugger;
    } catch (error) {
      alert(`Error, ${error?.message}`);
    }
  };
  return { handleResolveCondition };
};
