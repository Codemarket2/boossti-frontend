import { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_COMMENT } from '../../graphql/mutation/comment';

export function useCreateComment() {
  const [createCommentMutation, { data, loading, error }] = useMutation(CREATE_COMMENT);
  const [inputVal, setInputVal] = useState('');

  const handleSave = (postId: string) => {
    createCommentMutation({
      variables: {
        body: inputVal,
        parentId: postId,
      },
    });
    setInputVal('');
  };
  return {
    inputVal,
    setInputVal,
    handleSave,
  };
}
