import { ReactNode } from 'react';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import LoadingButton from './LoadingButton';
import Breadcrumbs from './Breadcrumbs';

interface IProps {
  search: string;
  children: ReactNode;
  onSearchChange: (newSearch: string) => void;
  searchLoading?: boolean;
  handleAddNew?: () => void;
  addNewLoading?: boolean;
  buttons?: ReactNode;
}

export default function ListHeader2({
  search = '',
  onSearchChange,
  searchLoading,
  handleAddNew,
  addNewLoading,
  children,
  buttons,
}: IProps): any {
  return (
    <div className="d-sm-flex justify-content-between align-items-center">
      <Breadcrumbs>{children}</Breadcrumbs>
      <div className="d-flex justify-content-between align-items-center my-1">
        <TextField
          size="small"
          variant="outlined"
          label="Search"
          InputProps={{
            endAdornment:
              searchLoading && search ? (
                <CircularProgress color="inherit" size={20} />
              ) : (
                <SearchIcon />
              ),
          }}
          value={search}
          onChange={({ target: { value } }) => onSearchChange(value)}
        />
        {handleAddNew && (
          <LoadingButton
            loading={addNewLoading}
            startIcon={<AddIcon />}
            variant="contained"
            size="small"
            color="primary"
            className="ml-2"
            onClick={handleAddNew}
          >
            Add New
          </LoadingButton>
        )}
        {buttons}
      </div>
    </div>
  );
}
