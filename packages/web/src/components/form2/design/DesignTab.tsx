import { IForm } from '@frontend/shared/types/form';
import Paper from '@mui/material/Paper';
import { WidthProvider, Responsive } from 'react-grid-layout';
import React, { ReactNode, useState } from 'react';
import { Button, IconButton, styled, Tooltip, Typography } from '@mui/material';
import Edit from '@mui/icons-material/Edit';
import Settings from '@mui/icons-material/Settings';
import StyleDrawer from '../../style/StyleDrawer';

const ResponsiveReactGridLayout = WidthProvider(Responsive);

interface DesignTabProps {
  form: IForm;
  onChange: (form: Partial<IForm>) => void;
}

const initialState = {
  layouts: {},
  styles: {},
  selectedField: null,
  selectedElement: null,
  layoutEdit: true,
  editMode: false,
};

export default function DesignTab({ form, onChange }: DesignTabProps) {
  const [state, setState] = useState(initialState);

  const { editMode } = state;

  const layouts = editMode ? state?.layouts : form?.settings?.layouts;
  const styles = editMode ? state?.styles : form?.settings?.styles;

  const onStylesChange = (newStyles) => {
    let oldFieldStyles = styles?.[state.selectedField] || {};
    oldFieldStyles = { ...oldFieldStyles, [state.selectedElement]: newStyles };
    setState({
      ...state,
      styles: {
        ...styles,
        [state.selectedField]: oldFieldStyles,
      },
    });
  };

  const onSave = () => {
    onChange({
      ...form,
      settings: { ...form?.settings, layouts: state.layouts, styles: state.styles },
    });
    setState(initialState);
  };

  return (
    <Paper variant="outlined" className="p-2">
      <Typography>Response detail page design</Typography>
      {editMode && (
        <Tooltip title="Toggle grid layout">
          <IconButton
            onClick={() => setState({ ...state, layoutEdit: !state.layoutEdit })}
            color={state.layoutEdit ? 'primary' : 'inherit'}
          >
            <Settings />
          </IconButton>
        </Tooltip>
      )}
      {state?.editMode ? (
        <>
          <Button size="small" variant="contained" onClick={onSave}>
            Save
          </Button>
          <Button
            className="ml-2"
            size="small"
            variant="outlined"
            onClick={() => setState(initialState)}
          >
            Cancel
          </Button>
        </>
      ) : (
        <Button
          size="small"
          variant="contained"
          startIcon={<Edit />}
          onClick={() =>
            setState({
              ...state,
              editMode: true,
              layouts: form?.settings?.layouts || {},
              styles: form?.settings?.styles || {},
            })
          }
        >
          Edit
        </Button>
      )}
      <ResponsiveReactGridLayout
        className="layout"
        cols={{ lg: 4, xs: 2 }}
        rowHeight={60}
        layouts={layouts}
        breakpoints={{ lg: 500, xs: 0 }}
        onLayoutChange={(newLayout, newLayouts) => {
          if (editMode && state.layoutEdit) setState({ ...state, layouts: newLayouts });
        }}
        isDraggable={editMode && state.layoutEdit}
        isResizable={editMode && state.layoutEdit}
      >
        {form?.fields?.map((field) => (
          <GridItem editMode={editMode} key={field?._id} style={styles?.[field?._id]?.gridItem}>
            <Tooltip title="Edit styles">
              <IconButton
                className="d-none grid-item-edit-button"
                onClick={() =>
                  setState({ ...state, selectedField: field?._id, selectedElement: 'gridItem' })
                }
              >
                <Edit />
              </IconButton>
            </Tooltip>
            <ElementSelector
              selected={state.selectedField === field?._id && state.selectedElement === 'label'}
              editMode={editMode}
              onEditStyle={() =>
                setState({ ...state, selectedField: field?._id, selectedElement: 'label' })
              }
            >
              <div style={styles?.[field?._id]?.label}>{field?.label}</div>
            </ElementSelector>
            <ElementSelector
              selected={state.selectedField === field?._id && state.selectedElement === 'value'}
              editMode={editMode}
              onEditStyle={() =>
                setState({ ...state, selectedField: field?._id, selectedElement: 'value' })
              }
            >
              <div style={styles?.[field?._id]?.value}>Sample value...</div>
            </ElementSelector>
          </GridItem>
        ))}
      </ResponsiveReactGridLayout>
      {state.selectedField && (
        <StyleDrawer
          open={state.selectedField}
          onClose={() => setState({ ...state, selectedField: null, selectedElement: null })}
          styles={styles?.[state.selectedField]?.[state.selectedElement]}
          onStylesChange={onStylesChange}
        />
      )}
    </Paper>
  );
}

const StyledFieldLabel: any = styled('div')(({ editMode, selected }: any) =>
  editMode
    ? {
        minHeight: 27,
        border: `1px solid ${selected ? 'lightgrey' : 'transparent'}`,
        '&:hover': {
          display: 'flex',
          alignItems: 'center',
          border: '1px dashed lightgrey',
          '.edit-button': {
            display: 'block !important',
          },
        },
      }
    : {},
);

const GridItem: any = styled('div')(({ editMode, selected }: any) =>
  editMode
    ? {
        overflow: 'auto',
        '&:hover': {
          '.grid-item-edit-button': {
            display: 'block !important',
          },
        },
      }
    : {},
);

interface ElementSelectorProps {
  editMode: boolean;
  children: ReactNode;
  onEditStyle: () => void;
  selected?: boolean;
}

const ElementSelector = ({ editMode, children, onEditStyle, selected }: ElementSelectorProps) => {
  if (editMode) {
    return (
      <>
        <StyledFieldLabel editMode={editMode} selected={selected}>
          {children}
          {editMode && (
            <div className="d-none edit-button pl-2">
              <Tooltip title="Edit styles">
                <IconButton size="small" onClick={() => onEditStyle()}>
                  <Edit fontSize="small" />
                </IconButton>
              </Tooltip>
            </div>
          )}
        </StyledFieldLabel>
      </>
    );
  }
  return <>{children}</>;
};
