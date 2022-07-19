import { useState } from 'react';
import moment from 'moment';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import PersonIcon from '@mui/icons-material/Person';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import { getUserName } from '@frontend/shared/hooks/user/getUserForm';
import { useSelector } from 'react-redux';
import DisplayRichText from '../common/DisplayRichText';
import CommentLikeShare from './CommentLikeShare';
import Authorization from '../common/Authorization';

interface IDisplayComment {
  threadId: string;
  parentIds: string[];
  comment: any;
  handleDelete: (commentId: string, threadId: string) => void;
  setEdit: any;
  index: number;
  itemSlug?: string;
  shareIndex?: any;
  fieldTitle?: string;
}
export default function CommentCard({
  parentIds,
  threadId,
  comment,
  handleDelete,
  setEdit,
  index,
  itemSlug,
  shareIndex,
  fieldTitle,
}: IDisplayComment) {
  const [commentsListShown, setCommentsListShown] = useState(false);
  const userForm = useSelector(({ setting }: any) => setting.userForm);

  const userName = getUserName(userForm, comment?.createdBy);
  const timeStamp =
    moment(comment?.createdAt) > moment().subtract(7, 'days')
      ? moment(comment?.createdAt).fromNow()
      : moment(comment?.createdAt).format('LLL');

  return (
    <div className="py-2">
      <div className="d-flex">
        <div>
          <Avatar sx={{ width: 35, height: 35 }}>
            <PersonIcon fontSize="large" />
          </Avatar>
          {commentsListShown && (
            <div style={{ borderLeft: '1px solid lightgrey', marginLeft: 17, height: 25 }} />
          )}
        </div>
        <div className="ml-2">
          <div className="d-flex align-items-center mt-n2">
            <Typography variant="h6" fontWeight="bold">
              {userName}
            </Typography>
            <Typography className="ml-1">{timeStamp}</Typography>
            <div className="mt-n">
              <Authorization _id={[comment?.createdBy?._id]} returnNull>
                <>
                  <IconButton onClick={() => setEdit(true)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(comment._id, threadId)}>
                    <DeleteIcon />
                  </IconButton>
                </>
              </Authorization>
            </div>
          </div>
          <DisplayRichText value={comment?.body} />
        </div>
      </div>
      <div>
        <CommentLikeShare
          threadId={comment._id}
          parentIds={parentIds}
          showDivider={false}
          itemSlug={itemSlug}
          index={shareIndex}
          fieldTitle={fieldTitle}
          isReply
          onCommentsListToggle={(toggle) => setCommentsListShown(toggle)}
        />
      </div>
    </div>
  );
}
