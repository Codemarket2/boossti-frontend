import { useEffect, useState } from 'react';
import Loading from '../src/components/common/Loading';
import NotFound from '../src/components/common/NotFound';
import UserLayout from '../src/components/common/UserLayout';
import AccountAdmin from '../src/components/template/AccountAdmin';

export default function Admin() {
  const [loading, setLoading] = useState(true);
  const [subdomain, setSubdomain] = useState(null);

  useEffect(() => {
    const tempSubdomain = window?.location?.host?.split('.')[1]
      ? window?.location?.host?.split('.')[0]
      : false;
    if (!tempSubdomain || tempSubdomain === 'www') {
      setSubdomain(null);
    }
    setSubdomain(tempSubdomain || 'developer');
    setLoading(false);
  }, []);

  return (
    <UserLayout authRequired>
      {loading ? <Loading /> : subdomain ? <AccountAdmin subdomain={subdomain} /> : <NotFound />}
    </UserLayout>
  );
}
