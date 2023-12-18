import React from 'react';
import PostForm from './PostForm';
import Overlay from '../common/Overlay';

interface IProps {
  open: boolean;
  onClose: () => void;
  post: any;
}

export default function PostEditForm({ open = false, onClose, post }: IProps) {
  return (
    <Overlay open={open} onClose={onClose}>
      <div className="p-2">
        {post && <PostForm onClose={onClose} post={post ? { ...post, edit: true } : {}} />}
      </div>
    </Overlay>
  );
}
