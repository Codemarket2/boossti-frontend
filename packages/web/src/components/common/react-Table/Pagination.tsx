import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

const Pagination = ({
  gotoPage,
  canPreviousPage,
  previousPage,
  nextPage,
  pageCount,
  pageIndex,
  pageOptions,
  canNextPage,
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '50px',
      }}
    >
      <div>
        <Button
          type="button"
          variant="outlined"
          onClick={() => gotoPage(0)}
          disabled={!canPreviousPage}
        >
          {'<<'}
        </Button>{' '}
        <Button
          type="button"
          variant="outlined"
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
        >
          {'<'}
        </Button>{' '}
        <Button type="button" variant="outlined" onClick={() => nextPage()} disabled={!canNextPage}>
          {'>'}
        </Button>{' '}
        <Button
          type="button"
          variant="outlined"
          onClick={() => gotoPage(pageCount - 1)}
          disabled={!canNextPage}
        >
          {'>>'}
        </Button>{' '}
      </div>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        <Box
          sx={{
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            marginLeft: '10px',
          }}
        >
          <b>| Go to page: </b>
          <TextField
            id="standard-basic"
            variant="standard"
            type="number"
            defaultValue={pageIndex + 1}
            sx={{
              marginLeft: '10px',
              width: '100px',
            }}
            onChange={(e) => {
              const fpage = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(fpage);
            }}
          />
        </Box>{' '}
      </Box>
    </Box>
  );
};

export default Pagination;
