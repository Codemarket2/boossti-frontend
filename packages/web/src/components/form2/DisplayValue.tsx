// import Link from 'next/link';
import { Fragment, useState, useEffect } from 'react';
import moment from 'moment';
import Avatar from '@mui/material/Avatar';
import { Box, Button, Typography } from '@mui/material';
import { IField } from '@frontend/shared/types/form';
import slugify from 'slugify';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUp from '@mui/icons-material/KeyboardArrowUp';
import DisplayRichText from '../common/DisplayRichText';
// import { ShowResponseLabel } from '../response/ResponseDrawer';
// import PageDrawer from '../template/PageDrawer';
import ImageList from '../post/ImageList';
import DisplayFiles from '../fileLibrary/DisplayFiles';
import { LighthouseReport } from './LighthouseReportRendrer';
import DisplayBoard from './board/DisplayBoard';
import DisplayDiagram from '../syncfusion-diagram/DisplayDiagram';
import ReactFlow from '../react-flow/ReactFlow';
// import DisplayFormulaValue from './formula/DisplayFormulaValue';
import DisplayFieldCondition from './field/field-condition/DisplayFieldCondition';
import GrapesOverlay from '../grapesjs/grapesOverlay';
import DisplaySignature from '../signature/DisplaySignature';
import { PageViewerOverlayBtn as CraftsJSPageViewer } from '../craftJS/craftJSPageViewer';
import DisplayResponseById from '../response/DisplayResponseById';
import DisplayCard from '../card/DisplayCard';
import FormGrid from '../../../pages/ReactGridLayout/ReactGridLayout';

interface IProps {
  field: Partial<IField>;
  value: any;
  imageAvatar?: boolean;
  verticalView?: boolean;
  onClickResponse?: (vieMore: boolean) => void;
}

export default function DisplayValue({
  field,
  value: tempValue,
  imageAvatar,
  verticalView,
  onClickResponse,
}: IProps) {
  // console.log(field, 'Dispalyvalue field');
  const value: any = { ...tempValue };
  // console.log(value, 'displayvalue val');
  // // const formDataString = {value?.value}; // Replace this with your actual GraphQL query response string
  // const parsedobject = JSON.parse(value?.value);
  const [state, setState] = useState({
    viewMoreResponse: false,
  });
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

  const ViewMoreButton = (
    <Button
      size="small"
      endIcon={state.viewMoreResponse ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
      onClick={() =>
        setState((oldState) => ({ ...oldState, viewMoreResponse: !state.viewMoreResponse }))
      }
      className="mb-2"
    >
      {/* View {state.viewMoreResponse ? 'Less' : 'More'} */}
    </Button>
  );

  switch (field?.fieldType) {
    case 'text':
    case 'textarea':
    case 'url':
    case 'email':
    case 'password':
      return <span data-testid="text-output">{value?.value}</span>;
    case 'response': {
      return (
        <>
          <div style={state.viewMoreResponse ? {} : { maxHeight: '158px', overflow: 'hidden' }}>
            <DisplayResponseById
              hideAuthor
              hideDelete
              hideBreadcrumbs
              responseId={value?.response?._id}
              viewLess={!state.viewMoreResponse}
              handleViewLess={(viewMore: boolean) => {
                setState({ ...state, viewMoreResponse: viewMore });
              }}
            />
          </div>
          {ViewMoreButton}
        </>
      );
      // return (
      //   <ShowResponseLabel
      //     formId={field?.form?._id}
      //     formField={field.options?.formField}
      //     response={value?.response}
      //     onClickResponse={onClickResponse}
      //   />
      // );
    }
    case 'form':
      return value?.form?.name ? (
        <a
          target="_blank"
          rel="noreferrer"
          href={`/form/${slugify(value?.form?.name, { lower: true })}`}
        >
          <Typography color="primary">{value?.form?.name}</Typography>
        </a>
      ) : (
        <Typography>NA</Typography>
      );
    case 'link':
      return <a href={value?.value}>{value?.value}</a>;
    case 'richTextarea':
      return (
        <>
          <div
            style={
              verticalView
                ? {}
                : state.viewMoreResponse
                ? {}
                : { maxHeight: '158px', overflow: 'hidden' }
            }
          >
            <DisplayRichText value={value?.value} />
          </div>
          {!verticalView && <>{ViewMoreButton}</>}
        </>
      );
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
      return (
        <ReactFlow _id={value?._id} flow={value?.options?.flowDiagram} noOverlay={verticalView} />
      );
    case 'condition':
      return <DisplayFieldCondition conditions={value?.options?.conditions} />;
    case 'webpage':
      return (
        <div>
          <GrapesOverlay value={value?.value} />
        </div>
      );
    case 'signature':
      return <DisplaySignature value={value?.value} />;
    case 'card':
      return <DisplayCard value={value?.value} />;
    case 'formField':
      return (
        <div>
          <DisplayFieldCondition
            conditions={[
              { left: value?.options?.subField, operator: null, right: null, conditionType: null },
            ]}
          />
        </div>
      );
    case 'craftjs':
      return <CraftsJSPageViewer PageContent={value?.value} />;

    default:
      return <> {value?.value}</>;
  }
}
