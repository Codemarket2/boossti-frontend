import React from 'react';
import Menu from '@mui/material/Menu';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import { IField } from '@frontend/shared/types';

interface InlineEditMenuProps {
  field: IField;
  item: string;
  fieldId: string;
  valueId: string;
  onClickEditField: (fieldId: string, valueId: string, editMode: string) => void;
}

export default function InlineEditMenu({
  item,
  field,
  fieldId,
  valueId,
  onClickEditField,
}: InlineEditMenuProps) {
  // state variables.
  const [anchorEl, setAnchorEl] = React.useState(null);

  // event functions
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const MenuOptions = () => {
    switch (item) {
      case 'field': {
        switch (field?.options?.multipleValues) {
          case true: {
            return (
              <>
                <MenuItem
                  onClick={() => {
                    onClickEditField(fieldId, null, 'addValue');
                    handleClose();
                  }}
                >
                  Add New Value
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    onClickEditField(fieldId, null, 'editField');
                    handleClose();
                  }}
                >
                  Re Arrange Values
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    onClickEditField(fieldId, null, 'deleteField');
                    handleClose();
                  }}
                >
                  Delete All Values
                </MenuItem>
              </>
            );
          }
          case false: {
            return (
              <>
                <MenuItem
                  onClick={() => {
                    onClickEditField(fieldId, null, 'addValue');
                    handleClose();
                  }}
                >
                  Add New Value
                </MenuItem>
              </>
            );
          }
          default: {
            return <></>;
          }
        }
      }
      case 'value': {
        return (
          <>
            <MenuItem
              onClick={() => {
                onClickEditField(fieldId, valueId, 'editValue');
                handleClose();
              }}
            >
              Edit Value
            </MenuItem>
            <MenuItem
              onClick={() => {
                onClickEditField(fieldId, valueId, 'deleteValue');
                handleClose();
              }}
            >
              Delete Value
            </MenuItem>
          </>
        );
      }
      default: {
        return <></>;
      }
    }
  };

  return (
    <div>
      <EditIcon
        fontSize="small"
        color="primary"
        cursor="pointer"
        sx={{ m: 1 }}
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      />
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuOptions />
      </Menu>
    </div>
  );
}
