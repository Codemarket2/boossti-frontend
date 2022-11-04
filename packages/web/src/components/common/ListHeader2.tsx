import { ReactNode } from 'react';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import AddCircle from '@mui/icons-material/AddCircle';
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
  hideBreadcrumbs?: boolean;
  addIconButton?: boolean;
}

export default function ListHeader2({
  search = '',
  onSearchChange,
  searchLoading,
  handleAddNew,
  addNewLoading,
  children,
  buttons,
  hideBreadcrumbs = false,
  addIconButton,
}: IProps): any {
  return (
    <div className="d-sm-flex justify-content-between align-items-center">
      {!hideBreadcrumbs && <Breadcrumbs>{children}</Breadcrumbs>}
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
        {handleAddNew &&
          (addIconButton ? (
            <Tooltip title="Create New Form">
              <IconButton color="primary" onClick={handleAddNew}>
                <AddCircle fontSize="large" />
              </IconButton>
            </Tooltip>
          ) : (
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
          ))}
        {buttons}
      </div>
    </div>
  );
}
