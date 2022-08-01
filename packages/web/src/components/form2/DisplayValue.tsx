// import Link from 'next/link';
import { Fragment } from 'react';
import moment from 'moment';
import Avatar from '@mui/material/Avatar';
import { Box, Typography } from '@mui/material';
import { IField } from '@frontend/shared/types/form';
import slugify from 'slugify';
import Link from 'next/link';
import DisplayRichText from '../common/DisplayRichText';
import { ShowResponseLabel } from '../response/ResponseDrawer';
// import PageDrawer from '../template/PageDrawer';
import ImageList from '../post/ImageList';
import DisplayFiles from '../fileLibrary/DisplayFiles';
import { LighthouseReport } from './LighthouseReportRendrer';
import DisplayBoard from './board/DisplayBoard';
import DisplayDiagram from '../syncfusion-diagram/DisplayDiagram';
import ReactFlow from '../react-flow/ReactFlow';
// import DisplayFormulaValue from './formula/DisplayFormulaValue';
import DisplayFieldCondition from './field/field-condition/DisplayFieldCondition';

interface IProps {
  field: Partial<IField>;
  value: any;
  imageAvatar?: boolean;
  verticalView?: boolean;
}

export default function DisplayValue({
  field,
  value: tempValue,
  imageAvatar,
  verticalView,
}: IProps) {
  const value: any = { ...tempValue };

  if (typeof value?.options === 'string') {
    value.options = JSON.parse(value?.options);
  }
  if (
    field?.options?.selectItem &&
    field?.options?.showAsCheckbox &&
    !['response'].includes(field.fieldType)
  ) {
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
  // if (field?.options?.systemCalculatedAndView) {
  //   return <DisplayFormulaValue formula={field?.options?.formula} />;
  // }

  switch (field.fieldType) {
    case 'text':
    case 'textarea':
    case 'url':
    case 'email':
    case 'password':
      return <span data-testid="text-output">{value?.value}</span>;
    case 'response':
      return <ShowResponseLabel formField={field.options?.formField} response={value?.response} />;
    case 'form':
      return value?.form?.name ? (
        <a
          target="_blank"
          rel="noreferrer"
          href={`/forms/${slugify(value?.form?.name, { lower: true })}`}
        >
          <Typography color="primary">{value?.form?.name}</Typography>
        </a>
      ) : (
        <Typography>NA</Typography>
      );
    case 'link':
      return <a href={value?.value}>{value?.value}</a>;
    case 'richTextarea':
      return <DisplayRichText value={value?.value} />;
    case 'date':
      return (
        <span data-testid="date-output">
          {value?.valueDate && moment(value?.valueDate).format('L')}
        </span>
      );
    case 'dateTime':
      return (
        <span data-testid="datetime-output">
          {value?.valueDate && moment(value?.valueDate).format('lll')}
        </span>
      );
    case 'number':
    case 'phoneNumber':
      return (
        <span data-testid="number-output">
          {value?.valueNumber}{' '}
          {field.fieldType === 'number' &&
            field.options?.physicalQuantity &&
            (field.options?.unit || value?.options?.unit)}
        </span>
      );
    case 'boolean':
      return <span data-testid="boolean-output">{value?.valueBoolean ? 'Yes' : 'No'}</span>;
    case 'image':
      if (imageAvatar) {
        return (
          <>
            {value?.media?.map((image, i) => (
              <Avatar data-testid="image-output" key={i} alt={`image-${i + 1}`} src={image?.url} />
            ))}
          </>
        );
      }
      return (
        <ImageList
          media={value?.tempMedia ? [...value?.media, ...value?.tempMedia] : value?.media}
        />
      );
    case 'file': {
      return <DisplayFiles urls={[value?.value]} />;
    }
    case 'address': {
      const address = value?.value?.split('+');
      const addressKey = ['Address', 'Landmark', 'City', 'State', 'Country'];
      return (
        <Box data-testid="address-output" sx={{ display: 'flex', flexDirection: 'column' }}>
          {address.map((res, index) => (
            <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
              <b>{res !== '' && `${addressKey[index]}: `} </b>
              <Typography sx={{ marginLeft: '5px' }} key={index}>
                {res !== '' && `${res},`}
              </Typography>
            </Box>
          ))}
        </Box>
      );
    }
    case 'lighthouseReport':
      return (
        <>
          {field?.options?.systemCalculatedAndSaved ? (
            <LighthouseReport report={value?.value} />
          ) : (
            <>{value?.value}</>
          )}
        </>
      );
    case 'board':
      return <DisplayBoard board={value?.options?.board} verticalView={verticalView} />;
    case 'diagram':
      return <DisplayDiagram diagram={value?.options?.diagram} />;
    case 'flowDiagram':
      return <ReactFlow _id={value?._id} flow={value?.options?.flowDiagram} />;
    case 'condition':
      return <DisplayFieldCondition conditions={value?.options?.conditions} />;
    default:
      return <>{value?.value}</>;
  }
}
