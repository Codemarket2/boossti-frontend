import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import slugify from "slugify";
import { updateSettingAction } from '../../redux/actions/setting';
import { systemForms } from '../../utils/systemForms';
import { getFormBySlug } from '../form';
import { getResponses } from '../response/getResponse';

export const useGetApp = () => {
  const [isApp, setIsApp] = useState(false);
  const [loading, setLoading] = useState(true);
  const authState = useSelector(({ auth }: any) => auth);
  const { authenticated } = authState;
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
        limit: 1,
        useGuestClient: !authenticated,
      });
      const appDetailsResponse = appDetailsResponses?.data?.[0];
      if (!appDetailsResponse?._id) throw new Error('app details not found');
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
        useGuestClient: !authenticated,
      });
      const appResponse = appsResponses?.data?.[0];
      if (!appResponse?._id) throw new Error('App not found');
      const appNameField = appDetailsForm?.fields?.find(
        (field) => field?.label?.toLowerCase() === systemForms?.appDetails?.fields?.appName,
      );
      const appName = appDetailsResponse?.values?.find(
        (value) => value?.field === appNameField?._id,
      )?.value;
      // debugger;
      let appMenuItems = [];
      if (authenticated) {
        appMenuItems = await getMenu({ appForm, appResponse });
      }
      dispatch(
        updateSettingAction({
          isApp: true,
          appForm,
          appResponse,
          appError: false,
          appName,
          appMenuItems,
          isInstalled: true,
        }),
      );
    } catch (error) {
      // eslint-disable-next-line no-console
      dispatch(updateSettingAction({ isApp: true, appError: error?.message }));
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
      useGuestClient: !authenticated,
    });
    const items = [];
    menuResponses?.data?.forEach((menuResponse) => {
      const label = menuResponse?.values?.find((value) => value?.field === menuLabelField?._id);
      const form = menuResponse?.values?.find((value) => value?.field === menuFormField?._id);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      items.push({
        label: label?.value,
        formSlug: slugify(form?.form?.name || '', { lower: true }),
      });
    });
    return items;
  };

  useEffect(() => {
    let domain = window.location.host;
    if (
      (!['www.boossti.com'].includes(domain) && !domain?.includes('.cloudfront.net')) ||
      process.env.NEXT_PUBLIC_APP_DOMAIN != null
    ) {
      setIsApp(true);
      dispatch(updateSettingAction({ isApp: true, appError: null }));
      if (domain?.includes('localhost')) {
        domain = process.env.NEXT_PUBLIC_APP_DOMAIN;
      }
      getApp(domain);
    }
    setLoading(false);
  }, [authenticated]);

  // const checkIfAppIsInstalled = async () => {
  //   const appUsersForm = await getFormBySlug(systemForms?.appUsers?.slug);
  //   if (!appUsersForm?._id) throw new Error('App User form not found.');
  //   const userField = appUsersForm?.fields?.find(
  //     (field) => field?.label?.toLowerCase() === systemForms?.appUsers?.fields?.user,
  //   );
  //   const appUsersResponses = await getResponses({
  //     formId: appUsersForm?._id,
  //     valueFilter: JSON.stringify({
  //       'values.field': userField?._id,
  //       'values.response': authState?.attributes?.['custom:_id'],
  //     }),
  //     limit: 10,
  //   });
  //   const appInstanceResponse = appUsersResponses?.data?.[0];
  //   if (appInstanceResponse?._id) {
  //     return true;
  //   }
  //   return false;
  // };

  // useEffect(() => {
  //   if (routerQuery?.instanceCount) {
  //     getInstance();
  //   }
  // }, [routerQuery?.instanceCount]);

  return { isApp, loading };
};
