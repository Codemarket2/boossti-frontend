import { useRouter } from 'next/router';
import DisplayFieldValue from '../../src/components/contentbox/DisplayFieldValue';

export default function Page() {
  const { query } = useRouter();
  if (query && query._id) {
    return <DisplayFieldValue _id={query._id} />;
  } else {
    return <p>Loading..</p>;
  }
}
