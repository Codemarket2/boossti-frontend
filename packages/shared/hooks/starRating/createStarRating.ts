import { useMutation } from '@apollo/client';
import { client as apolloClient } from '../../graphql';
import {
  CREATE_STAR_RATING,
  DELETE_STAR_RATING,
  UPDATE_STAR_RATING,
} from '../../graphql/mutation/starRating';
import { GET_RATING_COUNTS } from '../../graphql/query/starRating';

const updateRatingCache = async (rtng: number, parentId: string, r: any) => {
  const oldRating = await apolloClient.readQuery({
    query: GET_RATING_COUNTS,
    variables: { parentId },
  });
  let newRating;
  if (oldRating?.getRatingCounts) {
    if (rtng === -1) {
      newRating = {
        getRatingCounts: {
          ratingCount: oldRating.getRatingCounts.ratingCount - 1,
          averageStarRating: 3,
          userStarRating: null,
        },
      };
    } else {
      newRating = {
        getRatingCounts: {
          ...oldRating.getRatingCounts,
          ratingCount: oldRating.getRatingCounts.ratingCount + 1,
          userStarRating: r,
        },
      };
    }
    await apolloClient.writeQuery({
      query: GET_RATING_COUNTS,
      variables: { parentId },
      data: newRating,
    });
  }
  // console.log(oldRating, 'oldrating', rtng, parentId);
};

export function useCreateStarRating(parentId: string) {
  const [createStarRatingMutation] = useMutation(CREATE_STAR_RATING);
  const handleCreate = async (value: number) => {
    const rating = await createStarRatingMutation({
      variables: {
        parentId,
        starRating: value,
      },
    });
    updateRatingCache(1, parentId, rating.data.createStarRating);
  };
  return {
    handleCreate,
  };
}

export function useDeleteStarRating(parentId: string) {
  const [deleteStarRating] = useMutation(DELETE_STAR_RATING);
  const handleDelete = () => {
    deleteStarRating({
      variables: {
        parentId,
      },
    });
    updateRatingCache(-1, parentId, null);
  };
  return { handleDelete };
}

export function useUpdateStarRating() {
  const [updateStarRatingMutation] = useMutation(UPDATE_STAR_RATING);
  const handleUpdate = (value: number, rid: string) => {
    updateStarRatingMutation({
      variables: {
        _id: rid,
        starRating: value,
      },
    });
  };
  return { handleUpdate };
}
