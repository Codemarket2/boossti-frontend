import { useAuthorization } from '@frontend/shared/hooks/auth';
import { useDeleteResponse, useGetResponseByCount } from '@frontend/shared/hooks/response';
import { Share } from '@mui/icons-material';
import { Grid, Paper } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import slugify from 'slugify';
import Breadcrumbs from '../common/Breadcrumbs';
import DeleteButton from '../common/DeleteButton';
import ErrorLoading from '../common/ErrorLoading';
import { FormPageById } from '../form2/FormPage';
import { QRButton } from '../qrcode/QRButton';
import { ResponseChild2 } from '../response/Response';
import TemplateWidgets from './TemplateWidgets';
import { onAlert } from '../../utils/alert';
import BackdropComponent from '../common/Backdrop';

interface IProps {
  template: any;
  instanceCount: number;
  hideBreadcrumbs?: boolean;
}

export default function TemplateInstanceView({ template, instanceCount, hideBreadcrumbs }: IProps) {
  const router = useRouter();
  const defaultWidget = template?.fields?.find((widget) => widget?.options?.default);
  const defaultWidgetFormId = defaultWidget?.form?._id;
  const { data, error } = useGetResponseByCount(defaultWidgetFormId, instanceCount);
  const [selectedWidget, setSelectedWidget] = useState(defaultWidget || null);
  const authorized = useAuthorization([data?.getResponseByCount?.createdBy?._id], true);
  const { handleDelete, deleteLoading } = useDeleteResponse({ onAlert });

  useEffect(() => {
    if (router?.asPath) {
      let widget = null;
      if (router?.asPath?.includes('#')) {
        const labelSlug = router?.asPath?.split('#').pop();
        widget = template?.fields?.find(
          (f) => slugify(f?.label, { lower: true }) === slugify(labelSlug, { lower: true }),
        );
      }
      setSelectedWidget(widget);
    }
  }, [router?.asPath]);

  if (error || !data) {
    return <ErrorLoading error={error} />;
  }

  let customSettings = {};
  if (selectedWidget?.options?.settings?.active) {
    customSettings = { ...selectedWidget?.options?.settings };
  }

  return (
    <div>
      {deleteLoading && <BackdropComponent open={deleteLoading} />}
      {!hideBreadcrumbs && (
        <div className="d-sm-flex justify-content-between align-content-center align-items-center">
          <Breadcrumbs>
            <Link href={`/${template.slug}`}>
              <a>{template.title}</a>
            </Link>
            <Typography color="textPrimary" align="center">
              {instanceCount}
            </Typography>
          </Breadcrumbs>
          <div className="d-flex align-items-center">
            {authorized && (
              <>
                <DeleteButton
                  onClick={() =>
                    handleDelete(data?.getResponseByCount?._id, () =>
                      router.push(`/${template?.slug}`),
                    )
                  }
                />
              </>
            )}
            <QRButton />
            <Tooltip title="share">
              <IconButton onClick={() => navigator.clipboard.writeText(window?.location?.href)}>
                <Share />
              </IconButton>
            </Tooltip>
          </div>
        </div>
      )}
      <Grid container spacing={1}>
        <Grid item sm={2}>
          <TemplateWidgets template={template} previewMode />
        </Grid>
        <Grid item sm={10}>
          <Paper variant="outlined" className="p-2">
            {!selectedWidget || selectedWidget?._id === defaultWidget?._id ? (
              <ResponseChild2
                formId={defaultWidgetFormId}
                response={data?.getResponseByCount}
                hideBreadcrumbs
              />
            ) : (
              <div>
                {selectedWidget?.fieldType === 'form' ? (
                  <FormPageById
                    _id={selectedWidget?.form?._id}
                    templateId={template?._id}
                    settings={{
                      ...customSettings,
                      widgetType: 'both',
                      formView: 'button',
                      onlyMyResponses: true,
                    }}
                  />
                ) : (
                  <Typography>Template</Typography>
                )}
              </div>
            )}
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
