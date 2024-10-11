import CloseIcon from '@mui/icons-material/Close';
import { Container, IconButton, Stack, Typography } from '@mui/material';
import React, { useEffect, useState, useLayoutEffect } from 'react';
import api from '../../services/api';
import { FormAutocompleteInitialized } from '../form/formAutocompleteInitialized';
import { FormAutocompleteMultiple } from '../form/formAutocompleteMultiple';
import { FormButton } from '../form/formButton';
import { FormInputText, IFormInputProps } from '../form/formInputText';
import './filterSearch.scss';
import QueryStringGlobal from '../queryStringGlobal';
import { objToQuery, setValuesOfQuery } from '../../util/query';
import { useHistory } from 'react-router-dom';
import { IFormInputPropsFilter } from '../interfaces/formInputPropsFilter';
import GlobalQueryString from '../globalQueryString';

interface IFilterSearch {
    inputs: IFormInputPropsFilter[];
    handleClearFilters?: () => void;
    setToggleSearch: (toggleSearch: boolean) => void;
    toggleSearch: boolean;
    setRowsPerPage: (numb: number) => void;
    setPage: (numb: number) => void;
    rowsPerPage: number;
    page: number;
    implementationLoadRows: (queryString: string) => Promise<void>;
    updateRows: boolean;
    setUpdateRows: (action: boolean) => void;
    queryDefault: string;
}

const FilterSearchComponent: React.FC<IFilterSearch> = ({
    inputs,
    setToggleSearch,
    toggleSearch,
    setRowsPerPage,
    setPage,
    rowsPerPage,
    page,
    implementationLoadRows,
    updateRows,
    setUpdateRows,
    queryDefault,
}) => {
    const history = useHistory();

    const data: any = { charCode: 13 };

    function handleClearAll() {
        history.push(`?${queryDefault}`);
        setValuesOfQuery(queryDefault, inputs, setRowsPerPage, setPage);
        implementationLoadRows(queryDefault);
    }

    return (
        <div
            className={
                toggleSearch ? 'container-search' : 'container-search-none'
            }>
            <GlobalQueryString
                setRowsPerPage={setRowsPerPage}
                setPage={setPage}
                rowsPerPage={rowsPerPage}
                page={page}
                implementationLoadRows={implementationLoadRows}
                updateRows={updateRows}
                setUpdateRows={setUpdateRows}
                queryDefault={queryDefault}
                inputs={inputs}
            />
            {/** INPUT FILTERS */}
            {toggleSearch && (
                <div className="container-inputs">
                    <Typography
                        maxWidth="xl"
                        component={'div'}
                        sx={{
                            ml: 0,
                            pl: 0,
                            display: 'flex',
                            alignItems: 'center',
                        }}>
                        <Typography
                            sx={{ flex: '1 1 50%' }}
                            variant="h6"
                            id="tableTitle"
                            component="div"
                            align="left">
                            Filtros
                        </Typography>
                        <Typography
                            sx={{ flex: '1 1 50%', m: 0, p: 0 }}
                            align="right"
                            component={'div'}>
                            <IconButton
                                component={'div'}
                                onClick={() => {
                                    setToggleSearch(false);
                                }}>
                                <CloseIcon />
                            </IconButton>
                        </Typography>
                    </Typography>
                    <Stack component={'div'} spacing={1} direction="column">
                        {inputs.map((input, index) => {
                            if (input.typeInput === 'text') {
                                return (
                                    <FormInputText
                                        key={index}
                                        name={input.name}
                                        control={input.control}
                                        label={input.label}
                                        handleOnKeyPress={
                                            input.handleOnKeyPress
                                        }
                                        variant="standard"
                                        mask={input.mask}
                                    />
                                );
                            }
                            if (input.typeInput === 'autocomplete') {
                                return (
                                    <FormAutocompleteInitialized
                                        key={index}
                                        name={input.name}
                                        control={input.control}
                                        label={input?.label || ''}
                                        loading={
                                            input.loadingAutocomplete || false
                                        }
                                        options={input.options || []}
                                        setValue={input.setValue}
                                        handleChange={input.handleChange}
                                        variant={input.variant}
                                        handleOnKeyPress={
                                            input.handleOnKeyPress
                                        }
                                        activeDebounce={input?.activeDebounce}
                                    />
                                );
                            }
                            if (
                                input.typeInput === 'multiple' &&
                                input.getValues
                            ) {
                                return (
                                    <FormAutocompleteMultiple
                                        key={index}
                                        name={input.name}
                                        control={input.control}
                                        label={input?.label || ''}
                                        options={input.options || []}
                                        setValue={input.setValue}
                                        getValues={input.getValues}
                                        variant={input.variant}
                                        handleChange={input.handleChange}
                                    />
                                );
                            }
                            return <></>;
                        })}
                        <span />
                        <Stack spacing={1} direction="row">
                            {window.screen.width < 800 &&
                                inputs[0]?.handleOnKeyPress && (
                                    <FormButton
                                        label="Pesquisar"
                                        variant="contained"
                                        typeButton="search"
                                        onClick={() =>
                                            inputs[0]?.handleOnKeyPress?.(data)
                                        }
                                    />
                                )}
                            <FormButton
                                label={'Limpar'}
                                variant="contained"
                                typeButton="clear"
                                onClick={handleClearAll}
                            />
                        </Stack>
                    </Stack>
                </div>
            )}
        </div>
    );
};

export default FilterSearchComponent;
