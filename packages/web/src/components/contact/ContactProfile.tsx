import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import { useGetContact, useDeleteContact } from '@frontend/shared/hooks/contact';
import Loading from '../common/Loading';
import ErrorLoading from '../common/ErrorLoading';
import CRUDMenu from '../common/CRUDMenu';
import BackdropComponent from '../common/Backdrop';

interface IProps {
  _id: string;
}
export default function ContactProfile({ _id }: IProps) {
  const { data, error, loading } = useGetContact(_id);
  const { handleDelete, loading: deleteLoading } = useDeleteContact(_id);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    // console.log('edit');
  };

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <ErrorLoading error={error} />;
  }
  return (
    <Card style={{ padding: 10, marginTop: 10 }}>
      <CardHeader
        action={
          <>
            <IconButton aria-label="settings" onClick={handleClick} size="large">
              <MoreVertIcon />
            </IconButton>
            <CRUDMenu
              onClose={handleClose}
              show={anchorEl}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          </>
        }
        title={`${data?.getContact?.firstName} ${
          data?.getContact?.lastName ? data?.getContact?.lastName : ' '
        }`}
        // subheader="September 14, 2016"
      />
      <CardContent>
        <Grid container>
          <Grid item md={3} lg={3} xs={6}>
            <Typography style={{ marginBottom: 10, fontWeight: 'bold' }}>Title</Typography>
            <Typography>{data?.getContact?.title ? data?.getContact?.title : '-'}</Typography>
          </Grid>
          <Grid item md={3} lg={3} xs={6}>
            <Typography style={{ marginBottom: 10, fontWeight: 'bold' }}>Business Name</Typography>
            <Typography style={{ marginBottom: 10 }}>
              {data?.getContact?.businessName ? data?.getContact?.businessName : '-'}
            </Typography>
          </Grid>
          <Grid item md={3} lg={3} xs={6}>
            <Typography style={{ marginBottom: 10, fontWeight: 'bold' }}>Email</Typography>
            <Typography style={{ marginBottom: 10 }}>
              {data?.getContact?.email ? data?.getContact?.email : '-'}
            </Typography>
          </Grid>
          <Grid item md={3} lg={3} xs={6}>
            <Typography style={{ marginBottom: 10, fontWeight: 'bold' }}>Phone</Typography>
            <Typography style={{ marginBottom: 10 }}>
              {data?.getContact?.phone ? data?.getContact?.phone : '-'}
            </Typography>
          </Grid>
          {data?.getContact?.extraField.map((field) => (
            <Grid item md={3} lg={3} key={field._id} xs={6}>
              <Typography style={{ marginBottom: 10, fontWeight: 'bold' }}>
                {field.fieldName}
              </Typography>
              <Typography style={{ marginBottom: 10 }}>{field.fieldValue}</Typography>
            </Grid>
          ))}
        </Grid>
      </CardContent>
      <BackdropComponent open={deleteLoading} />
    </Card>
  );
}
