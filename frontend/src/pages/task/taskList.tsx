import React from 'react';
import IconButton from '@mui/material/IconButton';
import TableCell from '@mui/material/TableCell';

import { rowsPerPageOptions } from '../../config';
import './styles.scss';
import { ColumnDef } from '@tanstack/react-table';
import { IconComponent, icons } from '../../componets/icons';
import { IFormInputPropsFilter } from '../../componets/interfaces/formInputPropsFilter';
import { IFormSettinsProps } from '../../componets/interfaces/formProps';
import ListComponet from '../../componets/list';
import { ImperativeHandleAccessedByParentListComponent } from '../../componets/interfaces/listProps';
import {
    formatDate,
    momentZoneToDateAddDays,
    momentZoneToUnix,
} from '../../util/dateUtil';
import * as ImplEnum from '../../communs/enums/generic-enum';
import { setHours, setMinutes } from 'date-fns';
import { FormInputProps } from '../../componets/form/formInterfaces';
import { useAuth } from '../../context/AuthContext';

const defaultValues = {
    dateInitial: momentZoneToDateAddDays({ days: -90, startOfType: 'day' }),
    dateFinal: momentZoneToDateAddDays({ days: 7, endOfType: 'day' }),
};

const NoteList: React.FC<IFormSettinsProps> = props => {
    const { settings } = props;
    const { user } = useAuth();

    const refForm =
        React.useRef<ImperativeHandleAccessedByParentListComponent>(null);

    const columnsTable = React.useMemo<ColumnDef<object>[]>(
        () => [
            {
                id: 'title',
                header: () => (
                    <TableCell align={'left'} padding={'normal'}>
                        Título
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
                            {row.original?.title}
                        </TableCell>
                    );
                },
            },

            {
                id: 'user',
                header: () => (
                    <TableCell align={'center'} padding={'normal'}>
                        Usuário
                    </TableCell>
                ),
                cell: ({ row }: any) => {
                    return (
                        <TableCell
                            align="center"
                            key={row.id}
                            onClick={() =>
                                refForm?.current?.handleClick(row.original.id)
                            }>
                            {row.original?.user?.name}
                        </TableCell>
                    );
                },
            },
            {
                accessorKey: 'date',
                header: () => (
                    <TableCell align={'center'} padding={'normal'}>
                        Data de cadastro
                    </TableCell>
                ),
                cell: (cell: any) => (
                    <TableCell
                        align="center"
                        onClick={() =>
                            refForm?.current?.handleClick(cell.row.original.id)
                        }>
                        {cell?.row.original.date
                            ? formatDate(cell?.row.original?.date)
                            : ''}
                    </TableCell>
                ),
            },
            {
                accessorKey: 'date',
                header: () => (
                    <TableCell align={'center'} padding={'normal'}>
                        Favorito
                    </TableCell>
                ),
                cell: (cell: any) => (
                    <TableCell
                        align="center"
                        onClick={() =>
                            refForm?.current?.handleClick(cell.row.original.id)
                        }>
                        {cell?.row.original.favorite ? 'Sim' : 'Não'}
                    </TableCell>
                ),
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

    const QUERY_DEFAULT = `page=0&size=${
        rowsPerPageOptions[0]
    }&dateInitial=${momentZoneToUnix(
        defaultValues.dateInitial,
    )}&dateFinal=${momentZoneToUnix(defaultValues.dateFinal)}&userId=${
        user.sub
    }&sort=date,DESC`;

    const inputsFilter = React.useMemo<IFormInputPropsFilter[]>(
        () => [
            {
                typeInput: 'text',
                name: 'title',
                control: null,
                label: 'Título',
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
                typeInput: 'dateHour',
                name: 'dateInitial',
                control: null,
                label: 'Date de início',
                loadingAutocomplete: false,
                md: 6,
                xs: 12,
                handleChange: (data: any) => {
                    let newTime = setHours(data, 0);
                    newTime = setMinutes(newTime, 1);
                    refForm?.current?.handleByOnKeyPressEnterNewQuery(
                        momentZoneToUnix(newTime),
                        'dateInitial',
                    );
                },
                setValue: null,
                fullWidth: true,
                clearErrors: null,
                setError: null,
            },
            {
                typeInput: 'dateHour',
                name: 'dateFinal',
                control: null,
                label: 'Date de fim',
                loadingAutocomplete: false,
                md: 6,
                xs: 12,
                handleChange: (data: any) => {
                    let newTime = setHours(data, 23);
                    newTime = setMinutes(newTime, 59);
                    refForm?.current?.handleByOnKeyPressEnterNewQuery(
                        momentZoneToUnix(newTime),
                        'dateFinal',
                    );
                },
                setValue: null,
                fullWidth: true,
                clearErrors: null,
                setError: null,
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

export default NoteList;
