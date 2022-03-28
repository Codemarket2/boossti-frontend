import Paper from '@material-ui/core/Paper';
// import FieldValues from '../field/FieldValues';

export default function About({ userId, authorized = false }) {
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
