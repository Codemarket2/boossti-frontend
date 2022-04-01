import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  minWidth: '250px',
  minHeight: '250px',
  margin: '0 auto',
  border: `2px solid ${theme.palette.primary.main}`,
}));

interface IProps {
  user: {
    picture: string;
    name: string;
    email?: string;
  };
}

export default function ProfileCard({ user }: IProps) {
  return (
    <>
      <div className="text-center mb-2 pt-2">
        <StyledAvatar alt="Remy Sharp" src={user.picture} />
        <Typography variant="h4">{user.name}</Typography>
        {user.email && <Typography>{user.email}</Typography>}
      </div>
    </>
  );
}
