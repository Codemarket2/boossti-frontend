import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { useSelector } from 'react-redux';

import DarkModeToggle from './DarkModeToggle';
import AdminDrawerList from '../admin/AdminDrawerList';

interface IProps {
  openDrawer: boolean;
  setOpenDrawer: (arg: boolean) => void;
  darkMode: boolean;
  admin: boolean;
}

export default function DrawerContent({ openDrawer, setOpenDrawer, darkMode, admin }: IProps) {
  const { setting } = useSelector((state: any) => state);

  return (
    <Drawer anchor="left" open={openDrawer} onClose={() => setOpenDrawer(false)}>
      <div
        style={{ maxWidth: '300px' }}
        className="d-flex justify-content-between  align-items-center align-content-center"
      >
        <img
          style={{ width: '60%' }}
          src={setting?.metaTags?.image}
          alt={setting?.metaTags?.title}
        />
        <IconButton onClick={() => setOpenDrawer(false)}>
          <CloseIcon />
        </IconButton>
      </div>
      <Divider />
      <List style={{ minWidth: 300 }}>
        <DarkModeToggle darkMode={darkMode} />
        <Divider />
        {admin && <AdminDrawerList />}
      </List>
    </Drawer>
  );
}
