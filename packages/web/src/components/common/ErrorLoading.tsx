import InitialLoading from './InitialLoading';
import ShowError from './ShowError';

export default function ErrorLoading({ error, loading = true, children }: any) {
  if (error) {
    return <ShowError error={error} />;
  }
  return children ? children : <InitialLoading />;
}
