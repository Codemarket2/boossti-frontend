import { useState } from 'react';
import { useMutation } from '@apollo/client';
import produce from 'immer';
import { CREATE_COMMENT, DELETE_COMMENT, UPDATE_COMMENT } from '../../graphql/mutation/comment';
import { GET_COMMENTS_BY_PARENT_ID } from '../../graphql/query/comment';

export function useCreateComment(postId: string, threadId: string) {
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
          parentId: postId,
          threadId,
        },
        update: (store, { data }) => {
          try {
            const getComment = store.readQuery({
              query: GET_COMMENTS_BY_PARENT_ID,
              variables: {
                parentId: postId,
              },
            });

            store.writeQuery({
              query: GET_COMMENTS_BY_PARENT_ID,
              data: produce(getComment, (draft: any) => {
                draft?.getCommentsByParentID?.data?.push(data?.createComment);
              }),
              variables: {
                parentId: postId,
              },
            });
          } catch (error) {
            console.error(error);
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

export function useUpdateComment(postId: string, id: string, setEdit: any) {
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
        update: (store) => {
          const currentComment = store.readQuery({
            query: GET_COMMENTS_BY_PARENT_ID,
            variables: {
              parentId: postId,
            },
          });
          const updatedComment = produce(currentComment, (draft: any) => {
            draft!.getCommentsByParentID!.data[
              draft!.getCommentsByParentID!.data!.findIndex((index) => index._id === id)
            ].body = updateInputVal;
          });

          store.writeQuery({
            query: GET_COMMENTS_BY_PARENT_ID,
            data: updatedComment,
            variables: {
              parentId: postId,
            },
          });
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
  const handleDelete = (id: string, postId: string, index: number) => {
    deleteCommentMutation({
      variables: {
        _id: id,
      },
      update: (store) => {
        const existingComment = store.readQuery({
          query: GET_COMMENTS_BY_PARENT_ID,
          variables: {
            parentId: postId,
          },
        });

        let newData = produce(existingComment, (draft: any) => {
          draft!.getCommentsByParentID!.data!.splice(index, 1);
        });

        store.writeQuery({
          query: GET_COMMENTS_BY_PARENT_ID,
          data: newData,
          variables: {
            parentId: postId,
          },
        });
      },
    });
  };

  return {
    handleDelete,
    loading,
  };
}
