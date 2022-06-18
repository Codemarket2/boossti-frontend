import React, { useEffect, useState } from 'react';
import Board from '../src/components/form2/board/Board';
import { defaultBoard } from '../src/components/form2/board/defaultBoard';

export default function BoardPage() {
  const [loading, setLoading] = useState(true);
  const [board, setBoard] = useState(defaultBoard);

  useEffect(() => {
    setLoading(false);
  }, []);

  return <div>{!loading && <Board editMode board={board} onBoardChange={setBoard} />}</div>;
}
