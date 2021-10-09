import React, { useState, useEffect } from 'react';
import ShareIcon from '@material-ui/icons/Share';
import { Tooltip } from '@material-ui/core/';

interface IShare {
  itemSlug?: string;
  index?: any;
  commentId?: string;
  fieldTitle?: string;
}
export default function Share({ itemSlug, index, commentId, fieldTitle }: IShare) {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const [isCopied, setIsCopied] = useState(false);

  const handleSlugItem = () => {
    if (itemSlug === undefined && index === undefined) {
      navigator.clipboard.writeText(window.location.href);
    }
    if (itemSlug !== undefined && !window.location.href.includes('#') && index === undefined) {
      navigator.clipboard.writeText(`${window.location.href}#${itemSlug}`);
    } else if (
      itemSlug !== undefined &&
      `${window.location.href}#${itemSlug}` &&
      index === undefined
    ) {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const handleIndexAndCommentId = () => {
    if (index !== undefined && !window.location.href.includes('#') && commentId === undefined) {
      navigator.clipboard.writeText(`${window.location.href}?index=${index + 1}#${itemSlug}`);
    }
    if (index !== undefined && !window.location.href.includes('#') && commentId !== undefined) {
      navigator.clipboard.writeText(
        `${window.location.href}?index=${
          index + 1
        }&commentId=${commentId}&field=${itemSlug}&fieldTitle=${fieldTitle}#${itemSlug}`,
      );
    }
  };

  //   navigator.clipboard.writeText(`${window.location.origin}${typeSlug}`);

  const handleCopyShareLink = () => {
    handleSlugItem();
    handleIndexAndCommentId();
    setIsCopied(true);
  };

  return (
    <React.Fragment>
      <Tooltip
        open={open}
        onClose={handleClose}
        onOpen={handleOpen}
        title={isCopied ? 'copied' : 'copy share link'}>
        <ShareIcon onClick={handleCopyShareLink} />
      </Tooltip>
    </React.Fragment>
  );
}
