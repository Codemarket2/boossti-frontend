import { useResolveCondition } from '@frontend/shared/hooks/response';
import { ICondition } from '@frontend/shared/types';
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
  noOverlay?: boolean;
  functionalityFlowDiagram?: boolean;
  functionalityFlowDiagramConditions?: ICondition[];
  responseId?: string;
}

export default function ReactFlow({
  _id,
  flow,
  onFlowChange,
  editMode,
  noOverlay,
  functionalityFlowDiagram: tempFunctionalityFlowDiagram,
  functionalityFlowDiagramConditions,
  responseId,
}: ReactFlowProps) {
  const [init, setInit] = useState(false);
  const [editor, setEditor] = useState(false);
  const router = useRouter();

  const [isFunctionalityFlowDiagram, setIsFunctionalityFlowDiagram] = useState(
    tempFunctionalityFlowDiagram && !(functionalityFlowDiagramConditions?.length > 0),
  );
  const { handleResolveCondition } = useResolveCondition();

  const resolveCondition = async () => {
    if (tempFunctionalityFlowDiagram && functionalityFlowDiagramConditions?.length > 0) {
      const result = await handleResolveCondition({
        conditions: functionalityFlowDiagramConditions,
        responseId,
      });
      setIsFunctionalityFlowDiagram(result);
    }
  };

  useEffect(() => {
    resolveCondition();
  }, []);

  const toggleEditor = () => {
    if (editor) {
      delete router?.query?.flowEditor;
      delete router?.query?.editMode;
    } else if (editMode) {
      router.query.editMode = _id;
    } else {
      router.query.flowEditor = _id;
    }

    router.push(router);
  };

  useEffect(() => {
    if (router?.query?.flowEditor && router?.query?.flowEditor === _id && !editor) {
      setEditor(true);
    } else if (router?.query?.flowEditor !== _id && editor) {
      setEditor(false);
    }
  }, [router?.query?.flowEditor]);

  useEffect(() => {
    if (router?.query?.editMode && router?.query?.editMode === _id && !editor && editMode) {
      setEditor(true);
    } else if (router?.query?.editMode !== _id && editor) {
      setEditor(false);
    }
  }, [router?.query?.editMode]);

  useEffect(() => {
    setInit(true);
  }, []);

  if (!init) {
    return <>Loading Flow Diagram....</>;
  }

  if (noOverlay) {
    return (
      <FlowEditor
        editMode={editMode}
        open={editor}
        onClose={() => toggleEditor()}
        flow={flow}
        onFlowChange={(newFlow) => {
          if (editMode) onFlowChange(newFlow);
        }}
        functionalityFlowDiagram={isFunctionalityFlowDiagram}
      />
    );
  }

  return (
    <div data-testid="reactFlow-output" className="w-100">
      <Button
        data-testid="button"
        size="small"
        startIcon={editMode && <Edit />}
        variant="contained"
        onClick={() => {
          toggleEditor();
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
          functionalityFlowDiagram={isFunctionalityFlowDiagram}
        />
      )}
    </div>
  );
}
