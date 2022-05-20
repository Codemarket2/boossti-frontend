import Link from 'next/link';
import { Fragment } from 'react';
import moment from 'moment';
import Avatar from '@mui/material/Avatar';
import { Box, Typography } from '@mui/material';
import DisplayRichText from '../common/DisplayRichText';
import { ShowResponseLabel } from '../response/ResponseDrawer';
import PageDrawer from '../template/PageDrawer';
import ImageList from '../post/ImageList';
import { LighthouseReport } from './LighthouseReportRendrer';

interface IProps {
  field: any;
  value: any;
  imageAvatar?: boolean;
}

export default function DisplayValue({ field, value, imageAvatar }: IProps) {
  const address = value?.value.split('+');
  const addressKey = ['Address', 'Landmark', 'City', 'State', 'Country'];

  switch (field.fieldType) {
    case 'text':
    case 'textarea':
    case 'url':
    case 'email':
    case 'password':
      return <>{value?.value}</>;
    case 'select': {
      let optionsTemplate = field.options?.optionsTemplate || value?.options?.optionsTemplate;
      let valueFormField = value?.options?.formField;
      if (typeof value?.options === 'string') {
        optionsTemplate =
          field.options?.optionsTemplate || JSON.parse(value?.options)?.optionsTemplate;
        valueFormField = JSON.parse(value?.options)?.formField;
      }
      if (optionsTemplate === 'template') {
        if ((field?.template?._id || value.template?._id) && value.page) {
          return <PageDrawer title={value.page?.title} slug={value.page?.slug} />;
        }
        return <Link href={`/${value?.template?.slug}`}>{value?.template?.title}</Link>;
      }
      if (optionsTemplate === 'existingForm') {
        if (
          ((field?.form?._id && field?.options?.formField) ||
            (value?.form?._id && valueFormField)) &&
          value?.response
        ) {
          return (
            <ShowResponseLabel
              formField={field?.form?._id ? field.options?.formField : valueFormField}
              response={value?.response}
            />
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
      return <DisplayValue field={{ fieldType: optionsTemplate }} value={value} />;
      // return <>{value?.value}</>;
    }
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
    case 'address':
      return (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          {address.map((res, index) => (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <b>{res !== '' && `${addressKey[index]}: `} </b>
              <Typography sx={{ marginLeft: '5px' }} key={index}>
                {res !== '' && `${res},`}
              </Typography>
            </Box>
          ))}
        </Box>
      );
    case 'output':
      return <LighthouseReport report={value?.value} />;
    default:
      return <>{value?.value}</>;
  }
}
