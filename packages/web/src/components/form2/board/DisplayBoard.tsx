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
    <div data-testid="displayBoard-output">
      <Button
        data-testid="displayBoard-output-button"
        size="small"
        onClick={() => setShowOverlay(true)}
      >
        Show Board
      </Button>
      {showOverlay && (
        <Overlay open={showOverlay} onClose={() => setShowOverlay(false)}>
          <div data-testid="board">
            <Board board={board} />
          </div>
        </Overlay>
      )}
    </div>
  );
}
