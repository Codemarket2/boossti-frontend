import { useRouter } from 'next/router';
import React, { useEffect, useMemo } from 'react';
import Paper from '@mui/material/Paper';
import { defaultValueObject } from '@frontend/shared/hooks/response/createUpdateResponse';
import { IForm, IResponse } from '@frontend/shared/types';
import { useGetFormBySlug } from '@frontend/shared/hooks/form';
import { useGetResponseByCount } from '@frontend/shared/hooks/response';
import ResponseScreen from '../../../../../src/screens/ResponseScreen';
import UserLayout from '../../../../../src/components/common/UserLayout';
import FormView from '../../../../../src/components/form2/FormView';
import { DisplayResponse } from '../../../../../src/components/response/DisplayResponse';

export default function Page() {
  const router = useRouter();
  const { count, slug: parentFormSlug, childFormSlug } = router.query;
  const { data: childFormData } = useGetFormBySlug(childFormSlug?.toString());
  const { data: parentForm } = useGetFormBySlug(parentFormSlug?.toString());
  const { data: responseData } = useGetResponseByCount(
    parentForm?.getFormBySlug?._id,
    Number(count),
  );

  // const field = useMemo(() => , [second])

  return (
    <div>
      <UserLayout authRequired={false} container={false} feedLayout>
        {parentForm?.getFormBySlug?._id && responseData?.getResponseByCount?._id && (
          <>
            <DisplayResponse
              response={responseData?.getResponseByCount}
              form={parentForm?.getFormBySlug}
              // hideBreadcrumbs
              // deleteCallBack={deleteCallback}
              // defaultShowFieldsMenu
            />
            {childFormData?.getFormBySlug?._id && (
              <DisplayChildForm
                parentResponse={responseData?.getResponseByCount}
                parentForm={parentForm?.getFormBySlug}
                childForm={childFormData?.getFormBySlug}
              />
            )}
          </>
        )}
      </UserLayout>
    </div>
  );
}

function DisplayChildForm({
  parentForm,
  childForm,
  parentResponse,
}: {
  parentForm: IForm;
  childForm: IForm;
  parentResponse: IResponse;
}) {
  const field = useMemo(() => {
    const selectedField = childForm?.fields?.find((field) => field?.form?._id === parentForm?._id);
    return selectedField;
  }, [parentForm, childForm]);

  return (
    <div>
      <Paper>
        {field?._id && (
          <FormView
            overrideValues={[
              {
                ...defaultValueObject,
                field: field?._id,
                response: parentResponse?._id,
              },
            ]}
            form={{
              ...childForm,
              settings: { ...childForm.settings, widgetType: 'form' },
            }}
          />
        )}
      </Paper>
    </div>
  );
}
