/* eslint-disable max-classes-per-file */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-param-reassign */
import * as React from 'react';
import {
  DiagramComponent,
  SymbolPaletteComponent,
  Node,
  NodeModel,
  NodeConstraints,
} from '@syncfusion/ej2-react-diagrams';
import Button from '@mui/material/Button';
import Close from '@mui/icons-material/Close';
import { generateObjectId } from '@frontend/shared/utils/objectId';
import TextField from '@mui/material/TextField';
import Search from '@mui/icons-material/Search';
import { IProps, SampleBase } from './sample-base';
import { flowShapes, connectorSymbols } from './defaultNodes';

import '@syncfusion/ej2-diagrams/styles/material.css';
import '@syncfusion/ej2-base/styles/material.css';
import '@syncfusion/ej2-popups/styles/material.css';
import '@syncfusion/ej2-splitbuttons/styles/material.css';
import '@syncfusion/ej2-navigations/styles/material.css';
import EditShape from './EditShape';

let diagramInstance: DiagramComponent;
let paletteInstance: SymbolPaletteComponent;

export class DiagramEditor extends SampleBase {
  constructor(props) {
    super(props);
    this.state = {
      paletteId: 'forms',
      customShapes: convertFormsToShapes(props.forms),
      selectedFormId: '',
    };
  }

  rendereComplete() {
    addEvents();
    diagramInstance.fitToPage();
    diagramInstance.loadDiagram(JSON.stringify(this.props.value));
  }

  handleEdit = (action) => {
    if (action === 'FixedUserHandle') {
      if (diagramInstance.selectedItems.nodes.length > 0) {
        const selectedNode: any = diagramInstance.selectedItems.nodes[0];
        const selectedFormId = selectedNode?.data?._id;
        this.setState({ selectedFormId });
      }
    }
  };

  updateFormsPalette = () => {
    paletteInstance.removePalette(this.state.paletteId);
    const paletteId = `forms-${generateObjectId()}`;
    paletteInstance.addPalettes([
      {
        id: paletteId,
        symbols: convertFormsToShapes(this.props.forms),
        title: 'Forms',
        expanded: true,
      },
    ]);
    this.setState({ paletteId });
  };

  componentDidUpdate(prevProps: Readonly<IProps>, prevState: Readonly<any>, snapshot?: any): void {
    if (this.props.forms !== prevProps?.forms) {
      this.updateFormsPalette();
    }
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
                <div className="p-1">
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
                </div>
                {this.props.onSearchChange && (
                  <div className="p-1">
                    <TextField
                      fullWidth
                      InputProps={{
                        endAdornment: <Search />,
                      }}
                      size="small"
                      label="Search form"
                      value={this.props.search}
                      onChange={({ target: { value } }) => this.props.onSearchChange(value)}
                    />
                  </div>
                )}
                <SymbolPaletteComponent
                  ref={(palette) => {
                    paletteInstance = palette;
                  }}
                  id="symbolpalette"
                  expandMode="Single"
                  palettes={[
                    {
                      id: 'flow',
                      symbols: flowShapes,
                      title: 'Flow Shapes',
                    },
                    {
                      id: 'connectors',
                      symbols: connectorSymbols,
                      title: 'Connectors',
                    },
                    {
                      id: 'forms',
                      symbols: this.state.customShapes,
                      title: 'Forms',
                    },
                  ]}
                  width="100%"
                  height="100%"
                  symbolHeight={60}
                  symbolWidth={65}
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
                  symbolMargin={{ left: 2, right: 2, top: 2, bottom: 2 }}
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
                  obj.style = { fill: '#FDFE7D', strokeColor: 'white' };
                  obj.annotations = [{ style: { color: 'black', fill: 'transparent' } }];
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
                    obj.style = { fill: '#FDFE7D', strokeColor: 'white', fontSize: 12 };
                  }
                }}
                getCustomTool={this.handleEdit}
              />
            </div>
          </div>
        </div>
        {this.state.selectedFormId && (
          <EditShape
            open={Boolean(this.state.selectedFormId)}
            onClose={() => this.setState({ selectedFormId: '' })}
            formId={this.state.selectedFormId}
            onSave={({ fieldId, fieldLabel, formName }) => {
              diagramInstance.nodes = diagramInstance?.nodes?.map((node: any) => {
                if (node?.data?._id === this.state.selectedFormId) {
                  node.shape.content = `${formName} - ${fieldLabel}`;
                  // return {
                  //   ...node,
                  //   data: { ...node.data, field: fieldId },
                  //   shape: { ...node.shape, content: `${formName} - ${fieldLabel}` },
                  // };
                }
                return node;
              });
              diagramInstance.dataBind();
              this.setState({ selectedFormId: '' });
            }}
          />
        )}
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

const convertFormsToShapes = (forms: any[] = []) =>
  forms?.map(
    (form): NodeModel => ({
      id: form?._id,
      data: { _id: form?._id },
      shape: {
        type: 'Text',
        content: form?.name,
      },
      // eslint-disable-next-line no-bitwise
      constraints: NodeConstraints.Default | NodeConstraints.ReadOnly,
      style: {
        fontSize: 9,
      },

      fixedUserHandles: [
        {
          margin: { right: 20, top: 5 },
          pathData:
            'M60.3,18H27.5c-3,0-5.5,2.4-5.5,5.5v38.2h5.5V23.5h32.7V18z M68.5,28.9h-30c-3,0-5.5,2.4-5.5,5.5v38.2c0,3,2.4,5.5,5.5,5.5h30c3,0,5.5-2.4,5.5-5.5V34.4C73.9,31.4,71.5,28.9,68.5,28.9z M68.5,72.5h-30V34.4h30V72.5z',
        },
      ],
    }),
  );
