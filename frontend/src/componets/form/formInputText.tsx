import {
    IconButton,
    InputAdornment,
    InputProps,
    TextField,
    Tooltip,
} from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';

import { Controller } from 'react-hook-form';
import { randomId } from '../../util/randomIdInput';
import { cepMask } from './mask/cep';
import { cpfAndCnpjMask } from './mask/cpfAndCnpj';
import { numberMask } from './mask/number';
import { phoneMask } from './mask/phone';
import { toUpperCaseMask } from './mask/toUpperCase';
import { handleMessageError } from '../../util/handleMessages';
import { IButtonProps, IconComponent } from '../icons';

export interface IFormInputProps extends InputProps {
    variant?: 'outlined' | 'standard' | 'filled' | undefined;
    name: string;
    control: any;
    rules?: any;
    label?: string;
    messageError?: (errors: any, field: any) => string;
    handleChange?: any;
    handleOnKeyPress?: (data: any, name?: string) => void;
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
    placeholder?: string;
    endAdornment?: React.ReactNode;
}

export const execMask = (mask: string, value: string, onBlur: boolean) => {
    switch (mask) {
        case 'phone':
            return phoneMask(value, onBlur);
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
    placeholder,
    endAdornment,
}: IFormInputProps) => {
    if (!variant) {
        variant = 'outlined';
    }

    if (!label) {
        label = '';
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
                                    handleOnKeyPress &&
                                        handleOnKeyPress(data, name);
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
                            id={id}
                            type={type}
                            autoComplete="off"
                            sx={sx}
                            InputLabelProps={{ shrink: true }}
                            InputProps={{
                                readOnly: readOnly,
                                id: id,
                                endAdornment: endAdornment ?? null,
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
                            onChange={event => {
                                if (mask && event.target.value) {
                                    event.target.value = execMask(
                                        mask,
                                        event.target.value,
                                        false,
                                    );
                                }
                                onChange(event);
                                if (event.target.value != value && setValue) {
                                    setValue(name, event.target.value);
                                }
                                handleChange && handleChange(event);
                            }}
                            onKeyPress={(data: any) => {
                                handleOnKeyPress &&
                                    handleOnKeyPress(data, name);
                            }}
                            onBlur={(event: any) => {
                                if (mask && event.target.value) {
                                    event.target.value = execMask(
                                        mask,
                                        event.target.value,
                                        true,
                                    );
                                    onChange(event);
                                }
                                handleOnBlur && handleOnBlur(event);
                            }}
                            value={value || ''}
                            fullWidth
                            label={label}
                            variant={variant}
                            placeholder={placeholder ?? ''}
                            // slotProps={{
                            //     input: {
                            //       startAdornment: (
                            //         <InputAdornment position="end">
                            //           <AccountCircle />
                            //         </InputAdornment>
                            //       ),
                            //     },
                            //   }}
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
