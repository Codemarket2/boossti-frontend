import {
  useCreateStarRating,
  useDeleteStarRating,
  useUpdateStarRating,
} from '@frontend/shared/hooks/starRating/createStarRating';

export const useStarRating = (parentId: string) => {
  const { handleCreate } = useCreateStarRating(parentId);
  const { handleDelete } = useDeleteStarRating(parentId);
  const { handleUpdate } = useUpdateStarRating();

  const handleRating = (newValue: number | null, oldValue: number | null, id: string) => {
    if (newValue == null && oldValue == null) {
      console.log('');
    } else if (newValue == null) {
      handleDelete();
    } else if (oldValue == null) {
      handleCreate(newValue);
    } else if (newValue !== oldValue && id !== undefined) {
      handleUpdate(newValue, id);
    }
  };
  return {
    handleRating,
  };
};
