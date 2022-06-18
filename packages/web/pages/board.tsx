import React, { useEffect, useState } from 'react';
import Board from '../src/components/form2/Board';

export default function board() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);

  return <div>{!loading && <Board />}</div>;
}
