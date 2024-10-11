import { TextField } from '@mui/material';
import { DatePicker, DesktopDatePicker } from '@mui/x-date-pickers';
import 'dayjs/locale/pt-br';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { ptBR } from 'date-fns/locale';
import { Controller } from 'react-hook-form';
import { momentZoneToDate } from '../../util/dateUtil';
import { parse, isValid, format } from 'date-fns';
// import { ptBR } from '@mui/x-date-pickers/locales';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

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
    setError?: (field: any, customError: any) => void;
    clearErrors?: (field: any) => void;
    placeholder?: string;
}

function isValidDate(dateString: string) {
    const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    if (!regex.test(dateString)) {
        return false;
    }
    const date = parse(dateString, 'dd/MM/yyyy', new Date());
    return isValid(date);
}

function handleMessageError({
    errors,
    fieldError,
    name,
    messageError,
}: {
    errors: any;
    fieldError: any;
    name: any;
    messageError?: (errors: any, fieldError?: any) => string;
}) {
    if (errors && messageError && fieldError) {
        return messageError(fieldError, name);
    }
    if (errors && fieldError?.message) {
        return fieldError?.message;
    }
    return '';
}

export const FormInputDateWithoutHour = ({
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
    setError,
    clearErrors,
    placeholder,
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
                field,
                fieldState: { error },
                fieldState,
                formState,
            }) => {
                return (
                    <LocalizationProvider
                        locale={ptBR}
                        dateAdapter={AdapterDateFns}>
                        <DesktopDatePicker
                            label={label}
                            value={value}
                            inputFormat={'dd/MM/yyyy'}
                            onChange={(data, orignalInput) => {
                                if (
                                    isValidDate(String(orignalInput)) &&
                                    error &&
                                    clearErrors
                                ) {
                                    clearErrors(name);
                                } else if (
                                    orignalInput &&
                                    !error &&
                                    setError &&
                                    !isValidDate(String(orignalInput))
                                ) {
                                    setError(name, {
                                        type: `custom_date`,
                                        message:
                                            'A data está com um formato inválido',
                                    });
                                }
                                let newDate = null;
                                if (data) {
                                    newDate = momentZoneToDate(data);
                                }
                                setValue(name, newDate);
                                handleChange && handleChange(data);
                            }}
                            renderInput={params => {
                                return (
                                    <TextField
                                        {...params}
                                        inputProps={{
                                            ...params.inputProps,
                                            placeholder: placeholder,
                                        }}
                                        helperText={handleMessageError({
                                            errors: params.error,
                                            fieldError: error,
                                            messageError: messageError,
                                            name,
                                        })}
                                        size="small"
                                        variant={variant}
                                        fullWidth={fullWidth}
                                    />
                                );
                            }}
                        />
                    </LocalizationProvider>
                );
            }}
        />
    );
};
