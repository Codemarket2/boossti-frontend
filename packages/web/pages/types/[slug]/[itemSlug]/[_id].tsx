import { useRouter } from 'next/router';
import { useEffect } from 'react';
import FieldContentBox from '../../../../src/components/contentbox/FieldContentBox';
import InitialLoading from '../../../../src/components/common/InitialLoading';

export default function Page() {
  const { query } = useRouter();
  useEffect(() => {
    document
      .getElementsByTagName('head')[0]
      .insertAdjacentHTML(
        'beforeend',
        `<link href="/contentbox/contentbox.css" rel="stylesheet" type="text/css" />`,
      );
  }, []);

  if (query && query._id) {
    return <FieldContentBox _id={query._id} />;
  }
  return <InitialLoading />;
}
