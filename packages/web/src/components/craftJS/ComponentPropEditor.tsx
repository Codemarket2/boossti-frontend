import { ElementType, useState, useEffect, createElement } from 'react';

// MUI
import Button from '@mui/material/Button';

// CRAFT JS - WEB
import { useEditor } from '@craftjs/core';

interface SelectedComponentsProps {
  name: string;
  settings?: ElementType<any>;
  isDeletable: boolean;
  delete: () => void;
}

const useComponentSettings = () => {
  const [selectedComponent, setSelectedComponent] = useState<SelectedComponentsProps | null>(null);

  const { actions, selectedNodeId, editorState, query } = useEditor((state, query) => {
    const [currentNodeId] = state.events.selected;

    return { selectedNodeId: currentNodeId, editorState: state, query };
  });

  useEffect(() => {
    if (!selectedNodeId) {
      setSelectedComponent(null);
      return;
    }

    const node = editorState.nodes[selectedNodeId];

    const deleteNode = () => {
      try {
        actions.delete(selectedNodeId);
      } catch (err) {
        alert('Failed to delete the seleted component', err);
      }
    };

    setSelectedComponent({
      name: node.data.displayName,
      settings: (node.related && node.related.settings) || undefined,
      isDeletable: query.node(selectedNodeId).isDeletable(),
      delete: deleteNode,
    });
  }, selectedNodeId);

  return [selectedComponent];
};

const SettingsPanel = () => {
  const [selectedComp] = useComponentSettings();

  if (!selectedComp) {
    return null;
  }

  return (
    <>
      {selectedComp.settings && createElement(selectedComp.settings)}
      <Button onClick={selectedComp.delete} variant="contained" color="error" fullWidth>
        Delete
      </Button>
    </>
  );
};

export default SettingsPanel;
