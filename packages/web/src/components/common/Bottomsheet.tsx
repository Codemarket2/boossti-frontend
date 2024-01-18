import Drawer from '@mui/material/Drawer';
import Hidden from '@mui/material/Hidden';
import { ReactNode } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateSettingAction } from '@frontend/shared/redux/actions/setting';

export default function Bottomsheet({ children }: { children: ReactNode }) {
  const { setting, auth } = useSelector((state: any) => state);
  const dispatch = useDispatch();
  const handleHideBottomSheet = () => {
    dispatch(updateSettingAction({ bottomDrawer: false }));
  };
  return (
    <Hidden smUp>
      <Drawer anchor="bottom" open={setting.bottomDrawer} onClose={handleHideBottomSheet}>
        {children}
      </Drawer>
    </Hidden>
  );
}
