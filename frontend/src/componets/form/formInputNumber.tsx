import { Tooltip } from '@mui/material';
import TextField from '@mui/material/TextField';
import { Controller } from 'react-hook-form';
import NumberFormat from 'react-number-format';
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
    decimalScale: number;
    handleOnBlur?: any;
    autoFocus?: boolean;
    readOnly?: boolean;
    messagesError?: { type: string; message: string }[];
}

export const FormInputNumber = ({
    variant,
    name,
    control,
    rules,
    label,
    messageError,
    handleChange,
    handleOnKeyPress,
    decimalScale,
    handleOnBlur,
    autoFocus,
    readOnly,
    messagesError,
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
                    <NumberFormat
                        customInput={TextField}
                        inputRef={(input: any) =>
                            input && autoFocus && input.focus()
                        }
                        helperText={handleMessageError(
                            messageError,
                            messagesError,
                            error,
                            name,
                        )}
                        InputProps={{
                            readOnly: readOnly,
                        }}
                        error={!!error}
                        variant={variant}
                        label={label}
                        size="small"
                        fullWidth
                        onKeyPress={(data: any) => {
                            handleOnKeyPress && handleOnKeyPress(data);
                        }}
                        onKeyUp={(event: any) => {
                            if (
                                event.target?.value === '0,00' &&
                                event.code === 'Backspace'
                            ) {
                                event.target.value = '';
                            }
                        }}
                        onValueChange={values => {
                            onChange(Number(values.value));
                            // const value = values.floatValue;

                            handleChange && handleChange(Number(values.value));
                        }}
                        autoComplete="off"
                        onBlur={(event: any) => {
                            handleOnBlur && handleOnBlur(event);
                        }}
                        decimalScale={decimalScale}
                        value={value}
                        decimalSeparator=","
                        displayType="input"
                        thousandSeparator="."
                        allowNegative={true}
                        fixedDecimalScale={true}
                    />
                );
            }}
        />
    );
};
