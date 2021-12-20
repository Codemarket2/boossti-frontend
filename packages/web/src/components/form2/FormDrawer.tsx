import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';
import CloseIcon from '@material-ui/icons/Close';
import Grid from '@material-ui/core/Grid';
import Field from './Field';
import LoadingButton from '../common/LoadingButton';
import { useUpdateResponse } from '@frontend/shared/hooks/response';
import InputGroup from '../common/InputGroup';
import { validateValue } from './validate';
import { useState } from 'react';
import { onAlert } from '../../utils/alert';

interface IProps {
    form: any;
    response: any;
    open: boolean;
    onClose: () => void;
}

const defualtValue = {
    field: '',
    value: '',
    valueNumber: null,
    valueBoolean: null,
    valueDate: null,
    itemId: null,
    media: [],
};

const initialSubmitState = {
    validate: false,
    showOnSubmitMessage: false,
    loading: false,
};

export default function CreateFormDrawer({ form, response, open, onClose }: IProps): any {
    const [values, setValues] = useState(response?.values);
    const [submitState, setSubmitState] = useState(initialSubmitState);
    const { handleUpdateResponse, createLoading } = useUpdateResponse({ onAlert,_id:response?._id });

    const onChange = (sValue) => {
        const newValue = { ...defualtValue, ...sValue };
        console.log(newValue)
        let newValues = [];
        let changed = false;
        newValues = values.map((oldValue) => {
            if (oldValue.field === newValue.field) {
                changed = true;
                return newValue;
            }
            return oldValue;
        });
        if (!changed) {
            newValues = [...values, newValue];
        }
        setValues(newValues);
    };

    const onSubmit = async () => {
        setSubmitState({ ...submitState, loading: true });
        let validate = false;
        form?.fields?.every((field) => {
            const tempValue = values.filter((value) => value.field === field._id)[0];
            if (tempValue) {
                if (validateValue(true, tempValue, field.options, field.fieldType).error) {
                    validate = true;
                    return false;
                }
            } else if (field?.options?.required) {
                validate = true;
                return false;
            }
            return true;
        });
        if (validate) {
            setSubmitState({ ...submitState, validate, loading: false });
        } else {
            const payload = { _id: form?._id, formId: form?._id, values };
            await handleUpdateResponse(payload, form?.fields);
            setSubmitState({
                ...initialSubmitState,
                showOnSubmitMessage: true,
            });
            setValues([]);
        }
    };

    return (
        <Drawer anchor="right" open={open}>
            <div style={{ minWidth: '50vw' }} className="p-2">
                <Button
                    startIcon={<CloseIcon />}
                    onClick={() => {
                        onClose()
                        setValues(response?.values)
                    }}
                    size="small"
                    color="primary"
                    variant="contained"
                    className="position-absolute m-2"
                    style={{ right: 0 }}
                >
                    Close
                </Button>
                {form?.fields?.map((field) => {
                    return (
                        <div key={field?._id}>
                            <Grid item xs={field?.options?.halfWidth ? 6 : 12}>
                                <InputGroup key={field._id} className="px-2">
                                    <Field
                                        disabled={false}
                                        {...field}
                                        label={field?.options?.required ? `${field?.label}*` : field?.label}
                                        onChangeValue={onChange}
                                        value={values.filter((f) => f.field === field._id)[0]}
                                    />
                                </InputGroup>
                            </Grid>
                        </div>
                    );
                })}
                <InputGroup className="px-2">
                    <LoadingButton
                        loading={submitState.loading || createLoading}
                        onClick={()=>{
                            onSubmit()
                            // alert("updated successfully")
                            // onClose()
                            // setValues(response?.values)
                        }}
                        variant="contained"
                        color="primary"
                        size="small"
                    >
                        Update
                    </LoadingButton>
                </InputGroup>
            </div>
        </Drawer>
    );
}