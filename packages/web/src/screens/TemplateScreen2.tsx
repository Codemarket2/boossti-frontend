import { useGetResponseByCount } from '@frontend/shared/hooks/response';
import {
  useGetTemplateBySlug,
  useDeleteTemplate,
  useCRUDTemplates,
  usePublishTemplate,
} from '@frontend/shared/hooks/template';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import EditIcon from '@material-ui/icons/Edit';
import StarOutlineIcon from '@material-ui/icons/StarOutline';
import StarIcon from '@material-ui/icons/Star';
import Share from '@material-ui/icons/Share';
import { useAuthorization } from '@frontend/shared/hooks/auth';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Breadcrumbs from '../components/common/Breadcrumbs';
import ErrorLoading from '../components/common/ErrorLoading';
import Pages from '../components/template/Pages';
import NotFound from '../components/common/NotFound';
import Backdrop from '../components/common/Backdrop';
import { onAlert } from '../utils/alert';
import InlineForm from '../components/template/InlineForm';
import SeoOverlay from '../components/template/SeoOverlay';
import { QRButton } from '../components/qrcode/QRButton';
import TemplateWidgets2 from '../components/template/TemplateWidgets2';
import EditMode from '../components/common/EditMode';
import DeleteButton from '../components/common/DeleteButton';

interface IProps {
  slug: any;
  templateForm: any;
}

const initialState = {
  fieldName: '',
  showMenu: false,
  showSeoOverlay: false,
  selectedIndex: 0,
};

export default function Screen({ slug, templateForm }: IProps) {
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

  const { data, error } = useGetResponseByCount(templateForm._id, slug);
  //   const { data, error } = useGetTemplateBySlug({ slug });
  const { handleDelete, deleteLoading } = useDeleteTemplate({ onAlert });
  const authorized = useAuthorization([data?.getResponseByCount?.createdBy?._id], true);

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

  if (error || !data) {
    return <ErrorLoading error={error} />;
  }

  if (!data?.getResponseByCount) {
    return <NotFound />;
  }

  const fields = { name: null, widgets: null };
  templateForm?.fields?.forEach((field) => {
    if (field?.label?.toLowerCase() === 'name') {
      fields.name = field;
      fields.name.values = data?.getResponseByCount?.values.filter(
        (value) => value.field === field?._id,
      );
    } else if (field?.label?.toLowerCase() === 'widgets') {
      fields.widgets = field;
      fields.widgets.values = data?.getResponseByCount?.values.filter(
        (value) => value.field === field?._id,
      );
    }
  });

  //   if (!data?.getTemplateBySlug || (!authorized && !data?.getTemplateBySlug?.active)) {
  //     return <NotFound />;
  //   }

  return (
    <div>
      {/* {JSON.stringify(fields)} */}
      <div className="d-sm-flex justify-content-between align-items-center">
        <Breadcrumbs>
          <Typography color="textPrimary">
            {fields?.name?.values[0]?.value}
            {/* {data?.getTemplateBySlug?.title.includes('-n-e-w')
              ? 'Title'
              : data?.getTemplateBySlug?.title} */}
          </Typography>
        </Breadcrumbs>
        <div className="d-flex align-items-center">
          {authorized && <EditMode />}
          <QRButton />
          <Tooltip title="Copy page link">
            <IconButton onClick={() => navigator.clipboard.writeText(window?.location?.href)}>
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
                onClick={() => handleDelete(data?.getTemplateBySlug?._id, deleteCallBack)}
                edge="end"
              />
            </>
          )}
        </div>
      </div>
      <Grid container spacing={1}>
        <Grid item sm={2} xs={12}>
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
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  )}
                </Typography>
                <Typography variant="h4" className="d-flex align-items-center">
                  {fields?.name?.values[0]?.value}
                  {/* {data?.getTemplateBySlug?.title.includes('-n-e-w')
                    ? 'Title'
                    : data?.getTemplateBySlug?.title} */}
                </Typography>
              </div>
            )}
            {authorized && (
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
            )}
          </Paper>
          <TemplateWidgets2 widget={fields.widgets} authorized={authorized} />
          {/* <TemplateWidgets template={data.getTemplateBySlug} previewMode={!authorized} /> */}
        </Grid>
        <Grid item xs>
          <Pages
            templateId={data?.getTemplateBySlug?._id}
            slug={data?.getTemplateBySlug?.slug}
            template={data.getTemplateBySlug}
          />
        </Grid>
      </Grid>
      <Backdrop open={deleteLoading || CRUDLoading} />
    </div>
  );
}
