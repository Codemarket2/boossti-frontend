import { useFocusRef } from './useFocusRef';

interface CellExpanderFormatterProps {
  isCellSelected: boolean;
  expanded: boolean;
  onCellExpand: () => void;
}

export function CellExpanderFormatter({
  isCellSelected,
  expanded,
  onCellExpand,
}: CellExpanderFormatterProps) {
  const { ref, tabIndex } = useFocusRef<HTMLSpanElement>(isCellSelected);

  function handleKeyDown(e: React.KeyboardEvent<HTMLSpanElement>) {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      onCellExpand();
    }
  }

  return (
    <div style={{ float: 'inline-end', display: 'table', blockSize: '100%' }}>
      <span
        style={{
          display: 'table-cell',
          verticalAlign: 'middle',
          cursor: 'pointer',
        }}
        onClick={onCellExpand}
        onKeyDown={handleKeyDown}
      >
        <span ref={ref} tabIndex={tabIndex}>
          {expanded ? '\u25BC' : '\u25B6'}
        </span>
      </span>
    </div>
  );
}
