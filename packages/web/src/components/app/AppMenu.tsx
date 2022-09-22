import { getFormBySlug } from '@frontend/shared/hooks/form';
import { getResponses } from '@frontend/shared/hooks/response/getResponse';
import { systemForms } from '@frontend/shared/utils/systemForms';
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
        {setting?.appMenuItems?.map((item, i) => (
          <ListItem key={i} disablePadding>
            <Link href={`/${item?.formSlug}`}>
              <ListItemButton selected={item?.formSlug === router?.query?.slug}>
                <ListItemText primary={item?.label} />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
    </div>
  );
}
