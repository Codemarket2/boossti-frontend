import Paper from '@mui/material/Paper';
// import FieldValues from '../field/FieldValues';

export default function About({ userId, authorized }: { userId: any; authorized?: boolean }) {
  return (
    <Paper variant="outlined" className="p-2">
      About
      {/* <FieldValues
        template="6119695c580ba8000904f06b"
        parentId={userId}
        authorized={authorized}
        layouts={{}}
      /> */}
    </Paper>
  );
}
