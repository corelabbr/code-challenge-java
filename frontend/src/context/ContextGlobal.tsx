import { Backdrop, CircularProgress } from '@mui/material';
import React, { createContext, useCallback, useContext, useState } from 'react';
import io from 'socket.io-client';

import api from '../services/api';
import { useAuth } from './AuthContext';
import { urls } from '../config';
import { ITask } from '../communs/interfaces';
import { handleExceptionMessage } from '../util/handleExceptionAxios';
import { message } from '../util/handleMessages';
import { useToast } from './ToastContext';
import { useLocation } from 'react-router-dom';

interface ContextData {
    setOpenLoading(open: boolean): void;
    handleOpenCollapseRecords(open: boolean): void;
    openCollapseRecords: boolean;
    tasks: ITask[];
    setTasks: (tasks: ITask[]) => void;
    loadRows: (queryString: string) => Promise<void>;
    totalPages: number;
    setUpdateRows: (updated: boolean) => void;
    updateRows: boolean;
}

type Props = { children: React.ReactNode };

const ContextGlobal = createContext<ContextData>({} as ContextData);

const ProviderGlobal: React.FC<Props> = ({ children }) => {
    const [open, setOpen] = useState(false);
    const [tasks, setTasks] = useState<ITask[]>([]);
    const [totalPages, setTotalPages] = useState(0);
    const [updateRows, setUpdateRows] = useState(false);

    const [openCollapseRecords, setOpenCollapseRecords] = useState(() => {
        const openCollapseRecords = localStorage.getItem(
            '@CORELAB:openCollapseRecords',
        );

        if (openCollapseRecords) {
            return true;
        }
        return false;
    });

    const { pathname } = useLocation();
    const { addToast } = useToast();

    const handleOpenCollapseRecords = (value: boolean) => {
        if (value) {
            localStorage.setItem('@CORELAB:openCollapseRecords', 'true');
            setOpenCollapseRecords(true);
        } else {
            localStorage.removeItem('@CORELAB:openCollapseRecords');
            setOpenCollapseRecords(false);
        }
    };

    const loadRows = React.useCallback(
        async (queryString: string) => {
            if (pathname === '/dashboard') {
                try {
                    setOpen(true);
                    const response = await api.get(`task?${queryString}`);
                    setTasks(response.data.content);
                    setTotalPages(response.data.totalPages);
                } catch (error) {
                    const messagesResponse = handleExceptionMessage(error);
                    addToast({
                        type: 'error',
                        title: message.error.selectAll,
                        description: messagesResponse,
                    });
                }
                setOpen(false);
            }
        },
        [addToast, pathname],
    );

    return (
        <ContextGlobal.Provider
            value={{
                setOpenLoading: setOpen,
                handleOpenCollapseRecords,
                openCollapseRecords,
                tasks,
                setTasks,
                loadRows,
                totalPages,
                setUpdateRows,
                updateRows,
            }}>
            <Backdrop
                sx={{
                    color: '#fff',
                    zIndex: theme => theme.zIndex.drawer + 1300,
                }}
                open={open}>
                <CircularProgress color="inherit" />
            </Backdrop>
            {children}
        </ContextGlobal.Provider>
    );
};

function useContextGlobal(): ContextData {
    const context = useContext(ContextGlobal);
    if (!context) {
        throw new Error('useToast must be used within a ProviderGlobal');
    }
    return context;
}

export { ProviderGlobal, useContextGlobal };
