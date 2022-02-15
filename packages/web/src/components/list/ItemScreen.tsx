import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import EditIcon from '@material-ui/icons/Edit';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import Hidden from '@material-ui/core/Hidden';
import Tooltip from '@material-ui/core/Tooltip';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import { useSelector, useDispatch } from 'react-redux';
import { useTheme } from '@material-ui/core/styles';
import ShareIcon from '@material-ui/icons/Share';
// import FileCopyIcon from '@material-ui/icons/FileCopy';
import Grid from '@material-ui/core/Grid';
import {
  useCRUDListItems,
  useGetListItemBySlug,
  useDeleteListItem,
  usePublishListItem,
  useGetTemplateFieldMentions,
  useGetpageFieldMentions,
  useGetListItemById,
  useUpdateListItemFields,
} from '@frontend/shared/hooks/list';
import { useAuthorization } from '@frontend/shared/hooks/auth';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { updateSettingAction } from '@frontend/shared/redux/actions/setting';
import { onAlert } from '../../utils/alert';
import FieldValues from '../field/FieldValues';
import InlineForm from './InlineForm';
import LeftNavigation from '../field/LeftNavigation';
import Breadcrumbs from '../common/Breadcrumbs';
import ErrorLoading from '../common/ErrorLoading';
import Backdrop from '../common/Backdrop';
import NotFound from '../common/NotFound';
import ListItemsFields from './ListItemsFields';
import ListItemsFieldsValue from './ListItemsFieldsValue';
import UnAuthorised from '../common/UnAuthorised';
import SeoOverlay from './SeoOverlay';
import { QRButton } from '../qrcode/QRButton';
import FormFieldsValue from '../form2/FormFieldsValue';

interface IProps {
  slug: string;
  setItem?: any;
  onSlugUpdate?: (arg: string) => void;
  pushToAnchor?: () => void;
  hideBreadcrumbs?: boolean;
  hideleft?: boolean;
}

export function DisplayMentions(value) {
  const { data } = useGetListItemById(value._id);
  const router = useRouter();
  return (
    <span
      onClick={() => {
        router.push(`/page/${data?.getListItem?.slug}`);
      }}
      style={{ cursor: 'pointer', color: 'blue' }}
      className="mr-3"
    >
      {`${data?.getListItem?.slug} | ${data?.getListItem?.types[0]?.slug}`}
    </span>
  );
}

const initialState = {
  fieldName: '',
  fields: [],
  hideLeftNavigation: false,
  showSeoOverlay: false,
};

export default function ItemScreen({
  slug,
  hideBreadcrumbs = false,
  setItem,
  onSlugUpdate,
  pushToAnchor,
  hideleft = false,
}: IProps): any {
  const router = useRouter();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('xs'));
  const { setting, auth } = useSelector((state: any) => state);
  const [state, setState] = useState(initialState);
  const [fieldValueCount, setFieldValueCount] = useState({});
  const { data, error } = useGetListItemBySlug({ slug });
  const authorized = useAuthorization([data?.getListItemBySlug?.createdBy?._id], true);
  const { templateMentionsField } = useGetTemplateFieldMentions(data?.getListItemBySlug?._id);
  const { pageMentionsField } = useGetpageFieldMentions(data?.getListItemBySlug?._id);
  const { handleUpdate } = useUpdateListItemFields({
    listItem: data?.getListItemBySlug,
    onAlert,
  });
  const mentions = Array.from(new Set(templateMentionsField?.concat(pageMentionsField)));

  const deleteCallBack = () => {
    router.push(`/${data?.getListItemBySlug?.types[0]?.slug}`);
  };

  const updateCallBack = (newSlug) => {
    setState({ ...state, fieldName: '' });
    if (newSlug !== slug && onSlugUpdate) {
      onSlugUpdate(newSlug);
    }
  };

  const { handleDelete, deleteLoading } = useDeleteListItem({ onAlert });
  const { handlePublish } = usePublishListItem();

  const dispatch = useDispatch();

  const {
    state: crudState,
    setState: setCrudState,
    formik,
    setFormValues,
    CRUDLoading,
  } = useCRUDListItems({
    onAlert,
    updateCallBack,
  });

  const handleHideBottomSheet = () => {
    dispatch(updateSettingAction({ bottomDrawer: false }));
  };

  const onCancel = () => {
    setState({ ...state, fieldName: '' });
  };

  const onEdit = (fieldName) => {
    setFormValues(data.getListItemBySlug);
    setState({ ...state, fieldName });
  };

  useEffect(() => {
    if (data && data.getListItemBySlug && setItem) {
      setItem(data.getListItemBySlug);
    }
  }, [data]);

  if (error || !data) {
    return <ErrorLoading error={error} />;
  }

  if (!data?.getListItemBySlug || (!authorized && !data?.getListItemBySlug?.active)) {
    return <NotFound />;
  }

  if (!auth.authenticated && data?.getListItemBySlug?.authenticateUser) {
    return <UnAuthorised />;
  }

  const leftNavigationProps = {
    parentId: data.getListItemBySlug?.types[0]?._id,
    slug: `/${data?.getListItemBySlug?.types[0]?.slug}/${data?.getListItemBySlug?.slug}`,
    fields: state.fields,
    fieldValueCount,
    layouts: JSON.parse(data.getListItemBySlug?.layouts) || {},
    itemSlug: data.getListItemBySlug.slug,
    _id: data.getListItemBySlug._id,
    previewMode: !authorized,
  };

  return (
    <div>
      {!hideBreadcrumbs && (
        <div className="d-sm-flex justify-content-between align-content-center align-items-center">
          <Breadcrumbs>
            <Link href={`/${data.getListItemBySlug.types[0].slug}`}>
              <a>{data.getListItemBySlug.types[0].title}</a>
            </Link>
            <Typography color="textPrimary">
              {data.getListItemBySlug.title.includes('-n-e-w')
                ? 'Title'
                : data.getListItemBySlug.title}
            </Typography>
          </Breadcrumbs>
          <div className="d-flex align-items-center">
            <QRButton />
            <Tooltip title="share">
              <IconButton
                // edge="start"
                onClick={() =>
                  navigator.clipboard.writeText(
                    `${window?.location?.origin}/${data?.getListItemBySlug?.types[0]?.slug}/${data?.getListItemBySlug?.slug}`,
                  )
                }
              >
                <ShareIcon />
              </IconButton>
            </Tooltip>
            {authorized && (
              <>
                {/* <Tooltip title="Make a copy">
                  <IconButton onClick={() => alert('Comming soon')}>
                    <FileCopyIcon />
                  </IconButton>
                </Tooltip> */}
                <FormControlLabel
                  className="m-0"
                  control={
                    <Switch
                      color="primary"
                      checked={data.getListItemBySlug?.active}
                      onChange={() =>
                        handlePublish(
                          data.getListItemBySlug?._id,
                          slug,
                          !data.getListItemBySlug?.active,
                          data.getListItemBySlug?.authenticateUser,
                        )
                      }
                    />
                  }
                  label="Publish"
                />
                {data.getListItemBySlug?.active && (
                  <FormControlLabel
                    className="m-0"
                    control={
                      <Switch
                        color="primary"
                        checked={data.getListItemBySlug?.authenticateUser}
                        onChange={() =>
                          handlePublish(
                            data.getListItemBySlug?._id,
                            slug,
                            data.getListItemBySlug?.active,
                            !data.getListItemBySlug?.authenticateUser,
                          )
                        }
                      />
                    }
                    label="Auth Required"
                  />
                )}
                <Tooltip title="Delete">
                  <IconButton
                    edge="end"
                    onClick={() => {
                      const answer = confirm('Are you sure you want to delete?');
                      if (answer) {
                        handleDelete(data.getListItemBySlug._id, deleteCallBack);
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
      )}
      {!hideleft && (
        <>
          <Hidden smUp>
            <Drawer anchor="bottom" open={setting.bottomDrawer} onClose={handleHideBottomSheet}>
              <LeftNavigation
                style={{ maxHeight: '50vh' }}
                onClick={handleHideBottomSheet}
                {...leftNavigationProps}
              >
                <ListItemsFields listItem={data.getListItemBySlug} previewMode={!authorized} />
              </LeftNavigation>
            </Drawer>
          </Hidden>
          <Hidden xsDown>
            <LeftNavigation
              {...leftNavigationProps}
              style={{
                position: 'fixed',
                width: '15%',
                maxHeight: '80vh',
                paddingBottom: 10,
                overflowX: 'hidden',
                overflowY: 'auto',
              }}
              setEditValue={() => setState({ ...state, showSeoOverlay: true })}
            >
              <ListItemsFields listItem={data.getListItemBySlug} previewMode={!authorized} />
            </LeftNavigation>
          </Hidden>
        </>
      )}
      <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
        <Paper
          style={{ width: matches || hideleft ? '100%' : '84%', border: 'none' }}
          variant="outlined"
          className="p-2 pb-5"
        >
          <>
            {state.fieldName === 'title' ? (
              <InlineForm
                fieldName={state.fieldName}
                label="Title"
                onCancel={onCancel}
                formik={formik}
                formLoading={CRUDLoading}
              />
            ) : (
              <>
                <Typography id="title" className="d-flex align-items-center">
                  Title
                  {authorized && (
                    <Tooltip title="Edit Title">
                      <IconButton onClick={() => onEdit('title')} size="small">
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  )}
                </Typography>
                <Typography
                  variant="h4"
                  variantMapping={{ h4: 'h1' }}
                  className="d-flex align-items-center"
                >
                  {data.getListItemBySlug.title.includes('-n-e-w')
                    ? 'Title'
                    : data.getListItemBySlug.title}
                </Typography>
              </>
            )}
            {state.showSeoOverlay && (
              <SeoOverlay
                open={state.showSeoOverlay}
                onClose={() => setState(initialState)}
                formik={formik}
                crudState={crudState}
                setCrudState={setCrudState}
                data={data.getListItemBySlug}
                setFields={() => setFormValues(data.getListItemBySlug)}
                loading={CRUDLoading}
                state={state}
                setState={setState}
                permalinkPrefix={`${window?.location?.origin}/${data?.getListItemBySlug?.types[0]?.slug}`}
              />
            )}
          </>
          {data.getListItemBySlug?.types[0]?._id && (
            <FieldValues
              pushToAnchor={pushToAnchor}
              parentId={data.getListItemBySlug._id}
              typeId={data.getListItemBySlug?.types[0]?._id}
              setFields={(fields) => setState({ ...state, fields })}
              setFieldValueCount={(index, value) =>
                setFieldValueCount({ ...fieldValueCount, [index]: value })
              }
              layouts={JSON.parse(data?.getListItemBySlug?.layouts) || {}}
              isPublish={data?.getListItemBySlug?.active}
              authorized={authorized}
            />
          )}
          <FormFieldsValue
            authorized={authorized}
            fields={data?.getListItemBySlug?.fields}
            values={data?.getListItemBySlug?.values}
            handleValueChange={handleUpdate}
          />
          {/* <ListItemsFieldsValue listItem={data?.getListItemBySlug} previewMode={!authorized} /> */}
          {mentions.length !== 0 && (
            <Grid>
              <Typography className="my-3">Mentions</Typography>
              <div className="my-3">
                {mentions.map((val) => (
                  <DisplayMentions _id={val} />
                ))}
              </div>
            </Grid>
          )}
        </Paper>
      </div>
      <Backdrop open={deleteLoading || CRUDLoading} />
    </div>
  );
}
