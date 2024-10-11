import { MenuItem, Select } from '@mui/material';
import React from 'react';
import { Controller } from 'react-hook-form';

export interface IFormInputProps {
    variant?: 'outlined' | 'standard' | 'filled' | undefined;
    name: string;
    control: any;
    rules?: any;
    label: string;
    messageError?: (errors: any, field: any) => string;
    handleChange?: any;
    handleOnKeyPress?: (data: any) => void;
}

export const FormSelect = ({
    variant,
    name,
    control,
    rules,
    label,
    messageError,
    handleChange,
    handleOnKeyPress,
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
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={value}
                        label="Forma de definição"
                        onChange={handleChange}>
                        <MenuItem value={'P'}>Percentual</MenuItem>
                        <MenuItem value={'M'}>Manualmente</MenuItem>
                    </Select>
                );
            }}
        />
    );
};
