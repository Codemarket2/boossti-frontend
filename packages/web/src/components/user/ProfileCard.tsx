import { useSelector } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

export default function ProfileCard() {
  const attributes = useSelector(({ auth }: any) => auth.attributes);

  return (
    <>
      <div className="text-center mb-2">
        <Typography variant="h3">Profile</Typography>
        <Avatar
          style={{ minWidth: 250, minHeight: 250, margin: '0 auto' }}
          alt="Remy Sharp"
          src={attributes.picture}
        />
        <Typography>{attributes.name}</Typography>
        <Typography>{attributes.email}</Typography>
      </div>
    </>
  );
}
