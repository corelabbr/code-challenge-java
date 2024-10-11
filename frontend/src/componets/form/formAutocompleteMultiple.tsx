import * as React from 'react';
import { Autocomplete, TextField } from '@mui/material';
import { Controller } from 'react-hook-form';
import { handleMessageError, message } from '../../util/handleMessages';
import { useMemo } from 'react';
import { debounce } from 'lodash';
import api from '../../services/api';
import { useToast } from '../../context/ToastContext';
import { handleExceptionMessage } from '../../util/handleExceptionAxios';

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
        description: string;
        id: string;
    }[];
    setValue: any;
    getValues?: (name: string) => any | any[] | undefined;
    readOnly?: boolean;
    messagesError?: { type: string; message: string }[];
    activeDebounce?: boolean;
    query?: (value: string) => string;
    DAODataList?: (value: any) => any;
}

export const FormAutocompleteMultiple = ({
    variant,
    name,
    control,
    rules,
    label,
    messageError,
    options,
    setValue,
    getValues,
    handleChange,
    readOnly,
    messagesError,
    activeDebounce,
    query,
    DAODataList,
}: IFormInputProps) => {
    const [optionsAutocomplete, setOptionsAutocomplete] = React.useState([]);

    const { addToast } = useToast();

    if (!variant) {
        variant = 'outlined';
    }

    const handleValue = ({ value }: { value: any }) => {
        const refOptions = query ? optionsAutocomplete : options;

        if (value) {
            return refOptions.filter(o =>
                value.map((v: any) => v.id).includes(o.id),
            );
        }
        return [];
    };

    const updateAutocomplete = async ({ limit }: { limit: string }) => {
        if (query) {
            try {
                const response = await api.get(query(limit));
                let data = response.data.data;
                if (DAODataList) {
                    data = data.map((d: any) => DAODataList(d));
                }
                setOptionsAutocomplete(data);
            } catch (error) {
                const messagesResponse = handleExceptionMessage(error);
                addToast({
                    type: 'error',
                    title: message.error.selectAll,
                    description: messagesResponse,
                });
            }
        }
    };

    React.useLayoutEffect(() => {
        updateAutocomplete({ limit: '20' });
    }, []);

    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        handleChange && handleChange(event);

        // if (event.type === 'click' || event.type === 'keydown') {
        //     handleByOnKeyPressEnterNewQuery(false);
        // }
    };

    const debouncedChangeHandler = useMemo(
        () => debounce(handleOnChange, activeDebounce ? 700 : 0),
        [],
    );

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
                if (!value) {
                    value = [];
                }
                return (
                    <Autocomplete
                        multiple
                        options={query ? optionsAutocomplete : options}
                        readOnly={readOnly}
                        getOptionDisabled={(option: any) =>
                            value.find((o: any) => o.id == option.id)?.id
                                ? true
                                : false
                        }
                        onChange={(event, option) => {
                            // const lastOption = option[option.length - 1];
                            // const findOptions = option.find(
                            //     (o, index) =>
                            //         index != option.length - 1 &&
                            //         o.description === lastOption.description,
                            // );
                            // if (findOptions) {
                            //     option.splice(option.length - 1, 1);
                            // }
                            onChange(event);
                            setValue(name, [...option]);
                            handleChange && handleChange(event, option);
                        }}
                        value={handleValue({ value })}
                        getOptionLabel={option => option.description}
                        size="small"
                        noOptionsText="Nenhum registro encontrado"
                        renderInput={params => (
                            <TextField
                                {...params}
                                variant={variant}
                                size="small"
                                label={label}
                                helperText={handleMessageError(
                                    messageError,
                                    messagesError,
                                    error,
                                    name,
                                )}
                                onChange={debouncedChangeHandler}
                                inputProps={{
                                    ...params.inputProps,
                                }}
                                error={!!error}
                            />
                        )}
                    />
                );
            }}
        />
    );
};
