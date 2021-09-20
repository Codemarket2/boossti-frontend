import { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import produce from 'immer';

import { CREATE_LIKE, DELETE_LIKE } from '../../graphql/mutation/like';
import { GET_LIKES_BY_PARENT_ID } from '../../graphql/query/like';

export function useCreateLike(parentId: string) {
  const [createLikeMutation, { loading, data, error }] = useMutation(CREATE_LIKE);
  const handleLiked = () => {
    createLikeMutation({
      variables: {
        parentId: parentId,
      },
      update: (store, { data }) => {
        try {
          const getLike = store.readQuery({
            query: GET_LIKES_BY_PARENT_ID,
            variables: {
              parentId: parentId,
            },
          });

          store.writeQuery({
            query: GET_LIKES_BY_PARENT_ID,
            data: produce(getLike, (draft: any) => {
              draft?.getLikesByParentId?.data?.push(data?.createLike);
            }),
            variables: {
              parentId: parentId,
            },
          });
        } catch (error) {
          console.error(error);
        }
      },
    });
  };

  return {
    handleLiked,
  };
}

export function useDeleteLike() {
  const [deleteLikeMutation, { data, loading, error }] = useMutation(DELETE_LIKE);
  const handleLikeDelete = (id: string, parentId: string, index) => {
    deleteLikeMutation({
      variables: {
        _id: id,
      },
      update: (store) => {
        const currentLikes = store.readQuery({
          query: GET_LIKES_BY_PARENT_ID,
          variables: {
            parentId: parentId,
          },
        });

        let DeletedLike = produce(currentLikes, (draft: any) => {
          draft!.getLikesByParentId!.data!.splice(index, 1);
        });
        store.writeQuery({
          query: GET_LIKES_BY_PARENT_ID,
          data: DeletedLike,
          variables: {
            parentId: parentId,
          },
        });
      },
    });
  };
  return {
    handleLikeDelete,
  };
}
