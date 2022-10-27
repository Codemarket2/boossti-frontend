import { Button, Divider, List, ListItem, ListItemText, Typography } from '@mui/material';
import React, { Fragment, useEffect, useState } from 'react';
import { useReactFlow } from 'reactflow';

interface ILeftColumn {
  nodes: any[];
  edges: any[];
}

const getSteps = ({ stepCount = 1, node, edges, nodes }) => {
  let newForms = [];
  edges
    ?.filter((edge) => edge?.source === node?.id)
    ?.forEach((edge) => {
      const stepNode = nodes?.find((n) => n?.id === edge?.target);
      if (stepNode?.id) {
        newForms.push({ node: stepNode, stepCount });
        const nextSteps = getSteps({ node: stepNode, stepCount: stepCount + 1, edges, nodes });
        if (nextSteps?.length > 0) {
          newForms = [...newForms, ...nextSteps];
        }
      }
    });
  return newForms;
};

export default function LeftColumn({ nodes, edges }: ILeftColumn) {
  const [forms, setForms] = useState([]);
  const { setViewport, getViewport, fitBounds } = useReactFlow();
  useEffect(() => {
    if (nodes?.length > 0 && edges) {
      let newForms = [];
      const step1Nodes = nodes?.filter((node) => {
        const targetEdges = edges?.filter((edge) => edge?.target === node?.id);
        if (!(targetEdges?.length > 0)) {
          return true;
        }
        return false;
      });
      step1Nodes?.forEach((step1Node) => {
        newForms.push({ node: step1Node, stepCount: 1 });
        const nextSteps = getSteps({ nodes, edges, node: step1Node, stepCount: 2 });
        newForms = [...newForms, ...nextSteps];
      });
      setForms(newForms);
    }
  }, [nodes, edges]);

  return (
    <aside className="mt-1">
      <div className="">
        <List dense disablePadding>
          {forms?.map((form, i) => (
            <Fragment key={form?.node?.id}>
              {i !== 0 && form?.stepCount === 1 && <Divider />}
              <ListItem
                button
                onClick={() => {
                  const selectedNode = form?.node;
                  const currentViewPort = getViewport();
                  setViewport(
                    { ...currentViewPort, zoom: currentViewPort?.zoom },
                    { duration: 500 },
                  );
                }}
              >
                <ListItemText primary={`${form?.stepCount}). ${form?.node?.data?.label}`} />
              </ListItem>
            </Fragment>
          ))}
        </List>
      </div>
    </aside>
  );
}
