import { Fragment } from 'react';
import moment from 'moment';
import Avatar from '@material-ui/core/Avatar';
import DisplayRichText from '../common/DisplayRichText';
import { ShowResponseLabel } from '../response/ResponseDrawer';
import PageDrawer from '../template/PageDrawer';
import ImageList from '../post/ImageList';
import Link from 'next/link';

interface IProps {
  field: any;
  value: any;
  imageAvatar?: boolean;
}

export default function DisplayValue({ field, value, imageAvatar }: IProps) {
  switch (field.fieldType) {
    case 'text':
    case 'textarea':
    case 'url':
    case 'email':
    case 'password':
      return <>{value?.value}</>;
    case 'select':
      if (field?.options?.optionsTemplate === 'template') {
        if (field?.template?._id) {
          return <PageDrawer title={value.page?.title} slug={value.page?.slug} />;
        }
        return <Link href={`/${value?.template?.slug}`}>{value?.template?.title}</Link>;
      }
      if (field?.options?.optionsTemplate === 'existingForm') {
        if (field?.form?._id && field?.options?.formField) {
          return (
            <ShowResponseLabel formField={field?.options?.formField} response={value?.response} />
          );
        }
        return <>{value?.form?.name}</>;
      }
      if (field?.options?.showAsCheckbox) {
        return (
          <>
            {value?.values?.map((v, i) => (
              <Fragment key={i}>
                {v}
                <br />
              </Fragment>
            ))}
          </>
        );
      }
      return <>{value?.value}</>;
    case 'link':
      return <a href={value?.value}>{value?.value}</a>;
    case 'richTextarea':
      return <DisplayRichText value={value?.value} />;
    case 'date':
      return <>{value?.valueDate && moment(value?.valueDate).format('L')}</>;
    case 'dateTime':
      return <>{value?.valueDate && moment(value?.valueDate).format('lll')}</>;
    case 'number':
    case 'phoneNumber':
      return <>{value?.valueNumber}</>;
    case 'checkbox':
      return <>{value?.valueBoolean?.toString()}</>;
    case 'image':
      if (imageAvatar) {
        return (
          <>
            {value?.media?.map((image, i) => (
              <Avatar key={i} alt={`image-${i + 1}`} src={image?.url} />
            ))}
          </>
        );
      }
      return (
        <ImageList
          media={value?.tempMedia ? [...value?.media, ...value?.tempMedia] : value?.media}
        />
      );
    default:
      return <>{value?.value}</>;
  }
}
