import React, { useEffect, useState } from 'react';
import {
    FiAlertCircle,
    FiCheckCircle,
    FiInfo,
    FiXCircle,
} from 'react-icons/fi';
import { ToastMessage, useToast } from '../../../context/ToastContext';
import { Container } from './styles';

interface ToastProps {
    message: ToastMessage;
    style: object;
}

const Toast: React.FC<ToastProps> = ({ message, style }) => {
    const [notRemoveToast, setNotRemoveToast] = useState(false);
    const { removeToast } = useToast();

    const icons = {
        info: <FiInfo size={24} onClick={() => setNotRemoveToast(true)} />,
        error: (
            <FiAlertCircle size={24} onClick={() => setNotRemoveToast(true)} />
        ),
        success: (
            <FiCheckCircle size={24} onClick={() => setNotRemoveToast(true)} />
        ),
        warn: (
            <FiAlertCircle size={24} onClick={() => setNotRemoveToast(true)} />
        ),
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            if (!notRemoveToast) {
                removeToast(message.id);
            }
        }, 5000);
        return () => {
            clearTimeout(timer); // exclui o timer caso o componente seja destruído
        };
    }, [removeToast, notRemoveToast, message.id]);
    return (
        <Container
            type={message.type}
            hasDescription={!!message.description}
            style={style}>
            {icons[message.type || 'info']}
            <div>
                <strong>{message.title}</strong>
                <p>{message?.description}</p>
            </div>
            <button type="button" onClick={() => removeToast(message.id)}>
                <FiXCircle size={22} />
            </button>
        </Container>
    );
};

export default Toast;
