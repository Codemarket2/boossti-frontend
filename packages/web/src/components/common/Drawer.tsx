import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import DarkModeToggle from './DarkModeToggle';
import AdminDrawerList from '../admin/AdminDrawerList';

interface IProps {
  openDrawer: boolean;
  setOpenDrawer: (arg: boolean) => void;
  darkMode: boolean;
  admin: boolean;
}
{
  /* <img
src="https://res.cloudinary.com/dzo2ufh6a/image/upload/v1633438866/vijaa-logo_r5xsxm.jpg"
style={{ height: 40, width: 100 }}
/> */
}

export default function DrawerContent({ openDrawer, setOpenDrawer, darkMode, admin }: IProps) {
  return (
    <Drawer anchor="left" open={openDrawer} onClose={() => setOpenDrawer(false)}>
      <div
        style={{ maxWidth: '300px' }}
        className="d-flex justify-content-between  align-items-center align-content-center">
        <img
          style={{ width: '60%' }}
          // src={require('../../assets/images/vijaalogo-rec.jpeg')}
          src={'https://res.cloudinary.com/dzo2ufh6a/image/upload/v1633450543/menu-logo_hwyxba.png'}
          alt="vijaa logo"
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
