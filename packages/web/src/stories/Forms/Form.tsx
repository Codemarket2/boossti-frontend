import {
  Backdrop,
  Snackbar,
  Typography,
  Breadcrumbs,
  CircularProgress,
  Tooltip,
  IconButton,
  FormControlLabel,
  Paper,
  Tabs,
} from '@mui/material';
import Link from 'next/link';
import React from 'react';
import { Alert, Switch } from 'react-native';
import { Grid, Tab } from 'semantic-ui-react';
import _id from '../../../pages/comment/[_id]';
import InlineInput from '../../components/common/InlineInput';
import Actions from '../../components/form2/Actions';
import BulkUploadAction from '../../components/form2/BulkUploadAction';
import FormFields from '../../components/form2/EditField';
import FormSetting from '../../components/form2/FormSetting';
import FormView from '../../components/form2/FormView';
import { QRButton } from '../../components/qrcode/QRButton';
import ResponseLayout from '../../components/response/ResponseLayout';
import ResponseList from '../../components/response/ResponseList';

const Form = () => {
  return <>Form page</>;
};

export default Form;
