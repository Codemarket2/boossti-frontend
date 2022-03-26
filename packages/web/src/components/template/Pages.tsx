import { Fragment, useState } from 'react';
import { useRouter } from 'next/router';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Tooltip from '@material-ui/core/Tooltip';
import List from '@material-ui/core/List';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Link from 'next/link';
import AddIcon from '@material-ui/icons/Add';
import { getCreatedAtDate } from '@frontend/shared/utils/date';
import { useSelector } from 'react-redux';
import {
  useGetPagesByTemplate,
  useCreatePage,
  useUpdateTemplate,
} from '@frontend/shared/hooks/template';
import ErrorLoading from '../common/ErrorLoading';
import ListHeader from '../common/ListHeader';
import LoadingButton from '../common/LoadingButton';
import Backdrop from '../common/Backdrop';
import { onAlert } from '../../utils/alert';
import FormFieldsValue from '../form2/FormFieldsValue';

interface IProps {
  templateId: string;
  slug: string;
  template: any;
}

export default function Pages({ templateId, slug, template }: IProps) {
  const { data, loading, error, state, setState } = useGetPagesByTemplate(templateId);
  const router = useRouter();
  const { editMode } = useSelector(({ setting }: any) => setting);

  const { onTemplateChange } = useUpdateTemplate({
    template,
    onAlert,
  });

  const [tab, setTab] = useState('preview');

  const createCallback = (itemSlug) => {
    router.push(`/${slug}/${itemSlug}`);
  };

  const { handleCreate, createLoading } = useCreatePage({ onAlert });

  return (
    <>
      <ListHeader
        loading={loading}
        search={state.search}
        showSearch={state.showSearch}
        onHide={() => setState({ ...state, search: '', showSearch: false })}
        onShow={() => setState({ ...state, search: '', showSearch: true })}
        onChange={(value) => setState({ ...state, search: value })}
      >
        <div className="w-50">
          <Tooltip title="Add New Types">
            <LoadingButton
              className="ml-2"
              size="small"
              variant="contained"
              color="primary"
              type="button"
              onClick={() => handleCreate(templateId, createCallback)}
              loading={createLoading}
              startIcon={<AddIcon />}
            >
              Create New Page
            </LoadingButton>
          </Tooltip>
        </div>
      </ListHeader>
      <Paper variant="outlined">
        <Tabs
          value={tab}
          onChange={(event, newValue) => setTab(newValue)}
          variant="fullWidth"
          indicatorColor="primary"
        >
          <Tab label="Preview" value="preview" />
          <Tab label="Pages" value="pages" />
        </Tabs>
        {tab === 'pages' ? (
          <>
            {error || !data ? (
              <ErrorLoading error={error} />
            ) : (
              <List dense className="p-0">
                {data.getPages.data.map((lisItem, i) => (
                  <Fragment key={lisItem._id}>
                    {i > 0 && <Divider />}
                    <Link href={`/${lisItem.template.slug}/${lisItem.slug}`}>
                      <ListItem button>
                        <ListItemAvatar>
                          <Avatar
                            alt={lisItem.title}
                            src={lisItem.media[0] && lisItem.media[0].url}
                          />
                        </ListItemAvatar>
                        <ListItemText
                          primary={lisItem.title.includes('-n-e-w') ? 'Title' : lisItem.title}
                          secondary={`By ${lisItem.createdBy?.name} ${getCreatedAtDate(
                            lisItem.createdAt,
                          )}`}
                        />
                      </ListItem>
                    </Link>
                  </Fragment>
                ))}
              </List>
            )}
          </>
        ) : (
          <>
            <FormFieldsValue
              authorized
              fields={template?.fields}
              values={[]}
              handleValueChange={() => {}}
              pageId={template?._id}
              layouts={template?.options?.layouts || {}}
              disableGrid={!editMode}
              onLayoutChange={(layouts) => {
                onTemplateChange({
                  options: { ...template?.options, layouts },
                });
              }}
            />
          </>
        )}
      </Paper>
      <Backdrop open={createLoading} />
    </>
  );
}
