import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

interface AppMenu {
  isInstance?: boolean;
  isAdmin?: boolean;
}

export default function AppMenu({ isInstance, isAdmin }: AppMenu) {
  const setting = useSelector((state: any) => state.setting);
  const router = useRouter();
  const { instanceCount } = router.query;
  return (
    <div>
      <Toolbar variant="dense" />
      <Divider />
      {isAdmin ? (
        <ListItem disablePadding>
          <Link href="/admin">
            <ListItemButton selected={router?.query?.slug === 'apps'}>
              <ListItemText primary="App Settings" />
            </ListItemButton>
          </Link>
        </ListItem>
      ) : (
        <List dense>
          {setting?.appMenuItems?.map((item, i) => (
            <ListItem key={i} disablePadding>
              <Link href={`${isInstance ? `/instance/${instanceCount}` : ''}/${item?.formSlug}`}>
                <ListItemButton selected={item?.formSlug === router?.query?.slug}>
                  <ListItemText primary={item?.label} />
                </ListItemButton>
              </Link>
            </ListItem>
          ))}
        </List>
      )}
    </div>
  );
}
