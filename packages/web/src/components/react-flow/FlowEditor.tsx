import React, { useState, useRef, useCallback, createContext } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
} from 'react-flow-renderer';
import { generateObjectId } from '@frontend/shared/utils/objectId';
import Sidebar from './Sidebar';
import CustomNode from './CustomNode';
import Overlay from '../common/Overlay';
import { defaultEdges, defaultNodes } from './defaultNodes';

const nodeTypes = {
  customNode: CustomNode,
};

export interface IFlow {
  nodes: any[];
  edges: any[];
}

interface FlowEditorProps {
  open: boolean;
  onClose: () => void;
  flow: IFlow;
  editMode?: boolean;
  onFlowChange: (flow: IFlow) => void;
}

export default function FlowEditor({
  open,
  onClose,
  flow,
  editMode = false,
  onFlowChange,
}: FlowEditorProps) {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(flow?.nodes || defaultNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(flow?.edges || defaultEdges);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);
  const onNodeChange = useCallback((id, newData) => {
    setNodes((nds) => nds.map((node) => (node?.id === id ? { ...node, data: newData } : node)));
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
      const newNodeData = JSON.parse(event.dataTransfer.getData('application/reactflow'));
      // check if the dropped element is valid
      if (typeof newNodeData === 'undefined' || !newNodeData) {
        return;
      }

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });
      const newNode = {
        id: generateObjectId(),
        type: 'customNode',
        position,
        data: newNodeData,
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance],
  );

  return (
    <FlowContext.Provider value={{ onNodeChange }}>
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
        <div style={{ height: 'calc(100vh - 50px)', minHeight: 300 }}>
          <div className="dndflow">
            <ReactFlowProvider>
              <div className="reactflow-wrapper" ref={reactFlowWrapper}>
                <ReactFlow
                  nodeTypes={nodeTypes}
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
                  elementsSelectable={editMode}
                >
                  <Controls showInteractive={editMode} />
                  <Background color="#aaa" gap={16} />
                </ReactFlow>
              </div>
              {editMode && <Sidebar />}
            </ReactFlowProvider>
          </div>
        </div>
      </Overlay>
    </FlowContext.Provider>
  );
}

export const FlowContext = createContext({
  onNodeChange: (id, newData) => {
    //
  },
});
