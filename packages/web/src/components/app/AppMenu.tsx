import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

export default function AppMenu() {
  const setting = useSelector((state: any) => state.setting);
  const router = useRouter();
  return (
    <div>
      <Toolbar variant="dense" />
      <Divider />
      <List dense>
        <ListItem disablePadding>
          <Link href="/dashboard">
            <ListItemButton selected={!router?.query?.slug}>
              <ListItemText primary="App Settings" />
            </ListItemButton>
          </Link>
        </ListItem>
        {setting?.appMenuItems?.length > 0 ? (
          setting?.appMenuItems?.map((item, i) => (
            <ListItem key={i} disablePadding>
              <Link href={`/dashboard/${item?.formSlug}`}>
                <ListItemButton selected={item?.formSlug === router?.query?.slug}>
                  <ListItemText primary={item?.label} />
                </ListItemButton>
              </Link>
            </ListItem>
          ))
        ) : (
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText primary="Loading Menu..." />
            </ListItemButton>
          </ListItem>
        )}
      </List>
    </div>
  );
}
