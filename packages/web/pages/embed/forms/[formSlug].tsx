// NEXTJS
import type { NextPage, GetServerSideProps } from 'next';

// WEB
import { DisplayForm, DisplayFormSettings } from '../../../src/components/form2/DisplayForm';

interface EmbedFormProps {
  formSlug: string;
  // host: string;
  /** Embedded Form Settings */
  queryFormSettings: DisplayFormSettings;
}

const EmbedForm: NextPage<EmbedFormProps> = ({ formSlug, queryFormSettings }: EmbedFormProps) => {
  return <DisplayForm slug={formSlug} settings={queryFormSettings} />;
};

export default EmbedForm;

export const getServerSideProps: GetServerSideProps<EmbedFormProps> = async (ctx) => {
  const { formSlug, settings: settingsSTRING } = ctx.query;

  let embeddedFormSettings = {};
  try {
    embeddedFormSettings = JSON.parse(atob(settingsSTRING as string));
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
