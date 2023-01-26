// import Link from 'next/link';
import { Fragment, useState } from 'react';
import moment from 'moment';
import Avatar from '@mui/material/Avatar';
import { Box, Button, Typography } from '@mui/material';
import { IField, IForm } from '@frontend/shared/types/form';
import slugify from 'slugify';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUp from '@mui/icons-material/KeyboardArrowUp';
import Tooltip from '@mui/material/Tooltip';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import { IResponse } from '@frontend/shared/types';
import { boolean } from 'mathjs';
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
import LoadingButton from '../common/LoadingButton';
import { InlineEditStateProps } from '../response/DisplayResponse';
import InputGroup from '../common/InputGroup';
import { SubmitStateProps } from '../response/EditResponse';

interface IProps {
  field: IField;
  value: any;
  imageAvatar?: boolean;
  verticalView?: boolean;
  onClickResponse?: () => void;
  form?: IForm;
  onCancel?: () => void;
  inlineEditState?: InlineEditStateProps;
  onClickInlineEdit?: (fieldId: string, valueId: string, editMode: string) => void;
  response?: IResponse;
  onSubmit?: () => Promise<void>;
  loading?: boolean;
  submitState?: SubmitStateProps;
  authorized?: boolean;
  disabled?: boolean;
  showEdit?: boolean;
}

export default function DisplayValue({
  field,
  value: tempValue,
  imageAvatar,
  verticalView,
  loading,
  submitState,
  inlineEditState,
  onCancel,
  onSubmit,
  onClickInlineEdit,
  onClickResponse,
  authorized,
  disabled,
  showEdit,
}: IProps) {
  const value: any = { ...tempValue };
  const [state, setState] = useState({ viewMoreResponse: false });
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
      View {state.viewMoreResponse ? 'Less' : 'More'}
    </Button>
  );

  const EditValueIcon = (
    <>
      {authorized && showEdit && !disabled && inlineEditState && onClickInlineEdit && (
        <>
          {!inlineEditState?.edit && (
            <Tooltip title="Edit">
              <IconButton
                edge="end"
                onClick={() => {
                  // if (onClickEditField) {
                  //   onClickEditField(field?._id, value?._id, 'editValue');
                  // }
                  if (onClickInlineEdit) {
                    onClickInlineEdit(field?._id, value?._id, 'editValue');
                  }
                }}
                size="small"
              >
                <EditIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          )}
        </>
      )}
    </>
  );

  const SubmitButtonComponent = (
    <>
      {onSubmit && submitState && (
        <>
          <Tooltip title="Submit form">
            <div data-testid="submitButton">
              <LoadingButton
                // disabled={disableSubmitButton}
                loading={submitState?.loading || loading}
                onClick={onSubmit}
                variant="contained"
                color="primary"
                size="small"
              >
                Save
              </LoadingButton>
            </div>
          </Tooltip>
        </>
      )}
    </>
  );

  const CancelButton = (
    <>
      {onCancel && submitState && (
        <div data-testid="cancelButton">
          <Button
            variant="outlined"
            size="small"
            className="ml-2"
            onClick={onCancel}
            disabled={submitState?.loading}
          >
            Close
          </Button>
        </div>
      )}
    </>
  );
  const SubmitAndCloseButtons = (
    <>
      {inlineEditState && (
        <>
          {inlineEditState?.valueId === value?._id && (
            <Grid item xs={12}>
              <InputGroup style={{ display: 'flex' }}>
                {SubmitButtonComponent}
                {CancelButton}
              </InputGroup>
            </Grid>
          )}
        </>
      )}
    </>
  );

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
  switch (field?.fieldType) {
    case 'text':
    case 'textarea':
    case 'url':
    case 'email':
    case 'password':
      return (
        <>
          {EditValueIcon}
          <span data-testid="text-output">{value?.value}</span>
        </>
      );
    case 'response': {
      return (
        <>
          <div style={state.viewMoreResponse ? {} : { maxHeight: '150px', overflow: 'hidden' }}>
            <DisplayResponseById
              hideAuthor
              hideDelete
              hideBreadcrumbs
              responseId={value?.response?._id}
              viewLess={!state.viewMoreResponse}
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
          {EditValueIcon}
          <div
            style={
              verticalView
                ? {}
                : state.viewMoreResponse
                ? {}
                : { maxHeight: '150px', overflow: 'hidden' }
            }
          >
            <DisplayRichText value={value?.value} />
          </div>
          {!verticalView && <>{ViewMoreButton}</>}
        </>
      );
    case 'date':
      return (
        <>
          {EditValueIcon}
          <span data-testid="date-output">
            {value?.valueDate && moment(value?.valueDate).format('L')}
          </span>
        </>
      );
    case 'dateTime':
      return (
        <>
          {EditValueIcon}
          <span data-testid="datetime-output">
            {value?.valueDate && moment(value?.valueDate).format('lll')}
          </span>
        </>
      );
    case 'number':
    case 'phoneNumber':
      return (
        <>
          {EditValueIcon}
          <span data-testid="number-output">
            {value?.valueNumber}{' '}
            {field.fieldType === 'number' &&
              field.options?.physicalQuantity &&
              (field.options?.unit || value?.options?.unit)}
          </span>
        </>
      );
    case 'boolean':
      return (
        <>
          {EditValueIcon}
          <span data-testid="boolean-output">{value?.valueBoolean ? 'Yes' : 'No'}</span>
        </>
      );
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
        <>
          {EditValueIcon}
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
        </>
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
      return (
        <>
          {EditValueIcon}
          {value?.value}
        </>
      );
  }
}
