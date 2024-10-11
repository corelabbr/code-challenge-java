import React, { useEffect, useRef, useState } from 'react';
import {
    Grid,
    Paper,
    Popover,
    TabScrollButton,
    Table,
    TableBody,
    TableCell,
    TableCellProps,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material';
import {
    getCoreRowModel,
    useReactTable,
    ColumnDef,
    flexRender,
} from '@tanstack/react-table';
import { makeStyles } from '@mui/styles';
import { useWindowSize } from '../../util/responsiveness';

// import './styles.scss';

const useStyles = makeStyles({
    root: {
        width: '100%',
        borderCollapse: 'collapse',
        overflow: 'hidden', // Para esconder a barra de rolagem da tabela
    },
    tbody: {
        display: 'block', // Permite definir uma altura máxima para o tbody
        maxHeight: 'calc(100vh - 64px)', // Ajuste conforme necessário
        overflowY: 'auto', // Adiciona uma barra de rolagem apenas ao tbody
    },
    headerRow: {
        whiteSpace: 'nowrap', // Impedindo quebras de linha no cabeçalho
    },
});

interface MyComponentProps {
    cellProps?: TableCellProps;
}

const MyComponent: React.FC<MyComponentProps> = () => {
    return (
        <>
            <Table stickyHeader aria-label="sticky table">
                <TableHead>
                    <TableRow>
                        {columns.map(column => (
                            <TableCell key={column.id} align="left">
                                {column.label}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
            </Table>
            <TableContainer>
                <Table>
                    <TableBody>
                        {[...Array(50)].map((_, index) => (
                            <TableRow key={index} hover>
                                <TableCell>
                                    Dato {index + 1}, Columna 1
                                </TableCell>
                                <TableCell>
                                    Dato {index + 1}, Columna 2
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};

const generateItems = (amount: any) => {
    const arr = Array.from(Array(amount));
    return arr.map((number, i) => ({
        id: i,
        name: `Name ${i + 1}`,
        type: `Item Type ${i + 1}`,
    }));
};
const TableWithInfiniteScroll = () => {
    const [rows, setRows] = useState(generateItems(50));
    return (
        <TableContainer
            sx={{
                // height: width <= 800 ? 400 : 600,
                '&::-webkit-scrollbar': {
                    width: 8,
                },
                '&::-webkit-scrollbar-track': {
                    backgroundColor: '#f1f1f1',
                    borderRadius: 2,
                },
                '&::-webkit-scrollbar-thumb': {
                    backgroundColor: '#c1c1c1',
                    borderRadius: 2,
                },
            }}
            style={{
                margin: 'auto',
                maxHeight: 'calc(100vh - 300px)',
            }}>
            <Table stickyHeader>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Type</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map(({ id, name, type }) => (
                        <TableRow key={id}>
                            <TableCell>{name}</TableCell>
                            <TableCell>{type}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};
// const MyComponent: React.FC<MyComponentProps> = ({ cellProps }) => {
//     const tableRef = useRef<HTMLTableElement>(null);
//     const classes = useStyles();

//     useEffect(() => {
//         // Atualizando as larguras das células do corpo da tabela para corresponder às do cabeçalho
//         if (tableRef.current) {
//             const headerCells =
//                 tableRef.current.querySelectorAll('thead > tr > th');
//             const bodyCells =
//                 tableRef.current.querySelectorAll('tbody > tr > td');

//             headerCells.forEach((headerCell, index) => {
//                 const width = headerCell.clientWidth;
//                 bodyCells[index].style.width = `${width}px`;
//             });
//         }
//     }, []);

//     return (
//         <Table ref={tableRef} className={classes.root}>
//             <TableHead>
//                 <TableRow className={classes.headerRow}>
//                     <TableCell {...cellProps}>Encabezado 1</TableCell>
//                     <TableCell {...cellProps}>Encabezado 2</TableCell>
//                 </TableRow>
//             </TableHead>
//             <TableBody className={classes.tbody}>
//                 {[...Array(50)].map((_, index) => (
//                     <TableRow key={index}>
//                         <TableCell {...cellProps}>
//                             Dato {index + 1}, Columna 1
//                         </TableCell>
//                         <TableCell {...cellProps}>
//                             Dato {index + 1}, Columna 2
//                         </TableCell>
//                     </TableRow>
//                 ))}
//             </TableBody>
//         </Table>
//     );
// };

export interface ReactTableProps<T extends object> {
    data: T[];
    columns: ColumnDef<T>[];
    minWidth: string | number;
    sxTableContainer?: any;
    cursor?: string;
}

const columns = [
    {
        id: 'name',
        align: 'left',
        label: 'Nome',
    },
    {
        id: 'name',
        align: 'left',
        label: 'Nome',
    },
];

// const Table = React.forwardRef<
//     HTMLTableElement,
//     React.HTMLAttributes<HTMLTableElement>
// >(({ className, ...props }, ref) => (
//     <table ref={ref} className={'w-full caption-bottom text-sm'} {...props} />
// ));
// Table.displayName = 'Table';
// const TableHeader = React.forwardRef<
//     HTMLTableSectionElement,
//     React.HTMLAttributes<HTMLTableSectionElement>
// >(({ className, ...props }, ref) => (
//     <thead
//         ref={ref}
//         // Manually added sticky top-0 to fix header not sticking to top of table
//         className={'sticky top-0 bg-secondary [&_tr]:border-b'}
//         {...props}
//     />
// ));
// TableHeader.displayName = 'TableHeader';

export const TableGeneric = <T extends object>({
    data,
    columns,
    minWidth,
    sxTableContainer,
    cursor,
}: ReactTableProps<T>) => {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    const tableRef = useRef<any>(null);

    if (data?.length === 0) {
        return (
            <div>
                <Typography
                    sx={{ flex: '1 1 100%', textAlign: 'center' }}
                    variant="body1"
                    id="tableTitle"
                    component="div">
                    Nenhum registro encontrado
                </Typography>
            </div>
        );
    }

    if (data.length > 0) {
        tableRef?.current?.scrollTo(0, 0);
    }
    return (
        <TableContainer
            sx={{
                // height: width <= 800 ? 400 : 600,
                '&::-webkit-scrollbar': {
                    width: 8,
                },
                '&::-webkit-scrollbar-track': {
                    backgroundColor: '#f1f1f1',
                    borderRadius: 2,
                },
                '&::-webkit-scrollbar-thumb': {
                    backgroundColor: '#c1c1c1',
                    borderRadius: 2,
                },
            }}
            style={{
                margin: 'auto',
                maxHeight: 'calc(100vh - 285px)',
            }}
            ref={tableRef}>
            <Table
                stickyHeader
                sx={{ minWidth: minWidth }}
                aria-labelledby="tableTitle"
                size="small">
                <TableHead className="sticky top-0">
                    <TableRow component={'tr'}>
                        {table.getHeaderGroups().map(headerGroup => {
                            return headerGroup.headers.map(
                                (header: any, i: number) => {
                                    const props: any = header.getContext();
                                    props.key = i;
                                    return header.isPlaceholder
                                        ? null
                                        : flexRender(
                                              header.column.columnDef.header,
                                              props,
                                          );
                                },
                            );
                        })}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {table.getRowModel().rows.map((row, index) => (
                        <TableRow
                            hover
                            key={index}
                            sx={{
                                '&:last-child td, &:last-child th': {
                                    border: 0,
                                },
                                cursor: cursor || 'pointer',
                            }}>
                            {row.getVisibleCells().map((cell, index) => {
                                const key = index;
                                const props: any = cell.getContext();
                                props.key = key;
                                return flexRender(
                                    cell.column.columnDef.cell,
                                    props,
                                );
                            })}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};
