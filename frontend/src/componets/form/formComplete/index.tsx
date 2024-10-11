import { Grid, IconButton, Paper, Tooltip, Typography } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { FieldValues, Path, useFieldArray, useForm } from 'react-hook-form';
import { useHistory, useParams } from 'react-router-dom';
//
import AlertDialog from '../../dialog/alertDialog';
import { FormButton } from '../formButton';
import { useContextGlobal } from '../../../context/ContextGlobal';
import { useToast } from '../../../context/ToastContext';
import api from '../../../services/api';
import {
    handleExceptionMessage,
    handleExceptionMultipleMessages,
} from '../../../util/handleExceptionAxios';
import { message } from '../../../util/handleMessages';
import { FormInputProps } from '../formInterfaces';
import RenderForm from '../renderForm';
import {
    IFormProps,
    ImperativeHandleAccessedByParentComponent,
} from '../../interfaces/formProps';
import { IconComponent, icons } from '../../icons';

import './styles.scss';
import { useWindowSize } from '../../../util/responsiveness';
import { SubFormComplete } from '../subFormComplete';
import { formatNumber } from '../../../util/infoFormat';

const AdditionalDataFooter: React.FC<{ data: any }> = props => {
    const { data } = props;

    if (data != null) {
        return (
            <Typography id="total" component="div">
                {`Total: ${formatNumber(data)}`}
            </Typography>
        );
    }
    return <></>;
};

const FormComplete = React.forwardRef(
    <T extends FieldValues>(
        props: IFormProps<T>,
        ref?: React.Ref<ImperativeHandleAccessedByParentComponent<T>>,
    ) => {
        const {
            settings,
            defaultValues,
            inputsForm,
            implSetValueData,
            callbackSuccess,
            configDataFooter,
        } = props;
        const history = useHistory();
        const params = useParams<'id' | any>();
        const { addToast } = useToast();
        const { setOpenLoading } = useContextGlobal();
        const [openModalDelete, setOpenModalDelete] = useState(false);
        const [width] = useWindowSize();
        const [indexes, setIndexes] = useState<Record<string, number>>({});
        const [open, setOpen] = useState<Record<string, boolean>>({});
        const [data, setData] = useState<any>(null);
        const [resultDataFooter, setResultDataFooter] = useState(null);

        const { handleSubmit, control, reset, setValue, getValues, watch } =
            useForm<T>({
                defaultValues,
            });

        const dynamicFieldArrays = inputsForm.reduce((acc, i) => {
            if (i.typeInput === 'subForm') {
                // eslint-disable-next-line react-hooks/rules-of-hooks
                acc[i.name] = useFieldArray<T, any>({
                    control,
                    name: i.name as any,
                });
            }
            return acc;
        }, {} as Record<string, ReturnType<typeof useFieldArray>>);

        const handleClick = useCallback((index: any, nameFields: string) => {
            setIndexes((prev: any) => ({ ...prev, [nameFields]: index }));
            setOpen((prev: any) => ({ ...prev, [nameFields]: true }));
        }, []);

        const handleDeleteItemTable = useCallback(
            (index: number, nameFields: string) => {
                const fieldArrays = dynamicFieldArrays[nameFields];
                fieldArrays.remove(index);
            },
            [dynamicFieldArrays],
        );

        const setValueData = useCallback(
            (data: T) => {
                for (const input of inputsForm) {
                    if (input?.setData) {
                        setValue(input.name as Path<T>, input.setData(data));
                        continue;
                    }

                    setValue(input.name as Path<T>, data[input.name]);
                }
            },
            [inputsForm, setValue],
        );

        const setValueInput = useCallback(
            ({ value, field }: { value: any; field: string }) => {
                setValue(field as Path<T>, value);
            },
            [setValue],
        );

        // vai ter que passar no model
        const setModel = useCallback(
            (data: any) => {
                if (implSetValueData) {
                    implSetValueData(data);
                    return null;
                }
                setValueData(data);
                return null;
            },
            [implSetValueData, setValueData],
        );

        const handleNewItemTable = useCallback((nameFields: string) => {
            setIndexes((prev: any) => ({ ...prev, [nameFields]: -1 }));
            setOpen((prev: any) => ({ ...prev, [nameFields]: true }));
        }, []);

        React.useImperativeHandle(
            ref,
            () => ({
                setValue,
                handleClick,
                handleDeleteItemTable,
                handleNewItemTable,
                dynamicFieldArrays,
                setValueInput,
                watch,
            }),
            [
                setValue,
                handleClick,
                handleDeleteItemTable,
                handleNewItemTable,
                dynamicFieldArrays,
                setValueInput,
                watch,
            ],
        );

        useEffect(() => {
            if (params && params.id) {
                setOpenLoading(true);
                api.get(`${settings.apiPath}/${params.id}`)
                    .then(response => {
                        setData(response.data);
                        setModel(response.data);
                        setOpenLoading(false);
                    })
                    .catch(e => {
                        console.error(e);
                        setOpenLoading(false);

                        const messageResponse = handleExceptionMessage(e);
                        setOpenLoading(false);
                        addToast({
                            type: 'error',
                            title: message.error.selectOne,
                            description: messageResponse,
                        });
                    });
            }
        }, [params]);

        useEffect(() => {
            if (configDataFooter?.dataFooter) {
                setResultDataFooter(
                    configDataFooter.dataFooter({
                        data: dynamicFieldArrays[configDataFooter.nameFields]
                            .fields,
                    }),
                );
            }
        }, [configDataFooter, dynamicFieldArrays]);

        const inputs = React.useMemo<FormInputProps<T>[]>(
            () => [
                ...inputsForm.map(i => {
                    if (i.typeInput === 'subForm') {
                        i.index =
                            indexes[i.name] == null ? -1 : indexes[i.name];
                        const setIndex = (index: number) => {
                            setIndexes((prev: any) => ({
                                ...prev,
                                [i.name]: index,
                            }));
                        };
                        i.setIndex = setIndex;
                        i.getValues = getValues;
                        i.setValue = setValue;

                        i.useDynamicFieldArray = dynamicFieldArrays[i.name];

                        const openModal = open[i.name];
                        const setOpenModal = (open: boolean) => {
                            setOpen((prev: any) => ({
                                ...prev,
                                [i.name]: open,
                            }));
                        };
                        i.openModal = openModal;
                        i.setOpenModal = setOpenModal;
                    }
                    return { ...i, control, setValue };
                }),
            ],
            [
                inputsForm,
                control,
                setValue,
                indexes,
                getValues,
                dynamicFieldArrays,
                open,
            ],
        );

        const submit = async (dataToSubmit: any, e: any) => {
            e.preventDefault();

            if (dataToSubmit['undefined']) {
                delete dataToSubmit['undefined'];
            }
            try {
                setOpenLoading(true);

                for (const input of inputsForm) {
                    if (!input?.dto) {
                        continue;
                    }
                    dataToSubmit = input.dto(dataToSubmit);
                }

                if (params && params.id) {
                    await api.put(
                        `${settings.apiPath}/${params.id}`,
                        dataToSubmit,
                    );
                } else {
                    await api.post(`${settings.apiPath}`, dataToSubmit);
                }
                addToast({
                    type: 'success',
                    title: message.success.save,
                    description: '',
                });
                setOpenLoading(false);
                reset(defaultValues);

                if (!callbackSuccess) {
                    history.push(`${settings.pathList}?`);
                }

                if (callbackSuccess) {
                    callbackSuccess(data);
                }
            } catch (error) {
                setOpenLoading(false);
                const messagesResponse = handleExceptionMultipleMessages(error);
                let insideErrors = false;
                for (const messageResponse of messagesResponse) {
                    addToast({
                        type: 'error',
                        title: message.error.save,
                        description: messageResponse,
                    });
                    insideErrors = true;
                }
                if (!insideErrors) {
                    addToast({
                        type: 'error',
                        title: message.error.save,
                        description: 'Algo deu errado',
                    });
                }
            }
        };

        const handleCancel = () => {
            history.goBack();
        };

        const handleDelete = async (id: string) => {
            setOpenLoading(true);

            try {
                await api.delete(`${settings.apiPath}/${id}`);
                addToast({
                    type: 'success',
                    title: message.success.delete,
                    description: '',
                });
                setOpenLoading(false);
                history.push(`${settings.pathList}?`);
            } catch (error: any) {
                const messageResponse = handleExceptionMessage(error);
                setOpenLoading(false);
                addToast({
                    type: 'error',
                    title: message.error.delete,
                    description: messageResponse,
                });
            }
        };

        const handleConfirmeDelete = async (confirm: boolean) => {
            if (confirm) {
                setOpenModalDelete(false);
                handleDelete(params.id);
            } else {
                setOpenModalDelete(false);
            }
        };

        return (
            <div className="principal-container">
                <AlertDialog
                    handleConfirmation={handleConfirmeDelete}
                    open={openModalDelete}
                />
                <Paper component={'div'} sx={{ pt: 2, pl: 2, pb: 2, pr: 2 }}>
                    <div className="principal-container-header">
                        <div>
                            {params.id && (
                                <Tooltip title={'Excluir'}>
                                    <IconButton
                                        onClick={() => {
                                            setOpenModalDelete(true);
                                        }}>
                                        <IconComponent
                                            icon={icons.Delete}
                                            color="error"
                                        />
                                    </IconButton>
                                </Tooltip>
                            )}
                        </div>
                    </div>
                    <form onSubmit={handleSubmit(submit)}>
                        <Grid container spacing={2}>
                            <RenderForm inputsForm={inputs} data={data} />
                        </Grid>
                        <br />
                        <div className="info-footer">
                            <div className="footer-buttons">
                                <FormButton
                                    label={'Salvar'}
                                    typeButton={'submit'}
                                />
                                <FormButton
                                    label={'Voltar'}
                                    typeButton={'cancel'}
                                    onClick={() => handleCancel()}
                                />
                            </div>
                            {<AdditionalDataFooter data={resultDataFooter} />}
                        </div>
                    </form>
                    {inputs
                        .filter(
                            i => i.typeInput === 'subForm' && i.setOpenModal,
                        )
                        .map(data => {
                            const { append, update } =
                                data.useDynamicFieldArray;
                            return (
                                <SubFormComplete
                                    open={data?.openModal || false}
                                    setOpen={data?.setOpenModal}
                                    index={data.index == null ? -1 : data.index}
                                    setIndex={data?.setIndex}
                                    getValues={data?.getValues}
                                    width={width}
                                    inputs={data?.dataTable?.inputs || []}
                                    nameFields={data.name}
                                    update={update}
                                    append={append}
                                />
                            );
                        })}
                </Paper>
            </div>
        );
    },
);

export default FormComplete;
