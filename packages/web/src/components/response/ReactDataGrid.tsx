import { useEffect, useState } from 'react';
import { groupBy as rowGrouper } from 'lodash';
import DataGrid, { TextEditor } from 'react-data-grid';
import DisplayValue from '../form2/DisplayValue';

interface IProps {
  form: any;
  responses: any;
  onRowChange: (responseId, value) => void;
}

export default function ReactDataGridWrapper({ form, responses = [], onRowChange }: IProps) {
  const [state, setState] = useState({
    options: [],
    columns: [],
    rows: [],
    loading: true,
  });

  useEffect(() => {
    if (form && responses) {
      const options = form?.fields?.map((field) => ({ _id: field._id, label: field.label }));
      const columns = form?.fields?.map((field) => ({
        ...field,
        key: field?._id,
        name: field?.label,
        formatter({ row }: any) {
          // return <DisplayValue field={field} value={row[field?._id]} />;
          return <DisplayGrid field={field} value={row[field?._id]} />;
        },
        editor: TextEditor,
      }));
      const tempFields: any = {};
      form?.fields?.forEach((field) => {
        tempFields[field?._id] = field;
      });
      const rows = responses?.map((response) => {
        const row: any = { _id: response?._id };
        response?.values?.forEach((value, i) => {
          if (!row[value?.field]) {
            // row[value?.field] = value;
            row[value?.field] = getValue(tempFields[value?.field], value);
          }
        });
        return row;
      });
      setState({ ...state, loading: false, options, columns, rows });
    }
  }, [form, responses]);

  return (
    <>
      <ReactDataGrid
        options={state.options}
        columns={state.columns}
        rows={state.rows}
        onRowChange={onRowChange}
      />
    </>
  );
}

interface IProps2 {
  options: string[];
  columns: any[];
  rows: any[];
  onRowChange: (responseId, value) => void;
}

function ReactDataGrid({ options, columns, rows, onRowChange }: IProps2) {
  const [selectedRows, setSelectedRows] = useState<ReadonlySet<number>>(() => new Set());
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [expandedGroupIds, setExpandedGroupIds] = useState(new Set([]));

  function toggleOption(option: string, enabled: boolean) {
    const index = selectedOptions.indexOf(option);
    if (enabled) {
      if (index === -1) {
        setSelectedOptions((opt) => [...opt, option]);
      }
    } else if (index !== -1) {
      setSelectedOptions((opt) => {
        const newOptions = [...opt];
        newOptions.splice(index, 1);
        return newOptions;
      });
    }
    setExpandedGroupIds(new Set());
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <b>Group by columns:</b>
      <div className="d-flex text-capitalize">
        {options.map((option: any) => (
          <label key={option?._id} htmlFor={`option-${option?._id}`} className="mx-2">
            <input
              id={`option-${option?._id}`}
              type="checkbox"
              checked={selectedOptions.includes(option?._id)}
              onChange={(event) => toggleOption(option?._id, event.target.checked)}
              className="mr-1"
            />
            {option?.label}
          </label>
        ))}
      </div>
      <DataGrid
        columns={columns}
        rows={rows}
        rowKeyGetter={(row) => row._id}
        selectedRows={selectedRows}
        onSelectedRowsChange={setSelectedRows}
        groupBy={selectedOptions}
        rowGrouper={rowGrouper}
        expandedGroupIds={expandedGroupIds}
        onExpandedGroupIdsChange={setExpandedGroupIds}
        defaultColumnOptions={{ resizable: true }}
        className="rdg-light"
        onRowsChange={(newRows, data) => {
          const fieldId = data?.column?.key;
          const row = newRows[data.indexes[0]];
          const value = row[fieldId];
          onRowChange(row?._id, { field: fieldId, value });
          // debugger;
        }}
      />
    </div>
  );
}

const getValue = (field, value) => {
  switch (field?.fieldType) {
    case 'text':
    case 'email':
    case 'textarea': {
      return value.value;
    }
    case 'number': {
      return value.valueNumber;
    }
    case 'select': {
      if (
        field?.options?.optionsTemplate === 'existingForm' &&
        field?.form &&
        field?.options?.formField
      ) {
        const resValue = value?.response?.values?.find(
          (v) => v?.field === field?.options?.formField,
        );
        return resValue?.value || resValue?.valueNumber;
      }
      if (
        field?.options?.optionsTemplate === 'existingForm' &&
        !field?.form &&
        !field?.options?.formField
      ) {
        return value?.form?.name;
      }
      if (field?.options?.optionsTemplate === 'template' && !field?.template) {
        return value?.template?.title;
      }
      return value.value;
    }
    default: {
      return value;
    }
  }
};

const DisplayGrid = ({ field, value }: { field: any; value: any }) => {
  if (['text', 'email', 'textarea', 'number', 'select']?.includes(field?.fieldType)) {
    return value;
  }
  return <DisplayValue field={field} value={value} />;
};
