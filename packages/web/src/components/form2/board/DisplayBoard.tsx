import Button from '@mui/material/Button';
import React, { useState } from 'react';
import Overlay from '../../common/Overlay';
import Board from './Board';

export default function DisplayBoard({
  board,
  verticalView,
}: {
  board: any;
  verticalView?: boolean;
}) {
  const [showOverlay, setShowOverlay] = useState(false);
  if (verticalView) {
    return <Board board={board} />;
  }
  return (
    <div>
      <Button size="small" onClick={() => setShowOverlay(true)}>
        Show Board
      </Button>
      {showOverlay && (
        <Overlay open={showOverlay} onClose={() => setShowOverlay(false)}>
          <Board board={board} />
        </Overlay>
      )}
    </div>
  );
}
