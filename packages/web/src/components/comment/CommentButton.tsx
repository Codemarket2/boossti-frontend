import Collapse from '@material-ui/core/Collapse';
import Button from '@material-ui/core/Button';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';

import { useState } from 'react';
import Comment from '../comment/Comment';
interface IProps {
  parentId: string;
}

export default function CommentButton({ parentId }: IProps) {
  const [showComment, setShowComment] = useState(false);

  return (
    <div>
      <Button
        color="primary"
        onClick={() => setShowComment(!showComment)}
        size="small"
        startIcon={<ChatBubbleIcon />}>
        Comments
      </Button>
      <Collapse in={showComment} timeout="auto" unmountOnExit>
        <Comment postId={parentId} />
      </Collapse>
    </div>
  );
}
