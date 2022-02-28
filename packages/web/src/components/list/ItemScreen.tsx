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
import Typography from '@material-ui/core/Typography';
import { useTheme } from '@material-ui/core/styles';
import ShareIcon from '@material-ui/icons/Share';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import { useSelector } from 'react-redux';
import {
  useCRUDListItems,
  useGetListItemBySlug,
  useDeleteListItem,
  usePublishListItem,
  // useGetTemplateFieldMentions,
  useGetpageFieldMentions,
  useGetListItemById,
  useUpdateListItemFields,
  useGetListTypeBySlug,
} from '@frontend/shared/hooks/list';
import { useAuthorization } from '@frontend/shared/hooks/auth';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { onAlert } from '../../utils/alert';
import InlineForm from './InlineForm';
import Breadcrumbs from '../common/Breadcrumbs';
import ErrorLoading from '../common/ErrorLoading';
import Backdrop from '../common/Backdrop';
import NotFound from '../common/NotFound';
import ListItemsFields from './ListItemsFields';
import UnAuthorised from '../common/UnAuthorised';
import SeoOverlay from './SeoOverlay';
import { QRButton } from '../qrcode/QRButton';
import FormFieldsValue from '../form2/FormFieldsValue';
import FormFields from '../form2/FormFields';
import Bottomsheet from '../common/Bottomsheet';
import EditMode from '../common/EditMode';

interface IProps {
  slug: string;
  typeSlug?: string;
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
  typeSlug,
}: IProps): any {
  const { data, error } = useGetListItemBySlug({ slug });
  const { data: listTypeData, error: listTypeError } = useGetListTypeBySlug({
    slug: typeSlug || data?.getListItemBySlug?.types[0]?.slug,
  });
  const { editMode } = useSelector(({ setting }: any) => setting);

  const router = useRouter();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('xs'));
  const { auth } = useSelector((state: any) => state);
  const [state, setState] = useState(initialState);
  const authorized = useAuthorization([data?.getListItemBySlug?.createdBy?._id], true);
  // const { templateMentionsField } = useGetTemplateFieldMentions(data?.getListItemBySlug?._id);
  const { pageMentionsField } = useGetpageFieldMentions(data?.getListItemBySlug?._id);
  const { handleUpdate, onListItemChange } = useUpdateListItemFields({
    listItem: data?.getListItemBySlug,
    onAlert,
  });
  const mentions = Array.from(new Set(pageMentionsField));
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

  if (error || listTypeError || !data || !listTypeData) {
    return <ErrorLoading error={error || listTypeError} />;
  }

  if (
    !data?.getListItemBySlug ||
    (!authorized && !data?.getListItemBySlug?.active) ||
    ((typeSlug || data?.getListItemBySlug) && !listTypeData?.getListTypeBySlug)
  ) {
    return <NotFound />;
  }

  if (!auth.authenticated && data?.getListItemBySlug?.authenticateUser) {
    return <UnAuthorised />;
  }

  return (
    <div>
      {!hideBreadcrumbs && (
        <div className="d-sm-flex justify-content-between align-content-center align-items-center">
          <Breadcrumbs>
            <Link href={`/${data.getListItemBySlug.types[0].slug}`}>
              <a>{data.getListItemBySlug.types[0].title}</a>
            </Link>
            <Typography color="textPrimary" align="center">
              {data.getListItemBySlug.title.includes('-n-e-w')
                ? 'Title'
                : data.getListItemBySlug.title}
            </Typography>
          </Breadcrumbs>
          <div className="d-flex align-items-center">
            {authorized && <EditMode />}
            <QRButton />
            <Tooltip title="share">
              <IconButton
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
          <Bottomsheet>
            <Navigation
              listTypeFields={listTypeData?.getListTypeBySlug?.fields}
              listItem={data.getListItemBySlug}
              authorized={authorized}
              editSeo={() => setState({ ...state, showSeoOverlay: true })}
              slug={`/${data?.getListItemBySlug?.types[0]?.slug}/${data?.getListItemBySlug?.slug}`}
              style={{ maxHeight: '50vh' }}
            />
          </Bottomsheet>
          <Hidden xsDown>
            <Navigation
              listTypeFields={listTypeData?.getListTypeBySlug?.fields}
              listItem={data.getListItemBySlug}
              authorized={authorized}
              editSeo={() => setState({ ...state, showSeoOverlay: true })}
              slug={`/${data?.getListItemBySlug?.types[0]?.slug}/${data?.getListItemBySlug?.slug}`}
              style={{
                position: 'fixed',
                width: '15%',
                maxHeight: '80vh',
                paddingBottom: 10,
                overflowX: 'hidden',
                overflowY: 'auto',
              }}
            />
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
                  color="textPrimary"
                  align="center"
                  // className="d-flex align-items-center"
                >
                  {data.getListItemBySlug.title.includes('-n-e-w')
                    ? 'Title'
                    : data.getListItemBySlug.title}
                </Typography>
              </>
            )}
            {authorized && state.showSeoOverlay && (
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
          {listTypeData?.getListTypeBySlug?.fields && (
            <FormFieldsValue
              authorized={authorized}
              fields={listTypeData?.getListTypeBySlug?.fields}
              values={data?.getListItemBySlug?.values}
              handleValueChange={handleUpdate}
              pageId={data?.getListItemBySlug?._id}
              layouts={listTypeData?.getListTypeBySlug?.options?.layouts || {}}
            />
          )}
          <FormFieldsValue
            authorized={authorized}
            fields={data?.getListItemBySlug?.fields}
            values={data?.getListItemBySlug?.values}
            handleValueChange={handleUpdate}
            pageId={data?.getListItemBySlug?._id}
            layouts={data?.getListItemBySlug?.options?.layouts || {}}
            disableGrid={!editMode}
            onLayoutChange={(layouts) =>
              onListItemChange({
                options: { ...listTypeData?.getListTypeBySlug?.options, layouts },
              })
            }
          />
          {mentions.length > 0 && (
            <div>
              <Typography className="my-3">Mentions</Typography>
              <div className="my-3">
                {mentions.map(
                  (val: any) => val?._id && <DisplayMentions _id={val} key={val?._id} />,
                )}
              </div>
            </div>
          )}
        </Paper>
      </div>
      <Backdrop open={deleteLoading || CRUDLoading} />
    </div>
  );
}

const Navigation = ({
  listTypeFields,
  listItem,
  authorized,
  editSeo,
  slug,
  style,
}: {
  listTypeFields: any;
  listItem: any;
  authorized: boolean;
  editSeo: () => void;
  slug: string;
  style: any;
}) => {
  return (
    <div style={style}>
      <Paper variant="outlined">
        <List component="nav" dense>
          <ListItem button>
            <Link href={`${slug}#title`}>
              <ListItemText primary="Title" />
            </Link>
          </ListItem>
          {authorized && (
            <ListItem button>
              <ListItemText primary="Seo" />
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="edit" onClick={editSeo}>
                  <EditIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          )}
        </List>
      </Paper>
      <FormFields
        fields={listTypeFields}
        setFields={(f: any) => {}}
        title="Sections"
        isSection
        previewMode
      />
      <ListItemsFields listItem={listItem} previewMode={!authorized} />
    </div>
  );
};
