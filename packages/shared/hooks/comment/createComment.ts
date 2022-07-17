import { useState } from 'react';
import { useMutation } from '@apollo/client';
import produce from 'immer';
import { CREATE_COMMENT, DELETE_COMMENT, UPDATE_COMMENT } from '../../graphql/mutation/comment';
import { GET_COMMENTS_BY_PARENT_ID } from '../../graphql/query/comment';

interface UseCreateCommentProps {
  threadId: string;
  parentIds?: string[];
}

export function useCreateComment({ parentIds, threadId }: UseCreateCommentProps) {
  const [createCommentMutation, { loading }] = useMutation(CREATE_COMMENT);
  const [inputVal, setInputVal] = useState('');

  const handleSave = async () => {
    if (inputVal === '') {
      return alert('Enter some text');
    }
    if (inputVal !== '') {
      await createCommentMutation({
        variables: {
          body: inputVal,
          parentIds,
          threadId,
        },
        update: (store, { data }) => {
          try {
            const getComment = store.readQuery({
              query: GET_COMMENTS_BY_PARENT_ID,
              variables: {
                parentIds,
              },
            });

            store.writeQuery({
              query: GET_COMMENTS_BY_PARENT_ID,
              data: produce(getComment, (draft: any) => {
                draft?.getCommentsByThreadId?.data?.push(data?.createComment);
              }),
              variables: {
                parentIds,
              },
            });
          } catch (error) {
            // console.error(error);
          }
        },
      });
      setInputVal('');
    }
  };

  return {
    inputVal,
    setInputVal,
    handleSave,
    loading,
  };
}

export function useUpdateComment(id: string, setEdit: any) {
  const [updateCommentMutation] = useMutation(UPDATE_COMMENT);
  const [updateInputVal, setUpdateInputVal] = useState('');
  const handleUpdate = () => {
    if (updateInputVal === '') {
      return alert('comment is empty');
    }
    if (updateInputVal !== '') {
      updateCommentMutation({
        variables: {
          _id: id,
          body: updateInputVal,
        },
      });
      setUpdateInputVal('');
      setEdit(false);
    }
  };

  return {
    setUpdateInputVal,
    handleUpdate,
    updateInputVal,
  };
}

export function useDeleteComment() {
  const [deleteCommentMutation, { data, loading, error }] = useMutation(DELETE_COMMENT);
  const handleDelete = (commentId: string, threadId: string) => {
    deleteCommentMutation({
      variables: {
        _id: commentId,
      },
      update: (store) => {
        const existingComment: any = store.readQuery({
          query: GET_COMMENTS_BY_PARENT_ID,
          variables: {
            threadId,
          },
        });
        if (existingComment?.getCommentsByThreadId) {
          const newData = {
            ...existingComment,
            getCommentsByThreadId: {
              ...existingComment?.getCommentsByThreadId,
              data: existingComment?.getCommentsByThreadId?.data?.filter(
                (comment) => comment?._id !== commentId,
              ),
            },
          };

          store.writeQuery({
            query: GET_COMMENTS_BY_PARENT_ID,
            data: newData,
            variables: {
              threadId,
            },
          });
        }
      },
    });
  };

  return {
    handleDelete,
    loading,
  };
}
