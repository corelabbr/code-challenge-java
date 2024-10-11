import { ExpandLess, ExpandMore } from '@mui/icons-material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CloseIcon from '@mui/icons-material/Close';
import { Switch, useLocation } from 'react-router-dom';

import { FormButton } from '../../componets/form/formButton';
import MenuIcon from '@mui/icons-material/Menu';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import NotificationsIcon from '@mui/icons-material/Notifications';
import {
    Badge,
    Collapse,
    Drawer,
    Grid,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Modal,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Button,
    Tooltip,
    Popover,
    InputAdornment,
} from '@mui/material';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { styled, useTheme } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { Link, useHistory } from 'react-router-dom';
import AlertDialog from '../../componets/dialog/alertDialog';
import Footer from '../../componets/footer';
import { paths, rowsPerPageOptions } from '../../config';
import { useAuth } from '../../context/AuthContext';
import { useContextGlobal } from '../../context/ContextGlobal';
import { floatValue, formatNumber } from '../../util/infoFormat';
import './styles.scss';
import { useForm } from 'react-hook-form';
import { useToast } from '../../context/ToastContext';
import api from '../../services/api';
import {
    handleExceptionMessage,
    handleExceptionMultipleMessages,
} from '../../util/handleExceptionAxios';
import { message } from '../../util/handleMessages';
import { FormInputNumber } from '../../componets/form/formInputNumber';
import {
    formatDateWithoutHours,
    momentDiff,
    momentZoneToDateAddDays,
    momentZoneToUnix,
} from '../../util/dateUtil';
import { IconComponent, icons } from '../../componets/icons';
import { handleChangePage, objToQuery, queryToObj } from '../../util/query';
import { cpfAndCnpjMask } from '../../componets/form/mask/cpfAndCnpj';
import { ColumnDef } from '@tanstack/react-table';
import { TableGeneric } from '../../componets/table';
import {
    GenericEnum,
    stateLegalProcessOptions,
} from '../../communs/enums/generic-enum';
import { FormInputText } from '../../componets/form/formInputText';
import imgCoreNotes from '../../assets/images/core-notes.svg';
import GlobalFilterSearchComponent from '../../componets/filterComponent/filterSearch';

const drawerWidth: number = 240;

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

interface Data {
    id: string;
    body: any;
    view: boolean;
    active?: boolean;
    company?: {
        id: string;
        description: string;
    };
}

interface AwardCustomer {
    id: string;
    name: string;
    awardGiven: number;
    total: number;
    awardActual: number;
}

interface IInvoiceDetail {
    formPayment: string;
    typePayment: string;
    description: string;
    dueDate: Date;
    installmentValue: number;
    downloaded: boolean;
    workOrder?: {
        id: string;
        code: string;
        customer: {
            id: string;
            name: string;
            identification: string;
        };
    };
    outputProduct?: {
        id: string;
        code: string;
        customer: {
            id: string;
            name: string;
            identification: string;
        };
    };
}

interface HeadCellAward {
    disablePadding: boolean;
    id: keyof AwardCustomer;
    label: string;
    numeric: boolean;
}

interface ModalProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    rows: Data[];
    width: number;
    setRows: (data: Data[]) => void;
}

interface ModalAwardProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    rows: AwardCustomer[];
    setListAwardedCustomers: (list: AwardCustomer[]) => void;
    width: number;
}
interface ModalOverdueInstallmentProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    rows: IInvoiceDetail[];
    width: number;
}

interface ModalBirthdayCustomerProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    rows: Data[];
    width: number;
    setRows: (data: Data[]) => void;
}

interface ModalApplyAwardProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    data?: AwardCustomer;
    setListAwardedCustomers: (list: AwardCustomer[]) => void;
    width: number;
}

const headCellsAward: readonly HeadCellAward[] = [
    {
        id: 'name',
        numeric: false,
        disablePadding: false,
        label: 'Cliente',
    },
    {
        id: 'total',
        numeric: false,
        disablePadding: false,
        label: 'Total acumulado',
    },
    {
        id: 'awardGiven',
        numeric: false,
        disablePadding: false,
        label: 'Acumulado de premiações',
    },
    {
        id: 'awardActual',
        numeric: false,
        disablePadding: false,
        label: 'Valor atingido',
    },
];

type Props = { children: React.ReactNode };

interface IChildrenItem {
    icon: React.ReactNode;
    sx?: any;
    to: string;
    name: string;
    dataQa: string;
}
interface IListItem {
    icon: React.ReactNode;
    onClick?: () => void;
    name: string;
    open?: boolean;
    dataQa: string;
    to?: string;
    childrens: IChildrenItem[];
}
interface IPropsListItem {
    items: IListItem[];
}

const styleListIcon = { minWidth: 0, pr: 1 };

const RenderList = (props: IPropsListItem) => {
    const { items } = props;

    return (
        <List component="nav">
            {items.map((item: IListItem, indexItem: number) => {
                if (item.childrens.length > 0) {
                    return (
                        <React.Fragment key={indexItem}>
                            <ListItem
                                data-qa={item.dataQa}
                                button
                                onClick={() => {
                                    if (item?.onClick) {
                                        item.onClick();
                                    }
                                }}>
                                <ListItemIcon sx={styleListIcon}>
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText primary={item.name} />
                                {item?.open ? <ExpandLess /> : <ExpandMore />}
                            </ListItem>
                            <Collapse
                                in={item?.open}
                                timeout="auto"
                                unmountOnExit>
                                {item.childrens.map((children, index) => {
                                    return (
                                        <ListItem
                                            key={index}
                                            data-qa={children.dataQa}
                                            button
                                            sx={children?.sx || {}}
                                            component={Link}
                                            to={children.to}>
                                            <ListItemButton>
                                                <ListItemIcon
                                                    sx={styleListIcon}>
                                                    {children.icon}
                                                </ListItemIcon>
                                                <ListItemText
                                                    primary={children.name}
                                                />
                                            </ListItemButton>
                                        </ListItem>
                                    );
                                })}
                            </Collapse>
                        </React.Fragment>
                    );
                }
                return (
                    <ListItemButton
                        key={indexItem}
                        data-qa={item.dataQa}
                        component={Link}
                        onClick={() => {
                            if (item?.onClick) {
                                item.onClick();
                            }
                        }}
                        to={item?.to || ''}>
                        <ListItemIcon sx={styleListIcon}>
                            {item.icon}
                        </ListItemIcon>
                        <ListItemText primary={item.name} />
                    </ListItemButton>
                );
            })}
        </List>
    );
};

const Main = styled('main', { shouldForwardProp: prop => prop !== 'open' })<{
    open?: boolean;
}>(({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${open ? drawerWidth : 0}px`,
    ...(open && {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    }),
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: prop => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${open ? drawerWidth : 0}px)`,
        marginLeft: `${open ? drawerWidth : 0}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

const titleMessages = {
    nextAudience: 'Próximas audiências',
    birthDays: 'Aniversariante(s)',
};

const applyDisplayNone = (condition: boolean) => {
    if (condition) {
        return { display: 'none' };
    }
    return {};
};

const MainContainer: React.FC<Props> = ({ children }) => {
    const history = useHistory();
    const theme = useTheme();
    const { user } = useAuth();

    const [rowsPerPage, setRowsPerPage] = React.useState(0);
    const [page, setPage] = React.useState(0);

    const rowsPerPageDefault = 9;
    const QUERY_DEFAULT = `page=0&size=${rowsPerPageDefault}&userId=${user.sub}&sort=favorite,DESC&sort=date,DESC`;

    const {
        openCollapseRecords,
        handleOpenCollapseRecords,
        loadRows,
        setUpdateRows,
        updateRows,
        totalPages,
    } = useContextGlobal();

    const useFormModal = useForm<any>({
        defaultValues: {},
    });
    const { control, getValues } = useFormModal;
    const { search, pathname } = useLocation();

    const closeAll = React.useCallback(() => {
        handleOpenCollapseRecords(false);
    }, [handleOpenCollapseRecords]);

    const menuItems = React.useMemo<IListItem[]>(
        () => [
            {
                icon: <IconComponent icon={icons.AddCard} />,
                onClick: () => {
                    handleOpenCollapseRecords(!openCollapseRecords);
                },
                name: 'Cadastros',
                open: openCollapseRecords,
                dataQa: 'menu-registrations',
                childrens: [
                    {
                        icon: <IconComponent icon={icons.AccountCircle} />,
                        sx: {
                            ...applyDisplayNone(false),
                        },
                        to: `/records/user?size=${rowsPerPageOptions[0]}&page=0`,
                        name: 'Usuários',
                        dataQa: 'crud-user',
                    },
                ],
            },
            {
                icon: <IconComponent icon={icons.PlaylistAddCheck} />,
                onClick: () => {
                    closeAll();
                },
                to: paths.task,
                name: 'Anotações',
                dataQa: 'crud-note',
                childrens: [],
            },
        ],
        [closeAll, handleOpenCollapseRecords, openCollapseRecords],
    );

    const [open, setOpen] = React.useState(true);
    const toggleDrawer = () => {
        setOpen(!open);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

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
        },
        [history, loadRows, search],
    );

    const isDisableLeft = () => {
        return page === 0;
    };

    const isDisableRight = () => {
        return page + 1 === totalPages;
    };

    function useWindowSize() {
        const [size, setSize] = React.useState([0, 0]);
        React.useLayoutEffect(() => {
            function updateSize() {
                setSize([window.innerWidth, window.innerHeight]);
            }
            window.addEventListener('resize', updateSize);
            updateSize();
            return () => window.removeEventListener('resize', updateSize);
        }, []);
        return size;
    }

    const [width] = useWindowSize();

    React.useEffect(() => {
        if (window.screen.width < 800) {
            setOpen(false);
        }
    }, [width]);

    return (
        <div id="root">
            <Box sx={{ display: 'flex', height: '100vh' }}>
                <CssBaseline />
                {pathname === '/dashboard' && (
                    <GlobalFilterSearchComponent
                        inputs={[]}
                        setToggleSearch={value => {}}
                        toggleSearch={false}
                        setRowsPerPage={setRowsPerPage}
                        setPage={setPage}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        implementationLoadRows={loadRows}
                        updateRows={updateRows}
                        setUpdateRows={setUpdateRows}
                        queryDefault={QUERY_DEFAULT}
                    />
                )}
                <AppBar position="fixed" open={open}>
                    <Toolbar className="toolbar">
                        <div className="toolbar-content">
                            <div className="toolbar-content-title">
                                <IconButton
                                    edge="start"
                                    color="inherit"
                                    aria-label="open drawer"
                                    onClick={toggleDrawer}
                                    sx={{
                                        ...(open && { display: 'none' }),
                                    }}>
                                    <MenuIcon />
                                </IconButton>

                                <div
                                    className={
                                        open
                                            ? `toolbar-content-action toolbar-content-action-disable`
                                            : 'toolbar-content-action'
                                    }>
                                    <img
                                        onClick={() =>
                                            history.push(
                                                `/dashboard?page=0&size=9&userId=${user.sub}&sort=favorite,DESC&sort=date,DESC`,
                                            )
                                        }
                                        src={imgCoreNotes}
                                        alt="CoreNotes"
                                        style={{ cursor: 'pointer' }}
                                    />

                                    <Typography
                                        component="h1"
                                        variant="h6"
                                        color="inherit"
                                        noWrap>
                                        <span>CoreNotes</span>
                                    </Typography>

                                    {pathname === '/dashboard' && (
                                        <>
                                            <div className="toolbar-content-search">
                                                <FormInputText
                                                    name={'title'}
                                                    control={control}
                                                    placeholder="Pesquisar notas"
                                                    handleOnKeyPress={(
                                                        data: any,
                                                        name?: string,
                                                    ) => {
                                                        if (
                                                            data.charCode ===
                                                                13 &&
                                                            name
                                                        ) {
                                                            handleByOnKeyPressEnterNewQuery(
                                                                data.target
                                                                    .value,
                                                                name,
                                                            );
                                                        }
                                                    }}
                                                    endAdornment={
                                                        <InputAdornment position="end">
                                                            <IconComponent
                                                                icon={
                                                                    icons.Search
                                                                }
                                                                onClick={() =>
                                                                    handleByOnKeyPressEnterNewQuery(
                                                                        getValues(
                                                                            'title',
                                                                        ),
                                                                        'title',
                                                                    )
                                                                }
                                                            />
                                                        </InputAdornment>
                                                    }
                                                />
                                            </div>
                                            <div className="toolbar-content-arrows">
                                                <IconButton
                                                    disabled={isDisableLeft()}
                                                    onClick={() => {
                                                        setPage(
                                                            prev => prev - 1,
                                                        );
                                                        handleChangePage(
                                                            null,
                                                            page - 1,
                                                            setPage,
                                                            history,
                                                            loadRows,
                                                        );
                                                    }}>
                                                    <IconComponent
                                                        icon={icons.ChevronLeft}
                                                    />
                                                </IconButton>
                                                <IconButton
                                                    disabled={isDisableRight()}
                                                    onClick={() => {
                                                        setPage(
                                                            prev => prev + 1,
                                                        );
                                                        handleChangePage(
                                                            null,
                                                            page + 1,
                                                            setPage,
                                                            history,
                                                            loadRows,
                                                        );
                                                    }}>
                                                    <IconComponent
                                                        icon={
                                                            icons.ChevronRight
                                                        }
                                                    />
                                                </IconButton>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>

                            <div className="toolbar-content-logout">
                                <LongMenu />
                            </div>
                        </div>
                    </Toolbar>
                </AppBar>
                <Drawer
                    sx={{
                        width: open ? drawerWidth : 0,
                        flexShrink: 0,
                        '& .MuiDrawer-paper': {
                            width: open ? drawerWidth : 0,
                            boxSizing: 'border-box',
                        },
                    }}
                    variant="persistent"
                    anchor="left"
                    open={open}>
                    <DrawerHeader>
                        <IconButton onClick={handleDrawerClose}>
                            {theme.direction === 'ltr' ? (
                                <ChevronLeftIcon />
                            ) : (
                                <ChevronRightIcon />
                            )}
                        </IconButton>
                    </DrawerHeader>
                    <Divider />
                    <Switch>
                        <React.Fragment>
                            <RenderList items={menuItems} />
                        </React.Fragment>
                    </Switch>
                </Drawer>

                <Main
                    open={open}
                    className="main-container"
                    sx={{
                        backgroundColor: theme =>
                            theme.palette.mode === 'light'
                                ? theme.palette.grey[100]
                                : theme.palette.grey[900],
                        display: 'flex',
                        flexDirection: 'column',
                        p: 0,
                    }}>
                    <DrawerHeader />
                    <Box
                        className="main-box"
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            height: '100%',
                            overflow: 'auto',
                            width: '100%',
                        }}>
                        {children}
                    </Box>

                    <Footer />
                </Main>
            </Box>
        </div>
    );
};

const ITEM_HEIGHT = 48;

function LongMenu() {
    const history = useHistory();
    const { user, signOut } = useAuth();

    const handlePerfilUser = () => {
        handleClose();
        history.push(`${paths.userRegister}/${user.sub}`);
    };

    const options = [
        {
            title: 'Meu perfil',
            handleClick: handlePerfilUser,
            dataQa: 'menuItem-myPerfil',
        },
        {
            title: 'Sair',
            handleClick: signOut,
            dataQa: 'menuItem-logOut',
        },
    ];

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleFirstName = (name: string) => {
        if (name) {
            const firstName = name.split(' ');
            return firstName[0];
        }
        return '';
    };

    return (
        <div>
            <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={open ? 'long-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                data-qa="iconButton-userName"
                color="inherit"
                onClick={handleClick}>
                <Typography
                    sx={{ flex: '1 1 100%', fontSize: '16px' }}
                    variant="h6"
                    color="inherit"
                    component="div">
                    {handleFirstName(user.name)}
                </Typography>
                <MoreVertIcon color="inherit" />
            </IconButton>
            <Menu
                id="long-menu"
                MenuListProps={{
                    'aria-labelledby': 'long-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        maxHeight: ITEM_HEIGHT * 4.5,
                        width: '20ch',
                    },
                }}>
                {options.map(option => (
                    <MenuItem
                        key={option.title}
                        // selected={option === 'Pyxis'}
                        data-qa={option.dataQa}
                        onClick={option.handleClick}>
                        {option.title}
                    </MenuItem>
                ))}
            </Menu>
        </div>
    );
}

export default MainContainer;
