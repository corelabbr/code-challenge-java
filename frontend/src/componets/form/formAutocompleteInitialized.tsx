import * as React from 'react';
import {
    Autocomplete,
    CircularProgress,
    createFilterOptions,
    Dialog,
    DialogContent,
    DialogTitle,
    Grid,
    IconButton,
    Stack,
    TextField,
    Tooltip,
} from '@mui/material';
import debounce from 'lodash/debounce';
import { useMemo } from 'react';
import { Controller } from 'react-hook-form';
import { extraValidationCNPJ } from '../../communs/validations/cnpj';
import { extraValidationCPF } from '../../communs/validations/cpf';
import { cpfAndCnpjMask } from './mask/cpfAndCnpj';
import { FormInputText } from '../form/formInputText';
import { FormButton } from './formButton';
import { InputPropsToForm } from './formInterfaces';
import { handleMessageError, message } from '../../util/handleMessages';
import { IButtonProps, IconComponent } from '../icons';
import api from '../../services/api';
import { handleExceptionMessage } from '../../util/handleExceptionAxios';
import { useToast } from '../../context/ToastContext';

// interface FormInputProps extends IInputProps {
//     typeInput: 'text' | 'date' | 'autocomplete';
//     mask?:
//         | 'phone'
//         | 'number'
//         | 'identification'
//         | 'cep'
//         | 'toUpperCase'
//         | undefined;
//     setError?: any;
//     clearErrors?: any;
//     required: boolean;
//     options?: {
//         name?: string;
//         description?: string;
//         id?: string;
//         code?: string;
//     }[];
//     setValue?: any;
//     setFocusFirstField?: (value: boolean) => void;
// }

export interface IFormInputProps {
    variant?: 'outlined' | 'standard' | 'filled' | undefined;
    name: string;
    control: any;
    rules?: any;
    label: string;
    messageError?: (errors: any, field: any) => string;
    handleChange?: any;
    handleOnKeyPress?: (data: any) => void;
    handleOnBlur?: (data: any) => void;
    options: {
        name?: string;
        description?: string;
        id?: string;
        code?: string;
    }[];
    setValue: any;
    autoFocus?: boolean;
    activeDebounce?: boolean;
    loading: boolean;
    mask?: 'identification' | 'toUpperCase' | undefined;
    multiple?: boolean;
    setValueSave?: any;
    getValuesSave?: (value: string) => any;
    arrInput?: InputPropsToForm[];
    actionSave?: () => any;
    setErrorSave?: any;
    clearErrorsSave?: any;
    dialogTitle?: string;
    readOnly?: boolean;
    messagesError?: { type: string; message: string }[];
    actionOnInput?: {
        action: () => void;
        iconProps: IButtonProps;
        textTooltip: string;
    };
    query?: (value: string) => string;
}

interface IDialogSave {
    open: boolean;
    toggleOpen: (open: boolean) => void;
    setValueSave?: any;
    getValuesSave?: (value: string) => any;
    arrInput?: InputPropsToForm[];
    actionSave?: () => any;
    setErrorSave?: any;
    clearErrorsSave?: any;
    setValue: any;
    name: string;
    dialogTitle?: string;
}

const execMask = (mask: string, value: string, onBlur: boolean) => {
    switch (mask) {
        case 'identification':
            return cpfAndCnpjMask(value, onBlur);

        default:
            return '';
    }
};

export const FormAutocompleteInitialized = ({
    variant,
    name,
    control,
    rules,
    label,
    messageError,
    handleChange,
    handleOnKeyPress,
    handleOnBlur,
    options,
    setValue,
    autoFocus,
    activeDebounce,
    loading,
    mask,
    multiple,
    setValueSave,
    getValuesSave,
    arrInput,
    actionSave,
    dialogTitle,
    readOnly,
    messagesError,
    actionOnInput,
    query,
}: IFormInputProps) => {
    const [open, toggleOpen] = React.useState(false);
    const [controlOptionAdd, setControlOptionAdd] = React.useState(false);
    const [controlFreeSolo, setControlFreeSolo] = React.useState(true);
    const [optionsAutocomplete, setOptionsAutocomplete] = React.useState([]);
    const [load, setLoad] = React.useState(false);

    const { addToast } = useToast();

    const handleSetValuesSave = (name: string, value: any) => {
        if (arrInput && arrInput?.length > 0) {
            for (let key in arrInput) {
                const inputSave = arrInput[key];
                if (inputSave.name == name) {
                    setValueSave(inputSave.name, value);
                    return;
                }
            }
        }
    };

    const updateAutocomplete = async ({
        description,
    }: {
        description: string;
    }) => {
        if (description && description.length > 0 && query) {
            try {
                setLoad(true);
                const response = await api.get(query(description));
                setOptionsAutocomplete(response.data.content);
            } catch (error) {
                const messagesResponse = handleExceptionMessage(error);
                addToast({
                    type: 'error',
                    title: message.error.selectAll,
                    description: messagesResponse,
                });
            }
            setLoad(false);
        }
    };

    if (!variant) {
        variant = 'outlined';
    }

    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let valid = true;
        // Se não atender a validação nem vai fazer a pesquisa, porque é através do handleChange que é feita uma nova pesquisa para atualizar as options
        if (
            mask &&
            mask == 'identification' &&
            event.target.value.replace(/\D/g, '').length >= 2 &&
            event.target.value.includes('.')
        ) {
            valid =
                extraValidationCNPJ(event.target.value) &&
                extraValidationCPF(event.target.value);
        }
        valid && handleChange && handleChange(event);
        setControlOptionAdd(true);

        if (event.target.value && event.target.value.length > 0 && query) {
            updateAutocomplete({ description: event.target.value });
        }
    };

    const debouncedChangeHandler = useMemo(
        () => debounce(handleOnChange, activeDebounce ? 700 : 0),
        [],
    );

    const filter = createFilterOptions<any>();

    const isLoading = () => {
        return loading || load;
    };

    return (
        <div style={{ display: 'flex' }}>
            <Controller
                name={name}
                control={control}
                rules={rules}
                render={({
                    field: { onChange, value },
                    fieldState: { error },
                }) => {
                    return (
                        <Autocomplete
                            id={name}
                            multiple={multiple}
                            disableClearable={false}
                            readOnly={readOnly}
                            options={query ? optionsAutocomplete : options}
                            getOptionLabel={option =>
                                option?.description || option?.name || ''
                            }
                            freeSolo={controlFreeSolo}
                            onChange={(event, option) => {
                                if (
                                    option &&
                                    option.inputValue &&
                                    arrInput &&
                                    arrInput.length > 0
                                ) {
                                    toggleOpen(true);

                                    let inputValue = option.inputValue;
                                    if (mask == 'toUpperCase') {
                                        inputValue = inputValue.toUpperCase();
                                    }
                                    handleSetValuesSave(
                                        arrInput[0].name,
                                        inputValue,
                                    );
                                } else {
                                    onChange(event);
                                    setValue(name, option);
                                    handleChange &&
                                        handleChange(event, option, name);
                                }
                            }}
                            onKeyPress={(data: any) => {
                                if (controlFreeSolo && data.target) {
                                    setControlFreeSolo(false);
                                }
                                handleOnKeyPress && handleOnKeyPress(data);
                            }}
                            onBlur={(data: any) => {
                                handleOnBlur && handleOnBlur(data);
                            }}
                            loading={isLoading()}
                            noOptionsText="Nenhum registro encontrado"
                            value={value || ''}
                            fullWidth
                            filterOptions={(options, params) => {
                                const filtered = filter(options, params);

                                if (
                                    options.length === 0 &&
                                    params.inputValue?.length > 0 &&
                                    getValuesSave &&
                                    !isLoading() &&
                                    controlOptionAdd
                                ) {
                                    filtered.push({
                                        inputValue: params.inputValue,
                                        description: `Adicionar ${params.inputValue}`,
                                    });
                                    return filtered;
                                }

                                // Se o activeDebounce ser true quer dizer que está sendo feito uma pesquisa no banco de dados, então as options tem que ser filtradas lá e não no componente
                                if (activeDebounce) {
                                    return options;
                                }
                                return filtered;
                            }}
                            loadingText={
                                <CircularProgress color="inherit" size={24} />
                            }
                            renderOption={(props, option) => {
                                return (
                                    <li
                                        {...props}
                                        key={`${option.id}-${
                                            option.descriptionComplete || ''
                                        }`}
                                        style={{
                                            fontWeight:
                                                option.customerIsBringingAgain
                                                    ? 'bold'
                                                    : 'normal',
                                        }}>
                                        {option.descriptionComplete ||
                                            option.description ||
                                            option.name}
                                    </li>
                                );
                            }}
                            renderInput={params => {
                                return (
                                    <TextField
                                        {...params}
                                        inputRef={input =>
                                            input && autoFocus && input.focus()
                                        }
                                        inputProps={{
                                            ...params.inputProps,
                                            placeholder: 'Pesquise',
                                        }}
                                        helperText={handleMessageError(
                                            messageError,
                                            messagesError,
                                            error,
                                            name,
                                        )}
                                        size="small"
                                        label={label}
                                        variant={variant}
                                        error={!!error}
                                        name={name}
                                        onChange={debouncedChangeHandler}
                                        onKeyUp={event => {
                                            if (mask) {
                                                const element =
                                                    event.target as HTMLInputElement;
                                                // Se identificar que foi iniciado a digitação de um cpf/cnpj, aí sim aplica a máscara
                                                if (
                                                    element.value &&
                                                    element.value.replace(
                                                        /\D/g,
                                                        '',
                                                    ).length >= 2
                                                ) {
                                                    element.value = execMask(
                                                        mask,
                                                        element.value,
                                                        false,
                                                    );
                                                }
                                            }
                                        }}
                                        InputProps={{
                                            ...params.InputProps,
                                            endAdornment: (
                                                <React.Fragment>
                                                    {isLoading() &&
                                                    params.inputProps[
                                                        'aria-expanded'
                                                    ] ? (
                                                        <CircularProgress
                                                            color="inherit"
                                                            size={20}
                                                        />
                                                    ) : null}
                                                    {
                                                        params.InputProps
                                                            .endAdornment
                                                    }
                                                </React.Fragment>
                                            ),
                                        }}
                                    />
                                );
                            }}
                        />
                    );
                }}
            />
            <DialogSave
                open={open}
                toggleOpen={toggleOpen}
                arrInput={arrInput}
                getValuesSave={getValuesSave}
                actionSave={actionSave}
                setValue={setValue}
                name={name}
                dialogTitle={dialogTitle}
            />
            {actionOnInput && (
                <Tooltip
                    title={actionOnInput.textTooltip}
                    onClick={() => actionOnInput.action()}>
                    <IconButton onClick={() => actionOnInput.action()}>
                        <IconComponent icon={actionOnInput.iconProps.icon} />
                    </IconButton>
                </Tooltip>
            )}
        </div>
    );
};

const DialogSave: React.FC<IDialogSave> = ({
    open,
    toggleOpen,
    arrInput,
    getValuesSave,
    actionSave,
    setValue,
    name,
    dialogTitle,
}) => {
    const handleClose = () => {
        toggleOpen(false);
    };

    const handleSubmit = async () => {
        let validFieds = true;
        if (arrInput && arrInput?.length > 0) {
            for (let key in arrInput) {
                const inputSave = arrInput[key];
                if (
                    inputSave &&
                    !inputSave?.readOnly &&
                    inputSave.required &&
                    getValuesSave &&
                    (!getValuesSave(inputSave.name) ||
                        String(getValuesSave(inputSave.name)).length == 0)
                ) {
                    inputSave.setError &&
                        inputSave.setError(inputSave.name, {
                            type: `custom_${inputSave.name}`,
                            message: 'O campo é obrigatório',
                        });

                    validFieds = false;
                    return;
                } else {
                    inputSave.clearErrors(inputSave.name);
                }
            }
        }
        if (!validFieds) {
            return;
        }
        const data = actionSave && (await actionSave());
        setValue(name, {
            description: data.description,
            id: data.id,
        });
        handleClose();
    };

    const handleOnKeyPressSave = (data: any) => {
        if (data.charCode === 13) {
            handleSubmit();
        }
    };

    const onChangeInputSave = async (
        event: React.ChangeEvent<HTMLInputElement>,
        name: string,
    ) => {
        if (arrInput && arrInput?.length > 0) {
            for (let key in arrInput) {
                const inputSave = arrInput[key];
                if (inputSave.name == name) {
                    inputSave &&
                        inputSave.clearErrors &&
                        event.target.value &&
                        event.target.value.length > 0 &&
                        inputSave.clearErrors(name);
                    return;
                }
            }
        }
    };

    const onChangeInputSaveEvent = async (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        if (arrInput && arrInput?.length > 0) {
            for (let key in arrInput) {
                const inputSave = arrInput[key];
                if (inputSave.name == name) {
                    inputSave &&
                        inputSave.clearErrors &&
                        event.target.value &&
                        event.target.value.length > 0 &&
                        inputSave.clearErrors(name);
                    return;
                }
            }
        }
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>{dialogTitle}</DialogTitle>
            <DialogContent>
                {/* <DialogContentText>Adicionar marca</DialogContentText> */}
                <Grid container spacing={2} sx={{ pt: 1, pb: 2 }}>
                    {arrInput &&
                        arrInput.map((inputSave, index) => {
                            if (!inputSave.hidden) {
                                return (
                                    <Grid item xs={12} key={index}>
                                        {inputSave &&
                                            inputSave.typeInput == 'text' && (
                                                <>
                                                    <FormInputText
                                                        name={inputSave.name}
                                                        control={
                                                            inputSave.control
                                                        }
                                                        label={inputSave.label}
                                                        handleOnKeyPress={
                                                            handleOnKeyPressSave
                                                        }
                                                        readOnly={
                                                            inputSave.readOnly
                                                        }
                                                        autoFocus={
                                                            inputSave.autoFocus
                                                        }
                                                        handleOnBlur={event => {
                                                            inputSave.setFocusFirstField &&
                                                                inputSave.setFocusFirstField(
                                                                    false,
                                                                );
                                                        }}
                                                        mask={inputSave.mask}
                                                        handleChange={(
                                                            event: React.ChangeEvent<HTMLInputElement>,
                                                        ) =>
                                                            onChangeInputSave(
                                                                event,
                                                                inputSave.name,
                                                            )
                                                        }
                                                    />
                                                </>
                                            )}
                                        {inputSave &&
                                            inputSave.typeInput ==
                                                'autocomplete' &&
                                            inputSave.options &&
                                            inputSave.setValue && (
                                                <>
                                                    <FormAutocompleteInitialized
                                                        name={inputSave.name}
                                                        control={
                                                            inputSave.control
                                                        }
                                                        label={inputSave.label}
                                                        options={
                                                            inputSave.options
                                                        }
                                                        loading={false}
                                                        setValue={
                                                            inputSave.setValue
                                                        }
                                                        handleChange={
                                                            onChangeInputSaveEvent
                                                        }
                                                        handleOnKeyPress={
                                                            handleOnKeyPressSave
                                                        }
                                                        handleOnBlur={event => {
                                                            inputSave.setFocusFirstField &&
                                                                inputSave.setFocusFirstField(
                                                                    false,
                                                                );
                                                        }}
                                                    />
                                                </>
                                            )}
                                    </Grid>
                                );
                            }
                            return <></>;
                        })}
                </Grid>
                {/* <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            value={dialogValue.description}
                            onChange={event =>
                                setDialogValue({
                                    ...dialogValue,
                                    description: event.target.value,
                                })
                            }
                            label="Descrição"
                            type="text"
                            variant="standard"
                        /> */}
                <Stack spacing={1} direction="row">
                    <FormButton
                        label={'Salvar'}
                        typeButton={'submit'}
                        onClick={handleSubmit}
                    />

                    <FormButton
                        label={'Cancelar'}
                        typeButton={'cancel'}
                        onClick={() => handleClose()}
                    />
                </Stack>
            </DialogContent>
        </Dialog>
    );
};
