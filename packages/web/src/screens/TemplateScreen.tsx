import {
  useGetTemplateBySlug,
  useDeleteTemplate,
  useCRUDTemplates,
  usePublishTemplate,
} from '@frontend/shared/hooks/template';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import StarIcon from '@mui/icons-material/Star';
import Share from '@mui/icons-material/Share';
import { useAuthorization } from '@frontend/shared/hooks/auth';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Link from 'next/link';
import Breadcrumbs from '../components/common/Breadcrumbs';
import ErrorLoading from '../components/common/ErrorLoading';
// import Pages from '../components/template/Pages';
import NotFound from '../components/common/NotFound';
import Backdrop from '../components/common/Backdrop';
import { onAlert } from '../utils/alert';
import InlineForm from '../components/template/InlineForm';
// import SeoOverlay from '../components/template/SeoOverlay';
import { QRButton } from '../components/qrcode/QRButton';
import TemplateWidgets from '../components/template/TemplateWidgets';
// import EditMode from '../components/common/EditMode';
import DeleteButton from '../components/common/DeleteButton';
import TemplateInstances from '../components/template/TemplateInstances';
import TemplatePreview from '../components/template/TemplatePreview';
import ShopifyProvider from '../components/shopify/ShopifyProvider';

export default function TemplateScreenWrapper({
  slug,
  preview,
}: {
  slug: string;
  preview?: boolean;
}) {
  const { data, error } = useGetTemplateBySlug({ slug });
  const authorized = useAuthorization([data?.getTemplateBySlug?.createdBy?._id], true);

  if (error || !data) {
    return <ErrorLoading error={error} />;
  }

  if (!data?.getTemplateBySlug) {
    return <NotFound />;
  }

  const host = new URL(window?.location?.href).searchParams.get('host');
  const shop = new URL(window?.location?.href).searchParams.get('shop');
  if (slug === process.env.NEXT_PUBLIC_SHOPIFY_PRODUCT_FAVORITE_TEMPLATE && (host || shop)) {
    const defaultWidget = data?.getTemplateBySlug?.fields?.find((field) => field?.options?.default);
    const apiKey = defaultWidget?.options?.settings?.shopify?.credentials?.apiKey;
    return (
      <>
        <ShopifyProvider apiKey={apiKey} template={data?.getTemplateBySlug}>
          <TemplateScreen data={data} slug={slug} preview={preview} authorized={authorized} />
        </ShopifyProvider>
      </>
    );
  }

  if (!authorized && !data?.getTemplateBySlug?.active) {
    return <NotFound />;
  }

  return (
    <>
      <TemplateScreen data={data} slug={slug} preview={preview} authorized={authorized} />
    </>
  );
}

interface IProps {
  slug: string;
  preview?: boolean;
  data: any;
  authorized: boolean;
}

const initialState = {
  fieldName: '',
  showMenu: false,
  showSeoOverlay: false,
  selectedIndex: 0,
};

function TemplateScreen({ slug, preview, data, authorized }: IProps) {
  const router = useRouter();

  const [state, setState] = useState(initialState);

  const { handlePublish } = usePublishTemplate({ onAlert });

  const deleteCallBack = () => {
    router.push(`/templates`);
  };

  const updateCallBack = (newSlug) => {
    setState({ ...state, fieldName: '' });
    if (newSlug !== slug) {
      router.push(`/${newSlug}`);
    }
  };

  const { handleDelete, deleteLoading } = useDeleteTemplate({ onAlert });

  const {
    state: crudState,
    setState: setCrudState,
    formik,
    CRUDLoading,
    setFormValues,
  } = useCRUDTemplates({
    onAlert,
    updateCallBack,
  });

  const onCancel = () => {
    setState({ ...state, fieldName: '' });
  };

  return (
    <div>
      <div className="d-sm-flex justify-content-between align-items-center">
        <Breadcrumbs>
          <Typography color="textPrimary">
            {data.getTemplateBySlug.title.includes('-n-e-w')
              ? 'Title'
              : data.getTemplateBySlug.title}
          </Typography>
        </Breadcrumbs>
        <div className="d-flex align-items-center">
          {/* {authorized && <EditMode />} */}
          <Link href={preview ? `/${slug}` : `/${slug}/preview`}>
            <Tooltip title="Preview template">
              <IconButton>{preview ? <VisibilityOffIcon /> : <VisibilityIcon />}</IconButton>
            </Tooltip>
          </Link>
          <QRButton />
          <Tooltip title="Copy page link">
            <IconButton
              onClick={() => navigator.clipboard.writeText(window?.location?.href)}
              size="large"
            >
              <Share />
            </IconButton>
          </Tooltip>
          {data.getTemplateBySlug?.active && (
            <Tooltip
              title={data.getTemplateBySlug?.showInMenu ? 'Remove from menu' : 'Add to menu'}
            >
              <IconButton
                onClick={() =>
                  handlePublish({
                    _id: data.getTemplateBySlug?._id,
                    slug,
                    active: data.getTemplateBySlug?.active,
                    showInMenu: !data.getTemplateBySlug?.showInMenu,
                  })
                }
                size="large"
              >
                {data.getTemplateBySlug?.showInMenu ? (
                  <StarIcon color="primary" />
                ) : (
                  <StarOutlineIcon />
                )}
              </IconButton>
            </Tooltip>
          )}
          {authorized && (
            <>
              <FormControlLabel
                className="m-0"
                control={
                  <Switch
                    color="primary"
                    checked={data.getTemplateBySlug?.active}
                    onChange={() =>
                      handlePublish({
                        _id: data.getTemplateBySlug?._id,
                        slug,
                        active: !data.getTemplateBySlug?.active,
                        showInMenu: data.getTemplateBySlug?.showInMenu,
                      })
                    }
                  />
                }
                label="Publish"
              />
              <DeleteButton
                tooltip="Delete template"
                onClick={() => handleDelete(data.getTemplateBySlug._id, deleteCallBack)}
                edge="end"
              />
            </>
          )}
        </div>
      </div>
      <Grid container spacing={1}>
        <Grid item sm={2} xs={12}>
          {!preview && (
            <Paper variant="outlined" className="p-2 mb-2">
              {state.fieldName === 'title' ? (
                <InlineForm
                  fieldName={state.fieldName}
                  label="Title"
                  onCancel={onCancel}
                  formik={formik}
                  formLoading={CRUDLoading}
                />
              ) : (
                <div>
                  <Typography className="d-flex align-items-center">
                    Title
                    {authorized && (
                      <Tooltip title="Edit Title">
                        <IconButton
                          onClick={() => {
                            setFormValues(data.getTemplateBySlug);
                            setState({ ...initialState, fieldName: 'title' });
                          }}
                          size="large"
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    )}
                  </Typography>
                  <Typography variant="h4" className="d-flex align-items-center">
                    {data.getTemplateBySlug.title.includes('-n-e-w')
                      ? 'Title'
                      : data.getTemplateBySlug.title}
                  </Typography>
                </div>
              )}
              {/* {authorized && (
              <>
                <Typography>
                  SEO
                  <Tooltip title="Edit seo">
                    <IconButton
                      size="small"
                      onClick={() => setState({ ...initialState, showSeoOverlay: true })}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Typography>
                {state.showSeoOverlay && (
                  <SeoOverlay
                    open={state.showSeoOverlay}
                    onClose={() => setState(initialState)}
                    formik={formik}
                    crudState={crudState}
                    setCrudState={setCrudState}
                    data={data.getTemplateBySlug}
                    setFields={() => setFormValues(data.getTemplateBySlug)}
                    loading={CRUDLoading}
                    state={state}
                    setState={setState}
                    permalinkPrefix={window?.location?.origin}
                  />
                )}
              </>
            )} */}
            </Paper>
          )}
          <TemplateWidgets template={data.getTemplateBySlug} previewMode={!authorized || preview} />
        </Grid>
        <Grid item xs>
          {preview ? (
            <TemplatePreview template={data.getTemplateBySlug} />
          ) : (
            <TemplateInstances template={data.getTemplateBySlug} />
          )}
        </Grid>
      </Grid>
      <Backdrop open={deleteLoading || CRUDLoading} />
    </div>
  );
}
