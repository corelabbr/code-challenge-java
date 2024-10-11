import { TextField } from '@mui/material';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { ptBR } from 'date-fns/locale';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import * as React from 'react';
import { Controller } from 'react-hook-form';
import { momentZoneToDate } from '../../util/dateUtil';
import { handleMessageError } from '../../util/handleMessages';

export interface IFormInputProps {
    variant?: 'outlined' | 'standard' | 'filled' | undefined;
    name: string;
    control: any;
    rules?: any;
    label: string;
    messageError?: (errors: any, field: any) => string;
    handleChange?: any;
    handleOnKeyPress?: (data: any) => void;
    setValue: any;
    fullWidth: boolean;
    inputFormat?: string;
    formattedInput?: string;
    placeholder?: string;
    messagesError?: { type: string; message: string }[];
}

export const FormInputDate = ({
    variant,
    name,
    control,
    rules,
    label,
    messageError,
    handleChange,
    handleOnKeyPress,
    setValue,
    fullWidth,
    inputFormat,
    formattedInput,
    placeholder,
    messagesError,
}: IFormInputProps) => {
    if (!variant) {
        variant = 'outlined';
    }

    if (!placeholder) {
        placeholder = 'dd/mm/aaaa';
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
                    <LocalizationProvider
                        locale={ptBR}
                        dateAdapter={AdapterDateFns}>
                        {inputFormat && inputFormat === 'dd/MM/yyyy' ? (
                            <DesktopDatePicker
                                label={label}
                                value={value || ''}
                                inputFormat={'dd/MM/yyyy'}
                                onChange={(data, originalInput) => {
                                    if (data) {
                                        setValue(name, new Date(data));
                                    } else {
                                        setValue(name, null);
                                    }
                                    if (formattedInput) {
                                        setValue(
                                            formattedInput,
                                            String(originalInput),
                                        );
                                    }
                                }}
                                renderInput={params => (
                                    <TextField
                                        {...params}
                                        helperText={handleMessageError(
                                            messageError,
                                            messagesError,
                                            error,
                                            name,
                                        )}
                                        error={!!error}
                                        size="small"
                                        variant={variant}
                                        fullWidth={fullWidth}
                                    />
                                )}
                            />
                        ) : (
                            <DateTimePicker
                                label={label}
                                value={value || null}
                                inputFormat={'dd/MM/yyyy HH:mm'}
                                ampm={false}
                                onChange={data => {
                                    if (data) {
                                        setValue(name, momentZoneToDate(data));
                                    } else {
                                        setValue(name, null);
                                    }
                                }}
                                renderInput={params => (
                                    <TextField
                                        {...params}
                                        inputProps={{
                                            ...params.inputProps,
                                            placeholder: placeholder,
                                        }}
                                        helperText={handleMessageError(
                                            messageError,
                                            messagesError,
                                            error,
                                            name,
                                        )}
                                        error={!!error}
                                        size="small"
                                        variant={variant}
                                        fullWidth={fullWidth}
                                    />
                                )}
                            />
                        )}
                    </LocalizationProvider>
                );
            }}
        />
    );
};
