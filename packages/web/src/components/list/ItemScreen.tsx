import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import EditIcon from '@material-ui/icons/Edit';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Hidden from '@material-ui/core/Hidden';
import Tooltip from '@material-ui/core/Tooltip';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useSelector, useDispatch } from 'react-redux';
import { useTheme } from '@material-ui/core/styles';
import ShareIcon from '@material-ui/icons/Share';
import {
  useCRUDListItems,
  useGetListItemBySlug,
  useDeleteListItem,
} from '@frontend/shared/hooks/list';
import { updateSettingAction } from '@frontend/shared/redux/actions/setting';
import { onAlert } from '../../utils/alert';
import FieldValues from '../field/FieldValues';
import ActionButtons from './ActionButtons';
import InlineForm from './InlineForm';
import MediaForm from './MediaForm';
import LeftNavigation from '../field/LeftNavigation';
import Breadcrumbs from '../common/Breadcrumbs';
import ErrorLoading from '../common/ErrorLoading';
import Backdrop from '../common/Backdrop';
import ImageList from '../post/ImageList';
import NotFound from '../common/NotFound';
import CommentLikeShare from '../common/commentLikeShare/CommentLikeShare';
import AppSwitch from '../common/AppSwitch';
import DisplayRichText from '../common/DisplayRichText';
import ListItemsFields from './ListItemsFields';
import ListItemsFieldsValue from './ListItemsFieldsValue';

interface IProps {
  slug: string;
  hideBreadcrumbs?: boolean;
  setItem?: any;
  onSlugUpdate?: (arg: string) => void;
  pushToAnchor?: () => void;
  noTogglePreviewMode?: boolean;
  hideleft?: boolean;
}

export default function ItemScreen({
  slug,
  hideBreadcrumbs = false,
  setItem,
  onSlugUpdate,
  pushToAnchor,
  noTogglePreviewMode = false,
  hideleft = false,
}: IProps): any {
  const router = useRouter();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('xs'));
  const setting = useSelector((state: any) => state.setting);
  const [state, setState] = useState({ fieldName: '', fields: [], hideLeftNavigation: false });
  const [fieldValueCount, setFieldValueCount] = useState({});
  const [previewMode, setPreviewMode] = useState(noTogglePreviewMode);
  const { data, error } = useGetListItemBySlug({ slug });

  const deleteCallBack = () => {
    router.push(
      `/types/${data?.getListItemBySlug?.types && data?.getListItemBySlug?.types[0]?.slug}`,
    );
  };

  const updateCallBack = (newSlug) => {
    setState({ ...state, fieldName: '' });
    if (newSlug !== slug && onSlugUpdate) {
      onSlugUpdate(newSlug);
    }
  };

  const { handleDelete, deleteLoading } = useDeleteListItem({ onAlert });

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

  const handleShowBottomSheet = () => {
    dispatch(updateSettingAction({ bottomDrawer: true }));
  };
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
  if (!data.getListItemBySlug) {
    return <NotFound />;
  }

  const leftNavigationProps = {
    parentId: data.getListItemBySlug?.types[0]?._id,
    slug: previewMode
      ? `/page/${data?.getListItemBySlug?.slug}`
      : `/types/${data?.getListItemBySlug?.types[0]?.slug}/${data?.getListItemBySlug?.slug}`,
    fields: state.fields,
    fieldValueCount,
    layouts: JSON.parse(data.getListItemBySlug?.layouts) || {},
    itemSlug: data.getListItemBySlug.slug,
    _id: data.getListItemBySlug._id,
    previewMode,
  };

  return (
    <div className={previewMode && 'mt-2'}>
      {!hideBreadcrumbs && previewMode && (
        <Button
          style={{
            right: 50,
            top: 100,
            position: 'fixed',
            zIndex: 99999,
          }}
          variant="contained"
          color="primary"
          size="small"
          endIcon={<EditIcon />}
          onClick={() => setPreviewMode(false)}
        >
          Edit
        </Button>
      )}
      {!previewMode && !hideBreadcrumbs && (
        <>
          <div className="d-flex justify-content-between align-content-center align-items-center">
            <Breadcrumbs>
              <Link href="/types">Template</Link>
              <Link href={`/types/${data.getListItemBySlug.types[0].slug}`}>
                <a>{data.getListItemBySlug.types[0].title}</a>
              </Link>
              <Typography color="textPrimary">
                {data.getListItemBySlug.title.includes('-n-e-w')
                  ? 'Title'
                  : data.getListItemBySlug.title}
              </Typography>
            </Breadcrumbs>
            <div className="d-flex align-items-center">
              <Button
                variant="contained"
                color="primary"
                size="small"
                className="mr-2"
                onClick={() => setPreviewMode(true)}
              >
                Preview
              </Button>
              <ActionButtons
                onDelete={() => {
                  const answer = confirm('Are you sure you want to delete?');
                  if (answer) {
                    handleDelete(data.getListItemBySlug._id, deleteCallBack);
                  }
                }}
              />
              <Tooltip title="share">
                <IconButton
                  onClick={() =>
                    navigator.clipboard.writeText(`${window?.location?.origin}/page/${slug}`)
                  }
                >
                  <ShareIcon />
                </IconButton>
              </Tooltip>
            </div>
          </div>
          <Hidden smUp>
            <SwipeableDrawer
              anchor="bottom"
              open={setting.bottomDrawer}
              onClose={handleHideBottomSheet}
              onOpen={handleShowBottomSheet}
            >
              <LeftNavigation
                style={{ maxHeight: '40vh' }}
                onClick={handleHideBottomSheet}
                {...leftNavigationProps}
              >
                <ListItemsFields listItem={data.getListItemBySlug} previewMode={previewMode} />
              </LeftNavigation>
            </SwipeableDrawer>
          </Hidden>
        </>
      )}
      {!hideleft && (
        <Hidden xsDown>
          <LeftNavigation
            style={{
              position: 'fixed',
              width: '15%',
              maxHeight: '80vh',
              paddingBottom: 10,
              overflowX: 'hidden',
              overflowY: 'auto',
            }}
            {...leftNavigationProps}
          >
            <ListItemsFields listItem={data.getListItemBySlug} previewMode={previewMode} />
          </LeftNavigation>
        </Hidden>
      )}
      <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
        <Paper
          style={{ width: matches || hideleft ? '100%' : '84%', border: 'none' }}
          variant="outlined"
          className="p-2 pb-5"
        >
          {previewMode ? (
            <Typography variant="h3" align="center" variantMapping={{ h3: 'h1' }} id="title">
              {data.getListItemBySlug.title.includes('-n-e-w')
                ? 'Title'
                : data.getListItemBySlug.title}
            </Typography>
          ) : (
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
                  <Typography id="title" style={matches ? { paddingTop: 50 } : {}}>
                    Title
                    <Tooltip title="Edit Title">
                      <IconButton onClick={() => onEdit('title')}>
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    Publish
                    <AppSwitch
                      id={data?.getListItemBySlug?._id}
                      active={data?.getListItemBySlug?.active}
                      slug={data?.getListItemBySlug?.slug}
                      fieldUser="active"
                    />
                    Login Required
                    <AppSwitch
                      id={data?.getListItemBySlug?._id}
                      authUser={data?.getListItemBySlug?.authenticateUser || false}
                      slug={data?.getListItemBySlug?.slug}
                      fieldUser="authUser"
                    />
                  </Typography>
                  <Typography variant="h4" className="d-flex align-items-center">
                    {data.getListItemBySlug.title.includes('-n-e-w')
                      ? 'Title'
                      : data.getListItemBySlug.title}
                  </Typography>
                </>
              )}
              {/* <Divider className="my-2" /> */}
              {state.fieldName === 'description' ? (
                <InlineForm
                  multiline
                  fieldName={state.fieldName}
                  label="Description"
                  onCancel={onCancel}
                  formik={formik}
                  formLoading={CRUDLoading}
                />
              ) : (
                <>
                  <Typography id="description" style={matches ? { paddingTop: 50 } : {}}>
                    Description
                    <Tooltip title="Edit Description">
                      <IconButton onClick={() => onEdit('description')}>
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Typography>
                  <DisplayRichText value={data.getListItemBySlug.description} />
                  <CommentLikeShare parentId={data.getListItemBySlug._id} />
                </>
              )}
              {/* <Divider className="my-2" /> */}
              {state.fieldName === 'media' ? (
                <MediaForm
                  state={crudState}
                  setState={setCrudState}
                  onCancel={onCancel}
                  onSave={formik.handleSubmit}
                  loading={CRUDLoading}
                />
              ) : (
                <>
                  <Typography
                    className="d-flex align-items-center"
                    id="media"
                    style={matches ? { paddingTop: 50 } : {}}
                  >
                    Media
                    <Tooltip title="Edit Media">
                      <IconButton onClick={() => onEdit('media')}>
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Typography>
                  <ImageList media={data.getListItemBySlug.media} />
                </>
              )}
            </>
          )}
          {data.getListItemBySlug?.types[0]?._id && (
            <FieldValues
              toggleLeftNavigation={(value) => setState({ ...state, hideLeftNavigation: value })}
              pushToAnchor={pushToAnchor}
              parentId={data.getListItemBySlug._id}
              typeId={data.getListItemBySlug?.types[0]?._id}
              setFields={(fields) => setState({ ...state, fields })}
              setFieldValueCount={(index, value) =>
                setFieldValueCount({ ...fieldValueCount, [index]: value })
              }
              layouts={JSON.parse(data?.getListItemBySlug?.layouts) || {}}
              isPublish={data?.getListItemBySlug?.active}
              previewMode={previewMode}
            />
          )}
          <ListItemsFieldsValue listItem={data?.getListItemBySlug} previewMode={previewMode} />
        </Paper>
      </div>
      <Backdrop open={deleteLoading || CRUDLoading} />
    </div>
  );
}
