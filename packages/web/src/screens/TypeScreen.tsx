import {
  useGetListTypeBySlug,
  useDeleteListType,
  useCRUDListTypes,
  usePublishListType,
} from '@frontend/shared/hooks/list';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import EditIcon from '@material-ui/icons/Edit';
import StarOutlineIcon from '@material-ui/icons/StarOutline';
import DeleteIcon from '@material-ui/icons/Delete';
import StarIcon from '@material-ui/icons/Star';
import Share from '@material-ui/icons/Share';
import { useAuthorization } from '@frontend/shared/hooks/auth';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Breadcrumbs from '../components/common/Breadcrumbs';
import ErrorLoading from '../components/common/ErrorLoading';
import ListItems from '../components/list/ListItems';
import NotFound from '../components/common/NotFound';
import Backdrop from '../components/common/Backdrop';
import { onAlert } from '../utils/alert';
import Fields from '../components/field/Fields';
import InlineForm from '../components/list/InlineForm';
import SeoOverlay from '../components/list/SeoOverlay';
import { QRButton } from '../components/qrcode/QRButton';

interface IProps {
  slug: string;
}

const initialState = {
  fieldName: '',
  showMenu: false,
  showSeoOverlay: false,
  selectedIndex: 0,
};

export default function Screen({ slug }: IProps) {
  const router = useRouter();
  const [state, setState] = useState(initialState);

  const { handlePublish } = usePublishListType({ onAlert });

  const deleteCallBack = () => {
    router.push(`/types`);
  };

  const updateCallBack = (newSlug) => {
    setState({ ...state, fieldName: '' });
    if (newSlug !== slug) {
      router.push(`/${newSlug}`);
    }
  };

  const { data, error } = useGetListTypeBySlug({ slug });
  const { handleDelete, deleteLoading } = useDeleteListType({ onAlert });
  const authorized = useAuthorization([data?.getListTypeBySlug?.createdBy?._id], true);

  const {
    state: crudState,
    setState: setCrudState,
    formik,
    CRUDLoading,
    setFormValues,
  } = useCRUDListTypes({
    onAlert,
    updateCallBack,
  });

  const onCancel = () => {
    setState({ ...state, fieldName: '' });
  };

  if (error || !data) {
    return <ErrorLoading error={error} />;
  }

  if (!data?.getListTypeBySlug || (!authorized && !data?.getListTypeBySlug?.active)) {
    return <NotFound />;
  }

  return (
    <div>
      <div className="d-sm-flex justify-content-between align-items-center">
        <Breadcrumbs>
          <Typography color="textPrimary">
            {data.getListTypeBySlug.title.includes('-n-e-w')
              ? 'Title'
              : data.getListTypeBySlug.title}
          </Typography>
        </Breadcrumbs>
        <div className="d-flex align-items-center">
          <QRButton />
          <Tooltip title="Copy page link">
            <IconButton
              // edge="start"
              onClick={() => navigator.clipboard.writeText(window?.location?.href)}
            >
              <Share />
            </IconButton>
          </Tooltip>
          {data.getListTypeBySlug?.active && (
            <Tooltip
              title={data.getListTypeBySlug?.showInMenu ? 'Remove from menu' : 'Add to menu'}
            >
              <IconButton
                onClick={() =>
                  handlePublish({
                    _id: data.getListTypeBySlug?._id,
                    slug,
                    active: data.getListTypeBySlug?.active,
                    showInMenu: !data.getListTypeBySlug?.showInMenu,
                  })
                }
              >
                {data.getListTypeBySlug?.showInMenu ? (
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
                    checked={data.getListTypeBySlug?.active}
                    onChange={() =>
                      handlePublish({
                        _id: data.getListTypeBySlug?._id,
                        slug,
                        active: !data.getListTypeBySlug?.active,
                        showInMenu: data.getListTypeBySlug?.showInMenu,
                      })
                    }
                  />
                }
                label="Publish"
              />
              <Tooltip title="Delete">
                <IconButton
                  edge="end"
                  onClick={() => {
                    if (data.getListTypeBySlug.inUse) {
                      alert("This type is being used in some form, you can't delete");
                    } else {
                      const answer = confirm('Are you sure you want to delete?');
                      if (answer) {
                        handleDelete(data.getListTypeBySlug._id, deleteCallBack);
                      }
                    }
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </>
          )}
        </div>
      </div>
      <Grid container spacing={1}>
        <Grid item sm={3} xs={12}>
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
                      <IconButton onClick={() => setState({ ...initialState, fieldName: 'title' })}>
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  )}
                </Typography>
                <Typography variant="h4" className="d-flex align-items-center">
                  {data.getListTypeBySlug.title.includes('-n-e-w')
                    ? 'Title'
                    : data.getListTypeBySlug.title}
                </Typography>
              </div>
            )}
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
                data={data.getListTypeBySlug}
                setFields={() => setFormValues(data.getListTypeBySlug)}
                loading={CRUDLoading}
                state={state}
                setState={setState}
                permalinkPrefix={window?.location?.origin}
              />
            )}
          </Paper>
          <Fields title="Sections" parentId={data.getListTypeBySlug._id} guestMode={!authorized} />
          {/* <ListTypeFields listType={data.getListTypeBySlug} /> */}
        </Grid>
        <Grid item xs>
          <ListItems
            types={[data.getListTypeBySlug._id]}
            name={data.getListTypeBySlug.title}
            slug={data.getListTypeBySlug.slug}
          />
        </Grid>
      </Grid>
      <Backdrop open={deleteLoading || CRUDLoading} />
    </div>
  );
}
