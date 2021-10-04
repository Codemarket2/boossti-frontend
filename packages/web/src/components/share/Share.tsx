import React, { useState, useEffect } from 'react';
import ShareIcon from '@material-ui/icons/Share';
import { Tooltip } from '@material-ui/core/';

interface IShare {
  itemSlug?: string;
  typeSlug?: string;
}
export default function Share({ itemSlug, typeSlug }: IShare) {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const [isCopied, setIsCopied] = useState(false);

  const handleSlugItem = () => {
    if (itemSlug === undefined && typeSlug === undefined) {
      navigator.clipboard.writeText(window.location.href);
    }
    if (itemSlug !== undefined && !window.location.href.includes('#') && typeSlug === undefined) {
      navigator.clipboard.writeText(`${window.location.href}#${itemSlug}`);
    } else if (
      itemSlug !== undefined &&
      `${window.location.href}#${itemSlug}` &&
      typeSlug === undefined
    ) {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const handleSlugType = () => {
    if (typeSlug !== undefined) {
      navigator.clipboard.writeText(`${window.location.origin}${typeSlug}`);
    }
  };

  const handleCopyShareLink = () => {
    handleSlugItem();
    handleSlugType();
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
