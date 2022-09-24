import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import slugify from 'slugify';
import { updateSettingAction } from '../../redux/actions/setting';
import { systemForms } from '../../utils/systemForms';
import { getFormBySlug } from '../form';
import { getResponses } from '../response/getResponse';

export const useGetApp = (routerQuery) => {
  const [isApp, setIsApp] = useState(false);
  const [loading, setLoading] = useState(true);
  const { authenticated } = useSelector(({ auth }: any) => auth);
  const dispatch = useDispatch();

  const getApp = async (domain) => {
    try {
      const appDetailsForm = await getFormBySlug(systemForms.appDetails.slug);
      if (!appDetailsForm?._id) throw new Error('appsDetailsForm not found');
      const subdomainField = appDetailsForm?.fields?.find(
        (field) => field?.label?.toLowerCase() === systemForms?.appDetails?.fields?.subdomain,
      );
      const appDetailsResponses = await getResponses({
        formId: appDetailsForm?._id,
        valueFilter: JSON.stringify({
          'values.field': subdomainField?._id,
          'values.value': domain,
        }),
        limit: 2,
      });
      const appDetailsResponse = appDetailsResponses?.data?.[0];
      const appForm = await getFormBySlug(systemForms.apps.slug);
      const appDetailsField = appForm?.fields?.find(
        (field) => field?.label?.toLowerCase() === systemForms?.apps?.fields?.appDetails,
      );
      if (!appDetailsField?._id) throw new Error('appDetailsField field not found in app form');
      const appsResponses = await getResponses({
        formId: appForm?._id,
        valueFilter: JSON.stringify({
          'values.field': appDetailsField?._id,
          'values.response': appDetailsResponse?._id,
        }),
        limit: 1,
      });
      const appResponse = appsResponses?.data?.[0];
      if (!appResponse?._id) throw new Error('App not found');
      const appNameField = appDetailsForm?.fields?.find(
        (field) => field?.label?.toLowerCase() === systemForms?.appDetails?.fields?.appName,
      );
      const appName = appDetailsResponse?.values?.find(
        (value) => value?.field === appNameField?._id,
      )?.value;
      const appMenuItems = await getMenu({ appForm, appResponse });
      dispatch(
        updateSettingAction({
          isApp: true,
          appForm,
          appResponse,
          appError: false,
          appName,
          appMenuItems,
        }),
      );
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log({ error });
      dispatch(updateSettingAction({ isApp: true, appError: true }));
    }
  };

  const getMenu = async ({ appResponse, appForm }) => {
    const dashboardFormsField = appForm?.fields?.find(
      (field) => field?.label?.toLowerCase() === systemForms?.apps?.fields?.dashboardForms,
    );
    const forms = appResponse?.values?.filter((value) => value?.field === dashboardFormsField?._id);
    const responseIds = [];
    forms?.forEach((form) => {
      if (form?.response?._id) {
        responseIds.push(form?.response?._id);
      }
    });
    const menuForm = await getFormBySlug(systemForms?.appMenu?.slug);
    const menuLabelField = menuForm?.fields?.find(
      (field) => field?.label?.toLowerCase() === systemForms?.appMenu?.fields?.menuLabel,
    );
    const menuFormField = menuForm?.fields?.find(
      (field) => field?.label?.toLowerCase() === systemForms?.appMenu?.fields?.form,
    );
    const menuResponses = await getResponses({
      formId: menuForm?._id,
      valueFilter: JSON.stringify({
        _id: { $in: responseIds },
      }),
      limit: responseIds?.length,
    });
    const items = [];
    menuResponses?.data?.forEach((menuResponse) => {
      const label = menuResponse?.values?.find((value) => value?.field === menuLabelField?._id);
      const form = menuResponse?.values?.find((value) => value?.field === menuFormField?._id);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      items.push({ label: label?.value, formSlug: slugify(form?.form?.name, { lower: true }) });
    });
    return items;
  };

  useEffect(() => {
    let domain = window.location.host;
    if (!['localhost:3000', 'www.boossti.com'].includes(domain)) {
      setIsApp(true);
      dispatch(updateSettingAction({ isApp: true, appError: false }));
      if (domain?.includes('localhost')) {
        domain = 'lab.boossti.com';
      }
      getApp(domain);
    }
    setLoading(false);
  }, [authenticated]);

  const getInstance = async () => {
    const appUsersForm = await getFormBySlug(systemForms?.appUsers?.slug);
    const appUsersResponses = await getResponses({
      formId: appUsersForm?._id,
      valueFilter: JSON.stringify({ count: routerQuery?.instanceCount }),
      limit: 10,
    });
    const appInstanceResponse = appUsersResponses?.data?.[0];
    dispatch(
      updateSettingAction({
        appInstanceResponse,
      }),
    );
    // const instanceCount = routerQuery?.instanceCount;
    // debugger;
  };

  useEffect(() => {
    if (routerQuery?.instanceCount) {
      getInstance();
    }
  }, [routerQuery?.instanceCount]);

  return { isApp, loading };
};