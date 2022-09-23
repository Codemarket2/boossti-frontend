// NEXTJS
import type { NextPage, GetServerSideProps } from 'next';
import { useEffect, useState } from 'react';

// MUI
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

// WEB
import { DisplayForm, DisplayFormSettings } from '../../../src/components/form2/DisplayForm';
import { EditEmbeddedSettings } from '../../../src/components/embedded/EditEmbeddedSettings';

const CopytoClipboard = (text: string) => navigator.clipboard.writeText(text);

interface GetEmbedLinkProps {
  IFrameTagConfig?: {
    width?: number;
    height?: number;
  };
  /** Embedded Form Settings */
  FormSettings: DisplayFormSettings;
}

const getSrcURL = (formSettings: DisplayFormSettings) =>
  `${window.location.origin}${window.location.pathname}?settings=${encodeURIComponent(
    JSON.stringify(formSettings),
  )}`;

const getEmbedLink = (config: GetEmbedLinkProps) => {
  const { IFrameTagConfig: IFrameConfig, FormSettings } = config;

  const link = getSrcURL(FormSettings);

  return `<iframe src='${link}' width='${IFrameConfig.width || 500}' height='${
    IFrameConfig.height || 500
  }'></iframe>`;
};

interface CommonProps {
  title: string;
  IFrameTagConfig?: GetEmbedLinkProps['IFrameTagConfig'];
  FormSettings: DisplayFormSettings;
  type: 'url' | 'iframe';
}

const CopyToClipboardBtn = ({ title, IFrameTagConfig, FormSettings, type }: CommonProps) => {
  return (
    <Button
      fullWidth
      type="button"
      variant="contained"
      onClick={() =>
        CopytoClipboard(
          type === 'url'
            ? getSrcURL(FormSettings)
            : getEmbedLink({
                IFrameTagConfig: IFrameTagConfig || {},
                FormSettings,
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
  // host: string;
  /** Embedded Form Settings */
  queryFormSettings: DisplayFormSettings;
}

const EmbedForm: NextPage<EmbedFormProps> = ({ formSlug, queryFormSettings }: EmbedFormProps) => {
  const [formSettings, setFormSettings] = useState<DisplayFormSettings>(queryFormSettings);

  useEffect(() => {
    if (window && window.history) {
      const NEW_URL = `${window.location.origin}${
        window.location.pathname
      }?settings=${encodeURIComponent(JSON.stringify(formSettings))}`;
      window.history.pushState({ page: NEW_URL }, '', NEW_URL);
    }
  }, [formSettings]);

  return (
    // <Container>
    <Stack spacing={2}>
      <DisplayForm slug={formSlug} settings={formSettings} />
      <Stack spacing={1}>
        <CopyToClipboardBtn title="Copy Embedded Form URL" FormSettings={formSettings} type="url" />
        <CopyToClipboardBtn
          title="Copy IFrame Tag Link"
          FormSettings={formSettings}
          type="iframe"
        />
        <EditEmbeddedSettings
          formSlug={formSlug}
          oldSettings={formSettings}
          onSave={setFormSettings}
        />
      </Stack>
    </Stack>
    // </Container>
  );
};

export default EmbedForm;

export const getServerSideProps: GetServerSideProps<EmbedFormProps> = async (ctx) => {
  const { formSlug, settings: settingsSTRING } = ctx.query;

  let embeddedFormSettings = {};
  try {
    embeddedFormSettings = JSON.parse(settingsSTRING as string);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(
      `Failed to parse (JSON) Embedded Form Settings | Faulty JSON String = ${settingsSTRING}`,
    );
  }

  if (!formSlug || Array.isArray(formSlug))
    return {
      notFound: true,
    };

  return {
    props: {
      formSlug,
      // host: ctx.req.headers.host,
      queryFormSettings: embeddedFormSettings,
    },
  };
};
