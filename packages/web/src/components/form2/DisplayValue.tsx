import { Fragment } from 'react';
import moment from 'moment';
import Avatar from '@material-ui/core/Avatar';
import DisplayRichText from '../common/DisplayRichText';
import { ShowResponseLabel } from '../response/ResponseDrawer';
import ListItemDrawer from '../list/ListItemDrawer';
import ImageList from '../post/ImageList';

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
      if (field?.options?.optionsListType === 'type') {
        return <ListItemDrawer title={value.itemId.title} slug={value.itemId.slug} />;
      }
      if (field?.options?.optionsListType === 'existingForm') {
        return (
          <ShowResponseLabel formField={field?.options?.formField} response={value?.response} />
        );
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
      return <ImageList media={value?.media} />;
    default:
      return <>{value?.value}</>;
  }
}
