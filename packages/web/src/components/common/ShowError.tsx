import Alert from '@mui/material/Alert';

interface IProps {
  error: Error;
}

export default function ShowError({ error }: IProps): any {
  return <Alert severity="error">{error.message}</Alert>;
}
