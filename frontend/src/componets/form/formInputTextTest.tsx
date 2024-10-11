import { InputProps, OutlinedInput, TextField } from '@mui/material';
import React, { ComponentProps } from 'react';
import { Controller } from 'react-hook-form';

export interface IFormInputProps extends InputProps {
    variant?: 'outlined' | 'standard' | 'filled' | undefined;
    name: string;
    control: any;
    rules?: any;
    label: string;
    messageError?: (errors: any, field: any) => string;
    handleChange?: any;
    handleOnKeyPress?: (data: any) => void;
    ref?: any;
    autoFocus?: boolean;
    readOnly?: boolean;
    mask?: string;
}

// export interface IFormInputProps {
//     variant?: 'outlined' | 'standard' | 'filled' | undefined;
//     name: string;
//     control: any;
//     rules?: any;
//     label: string;
//     messageError?: (errors: any, field: any) => string;
//     handleChange?: any;
//     handleOnKeyPress?: (data: any) => void;
//     ref?: any;
//     autoFocus?: boolean;
//     readOnly?: boolean;
// }

function phone(value: string, onBlur: boolean) {
    if (onBlur) {
        if (!(value.length >= 9)) {
            return '';
        }
    }
    // Remove tudo o que não é dígito
    value = value.replace(/\D/g, '');

    if (value.length > 9) {
        value = value.substring(0, 9);
    }

    return value.replace(/(\d)(\d{4})$/, '$1-$2');
}

const execMask = (mask: string, value: string, onBlur: boolean) => {
    switch (mask) {
        case 'phone':
            return phone(value, onBlur);

        default:
            return '';
    }
};

export const FormInputTextTest = ({
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
    mask,
}: IFormInputProps) => {
    if (!variant) {
        variant = 'outlined';
    }

    return (
        <Controller
            name={name}
            control={control}
            rules={rules}
            render={({
                field: { onChange, value },
                fieldState: { error },
                formState,
            }) => {
                return (
                    <TextField
                        rows={2}
                        maxRows={4}
                        InputLabelProps={{ shrink: true }}
                        InputProps={{
                            readOnly: readOnly,
                        }}
                        inputRef={input => input && autoFocus && input.focus()}
                        helperText={messageError && messageError(error, name)}
                        error={!!error}
                        size={'small'}
                        onChange={event => {
                            if (mask && event.target.value) {
                                event.target.value = execMask(
                                    mask,
                                    event.target.value,
                                    false,
                                );
                            }
                            onChange(event);
                            handleChange && handleChange(event);
                        }}
                        onKeyPress={(data: any) => {
                            handleOnKeyPress && handleOnKeyPress(data);
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
                        }}
                        value={value || ''}
                        fullWidth
                        label={label}
                        variant={variant}
                        // InputProps={{
                        //     inputComponent: ({ inputRef, ...props }) => (
                        //         <Cleave
                        //             {...props}
                        //             htmlRef={inputRef}
                        //             options={{
                        //                 delimiters: ['.', '-'],
                        //                 blocks: [2, 3, 3, 5],
                        //             }}
                        //         />
                        //         <IMaskInput
                        //             {...props}
                        //             mask="(#00) 000-0000"
                        //             definitions={{
                        //                 '#': /[1-9]/,
                        //             }}
                        //             inputRef={inputRef}
                        //             onAccept={(value: any) =>
                        //                 onChange({
                        //                     target: { name: name, value },
                        //                 })
                        //             }
                        //             overwrite
                        //         />
                        //     ),
                        // }}
                    />
                );
            }}
        />
    );
};
