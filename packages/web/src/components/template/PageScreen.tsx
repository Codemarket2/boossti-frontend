import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import EditIcon from '@mui/icons-material/Edit';
import useMediaQuery from '@mui/material/useMediaQuery';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import Hidden from '@mui/material/Hidden';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import ShareIcon from '@mui/icons-material/Share';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import { useSelector } from 'react-redux';
import {
  useCRUDPages,
  useGetPageBySlug,
  useDeletePage,
  usePublishPage,
  // useGetTemplateFieldMentions,
  useGetpageFieldMentions,
  useGetPageById,
  useUpdatePageFields,
  useGetTemplateBySlug,
} from '@frontend/shared/hooks/template';
import { useAuthorization } from '@frontend/shared/hooks/auth';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { onAlert } from '../../utils/alert';
import InlineForm from './InlineForm';
import Breadcrumbs from '../common/Breadcrumbs';
import ErrorLoading from '../common/ErrorLoading';
import Backdrop from '../common/Backdrop';
import NotFound from '../common/NotFound';
import PagesFields from './PagesFields';
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
  const { data } = useGetPageById(value._id);
  const router = useRouter();
  return (
    <span
      onClick={() => {
        router.push(`/page/${data?.getPage?.slug}`);
      }}
      style={{ cursor: 'pointer', color: 'blue' }}
      className="mr-3"
    >
      {`${data?.getPage?.slug} | ${data?.getPage?.template?.slug}`}
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
  const { data, error } = useGetPageBySlug({ slug });
  const { data: templateData, error: templateError } = useGetTemplateBySlug({
    slug: typeSlug || data?.getPageBySlug?.template?.slug,
  });
  const { editMode } = useSelector(({ setting }: any) => setting);

  const router = useRouter();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));
  const { auth } = useSelector((state: any) => state);
  const [state, setState] = useState(initialState);
  const authorized = useAuthorization([data?.getPageBySlug?.createdBy?._id], true);
  // const { templateMentionsField } = useGetTemplateFieldMentions(data?.getPageBySlug?._id);
  const { pageMentionsField } = useGetpageFieldMentions(data?.getPageBySlug?._id);
  const { handleUpdate, onPageChange } = useUpdatePageFields({
    page: data?.getPageBySlug,
    onAlert,
  });
  const mentions = Array.from(new Set(pageMentionsField));
  const deleteCallBack = () => {
    router.push(`/${data?.getPageBySlug?.template?.slug}`);
  };
  const updateCallBack = (newSlug) => {
    setState({ ...state, fieldName: '' });
    if (newSlug !== slug && onSlugUpdate) {
      onSlugUpdate(newSlug);
    }
  };
  const { handleDelete, deleteLoading } = useDeletePage({ onAlert });
  const { handlePublish } = usePublishPage();

  const {
    state: crudState,
    setState: setCrudState,
    formik,
    setFormValues,
    CRUDLoading,
  } = useCRUDPages({
    onAlert,
    updateCallBack,
  });

  const onCancel = () => {
    setState({ ...state, fieldName: '' });
  };

  const onEdit = (fieldName) => {
    setFormValues(data.getPageBySlug);
    setState({ ...state, fieldName });
  };

  useEffect(() => {
    if (data && data.getPageBySlug && setItem) {
      setItem(data.getPageBySlug);
    }
  }, [data]);

  if (error || templateError || !data || !templateData) {
    return <ErrorLoading error={error || templateError} />;
  }

  if (
    !data?.getPageBySlug ||
    (!authorized && !data?.getPageBySlug?.active) ||
    ((typeSlug || data?.getPageBySlug) && !templateData?.getTemplateBySlug)
  ) {
    return <NotFound />;
  }

  if (!auth.authenticated && data?.getPageBySlug?.authenticateUser) {
    return <UnAuthorised />;
  }

  return (
    <div>
      {!hideBreadcrumbs && (
        <div className="d-sm-flex justify-content-between align-content-center align-items-center">
          <Breadcrumbs>
            <Link href={`/${data.getPageBySlug.template.slug}`}>
              <a>{data.getPageBySlug.template.title}</a>
            </Link>
            <Typography color="textPrimary" align="center">
              {data.getPageBySlug.title.includes('-n-e-w') ? 'Title' : data.getPageBySlug.title}
            </Typography>
          </Breadcrumbs>
          <div className="d-flex align-items-center">
            {authorized && <EditMode />}
            <QRButton />
            <Tooltip title="share">
              <IconButton
                onClick={() =>
                  navigator.clipboard.writeText(
                    `${window?.location?.origin}/${data?.getPageBySlug?.template?.slug}/${data?.getPageBySlug?.slug}`,
                  )
                }
                size="large"
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
                      checked={data.getPageBySlug?.active}
                      onChange={() =>
                        handlePublish(
                          data.getPageBySlug?._id,
                          slug,
                          !data.getPageBySlug?.active,
                          data.getPageBySlug?.authenticateUser,
                        )
                      }
                    />
                  }
                  label="Publish"
                />
                {data.getPageBySlug?.active && (
                  <FormControlLabel
                    className="m-0"
                    control={
                      <Switch
                        color="primary"
                        checked={data.getPageBySlug?.authenticateUser}
                        onChange={() =>
                          handlePublish(
                            data.getPageBySlug?._id,
                            slug,
                            data.getPageBySlug?.active,
                            !data.getPageBySlug?.authenticateUser,
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
                      // eslint-disable-next-line no-restricted-globals
                      const answer = confirm('Are you sure you want to delete?');
                      if (answer) {
                        handleDelete(data.getPageBySlug._id, deleteCallBack);
                      }
                    }}
                    size="large"
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
              templateFields={templateData?.getTemplateBySlug?.fields}
              page={data.getPageBySlug}
              authorized={authorized}
              editSeo={() => setState({ ...state, showSeoOverlay: true })}
              slug={`/${data?.getPageBySlug?.template?.slug}/${data?.getPageBySlug?.slug}`}
              style={{ maxHeight: '50vh' }}
            />
          </Bottomsheet>
          <Hidden smDown>
            <Navigation
              templateFields={templateData?.getTemplateBySlug?.fields}
              page={data.getPageBySlug}
              authorized={authorized}
              editSeo={() => setState({ ...state, showSeoOverlay: true })}
              slug={`/${data?.getPageBySlug?.template?.slug}/${data?.getPageBySlug?.slug}`}
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
                  {data.getPageBySlug.title.includes('-n-e-w') ? 'Title' : data.getPageBySlug.title}
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
                data={data.getPageBySlug}
                setFields={() => setFormValues(data.getPageBySlug)}
                loading={CRUDLoading}
                state={state}
                setState={setState}
                permalinkPrefix={`${window?.location?.origin}/${data?.getPageBySlug?.template?.slug}`}
              />
            )}
          </>
          {templateData?.getTemplateBySlug?.fields && (
            <FormFieldsValue
              authorized={authorized}
              fields={templateData?.getTemplateBySlug?.fields}
              values={data?.getPageBySlug?.values}
              handleValueChange={handleUpdate}
              pageId={data?.getPageBySlug?._id}
              layouts={templateData?.getTemplateBySlug?.options?.layouts || {}}
            />
          )}
          <FormFieldsValue
            authorized={authorized}
            fields={data?.getPageBySlug?.fields}
            values={data?.getPageBySlug?.values}
            handleValueChange={handleUpdate}
            pageId={data?.getPageBySlug?._id}
            layouts={data?.getPageBySlug?.options?.layouts || {}}
            disableGrid={!editMode}
            onLayoutChange={(layouts) =>
              onPageChange({
                options: { ...templateData?.getTemplateBySlug?.options, layouts },
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
  templateFields,
  page,
  authorized,
  editSeo,
  slug,
  style,
}: {
  templateFields: any;
  page: any;
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
                <IconButton edge="end" aria-label="edit" onClick={editSeo} size="large">
                  <EditIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          )}
        </List>
      </Paper>
      <FormFields
        fields={templateFields}
        setFields={(f: any) => null}
        title="Sections"
        isSection
        previewMode
        showWidgetExpand
      />
      <PagesFields page={page} previewMode={!authorized} />
    </div>
  );
};
