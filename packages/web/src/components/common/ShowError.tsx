import Alert from '@material-ui/lab/Alert';

export default function ShowError({ error }: any) {
  return <Alert severity="error">{error.message}</Alert>;
}
