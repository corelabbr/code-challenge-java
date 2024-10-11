import { IconButton, InputProps, TextField, Tooltip } from '@mui/material';
import { Controller } from 'react-hook-form';
import { randomId } from '../../util/randomIdInput';
import { cepMask } from './mask/cep';
import { cpfAndCnpjMask } from './mask/cpfAndCnpj';
import { numberMask } from './mask/number';
import {
    configMaskPhone,
    phoneMask,
    phoneMaskTes3,
    phoneMaskTest,
} from './mask/exampleGenericMask';
import { toUpperCaseMask } from './mask/toUpperCase';
import { handleMessageError } from '../../util/handleMessages';
import { IButtonProps, IconComponent } from '../icons';
import { ChangeEvent, useState } from 'react';
import { IConfig, configAllSetNewValue, genericMask } from './mask/genericMask';

export interface IFormInputProps extends InputProps {
    variant?: 'outlined' | 'standard' | 'filled' | undefined;
    name: string;
    control: any;
    rules?: any;
    label: string;
    messageError?: (errors: any, field: any) => string;
    handleChange?: any;
    handleOnKeyPress?: (data: any) => void;
    handleOnBlur?: (data: any) => void;
    ref?: any;
    autoFocus?: boolean;
    readOnly?: boolean;
    size?: 'small' | 'medium' | undefined;
    sx?: any;
    type?: any;
    multiline?: boolean;
    mask?:
        | 'phone'
        | 'number'
        | 'identification'
        | 'cep'
        | 'toUpperCase'
        | undefined;
    hidden?: boolean;
    inactiveRandomId?: boolean;
    messagesError?: { type: string; message: string }[];
    actionOnInput?: {
        action: () => void;
        iconProps: IButtonProps;
        textTooltip: string;
    };
    activeDebounce?: boolean;
    setValue?: (key: string, value: any) => void;
    setError?: (field: any, customError: any) => void;
    clearErrors?: (field: any) => void;
    id?: string;
}

export const execMask = (
    mask: string,
    event: ChangeEvent<HTMLInputElement>,
    onBlur: boolean,
) => {
    const value = event?.target?.value;
    switch (mask) {
        case 'phone':
            return phoneMask(value, onBlur, event);
        case 'number':
            return numberMask(value);
        case 'identification':
            return cpfAndCnpjMask(value, onBlur);
        case 'cep':
            return cepMask(value, onBlur);
        case 'toUpperCase':
            return toUpperCaseMask(value, onBlur);

        default:
            return '';
    }
};

export const FormInputText = ({
    variant,
    name,
    control,
    rules,
    label,
    messageError,
    handleChange,
    handleOnKeyPress,
    autoFocus,
    readOnly,
    size,
    sx,
    type,
    multiline,
    mask,
    handleOnBlur,
    inactiveRandomId,
    messagesError,
    actionOnInput,
    setValue,
    id: idInput,
    defaultValue,
}: IFormInputProps) => {
    const [config, setConfig] = useState<IConfig[]>(
        configMaskPhone.filter(c => c.type !== 'optional'),
    );
    if (!variant) {
        variant = 'outlined';
    }

    let id = name;
    if (!inactiveRandomId) {
        id = randomId(name);
    }
    if (idInput) {
        id = idInput;
    }

    return (
        <div
            style={{
                display: 'flex',
                width: '100%',
            }}>
            <Controller
                name={name}
                control={control}
                rules={rules}
                defaultValue={defaultValue}
                render={({
                    field: { onChange, value },

                    fieldState: { error },
                    formState,
                }) => {
                    if (multiline) {
                        return (
                            <TextField
                                id={id}
                                multiline={multiline}
                                rows={2}
                                maxRows={4}
                                type={type}
                                sx={sx}
                                InputLabelProps={{ shrink: true }}
                                InputProps={{
                                    readOnly: readOnly,
                                    id: id,
                                }}
                                inputRef={input => {
                                    input && autoFocus && input.focus();
                                }}
                                helperText={
                                    messageError && messageError(error, name)
                                }
                                error={!!error}
                                size={size || 'small'}
                                onChange={event => {
                                    onChange(event);
                                    handleChange && handleChange(event);
                                }}
                                onKeyPress={(data: any) => {
                                    handleOnKeyPress && handleOnKeyPress(data);
                                }}
                                onBlur={(data: any) => {
                                    handleOnBlur && handleOnBlur(data);
                                }}
                                value={value || ''}
                                fullWidth
                                label={label}
                                variant={variant}
                            />
                        );
                    }

                    return (
                        <TextField
                            multiline={multiline}
                            // id={id}
                            type={type}
                            autoComplete="off"
                            sx={sx}
                            InputLabelProps={{ shrink: true }}
                            InputProps={{
                                readOnly: readOnly,
                                id: id,
                            }}
                            inputRef={input => {
                                input && autoFocus && input.focus();
                            }}
                            helperText={handleMessageError(
                                messageError,
                                messagesError,
                                error,
                                name,
                            )}
                            error={!!error}
                            size={size || 'small'}
                            onChange={(event: any) => {
                                if (mask && event.target.value) {
                                    const { selectionStart } = event.target;
                                    const valueSplitted =
                                        event.target.value.split('');
                                    const key =
                                        event?.target?.keyPress === 'Backspace'
                                            ? event.target.keyPress
                                            : valueSplitted[selectionStart - 1];

                                    if (
                                        event?.target?.keyPress !==
                                            'Backspace' &&
                                        event?.target?.keyPress !==
                                            'InvalidKey' &&
                                        event.currentTarget.defaultValue
                                    ) {
                                        const currentValueSplitted =
                                            event.currentTarget.defaultValue.split(
                                                '',
                                            );
                                        currentValueSplitted[
                                            selectionStart - 1
                                        ] = key;

                                        event.target.value =
                                            currentValueSplitted.join('');

                                        event.target.value =
                                            configAllSetNewValue({
                                                configMask: config,
                                                event,
                                            });
                                        event.target.selectionStart =
                                            selectionStart;
                                        event.target.selectionEnd =
                                            selectionStart;

                                        event.target.selectionStart =
                                            selectionStart;
                                        event.target.selectionEnd =
                                            selectionStart;
                                    }

                                    if (
                                        event?.target?.keyPress === 'Backspace'
                                    ) {
                                        const currentValueSplitted =
                                            event.currentTarget.defaultValue.split(
                                                '',
                                            );
                                        currentValueSplitted[selectionStart] =
                                            '_';
                                        event.target.value =
                                            currentValueSplitted.join('');

                                        event.target.selectionStart =
                                            selectionStart;
                                        event.target.selectionEnd =
                                            selectionStart;
                                    }
                                }
                                onChange(event);
                                if (event.target.value != value && setValue) {
                                    setValue(name, event.target.value);
                                }
                                handleChange && handleChange(event);
                            }}
                            onKeyPress={(event: any) => {
                                handleOnKeyPress && handleOnKeyPress(event);
                            }}
                            onKeyDown={(event: any) => {
                                if (mask) {
                                    event.target.keyPress = '';
                                    if (event?.code === 'Backspace') {
                                        event.target.keyPress = 'Backspace';
                                    }

                                    const result = genericMask(
                                        event.target.value,
                                        false,
                                        event,
                                        setConfig,
                                        config,
                                    );

                                    if (result.action === 'InvalidKey') {
                                        event.preventDefault(); // Impede o comportamento padrão da tecla (se houver)
                                        event.stopPropagation();
                                    }

                                    if (result?.selectionStart) {
                                        event.target.selectionStart =
                                            result.selectionStart;
                                        event.target.selectionEnd =
                                            result.selectionStart;
                                    }
                                }
                            }}
                            onBlur={(event: any) => {
                                if (mask && event.target.value) {
                                    // event.target.value = execMask(
                                    //     mask,
                                    //     event.target.value,
                                    //     true,
                                    // );
                                    // onChange(event);
                                }
                                handleOnBlur && handleOnBlur(event);
                            }}
                            value={value || ''}
                            fullWidth
                            label={label}
                            variant={variant}
                        />
                    );
                }}
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
