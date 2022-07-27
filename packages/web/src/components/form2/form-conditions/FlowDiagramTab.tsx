import { IForm, IFormulaVariable } from '@frontend/shared/types/form';
import { generateObjectId } from '@frontend/shared/utils/objectId';
import { MarkerType } from 'react-flow-renderer';
import FlowEditor from '../../react-flow/FlowEditor';

interface FlowDiagramTabProps {
  form: IForm;
}

export default function FlowDiagramTab({ form }: FlowDiagramTabProps) {
  const getNodes = () => {
    let y = 0;
    let x = 0;
    return form?.fields?.map((field, fieldIndex) => {
      if (fieldIndex !== 0) {
        x += 300;
        if (fieldIndex % 3 === 0) {
          y += 285;
          x = 0;
        }
      }

      return {
        id: field?._id,
        type: 'customNode',
        data: {
          label: field?.label,
          fieldId: field?._id,
          formId: form?._id,
          formView: 'formField',
        },
        position: { x, y },
      };
    });
  };

  const getEdges = () => {
    const edges = [];
    form?.fields?.forEach((field) => {
      if (
        field?.options?.systemCalculatedAndView &&
        field?.options?.formula?.variables?.length > 0
      ) {
        const connections = findConnectedFields(field?.options?.formula?.variables);
        connections?.forEach((connection) => {
          const edge = {
            id: generateObjectId(),
            source: connection,
            target: field?._id,
            animated: true,
            markerEnd: {
              type: MarkerType.ArrowClosed,
            },
          };
          edges.push(edge);
        });
      }
    });
    return edges;
  };
  return (
    <div>
      <FlowEditor
        // editMode
        flow={{
          nodes: getNodes(),
          edges: getEdges(),
        }}
      />
    </div>
  );
}

const findConnectedFields = (variables: IFormulaVariable[]): string[] => {
  let connectedFields: string[] = [];
  variables?.forEach((variable) => {
    const valueType = variable.value;
    if (valueType === 'brackets' && variable?.variables?.length > 0) {
      const childConnectedFields = findConnectedFields(variable?.variables);
      connectedFields = [...connectedFields, ...childConnectedFields];
    } else if (valueType && valueType !== 'constantValue') {
      connectedFields.push(valueType);
    }
  });
  return connectedFields;
};
