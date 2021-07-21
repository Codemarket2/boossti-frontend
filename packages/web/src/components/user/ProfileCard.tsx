import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

interface IProps {
  attributes: {
    picture: string;
    name: string;
    email?: string;
  };
}

export default function ProfileCard({ attributes }: IProps) {
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
        {attributes.email && <Typography>{attributes.email}</Typography>}
      </div>
    </>
  );
}
