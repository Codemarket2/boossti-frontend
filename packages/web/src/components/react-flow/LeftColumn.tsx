import React, { useEffect, useState } from 'react';
import { useReactFlow } from 'reactflow';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';

interface ILeftColumn {
  nodes: any[];
  edges: any[];
}

const getSteps = ({ stepCount = 1, node, edges, nodes }) => {
  const newForms = [];
  edges
    ?.filter((edge) => edge?.source === node?.id)
    ?.forEach((edge) => {
      const stepNode = nodes?.find((n) => n?.id === edge?.target);
      if (stepNode?.id) {
        const nextSteps = getSteps({ node: stepNode, stepCount: stepCount + 1, edges, nodes });
        newForms.push({ node: stepNode, stepCount, childNodes: nextSteps });
      }
    });
  return newForms;
};

export default function LeftColumn({ nodes, edges }: ILeftColumn) {
  const [forms, setForms] = useState([]);
  const [nodeIds, setNodeIds] = useState(nodes?.map((node) => node?.id));
  useEffect(() => {
    if (nodes?.length > 0 && edges) {
      const newForms = [];
      const step1Nodes = nodes?.filter((node) => {
        const targetEdges = edges?.filter((edge) => edge?.target === node?.id);
        if (!(targetEdges?.length > 0)) {
          return true;
        }
        return false;
      });
      step1Nodes?.forEach((step1Node) => {
        const nextSteps = getSteps({ nodes, edges, node: step1Node, stepCount: 2 });
        newForms.push({ node: step1Node, stepCount: 1, childNodes: nextSteps });
      });
      setForms(newForms);
    }
  }, [nodes, edges]);

  return (
    <aside className="mt-1">
      <div className="">
        <TreeView
          onNodeToggle={(event, newNodeIds) => setNodeIds(newNodeIds)}
          expanded={nodeIds}
          aria-label="file system navigator"
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ChevronRightIcon />}
          sx={{ height: 240, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
        >
          {forms?.map((form) => (
            <Item item={form} key={form?.node?.id} />
          ))}
        </TreeView>
      </div>
    </aside>
  );
}

const Item = ({ item }: { item: any }) => {
  const { setCenter } = useReactFlow();
  return (
    <TreeItem
      onClick={() => {
        setCenter(item?.node?.position?.x, item?.node?.position?.y, { duration: 500 });
      }}
      nodeId={item?.node?.id}
      label={item?.node?.data?.label}
    >
      {item?.childNodes?.map((childNode) => (
        <Item key={childNode?.node?.id} item={childNode} />
      ))}
    </TreeItem>
  );
};
