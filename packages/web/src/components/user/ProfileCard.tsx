import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';

const StyledAvatar = styled(Avatar)`
  min-width: 250px;
  min-height: 250px;
  margin: 0 auto;
  border: 2px solid ${(props) => props.theme.palette.primary.main};
`;

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
      <div className="text-center mb-2">
        {/* <Typography variant="h3">Profile</Typography> */}
        <StyledAvatar alt="Remy Sharp" src={user.picture} />
        <Typography variant="h4">{user.name}</Typography>
        {user.email && <Typography>{user.email}</Typography>}
      </div>
    </>
  );
}
