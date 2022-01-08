import { useState } from 'react';
import Link from 'next/link';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import ListItemText from '@material-ui/core/ListItemText';
import moment from 'moment';
import Paper from '@material-ui/core/Paper';
import EditResponseDrawer from './EditResponseDrawer';
import { ShowValue } from '../list/ListItemsFieldsValue';
import Breadcrumbs from '../common/Breadcrumbs';
import Authorization from '../common/Authorization';
import CommentLikeShare from '../common/commentLikeShare/CommentLikeShare';

interface IProps {
  form: any;
  response: any;
}

export default function Response({ form, response }: IProps) {
  const [openDrawer, setOpenDrawer] = useState(false);
  return (
    <Authorization _id={[response?.createdBy?._id, form?.createdBy?._id]} allowAdmin>
      <div className="d-flex justify-content-between align-items-center">
        <Breadcrumbs>
          <Link href="/forms">Forms</Link>
          <Link href={`/forms/${form?._id}`}>{form?.name}</Link>
          <Typography>Response</Typography>
        </Breadcrumbs>
        <div>
          <Button
            onClick={() => setOpenDrawer(true)}
            startIcon={<EditIcon />}
            variant="contained"
            size="small"
            color="primary"
          >
            Edit
          </Button>
          {openDrawer && (
            <EditResponseDrawer
              form={form}
              response={response}
              open={openDrawer}
              onClose={() => {
                setOpenDrawer(false);
              }}
            />
          )}
        </div>
      </div>
      <Paper variant="outlined">
        <div className="p-2">
          <ListItemText
            primary={`Response submitted by ${
              response?.createdBy ? response?.createdBy?.name : 'Unauthorised user'
            }`}
            secondary={`${moment(response?.createdAt).format('l')} ${moment(
              response?.createdAt,
            ).format('LT')}`}
          />
          {form?.fields?.map((field, index) => {
            return (
              <div key={field?._id}>
                <Typography>
                  {index + 1}) {field?.label}
                </Typography>
                {response?.values
                  ?.filter((v) => v.field === field._id)
                  .map((value) => (
                    <div key={value?._id}>
                      <ShowValue field={field} value={value} />
                      <CommentLikeShare parentId={value?._id} />
                    </div>
                  ))}
              </div>
            );
          })}
        </div>
      </Paper>
    </Authorization>
  );
}
