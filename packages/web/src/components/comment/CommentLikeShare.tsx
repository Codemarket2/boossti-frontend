import { useEffect, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import CommentIcon from '@mui/icons-material/ModeComment';
import ShareIcon from '@mui/icons-material/Share';
import Divider from '@mui/material/Divider';
import { useGetActionCounts , useGetComments } from '@frontend/shared/hooks/comment/getComment';
import Tooltip from '@mui/material/Tooltip';
import { useRouter } from 'next/router';
import { useCreateComment } from '@frontend/shared/hooks/comment/createComment';
import ErrorLoading from '../common/ErrorLoading';
import Like from '../like/Like';
import CommentsList from './CommentsList';
import CommentInput from './CommentInput';

import BasicModal from '../common/BasicModal';

interface CommentLikeShareProps {
  threadId: string;
  parentIds?: string[];
  showDivider?: boolean;
  children?: React.ReactNode;
  index?: any;
  itemSlug?: string;
  fieldTitle?: string;
  showHideComments?: boolean;
  isReply?: boolean;
  onCommentsListToggle?: (toggle: boolean) => void;
}

const spacingStyles = {
  borderLeft: '1px solid lightgrey',
  marginLeft: 17,
  paddingLeft: 26,
};

const modalStyle = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  border: '2px solid #fff',
  backgroundColor: '#fff',
  p: 4,
};

export default function CommentLikeShare({
  threadId,
  parentIds = [],
  showDivider = true,
  children,
  index,
  itemSlug,
  fieldTitle,
  showHideComments,
  isReply,
  onCommentsListToggle,
}: CommentLikeShareProps) {
  const router = useRouter();
  const { data, error } = useGetActionCounts(threadId);

  const [copy, setCopy] = useState(false);
  const copyLink = () => {
    setCopy(true);
    setTimeout(() => setCopy(false), 2000);
    let link = `${window.location.origin}${window.location.pathname}`;
    if (isReply) {
      const query: any = { ...router.query, commentId: threadId };
      delete query.slug;
      delete query.count;
      let queryString = '';
      Object.keys(query).forEach((key) => {
        const queryValue = query[key];
        if (Array.isArray(queryValue)) {
          queryValue.forEach((q) => {
            if (queryValue) {
              queryString += '&';
            }
            queryString += `${key}=${q}`;
          });
        } else {
          if (queryValue) {
            queryString += '&';
          }
          queryString += `${key}=${queryValue}`;
        }
      });
      if (queryString) link += `?${queryString}`;
    }
    navigator.clipboard.writeText(link);
    // router.push(router);
  };
  const [showComment, setShowComment] = useState(false);
  const [showInlineCommentInput, setShowInlineCommentInput] = useState(false);
  const [commentCount, setCommentCount] = useState(data?.getActionCounts?.commentCount ?? 0);

  const handleToggleCommentsList = () => {
    if (commentCount === 0) {
      setShowInlineCommentInput(true);
      return;
    }

    if (isReply) {
      let oldChildThreads = [];
      if (router.query.childThreadId) {
        oldChildThreads = Array.isArray(router.query.childThreadId)
          ? router.query.childThreadId
          : [router.query.childThreadId];
      }
      if (showComment) {
        oldChildThreads = oldChildThreads.filter((ct) => ct !== threadId);
        if (oldChildThreads?.length > 0) {
          router.query.childThreadId = oldChildThreads;
        } else {
          delete router.query.childThreadId;
        }
      } else {
        router.query.childThreadId = [...oldChildThreads, threadId];
      }
    } else if (!isReply) {
      if (showComment) {
        delete router.query.threadId;
        delete router.query.childThreadId;
        delete router.query.commentId;
      } else {
        router.query.threadId = threadId;
      }
    }
    router.push(router);
  };

  useEffect(() => {
    if (isReply) {
      let isChildThreadIdPresent = false;
      let oldChildThreadIds = [];
      if (router.query.childThreadId) {
        oldChildThreadIds = Array.isArray(router.query.childThreadId)
          ? router.query.childThreadId
          : [router.query.childThreadId];
        isChildThreadIdPresent = oldChildThreadIds?.some((ct) => ct === threadId);
      }

      if (isChildThreadIdPresent && !showComment) {
        setShowComment(true);
        if (onCommentsListToggle) {
          onCommentsListToggle(true);
        }
      } else if (!isChildThreadIdPresent && showComment) {
        setShowComment(false);
        if (onCommentsListToggle) {
          onCommentsListToggle(false);
        }
      }
    } else if (!isReply) {
      if (router.query.threadId === threadId && !showComment) {
        setShowComment(true);
        if (onCommentsListToggle) {
          onCommentsListToggle(true);
        }
      } else if (router.query.threadId !== threadId && showComment) {
        setShowComment(false);
        if (onCommentsListToggle) {
          onCommentsListToggle(false);
        }
      }
    }
  }, [router.query]);

  const CommentsListComponent = (
    <div style={isReply && spacingStyles}>
      <CommentsList
        threadId={threadId}
        parentIds={parentIds?.length > 0 ? [...parentIds, threadId] : [threadId]}
        itemSlug={itemSlug}
        shareIndex={index}
        fieldTitle={fieldTitle}
      />
    </div>
  );

  let commentIds = [];
  if (router?.query?.childThreadId) {
    commentIds = Array.isArray(router?.query?.childThreadId)
      ? router?.query?.childThreadId
      : [router?.query?.childThreadId];
  }
  if (router?.query?.commentId) {
    commentIds = [...commentIds, router?.query?.commentId];
  }

  const { refetch } = useGetComments(threadId, commentIds);

  const { handleSave, inputVal, setInputVal, loading: submitLoading } = useCreateComment({
    parentIds,
    threadId,
    refetch,
    path: router.asPath,
  });

  const handleChange = (e) => {
    setInputVal(e);
  };

  return (
    <div className="mt-n2">
      {error && <ErrorLoading error={error} />}
      <div
        className="d-flex align-items-center"
        style={
          isReply && {
            ...spacingStyles,
            borderLeft: showComment ? '1px solid lightgrey' : 'none',
          }
        }
      >
        <Like
          threadId={threadId}
          likedByUser={data?.getActionCounts?.likedByUser || false}
          likeCount={data?.getActionCounts?.likeCount}
        />
        <div>
          <Tooltip title={`${showComment ? 'Hide' : 'Show'} Comment`}>
            <IconButton onClick={handleToggleCommentsList}>
              <CommentIcon />
            </IconButton>
          </Tooltip>
          {commentCount > 0 && (
            <Tooltip title={`${commentCount} Comments`}>
              <span className="mr-2">{commentCount}</span>
            </Tooltip>
          )}
          <Tooltip title={copy ? 'link copied' : 'share link'} onClick={copyLink}>
            <IconButton>
              <ShareIcon />
            </IconButton>
          </Tooltip>
          {children}
        </div>
      </div>
      {isReply ? (
        (showHideComments || showComment) && (
          <>
            {showDivider && <Divider />}
            {CommentsListComponent}
          </>
        )
      ) : showInlineCommentInput ? (
        <>
          <CommentInput
            label="Add Comment"
            handleChange={handleChange} // what is this
            inputVal={inputVal}
            onClick={() => {
              handleSave();
              setShowInlineCommentInput(false);
              setCommentCount(commentCount + 1);
            }}
            loading={submitLoading}
            onCancel={() => {
              setShowInlineCommentInput(false);
              setInputVal('');
            }}
          />
        </>
      ) : (
        <BasicModal
          open={showComment}
          onClose={() => handleToggleCommentsList()}
          title="Comments"
          style={modalStyle}
        >
          <div className="p-2"> {CommentsListComponent}</div>
        </BasicModal>
      )}
    </div>
  );
}

// <Overlay open={showComment} onClose={() => handleToggleCommentsList()} title="Comments">
//         <div className="p-2">{CommentsListComponent}</div>
//       </Overlay>
