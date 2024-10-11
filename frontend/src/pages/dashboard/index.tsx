import * as React from 'react';

import MainContainer from '../main-container';
import './styles.scss';

import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { format } from 'date-fns';
import { Box, Grid, Modal, Popover, Stack, Tooltip } from '@mui/material';
import { IconComponent, icons } from '../../componets/icons';
import { message } from '../../util/handleMessages';
import { handleExceptionMultipleMessages } from '../../util/handleExceptionAxios';
import api from '../../services/api';
import { useToast } from '../../context/ToastContext';
import { FormInputProps } from '../../componets/form/formInterfaces';
import { useWindowSize } from '../../util/responsiveness';
import { useContextGlobal } from '../../context/ContextGlobal';
import RenderForm from '../../componets/form/renderForm';
import { FormButton } from '../../componets/form/formButton';
import { useForm } from 'react-hook-form';
import {
    ExpandMoreProps,
    ICardAddTask,
    ICardTask,
    ITask,
    IUpdate,
} from '../../communs/interfaces';

const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme }) => ({
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
    variants: [
        {
            props: ({ expand }: ExpandMoreProps) => !expand,
            style: {
                transform: 'rotate(0deg)',
            },
        },
        {
            props: ({ expand }: ExpandMoreProps) => !!expand,
            style: {
                transform: 'rotate(180deg)',
            },
        },
    ],
}));

export const getTextColorDependingOnBackgroundColor = (
    backgroundHexColor: string,
) => {
    if (!backgroundHexColor || backgroundHexColor.length !== 7)
        return '#ffffff';

    const redIntensity = parseInt(backgroundHexColor.substring(1, 3), 16);
    const greenIntensity = parseInt(backgroundHexColor.substring(3, 5), 16);
    const blueIntensity = parseInt(backgroundHexColor.substring(5, 7), 16);

    if (
        redIntensity * 0.299 + greenIntensity * 0.587 + blueIntensity * 0.114 >
        150
    ) {
        return '#000000';
    } else {
        return '#ffffff';
    }
};

let configOptionsColor = [
    {
        color: '#BAE2FF',
        inverse: '#000000',
    },
    {
        color: '#B9FFDD',
        inverse: '#000000',
    },
    {
        color: '#FFE8AC',
        inverse: '#000000',
    },
    {
        color: '#FFCAB9',
        inverse: '#000000',
    },
    {
        color: '#F99494',
        inverse: '#000000',
    },
    {
        color: '#9DD6FF',
        inverse: '#000000',
    },
    {
        color: '#ECA1FF',
        inverse: '#000000',
    },
    {
        color: '#DAFF8B',
        inverse: '#000000',
    },
    {
        color: '#FFA285',
        inverse: '#000000',
    },
    {
        color: '#CDCDCD',
        inverse: '#000000',
    },
    {
        color: '#979797',
        inverse: '#000000',
    },
    {
        color: '#A99A7C',
        inverse: '#000000',
    },
];

interface IModalNote {
    open: boolean;
    setOpen: (open: boolean) => void;
    width: number;
    data: ITask | undefined;
    index?: number;
    id?: string;
    settings: any;
    setData: (data: ITask | undefined) => void;
    updateList: ({ index, data }: { index: number; data: ITask }) => any;
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '600px',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 2,
    borderRadius: '4px',
};

function ModalNote({
    open,
    setOpen,
    width,
    data,
    id,
    index,
    settings,
    updateList,
    setData,
}: IModalNote) {
    const { addToast } = useToast();
    const { setOpenLoading, setUpdateRows } = useContextGlobal();

    const defaultValues = {
        title: '',
        detail: '',
        favorite: false,
    };

    const styleModal = {
        ...style,
    };

    if (width <= 800) {
        styleModal.width = '90%';
    }

    const useFormModal = useForm<any>({
        defaultValues: defaultValues,
    });
    const { control, setValue } = useFormModal;
    const handleSubmit = useFormModal.handleSubmit;
    const reset = useFormModal.reset;

    const inputsForm: FormInputProps<any>[] = React.useMemo(
        () => [
            {
                typeInput: 'text',
                name: 'title',
                control: control,
                label: 'Título',
                loadingAutocomplete: false,
                md: 12,
                xs: 12,
                rules: {
                    required: true,
                },
                messagesError: [
                    {
                        type: 'required',
                        message: 'O campo título é obrigatório',
                    },
                ],
                autoFocus: true,
            },
            {
                typeInput: 'text',
                name: 'detail',
                control: control,
                label: 'Detalhes',
                loadingAutocomplete: false,
                md: 12,
                xs: 12,
                rules: {
                    required: true,
                },
                messagesError: [
                    {
                        type: 'required',
                        message: 'O campo detalhe é obrigatório',
                    },
                ],
                multiline: true,
            },
            {
                typeInput: 'checkbox',
                name: 'favorite',
                control: control,
                label: 'Favorito',
                md: 3,
                xs: 12,
            },
        ],
        [control],
    );

    const handleClose = () => {
        setOpen(false);
        reset(defaultValues);
        setData(undefined);
    };

    const submit = async (register: any, e: any) => {
        e.preventDefault();

        if (register['undefined']) {
            delete register['undefined'];
        }
        try {
            setOpenLoading(true);

            for (const input of inputsForm) {
                if (!input?.dto) {
                    continue;
                }
                register = input.dto(register);
            }

            let dataToUpdate = {
                ...data,
                ...register,
            };

            if (id) {
                await api.put(`${settings.apiPath}/${id}`, dataToUpdate);
            } else {
                await api.post(`${settings.apiPath}`, dataToUpdate);
                setUpdateRows(true);
            }
            addToast({
                type: 'success',
                title: message.success.save,
                description: '',
            });
            setOpenLoading(false);

            if (index || index === 0) {
                updateList({ data: dataToUpdate, index });
            }
            handleClose();
        } catch (error) {
            setOpenLoading(false);
            const messagesResponse = handleExceptionMultipleMessages(error);
            let insideErrors = false;
            for (const messageResponse of messagesResponse) {
                addToast({
                    type: 'error',
                    title: message.error.save,
                    description: messageResponse,
                });
                insideErrors = true;
            }
            if (!insideErrors) {
                addToast({
                    type: 'error',
                    title: message.error.save,
                    description: 'Algo deu errado',
                });
            }
        }
    };

    const setValueData = React.useCallback(
        (data: ITask) => {
            const keys = Object.keys(data);
            for (const input of inputsForm) {
                if (input?.setData) {
                    setValue(input.name, input.setData(data));
                    continue;
                }

                if (keys.includes(input.name)) {
                    setValue(input.name, data[input.name as keyof ITask]);
                }
            }
        },
        [inputsForm, setValue],
    );

    React.useEffect(() => {
        if (open && data) {
            setValueData(data);
        }
    }, [open, data, setValueData]);

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
                <Box sx={styleModal} component={'div'} className="box-modal">
                    <Typography
                        id="box-modal-title"
                        className="box-modal-title"
                        variant="h6"
                        component="h2">
                        {settings.title}
                    </Typography>
                    <form onSubmit={handleSubmit(submit)}>
                        <Grid container spacing={2}>
                            <RenderForm inputsForm={inputsForm} data={data} />
                        </Grid>
                        <br />
                        <Stack component={'div'} spacing={2} direction={'row'}>
                            <FormButton
                                label={'Salvar'}
                                typeButton={'submit'}
                            />
                            <FormButton
                                label={'Cancelar'}
                                typeButton={'cancel'}
                                onClick={() => handleClose()}
                            />
                        </Stack>
                    </form>
                </Box>
            </Modal>
        </div>
    );
}

const RecipeReviewCard: React.FC<ICardTask> = props => {
    const {
        data: { title, detail, color, favorite, date, id },
        index,
        setData,
        setOpenModal,
        setIndex,
    } = props;

    const [expanded, setExpanded] = React.useState(false);
    const [loadCard, setLoadCard] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const { addToast } = useToast();
    const { setUpdateRows } = useContextGlobal();

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleExpandClick = () => {
        if (detail) {
            setExpanded(!expanded);
        }
    };

    const getConfigIcon = () => {
        if (favorite) {
            return {
                className: 'card-task-icon-favorite',
                icon: icons.Star,
            };
        }
        return {
            className: 'card-task-icon-nofavorite',
            icon: icons.StarBorder,
        };
    };

    const getConfigIconColorFill = () => {
        if (open) {
            return { backgroundColor: '#FFE3B3' };
        }
        return {};
    };

    const update = async (updateData: IUpdate) => {
        let { data } = updateData;

        try {
            setLoadCard(true);

            await api.put(`task/${data.id}`, data);

            setUpdateRows(true);
        } catch (error) {
            const messagesResponse = handleExceptionMultipleMessages(error);
            for (const messageResponse of messagesResponse) {
                addToast({
                    type: 'error',
                    title: message.error.save,
                    description: messageResponse,
                });
            }
        }
        setLoadCard(false);
    };

    const deleteRegister = async (id: string) => {
        try {
            setLoadCard(true);

            await api.delete(`task/${id}`);

            setUpdateRows(true);
        } catch (error) {
            const messagesResponse = handleExceptionMultipleMessages(error);
            for (const messageResponse of messagesResponse) {
                addToast({
                    type: 'error',
                    title: message.error.save,
                    description: messageResponse,
                });
            }
        }
        setLoadCard(false);
    };

    return (
        <Card
            style={{ opacity: loadCard ? 0.2 : 1 }}
            sx={{ background: color || '#FFF' }}
            className="card-task">
            <div className="card-task-header">
                <div className="card-task-body">
                    <span className="card-task-title">{title}</span>
                    <span className="card-task-date">
                        {date &&
                            `Criado em: ${format(
                                new Date(date),
                                'dd/MM/yyyy HH:mm',
                            )}`}
                    </span>
                </div>
                <IconButton
                    className={getConfigIcon().className}
                    onClick={() => {
                        let data = props.data;
                        data.favorite = !data.favorite;

                        update({ data: data });
                    }}>
                    <IconComponent icon={getConfigIcon().icon} />
                </IconButton>
            </div>
            <CardContent>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {title}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <Tooltip title={'Editar'}>
                    <IconButton
                        aria-label="add to favorites"
                        onClick={() => {
                            setOpenModal(true);
                            setIndex(index);
                            setData(props.data);
                        }}>
                        <IconComponent icon={icons.EditOutlined} />
                    </IconButton>
                </Tooltip>
                <div>
                    <Tooltip title={'Trocar cor'}>
                        <IconButton
                            aria-label="more"
                            className="card-task-content-actions-colorfill"
                            aria-controls={open ? 'long-menu' : undefined}
                            aria-expanded={open ? 'true' : undefined}
                            aria-haspopup="true"
                            onClick={handleClick}
                            sx={getConfigIconColorFill()}>
                            <IconComponent icon={icons.FormatColorFill} />
                        </IconButton>
                    </Tooltip>
                    <Popover
                        id={props.data.id}
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}>
                        <div className="card-content-actions-item">
                            {configOptionsColor.map((c, index) => {
                                return (
                                    <div
                                        key={index}
                                        onClick={() => {
                                            let data = props.data;
                                            data.color = c.color;

                                            update({
                                                data: props.data,
                                            });
                                        }}
                                        className="card-content-actions-item-color"
                                        style={{
                                            backgroundColor: c.color,
                                        }}></div>
                                );
                            })}
                        </div>
                    </Popover>
                </div>
                <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more">
                    <ExpandMoreIcon />
                </ExpandMore>
                <Tooltip title={'Excluir'}>
                    <IconButton
                        aria-label="more"
                        aria-controls={open ? 'long-menu' : undefined}
                        aria-expanded={open ? 'true' : undefined}
                        aria-haspopup="true"
                        onClick={() => id && deleteRegister(id)}>
                        <IconComponent icon={icons.Close} />
                    </IconButton>
                </Tooltip>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography sx={{ marginBottom: 2 }}>Detalhes:</Typography>
                    <Typography sx={{ marginBottom: 2 }}>{detail}</Typography>
                </CardContent>
            </Collapse>
        </Card>
    );
};

const RecipeReviewCardToAdd: React.FC<ICardAddTask> = props => {
    const { setOpenModal, setData } = props;

    return (
        <Card
            onClick={() => setOpenModal(true)}
            sx={{ background: '#FFF' }}
            className="card-addtask">
            <div className="card-addtask-header">
                <div className="card-addtask-body">
                    <span className="card-addtask-title">Título</span>
                </div>
                <Tooltip title={'Adicionar como favorito'}>
                    <IconButton>
                        <IconComponent
                            icon={icons.StarBorder}
                            onClick={() => setData({ favorite: true })}
                        />
                    </IconButton>
                </Tooltip>
            </div>

            <CardContent>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Criar nota...
                </Typography>
            </CardContent>
        </Card>
    );
};

const Component: React.FC = () => {
    const { tasks, setTasks } = useContextGlobal();
    const [openModal, setOpenModal] = React.useState(false);
    const [data, setData] = React.useState<ITask>();
    const [index, setIndex] = React.useState(-1);

    const [width] = useWindowSize();

    const settings = {
        apiPath: 'task',
        title: 'Nota',
    };

    const updateList = React.useCallback(
        ({ index, data }: { index: number; data: ITask }) => {
            let list = tasks;

            list[index] = data;
            setTasks(list);
        },
        [tasks, setTasks],
    );

    return (
        <div className="principal-container-dashboard">
            <div className="container-header">
                <RecipeReviewCardToAdd
                    setOpenModal={setOpenModal}
                    setData={setData}
                />
            </div>
            <div
                className={
                    tasks?.length > 3
                        ? `container-body`
                        : 'container-body container-boby-max-height'
                }>
                {tasks?.map((d: ITask, index: number) => {
                    return (
                        <RecipeReviewCard
                            data={d}
                            index={index}
                            key={index}
                            setOpenModal={setOpenModal}
                            setData={setData}
                            setIndex={setIndex}
                        />
                    );
                })}
            </div>
            <ModalNote
                open={openModal}
                setOpen={setOpenModal}
                width={width}
                data={data}
                id={data?.id}
                index={index}
                settings={settings}
                updateList={updateList}
                setData={setData}
            />
        </div>
    );
};

const Dashboard: React.FC = () => {
    return (
        <MainContainer>
            <Component />
        </MainContainer>
    );
};

export default Dashboard;
