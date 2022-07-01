/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-param-reassign */
import * as React from 'react';
import {
  DiagramComponent,
  SymbolPaletteComponent,
  Node,
  DiagramConstraints,
} from '@syncfusion/ej2-react-diagrams';
import Button from '@mui/material/Button';
import Close from '@mui/icons-material/Close';
import { SampleBase } from './sample-base';
import { flowShapes, connectorSymbols } from './defaultNodes';

import '@syncfusion/ej2-diagrams/styles/material.css';
import '@syncfusion/ej2-base/styles/material.css';
import '@syncfusion/ej2-popups/styles/material.css';
import '@syncfusion/ej2-splitbuttons/styles/material.css';
import '@syncfusion/ej2-navigations/styles/material.css';

let diagramInstance: DiagramComponent;

export class DiagramEditor extends SampleBase {
  rendereComplete() {
    addEvents();
    diagramInstance.fitToPage();
    diagramInstance.loadDiagram(JSON.stringify(this.props.value));
  }

  render() {
    return (
      <div className="control-pane">
        <div className="control-section">
          <div style={{ width: '100%' }}>
            <div className="sb-mobile-palette-bar">
              <div
                id="palette-icon"
                style={{ float: 'right' }}
                className="e-ddb-icons1 e-toggle-palette"
              />
            </div>
            {this.props.editMode && (
              <div id="palette-space" className="sb-mobile-palette">
                <Button
                  variant="contained"
                  startIcon={<Close />}
                  onClick={() => {
                    const jsonData = JSON.parse(diagramInstance.saveDiagram());
                    diagramInstance.destroy();
                    this.props.onSave(jsonData);
                  }}
                >
                  Close
                </Button>
                <SymbolPaletteComponent
                  id="symbolpalette"
                  expandMode="Multiple"
                  palettes={[
                    {
                      id: 'flow',
                      // expanded: true,
                      symbols: flowShapes,
                      title: 'Flow Shapes',
                    },
                    {
                      id: 'connectors',
                      // expanded: true,
                      symbols: connectorSymbols,
                      title: 'Connectors',
                    },
                  ]}
                  width="100%"
                  height="100%"
                  symbolHeight={60}
                  symbolWidth={60}
                  getNodeDefaults={(symbol) => {
                    if (
                      symbol.id === 'Terminator' ||
                      symbol.id === 'Process' ||
                      symbol.id === 'Delay'
                    ) {
                      symbol.width = 80;
                      symbol.height = 40;
                    } else if (
                      symbol.id === 'Decision' ||
                      symbol.id === 'Document' ||
                      symbol.id === 'PreDefinedProcess' ||
                      symbol.id === 'PaperTap' ||
                      symbol.id === 'DirectData' ||
                      symbol.id === 'MultiDocument' ||
                      symbol.id === 'Data'
                    ) {
                      symbol.width = 50;
                      symbol.height = 40;
                    } else {
                      symbol.width = 50;
                      symbol.height = 50;
                    }
                    symbol.style.strokeColor = '#757575';
                  }}
                  symbolMargin={{ left: 15, right: 15, top: 15, bottom: 15 }}
                  getSymbolInfo={(symbol) => {
                    return { fit: true };
                  }}
                />
              </div>
            )}
            <div id="diagram-space" className="sb-mobile-diagram">
              <DiagramComponent
                id="diagram"
                ref={(diagram) => {
                  diagramInstance = diagram;
                }}
                width="100%"
                height="100%"
                getNodeDefaults={(node) => {
                  const obj: any = {};
                  if (obj.width === undefined) {
                    obj.width = 145;
                  } else {
                    const ratio = 100 / obj.width;
                    obj.width = 100;
                    obj.height *= ratio;
                  }
                  obj.style = { fill: '#357BD2', strokeColor: 'white' };
                  obj.annotations = [{ style: { color: 'white', fill: 'transparent' } }];
                  // Set ports
                  obj.ports = getPorts(node);
                  return obj;
                }} // Sets the default values of a connector
                getConnectorDefaults={(obj) => {
                  if (obj.id.indexOf('connector') !== -1) {
                    obj.type = 'Orthogonal';
                    obj.targetDecorator = {
                      shape: 'Arrow',
                      width: 10,
                      height: 10,
                    };
                  }
                }}
                // Sets the Node style for DragEnter element.
                dragEnter={(args) => {
                  const obj = args.element;
                  if (obj instanceof Node) {
                    const oWidth = obj.width;
                    const oHeight = obj.height;
                    const ratio = 100 / obj.width;
                    obj.width = 100;
                    obj.height *= ratio;
                    obj.offsetX += (obj.width - oWidth) / 2;
                    obj.offsetY += (obj.height - oHeight) / 2;
                    obj.style = { fill: '#357BD2', strokeColor: 'white' };
                  }
                }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function getPorts(obj) {
  const ports = [
    { id: 'port1', shape: 'Circle', offset: { x: 0, y: 0.5 } },
    { id: 'port2', shape: 'Circle', offset: { x: 0.5, y: 1 } },
    { id: 'port3', shape: 'Circle', offset: { x: 1, y: 0.5 } },
    { id: 'port4', shape: 'Circle', offset: { x: 0.5, y: 0 } },
  ];
  return ports;
}
let isMobile;
function addEvents() {
  isMobile = window.matchMedia('(max-width:550px)').matches;
  if (isMobile) {
    const paletteIcon = document.getElementById('palette-icon');
    if (paletteIcon) {
      paletteIcon.addEventListener('click', openPalette, false);
    }
  }
}
function openPalette() {
  const paletteSpace = document.getElementById('palette-space');
  isMobile = window.matchMedia('(max-width:550px)').matches;
  if (isMobile) {
    if (!paletteSpace.classList.contains('sb-mobile-palette-open')) {
      paletteSpace.classList.add('sb-mobile-palette-open');
    } else {
      paletteSpace.classList.remove('sb-mobile-palette-open');
    }
  }
}
