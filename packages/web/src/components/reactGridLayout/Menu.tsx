import Popover from '@mui/material/Popover';
import { useState } from 'react';

export default function Menu() {
  // const export default function Menu = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return <></>;
}
