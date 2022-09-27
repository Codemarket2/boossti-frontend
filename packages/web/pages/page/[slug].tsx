import React from 'react';
import { useRouter } from 'next/router';

const Slug = () => {
  const router = useRouter();
  const { slug } = router.query;
  // search for appid in slug

  return <div> {slug}</div>;
};

export default Slug;
