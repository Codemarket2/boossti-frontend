import React, { useEffect, forwardRef } from 'react';
import { Button, Card, Switch, Tooltip } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface Props {
  indeterminate?: boolean;
  name: string;
}

const useCombinedRefs = (...refs): React.MutableRefObject<any> => {
  const targetRef = React.useRef();

  React.useEffect(() => {
    refs.forEach((ref) => {
      if (!ref) return;

      if (typeof ref === 'function') {
        ref(targetRef.current);
      } else {
        const tempRef = ref;
        tempRef.current = targetRef.current;
      }
    });
  }, [refs]);

  return targetRef;
};

const IndeterminateCheckbox = forwardRef<HTMLInputElement, Props>(
  ({ indeterminate, ...rest }, ref: React.Ref<HTMLInputElement>) => {
    const defaultRef = React.useRef(null);
    const combinedRef = useCombinedRefs(ref, defaultRef);

    useEffect(() => {
      if (combinedRef?.current) {
        combinedRef.current.indeterminate = indeterminate ?? false;
      }
    }, [combinedRef, indeterminate]);

    return (
      <>
        <input type="checkbox" ref={combinedRef} {...rest} />
      </>
    );
  },
);

function shuffle(arr: any) {
  let nArr = arr;
  nArr = [...arr];
  const shuffled = [];
  while (nArr.length) {
    const rand = Math.floor(Math.random() * nArr.length);
    shuffled.push(nArr.splice(rand, 1)[0]);
  }
  return shuffled;
}

const EditTable = ({
  getToggleHideAllColumnsProps,
  allColumns,
  setColumnOrder,
  visibleColumns,
  resetResizing,
  editTable,
  setEditTable,
}) => {
  const randomizeColumns = () => {
    setColumnOrder(shuffle(visibleColumns.map((d) => d.id)));
  };

  const handleColumnResize = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditTable({ ...editTable, resizeColumn: event.target.checked });
  };

  const handleAllowFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditTable({ ...editTable, allowFilter: event.target.checked });
  };

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography variant="h6">Edit Table</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Card
          variant="outlined"
          sx={{
            display: 'flex',
            alignItems: 'center',
            height: '50px',
            justifyContent: 'space-evenly',
          }}
        >
          <div>
            <IndeterminateCheckbox {...getToggleHideAllColumnsProps()} /> Toggle All
          </div>
          {allColumns.map((column) => (
            <div key={column.id}>
              {/* <label> */}
              <input type="checkbox" {...column.getToggleHiddenProps()} /> {column.id}
              {/* </label> */}
            </div>
          ))}
          <br />
        </Card>
        <Button
          type="button"
          variant="outlined"
          disabled
          //  onClick={getExcel}
        >
          get Excel
        </Button>
        <Button type="button" variant="outlined" onClick={() => randomizeColumns()}>
          Reorder Columns
        </Button>
        <Tooltip title="Resize Column" placement="top">
          <Switch
            checked={editTable.resizeColumn}
            onChange={handleColumnResize}
            inputProps={{ 'aria-label': 'controlled' }}
          />
        </Tooltip>
        {editTable.resizeColumn && (
          <Button type="button" variant="outlined" onClick={resetResizing}>
            Reset Size
          </Button>
        )}
        <Tooltip title="Allow Filtering" placement="top">
          <Switch
            checked={editTable.allowFilter}
            onChange={handleAllowFilter}
            inputProps={{ 'aria-label': 'controlled' }}
          />
        </Tooltip>
      </AccordionDetails>
    </Accordion>
  );
};

export default EditTable;
