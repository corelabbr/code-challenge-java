import { IconButtonProps } from '@mui/material/IconButton';

export interface not {}

export interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

export interface ITask {
    id?: string;
    title?: string;
    detail?: string | null;
    color?: string | null;
    user?: {
        id: string;
        name: string;
    };
    favorite: boolean;
    date?: Date;
}

export interface ICardTask {
    data: ITask;
    index: number;
    setIndex: (number: number) => void;
    setData: (data: ITask) => void;
    setOpenModal: (open: boolean) => void;
}

export interface IUpdate {
    data: ITask;
}

export interface ICardAddTask {
    setOpenModal: (openModal: boolean) => void;
    setData: (data: ITask) => void;
}
