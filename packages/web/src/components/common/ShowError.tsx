import Alert from '@material-ui/lab/Alert';

interface IProps {
  error: Error;
}

export default function ShowError({ error }: IProps): any {
  return <Alert severity="error">{error.message}</Alert>;
}
