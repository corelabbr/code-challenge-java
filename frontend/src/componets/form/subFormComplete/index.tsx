import { Box, Button, Grid, Modal, Stack, Typography } from '@mui/material';
import RenderForm from '../renderForm';
import { FormButton } from '../formButton';
import React from 'react';
import { FormInputProps } from '../formInterfaces';
import {
    ArrayPath,
    FieldValues,
    useFieldArray,
    useForm,
    UseFormReturn,
} from 'react-hook-form';
import { useToast } from '../../../context/ToastContext';
import { ImperativeHandleAccessedByParentComponent } from '../../interfaces/formProps';

interface ModalProps {
    open: boolean;
    setOpen?: (open: boolean) => void;
    index: number;
    setIndex?: (index: number) => void;
    getValues: any;
    append: any;
    update: any;
    width: number;
    inputs: FormInputProps<any>[];
    nameFields: string;
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '800px',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 2,
    borderRadius: '4px',
};

export const SubFormComplete = (props: ModalProps) => {
    const {
        open,
        setOpen,
        index,
        setIndex,
        getValues,
        width,
        inputs: inputsForm,
        nameFields,
        update,
        append,
    } = props;
    const { addToast } = useToast();

    const useFormItems = useForm<any>({
        defaultValues: {},
    });
    const setValueItems = useFormItems.setValue;
    const controlItems = useFormItems.control;
    const reset = useFormItems.reset;
    const handleSubmit = useFormItems.handleSubmit;

    const inputs = React.useMemo<FormInputProps[]>(
        () => [
            ...inputsForm.map(i => {
                return {
                    ...i,
                    control: controlItems,
                    setValue: setValueItems,
                };
            }),
        ],
        [inputsForm, controlItems, setValueItems],
    );
    const styleModal = {
        ...style,
    };

    if (width <= 800) {
        styleModal.width = '90%';
    }

    React.useEffect(() => {
        if (index >= 0) {
            setModel(index, nameFields);
        }
    }, [index, open]);

    const setModel = (index: number, keyArrData = 'phones') => {
        let data = {};
        for (const input of inputs) {
            if (input?.setData) {
                setValueItems(
                    input.name,
                    input.setData(getValues(`${keyArrData}[${index}]`)),
                );
                data = {
                    ...data,
                    [input.name]: input.setData(
                        getValues(`${keyArrData}[${index}].${input.name}`),
                    ),
                };
                continue;
            }

            setValueItems(
                input.name,
                getValues(`${keyArrData}[${index}].${input.name}`),
            );
            data = {
                ...data,
                [input.name]: getValues(
                    `${keyArrData}[${index}].${input.name}`,
                ),
            };
        }
    };

    const handleClose = () => {
        setIndex && setIndex(-1);
        setOpen && setOpen(false);
        reset({});
    };

    const submitItem = (data: any) => {
        // CRIAR FUNÇÃO PARA TRATAR REGRAS QUE SEJA CHAMADA AQUI

        for (const input of inputs) {
            if (!input?.dto) {
                continue;
            }
            data = input.dto(data);
        }

        if (index >= 0) {
            update(index, {
                ...data,
            });
        } else {
            append(data);
        }
        handleClose();
    };

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
                <Box sx={styleModal} component={'div'}>
                    <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2">
                        Inserir item
                    </Typography>
                    <form
                        onSubmit={handleSubmit((data: any) =>
                            submitItem(data),
                        )}>
                        <Grid sx={{ pt: 2, pb: 2 }} container spacing={2}>
                            <RenderForm inputsForm={inputs} />
                        </Grid>
                        <span />
                        <Stack spacing={1} direction="row">
                            <FormButton
                                label={'Salvar'}
                                typeButton={'submit'}
                            />
                            <Button variant="outlined" onClick={handleClose}>
                                Cancelar
                            </Button>
                        </Stack>
                    </form>
                </Box>
            </Modal>
        </div>
    );
};
