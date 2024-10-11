import NumericInput from 'material-ui-numeric-input';
import { Controller } from 'react-hook-form';

export interface IFormInputProps {
    variant?: 'outlined' | 'standard' | 'filled' | undefined;
    name: string;
    control: any;
    rules?: any;
    label: string;
    messageError?: (errors: any, field: any) => string;
    handleChange?: any;
    handleOnBlur?: any;
    handleOnKeyPress?: (data: any) => void;
    precision: boolean;
}

export const FormInputNumericTest = ({
    variant,
    name,
    control,
    rules,
    label,
    messageError,
    handleChange,
    handleOnBlur,
    handleOnKeyPress,
    precision,
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
                    <NumericInput
                        precision={precision ? 2 : 0}
                        decimalChar=","
                        thousandChar="."
                        helperText={
                            (messageError && messageError(error, name)) ||
                            error?.message
                        }
                        size="small"
                        error={!!error}
                        onChange={event => {
                            onChange(event);
                            handleChange && handleChange(event);
                        }}
                        onBlur={event => {
                            // onChange(event);
                            handleOnBlur && handleOnBlur(event);
                        }}
                        onKeyPress={(data: any) => {
                            handleChange && handleChange(data);
                        }}
                        value={value ?? ''}
                        fullWidth
                        label={label}
                        variant={variant}
                        autoComplete="off"
                    />
                );
            }}
        />
    );
};
