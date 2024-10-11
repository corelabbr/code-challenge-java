import { Delete, ModeEdit } from '@mui/icons-material';
import FilterListIcon from '@mui/icons-material/FilterList';
import { Chip, Stack } from '@mui/material';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import React, { MouseEvent, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory, useLocation, useParams } from 'react-router-dom';

import { defaultLabelDisplayedRows } from '../../communs/tablePaginationAssistant';
import AlertDialog from '../../componets/dialog/alertDialog';
import FilterSearch from '../../componets/filterComponent/filterSearch';
import { FormButton } from '../../componets/form/formButton';
import { FormInputText } from '../../componets/form/formInputText';
import { paths, rowsPerPageOptions } from '../../config';
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
import './styles.scss';
import { IFormInputPropsFilter } from '../../componets/interfaces/formInputPropsFilter';
import ListComponet from '../../componets/list';
import { useAuth } from '../../context/AuthContext';
import { ImperativeHandleAccessedByParentListComponent } from '../../componets/interfaces/listProps';
import { ColumnDef } from '@tanstack/react-table';
import { IFormSettinsProps } from '../../componets/interfaces/formProps';
import { IconComponent, icons } from '../../componets/icons';
import { FormInputProps } from '../../componets/form/formInterfaces';
import * as ImplEnum from '../../communs/enums/generic-enum';

interface Data {
    id: string;
    name: string;
    email?: string;
    active?: boolean;
}

interface HeadCell {
    disablePadding: boolean;
    id: keyof Data;
    label: string;
    numeric: boolean;
}

const headCells: readonly HeadCell[] = [
    {
        id: 'name',
        numeric: false,
        disablePadding: false,
        label: 'Nome',
    },
    {
        id: 'email',
        numeric: false,
        disablePadding: false,
        label: 'E-mail',
    },
    {
        id: 'active',
        numeric: false,
        disablePadding: false,
        label: 'Ativo',
    },
];

const defaultValues = {
    user: {
        nameDefault: '',
        name: '',
    },
};

const enumInstances = {
    permissionOptionsInstance: new ImplEnum.GenericEnum(
        ImplEnum.permissionOptions,
    ),
};

const UserList: React.FC<IFormSettinsProps> = props => {
    const { settings } = props;

    const refForm =
        React.useRef<ImperativeHandleAccessedByParentListComponent>(null);

    const columnsTable = React.useMemo<ColumnDef<object>[]>(
        () => [
            {
                accessorKey: 'name',
                header: () => (
                    <TableCell align={'left'} padding={'normal'}>
                        Nome
                    </TableCell>
                ),
                cell: (cell: any) => (
                    <TableCell
                        align="left"
                        onClick={() =>
                            refForm?.current?.handleClick(cell.row.original.id)
                        }>
                        {cell?.row.original.name}
                    </TableCell>
                ),
            },
            {
                id: 'authories',
                header: () => (
                    <TableCell align={'left'} padding={'normal'}>
                        Permissões
                    </TableCell>
                ),
                cell: ({ row }: any) => {
                    return (
                        <TableCell
                            align="left"
                            key={row.id}
                            onClick={() =>
                                refForm?.current?.handleClick(row.original.id)
                            }>
                            <Stack
                                direction="row"
                                spacing={1}
                                sx={{ flexWrap: 'wrap', rowGap: 1 }}>
                                {row.original?.authorities
                                    ?.split(',')
                                    .map((authorize: string) => (
                                        <Chip
                                            label={
                                                enumInstances.permissionOptionsInstance.getObject(
                                                    authorize,
                                                ).description
                                            }
                                        />
                                    ))}
                            </Stack>
                        </TableCell>
                    );
                },
            },
            {
                id: 'select',
                header: ({ table }: any) => <TableCell align="center" />,
                cell: ({ row }: any) => (
                    <TableCell align="right">
                        <IconButton
                            onClick={() =>
                                refForm.current?.handleEdit(row.original.id)
                            }>
                            <IconComponent icon={icons.ModeEdit} />
                        </IconButton>
                        <IconButton
                            onClick={() => {
                                refForm.current?.setIdDelete(row.original.id);
                                refForm.current?.setOpenModalDelete(true);
                            }}>
                            <IconComponent icon={icons.Delete} />
                        </IconButton>
                    </TableCell>
                ),
            },
        ],
        [],
    );

    const QUERY_DEFAULT = `page=0&size=${rowsPerPageOptions[0]}`;

    const inputsFilter = React.useMemo<IFormInputPropsFilter[]>(
        () => [
            {
                typeInput: 'text',
                name: 'username',
                control: null,
                label: 'Usuário',
                setValue: null,
                size: 'small',
                variant: 'standard',
                handleOnKeyPress: (data: any, name?: string) => {
                    if (data.charCode === 13 && name) {
                        refForm?.current?.handleByOnKeyPressEnterNewQuery(
                            data.target.value,
                            name,
                        );
                    }
                },
            },
        ],
        [],
    );

    const mainInputsFilter = React.useMemo<FormInputProps[]>(
        () => [
            {
                typeInput: 'text',
                name: 'name',
                control: null,
                label: 'Nome',
                loadingAutocomplete: false,
                md: 12,
                xs: 12,
                handleChange: (data: any) => {
                    refForm?.current?.handleByOnKeyPressEnterNewQuery(
                        data,
                        'name',
                    );
                },
                setValue: null,
                fullWidth: true,
                clearErrors: null,
                setError: null,
                variant: 'standard',
            },
        ],
        [],
    );

    return (
        <ListComponet
            settings={settings}
            defaultValues={defaultValues}
            columnsTable={columnsTable}
            inputsFilter={inputsFilter}
            mainInputsFilter={mainInputsFilter}
            QUERY_DEFAULT={QUERY_DEFAULT}
            ref={refForm}
        />
    );
};

export default UserList;
