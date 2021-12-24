import { useState } from 'react';
import Link from 'next/link';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import EditIcon from '@material-ui/icons/Edit';
import FormDrawer from './FormDrawer';
import { ShowValue } from './ResponseList';
import Authorization from '../common/Authorization';

interface IProps {
  form: any;
  response: any;
}

export default function Response({ form, response }: IProps) {
  const [openDrawer, setOpenDrawer] = useState(false);
  return (
    <Authorization _id={response?.createdBy?._id} allowAdmin>
      <div className="d-flex justify-content-between align-items-center">
        <Link href={`/forms/${form?._id}`}>
          <Tooltip title="Open form">
            <Typography
              variant="h4"
              style={{ cursor: 'pointer' }}
              className="d-flex align-items-center"
            >
              {form?.name}
              <OpenInNewIcon className="ml-2" />
            </Typography>
          </Tooltip>
        </Link>
        <div>
          <Tooltip onClick={() => setOpenDrawer(true)} title="Edit Form">
            <Button
              startIcon={<EditIcon />}
              className="mr-2"
              variant="contained"
              size="small"
              color="primary"
            >
              Edit
            </Button>
          </Tooltip>
          <FormDrawer
            form={form}
            response={response}
            open={openDrawer}
            onClose={() => {
              setOpenDrawer(false);
            }}
          />
        </div>
      </div>
      {form?.fields?.map((field) => {
        return (
          <div key={field?._id}>
            <Typography>
              <b>{field?.label}</b>
              {' - '}
              <ShowValue
                field={field}
                value={response?.values?.filter((v) => v.field === field._id)[0]}
              />
            </Typography>
          </div>
        );
      })}
    </Authorization>
  );
}
