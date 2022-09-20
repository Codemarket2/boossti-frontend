// NEXTJS
import type { NextPage, GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
// MUI
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Container from '@mui/material/Container';

// WEB
import { DisplayForm } from '../../../src/components/form2/DisplayForm';

const CopytoClipboard = (text: string) => navigator.clipboard.writeText(text);

interface GetEmbedLinkProps {
  host: string;
  formSlug: string;
  IFrameTagConfig?: {
    width: number;
    height: number;
  };
}

const getEmbedLink = (config: GetEmbedLinkProps) => {
  const { host, formSlug, IFrameTagConfig: IFrameConfig } = config;

  const link = `${host}/embed/forms/${formSlug}`;

  if (IFrameConfig) {
    return `<iframe src='${link}' width='${IFrameConfig.width || 500}' height='${
      IFrameConfig.height || 500
    }'></iframe>`;
  }

  return link;
};

interface CommonProps {
  title: string;
  formSlug: string;
  host: string;
  IFrameTagConfig?: GetEmbedLinkProps['IFrameTagConfig'];
}

const CopyToClipboardBtn = (props: CommonProps) => {
  const { title, formSlug, host, IFrameTagConfig } = props;

  return (
    <Button
      fullWidth
      type="button"
      variant="contained"
      onClick={() =>
        CopytoClipboard(
          getEmbedLink({
            formSlug,
            host,
            IFrameTagConfig,
          }),
        )
      }
    >
      {title}
    </Button>
  );
};

// const IFrameTag = () => {};

interface EmbedFormProps {
  formSlug: string;
  host: string;
}

const EmbedForm: NextPage<EmbedFormProps> = ({ formSlug, host }: EmbedFormProps) => {
  const [value, setValue] = useState('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Container>
      <DisplayForm
        slug={formSlug}
        settings={{
          widgetType: 'form',
        }}
      />

      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="tabs" centered>
            <Tab label="Links" value="1" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <List>
            <ListItem>
              <CopyToClipboardBtn formSlug={formSlug} title="Copy Form Embed Link" host={host} />
            </ListItem>
            <ListItem>
              <CopyToClipboardBtn
                formSlug={formSlug}
                title="Copy IFrame Tag Link"
                host={host}
                IFrameTagConfig={{
                  height: 500,
                  width: 500,
                }}
              />
            </ListItem>
          </List>
        </TabPanel>
      </TabContext>
    </Container>
  );
};

export default EmbedForm;

export const getServerSideProps: GetServerSideProps<EmbedFormProps> = async (ctx) => {
  const { formSlug } = ctx.query;

  if (!formSlug || Array.isArray(formSlug))
    return {
      notFound: true,
    };

  return {
    props: {
      formSlug,
      host: ctx.req.headers.host,
    },
  };
};
