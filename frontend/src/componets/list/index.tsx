import React from 'react';
import { Grid, IconButton, Stack, Tooltip } from '@mui/material';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import Typography from '@mui/material/Typography';
import {
    DeepPartial,
    FieldValues,
    Path,
    UnpackNestedValue,
    useForm,
} from 'react-hook-form';
import { useHistory, useLocation } from 'react-router-dom';

import { defaultLabelDisplayedRows } from '../../communs/tablePaginationAssistant';
import AlertDialog from '../../componets/dialog/alertDialog';
import { FormButton } from '../../componets/form/formButton';
import { rowsPerPageOptions } from '../../config';
import { useContextGlobal } from '../../context/ContextGlobal';
import { useToast } from '../../context/ToastContext';
import api from '../../services/api';
import { handleExceptionMessage } from '../../util/handleExceptionAxios';
import { message } from '../../util/handleMessages';
import {
    handleChangePage,
    handleChangeRowsPerPage,
    objToQuery,
    queryToObj,
} from '../../util/query';
import { TableGeneric } from '../../componets/table';
import { FormInputText } from '../../componets/form/formInputText';
import QueryStringGlobal from '../../componets/queryStringGlobal';
import { IFormInputPropsFilter } from '../../componets/interfaces/formInputPropsFilter';
import {
    IPropsList,
    ImperativeHandleAccessedByParentListComponent,
} from '../interfaces/listProps';
import './styles.scss';
import RenderForm from '../form/renderForm';
import { IconComponent, icons } from '../icons';
import { FormInputProps } from '../form/formInterfaces';
import GlobalFilterSearchComponent from '../globalFilterComponent/filterSearch';

interface IFormInput extends FieldValues {
    description: string;
}

interface IStackComponent {
    mainInputs: FormInputProps[];
    inputs: IFormInputPropsFilter[];
    setToggleSearch: (open: boolean) => void;
    handleClearDates: (keys: string[]) => void;
}

const StackComponent = (props: IStackComponent) => {
    const { mainInputs, inputs, setToggleSearch, handleClearDates } = props;

    if (mainInputs.length === 0 && inputs[0].control) {
        return (
            <FormInputText
                name={inputs[0].name}
                control={inputs[0].control}
                label={inputs[0].label}
                size={inputs[0].size}
                variant={inputs[0].variant}
                handleOnKeyPress={inputs[0].handleOnKeyPress}
            />
        );
    }

    if (mainInputs.length > 0) {
        return (
            <>
                <Grid container spacing={2}>
                    <RenderForm inputsForm={mainInputs} />
                </Grid>
                {inputs.length > 0 && (
                    <Tooltip
                        title="Opções de filtros"
                        onClick={() => setToggleSearch(true)}>
                        <IconButton>
                            <IconComponent icon={icons.FilterList} />
                        </IconButton>
                    </Tooltip>
                )}
            </>
        );
    }

    return <></>;
};

const ListComponet = React.forwardRef(
    <T extends object, DataQuery extends FieldValues>(
        props: IPropsList<T, DataQuery>,
        ref?: React.Ref<ImperativeHandleAccessedByParentListComponent>,
    ) => {
        const {
            settings,
            defaultValues,
            columnsTable,
            inputsFilter,
            QUERY_DEFAULT,
            mainInputsFilter,
        } = props;

        const [page, setPage] = React.useState(0);
        const [rowsPerPage, setRowsPerPage] = React.useState(0);
        const [rows, setRows] = React.useState<T[]>([]);
        const [total, setTotal] = React.useState<number>(0);
        const [toggleSearch, setToggleSearch] = React.useState<boolean>(false);
        const [deleteRegister, setDeleteRegister] =
            React.useState<boolean>(false);
        const [openModalDelete, setOpenModalDelete] = React.useState(false);
        const [idDelete, setIdDelete] = React.useState<string>('');

        const history = useHistory();
        const { search } = useLocation();
        const { setOpenLoading } = useContextGlobal();
        const { addToast } = useToast();

        const { control, setValue, clearErrors, setError } = useForm<any>({
            defaultValues,
        });

        const inputs = React.useMemo<IFormInputPropsFilter[]>(
            () => [
                ...inputsFilter.map(i => ({
                    ...i,
                    setValue,
                    control,
                })),
            ],
            [inputsFilter, setValue, control],
        );

        const mainInputs = React.useMemo<FormInputProps<IFormInput>[]>(
            () => [
                ...mainInputsFilter.map(i => ({
                    ...i,
                    setValue,
                    control,
                    setError,
                    clearErrors,
                })),
            ],
            [mainInputsFilter, setValue, control, setError, clearErrors],
        );

        const loadRows = React.useCallback(
            async (queryString: string): Promise<void> => {
                setOpenLoading(true);
                try {
                    const response = await api.get(
                        `${settings.apiPath}?${queryString}`,
                    );
                    setRows(response.data.content);
                    setTotal(response.data.totalElements);
                    setOpenLoading(false);
                    if (deleteRegister) {
                        setDeleteRegister(false);
                    }
                } catch (error) {
                    const messageResponse = handleExceptionMessage(error);
                    addToast({
                        type: 'error',
                        title: message.error.selectAll,
                        description: messageResponse,
                    });
                    setOpenLoading(false);
                }
            },
            [addToast, deleteRegister, setOpenLoading, settings],
        );

        const handleEdit = React.useCallback(
            (id: string) => {
                history.push(`${settings.pathRegister}/${id}`);
            },
            [history, settings],
        );

        const handleClick = React.useCallback(
            (id: string) => {
                handleEdit(id);
            },
            [handleEdit],
        );

        // HANDLER LOAD NEW QUERY FILTER
        const handleByOnKeyPressEnterNewQuery = React.useCallback(
            (value: any, name: string) => {
                const queryObj = queryToObj(search.replace('?', ''));

                const newQuery = {
                    ...queryObj,
                    [name]: value,
                    page: 0,
                };
                const nQuery = objToQuery(newQuery);
                history.push(`?${nQuery}`);
                loadRows(nQuery);

                if (window.screen.width < 900) {
                    setToggleSearch(false);
                }
            },
            [history, search, loadRows],
        );

        const handleClearDates = React.useCallback(
            (keys: string[]) => {
                let queryT = search.replace('?', '');
                const objQuery = queryToObj(queryT);

                setTimeout(() => {
                    keys.forEach((key: any) => {
                        setValue(key, null);
                        setValue(key, null);
                    });
                }, 200);

                delete objQuery.dateInitial;
                delete objQuery.dateFinal;

                queryT = objToQuery(objQuery);
                history.push(`?${queryT}`);
                setDeleteRegister(true);
            },
            [history, search, setValue],
        );

        React.useImperativeHandle(
            ref,
            () => ({
                handleClick,
                handleByOnKeyPressEnterNewQuery,
                setIdDelete,
                setOpenModalDelete,
                handleEdit,
                setToggleSearch,
                control,
                setValue,
                clearErrors,
                setError,
                setUpdateRows: setDeleteRegister,
                loadRows,
                handleClearDates,
            }),
            [
                handleClick,
                handleByOnKeyPressEnterNewQuery,
                setOpenModalDelete,
                handleEdit,
                setToggleSearch,
                control,
                setValue,
                clearErrors,
                setError,
                setDeleteRegister,
                loadRows,
                handleClearDates,
            ],
        );

        const handleDelete = async (id: string) => {
            setOpenLoading(true);

            try {
                await api.delete(`${settings.apiPath}/${id}`);
                addToast({
                    type: 'success',
                    title: message.success.delete,
                    description: '',
                });
                setPage(0);
                setRowsPerPage(rowsPerPageOptions[0]);
                setDeleteRegister(true);
            } catch (error: any) {
                const messageResponse = handleExceptionMessage(error);
                setOpenLoading(false);
                addToast({
                    type: 'error',
                    title: message.error.delete,
                    description: messageResponse,
                });
            }
        };

        const handleConfirmeDelete = async (confirm: boolean) => {
            if (confirm) {
                setOpenModalDelete(false);
                handleDelete(idDelete);
                setIdDelete('');
            } else {
                setOpenModalDelete(false);
                setIdDelete('');
            }
        };

        return (
            <div className="principal-container-component-list">
                <AlertDialog
                    handleConfirmation={handleConfirmeDelete}
                    open={openModalDelete}
                />
                <Box className={toggleSearch ? 'container-box' : ''}>
                    <Paper sx={{ width: '100%', mb: 2 }}>
                        <div className="header-list">
                            <div className="header-list-title">
                                <Typography
                                    sx={{ flex: '1 1 100%' }}
                                    variant="h6"
                                    id="tableTitle"
                                    component="div">
                                    {settings.title}
                                </Typography>
                            </div>
                            <div className="header-list-search">
                                <Stack
                                    spacing={1}
                                    direction="row"
                                    width={'100%'}
                                    justifyContent="space-between"
                                    alignItems="flex-end">
                                    <StackComponent
                                        mainInputs={mainInputs}
                                        inputs={inputs}
                                        setToggleSearch={setToggleSearch}
                                        handleClearDates={handleClearDates}
                                    />
                                </Stack>
                            </div>
                        </div>
                        <Typography
                            sx={{
                                pl: { xs: 1, sm: 2 },
                                pr: { xs: 1, sm: 1 },
                                pb: { xs: 1, sm: 1 },
                            }}>
                            <FormButton
                                label={'Novo'}
                                typeButton="addRegister"
                                onClick={() =>
                                    history.push(settings.pathRegister)
                                }
                            />
                        </Typography>
                        <TableGeneric
                            data={rows}
                            columns={columnsTable}
                            minWidth={650}
                        />
                        <TablePagination
                            rowsPerPageOptions={rowsPerPageOptions}
                            component="div"
                            count={total}
                            labelRowsPerPage={'Linhas por página'}
                            labelDisplayedRows={defaultLabelDisplayedRows}
                            rowsPerPage={rowsPerPage}
                            page={total > 0 ? page : 0}
                            onPageChange={(event: unknown, newPage: number) =>
                                handleChangePage(
                                    event,
                                    newPage,
                                    setPage,
                                    history,
                                    loadRows,
                                )
                            }
                            onRowsPerPageChange={(
                                event: React.ChangeEvent<HTMLInputElement>,
                            ) =>
                                handleChangeRowsPerPage(
                                    event,
                                    setRowsPerPage,
                                    setPage,
                                    history,
                                    loadRows,
                                )
                            }
                        />
                    </Paper>
                </Box>

                <GlobalFilterSearchComponent
                    inputs={inputs}
                    setToggleSearch={setToggleSearch}
                    toggleSearch={toggleSearch}
                    setRowsPerPage={setRowsPerPage}
                    setPage={setPage}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    implementationLoadRows={loadRows}
                    updateRows={deleteRegister}
                    setUpdateRows={setDeleteRegister}
                    queryDefault={QUERY_DEFAULT}
                />
                {/* <QueryStringGlobal
                    setRowsPerPage={setRowsPerPage}
                    setPage={setPage}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    implementationLoadRows={loadRows}
                    updateRows={deleteRegister}
                    setUpdateRows={setDeleteRegister}
                    queryDefault={QUERY_DEFAULT}
                    inputs={inputs}
                /> */}
            </div>
        );
    },
);

export default ListComponet;
