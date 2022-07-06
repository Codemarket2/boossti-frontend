import AddCircle from '@mui/icons-material/AddCircle';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import React, { useState } from 'react';
import ConditionForm from './ConditionForm';
import CRUDMenu from '../../common/CRUDMenu';
import DisplayFormula from '../formula/DisplayFormula';
import FormulaEditor from '../formula/FormulaEditor';

interface IProps {
  form: any;
  onConditionsChange: (arg: any) => void;
  onFieldsChange: (fields: any) => void;
}

const initialState = {
  showForm: false,
  constraint: null,
  constraintIndex: null,
  showMenu: null,
  selectedField: null,
  selectedTab: 0,
};

export default function ConditionsTab({ form, onConditionsChange, onFieldsChange }: IProps) {
  const [state, setState] = useState(initialState);
  const conditions = form?.settings?.conditions || [];

  const onSave = (newConditions, action: 'create' | 'update') => {
    if (action === 'update') {
      onConditionsChange(
        conditions?.map((constraint, index) =>
          index === state.constraintIndex ? newConditions : constraint,
        ),
      );
    } else {
      onConditionsChange([...conditions, newConditions]);
    }
    setState(initialState);
  };

  const onDelete = () => {
    onConditionsChange(conditions?.filter((c, index) => index !== state.constraintIndex));
    setState(initialState);
  };

  return (
    <div className="p-2">
      {state.selectedField ? (
        <div>
          <Typography variant="h5">Rules</Typography>
          <FormulaEditor
            fields={form?.fields?.filter(
              (f) => f?.fieldType === 'number' && f?._id !== state.selectedField,
            )}
            formula={form?.fields?.find((f) => f?._id === state.selectedField)?.options?.formula}
            onClose={() => setState(initialState)}
            onSave={(newFormula) => {
              onFieldsChange(
                form?.fields?.map((f) => {
                  let field = { ...f };
                  if (field?._id === state.selectedField) {
                    let fieldFormula = field?.options?.formula || {};
                    fieldFormula = { ...fieldFormula, ...newFormula };
                    field = { ...field, options: { ...field?.options, formula: fieldFormula } };
                  }
                  return field;
                }),
              );
              setState(initialState);
            }}
          />
        </div>
      ) : state?.showForm ? (
        <ConditionForm
          constraint={state.constraint}
          fields={form?.fields}
          onSave={onSave}
          onCancel={() => setState(initialState)}
        />
      ) : (
        <>
          <Typography variant="h5" className="d-flex align-items-center">
            Conditions
            <Tooltip title="Add Condition">
              <IconButton color="primary" onClick={() => setState({ ...state, showForm: true })}>
                <AddCircle />
              </IconButton>
            </Tooltip>
          </Typography>
          <List disablePadding>
            {conditions?.map((condition, index) => (
              <ListItem key={index} disablePadding>
                <ListItemButton>
                  <ListItemText primary={condition?.name} secondary={condition?.constraintType} />
                </ListItemButton>
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    onClick={(event) =>
                      setState({
                        ...initialState,
                        constraint: condition,
                        constraintIndex: index,
                        showMenu: event.currentTarget,
                      })
                    }
                    size="large"
                  >
                    <MoreVertIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
            <CRUDMenu
              show={state.showMenu}
              onClose={() => setState(initialState)}
              onEdit={() => setState({ ...state, showForm: true, showMenu: null })}
              onDelete={onDelete}
            />
          </List>
          <List disablePadding>
            {form?.fields
              ?.filter(
                (field) =>
                  field?.options?.systemCalculatedAndView ||
                  field?.options?.systemCalculatedAndSaved,
              )
              ?.map((field) => (
                <ListItem key={field?._id} disablePadding>
                  <ListItemButton>
                    <ListItemText
                      primary={field?.label}
                      secondary={
                        <DisplayFormula formula={field?.options?.formula} fields={form?.fields} />
                      }
                    />
                  </ListItemButton>
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      onClick={(event) =>
                        setState({
                          ...initialState,
                          selectedField: field?._id,
                        })
                      }
                      size="large"
                    >
                      <MoreVertIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
          </List>
        </>
      )}
    </div>
  );
}
