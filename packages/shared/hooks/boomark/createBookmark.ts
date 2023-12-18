import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_BOOKMARK } from '../../graphql/mutation/bookmark';

// interface IHandleBookmark {
//   parentId: string;
//   bookmark: string;
// }

export function useCreateBookmark({ onAlert }: any) {
  const [state, setState] = useState({
    showMenu: null,
    selectedTag: null,
    tag: null,
    url: '/types',
    saveTagLoading: false,
  });
  const [createPostMutation] = useMutation(CREATE_BOOKMARK);

  const handleBookmark = async () => {
    try {
      const parentId = state.selectedTag._id;
      const bookmark = state.selectedTag.text;
      setState({ ...state, saveTagLoading: true, showMenu: null, selectedTag: null });
      await createPostMutation({
        variables: {
          parentId,
          bookmark,
        },
      });
      setState({ ...state, saveTagLoading: false, showMenu: null, selectedTag: null });
    } catch (error) {
      setState({ ...state, saveTagLoading: true });
      onAlert('Error', error.message);
    }
  };

  return { handleBookmark, state, setState };
}
