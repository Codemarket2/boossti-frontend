import React, { useState, useRef, useCallback, createContext } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  MarkerType,
} from 'react-flow-renderer';
import { generateObjectId } from '@frontend/shared/utils/objectId';
import Sidebar from './Sidebar';
import CustomNode from './CustomNode';
import CustomNode2 from './CustomNode2';
import CustomEdge from './CustomEdge';
import Overlay from '../common/Overlay';
import { defaultEdges, defaultNodes } from './defaultNodes';

const nodeTypes = {
  customNode: CustomNode,
  customNode2: CustomNode2,
};

const edgeTypes = {
  customEdge: CustomEdge,
};

export interface IFlow {
  nodes: any[];
  edges: any[];
}

interface FlowEditorProps {
  open?: boolean;
  onClose?: () => void;
  flow: IFlow;
  editMode?: boolean;
  onFlowChange?: (flow: IFlow) => void;
  overlay?: boolean;
}

export default function FlowEditor({
  open,
  onClose,
  flow,
  editMode = false, 
  onFlowChange,
  overlay,
}: FlowEditorProps) {
 
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(flow?.nodes || defaultNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(flow?.edges || defaultEdges);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const onConnect = useCallback(
    (params) =>
      setEdges((eds) =>
        addEdge(
          {
            ...params,
            markerEnd: {
              type: MarkerType.ArrowClosed,
              color: '#808080',
            },
            animated: true,
            type: 'customEdge',
            style: {
              stroke: '#808080',
            },
          },
          eds,
        ),
      ),
    [],
  );
  const onNodeChange = useCallback((id, newData) => {
    setNodes((nds) => nds.map((node) => (node?.id === id ? { ...node, data: newData } : node)));
  }, []);

  const onEdgeChange = useCallback((id, newEdge) => {
    setEdges((edgs) => edgs.map((node) => (node?.id === id ? { ...node, ...newEdge } : node)));
  }, []);

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    // eslint-disable-next-line no-param-reassign
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();

      let dropData = event.dataTransfer.getData('application/reactflow');

      // check if the dropped element is valid
      if (!dropData) {
        return;
      }
      dropData = JSON.parse(dropData);

      if (!dropData?.data || !dropData?.nodeType) {
        return;
      }

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });
      const newNode = {
        id: generateObjectId(),
        type: dropData?.nodeType,
        position,
        data: {
          ...dropData?.data,
          ports: [
            { _id: generateObjectId(), position: 'top', type: 'target' },
            { _id: generateObjectId(), position: 'bottom', type: 'source' },
            { _id: generateObjectId(), position: 'left', type: 'target' },
            { _id: generateObjectId(), position: 'right', type: 'source' },
          ],
        },
      };
      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance],
  );

  const Editor = (
    <FlowContext.Provider value={{ onNodeChange, editMode, onEdgeChange }}>
      <div style={{ height: 'calc(100vh - 50px)', minHeight: 300 }}>
        <div className="dndflow">
          <ReactFlowProvider>
            <div className="reactflow-wrapper" ref={reactFlowWrapper}>
              <ReactFlow
                nodeTypes={nodeTypes}
                edgeTypes={edgeTypes}
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onInit={setReactFlowInstance}
                onDrop={onDrop}
                onDragOver={onDragOver}
                fitView
                nodesDraggable={editMode}
                nodesConnectable={editMode}
                // elementsSelectable={editMode}
              >
                <Controls showInteractive={editMode} />
                <Background color="#aaa" gap={16} />
              </ReactFlow>
            </div>
            {editMode && <Sidebar />}
          </ReactFlowProvider>
        </div>
      </div>
    </FlowContext.Provider>
  );

  return (
    <>
      {overlay ? (
        <Overlay
          title="Flow Diagram"
          open={open}
          onClose={() => {
            onClose();
            onFlowChange({ nodes, edges });
          }}
          maxWidth="90vw"
          minWidth="90vw"
        >
          {Editor}
        </Overlay>
      ) : (
        Editor
      )}
    </>
  );
}

export const FlowContext = createContext({
  onNodeChange: (id, newData) => {
    //
  },
  editMode: false,
  onEdgeChange: (id, newEdge) => {
    //
  },
});
