import Edit from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import FlowEditor, { IFlow } from './FlowEditor';

interface ReactFlowProps {
  _id: string;
  flow: IFlow;
  onFlowChange?: (flow: IFlow) => void;
  editMode?: boolean;
}

export default function ReactFlow({ _id, flow, onFlowChange, editMode }: ReactFlowProps) {
  const [editor, setEditor] = useState(false);
  const router = useRouter();

  const toggleEditor = () => {
    if (editor) {
    
      delete router?.query?.flowEditor;
      delete router?.query?.editMode;
     
    } else {
    
      if(editMode){
        router.query.editMode = _id;
      }else{
        router.query.flowEditor = _id;
      }
    }

    router.push(router);
  };

  useEffect(() => {
    if (router?.query?.flowEditor && router?.query?.flowEditor === _id && !editor ) {
      setEditor(true);
    } else if (router?.query?.flowEditor !== _id && editor) {
      setEditor(false);
    }
   
  }, [router?.query?.flowEditor]);

  useEffect(() => {
    if (router?.query?.editMode && router?.query?.editMode === _id && !editor && editMode ) {
     
      setEditor(true);
   
    } else if (router?.query?.editMode !== _id && editor) {
      
      setEditor(false);
   
    }
   
  }, [router?.query?.editMode]);
  return (
    <div data-testid="reactFlow-output">
      <Button
        data-testid="button"
        size="small"
        startIcon={editMode && <Edit />}
        variant="contained"
        onClick={() => {
       
          toggleEditor()
      
        }}
      >
        {editMode ? 'Edit' : 'View'} Flow Diagram
      </Button>
      {editor && (
        <FlowEditor
          overlay
          editMode={editMode}
          open={editor}
          onClose={() => toggleEditor()}
          flow={flow}
          onFlowChange={(newFlow) => {
            if (editMode) onFlowChange(newFlow);
          }}
        />
      )}
    </div>
  );
}
