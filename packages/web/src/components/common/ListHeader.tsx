import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import { ReactNode } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { QRButton } from '../qrcode/QRButton';
const QRCode = require('qrcode.react');

interface IProps {
  showSearch: boolean;
  onShow: () => void;
  onHide: () => void;
  onChange: (value: string) => void;
  search: string;
  children?: ReactNode;
  button?: ReactNode;
  buttonClass?: string;
  loading?: boolean;
  alwaysHideSearch?: boolean;
}

export default function ListHeader({
  showSearch,
  onShow,
  onHide,
  onChange,
  search,
  children,
  button,
  buttonClass = 'justify-content-end',
  loading = false,
  alwaysHideSearch = false,
}: IProps) {
  return (
    <Paper
      className="px-2 d-flex flex-row-reverse justify-content-between align-items-center"
      variant="outlined"
      style={{ minHeight: 60 }}
    >
      <div className={`d-flex align-items-center w-100 ${buttonClass}`}>
        <TextField
          size="small"
          variant="outlined"
          label="Search"
          InputProps={{
            endAdornment:
              loading && search ? <CircularProgress color="inherit" size={20} /> : <SearchIcon />,
          }}
          value={search}
          onChange={({ target: { value } }) => onChange(value)}
        />
        {button}
      </div>
      {children}
    </Paper>
  );
}
