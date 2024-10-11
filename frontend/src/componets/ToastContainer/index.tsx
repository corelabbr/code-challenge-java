import React from 'react';
import { useTransition } from 'react-spring';

import Toast from './Toast';
import { Container } from './styles';
import { ToastMessage } from '../../context/ToastContext';

interface ToastContainerProps {
    messages: ToastMessage[];
}

const ToastContainer: React.FC<ToastContainerProps> = ({ messages }) => {
    const messagesWithTransations = useTransition(
        messages,
        message => message.id,
        {
            from: { top: '-120%', opacity: 0 },
            enter: { top: '0%', opacity: 1 },
            leave: { top: '-120%', opacity: 0 },
        },
    );
    return (
        <Container>
            {messagesWithTransations.map(({ item, key, props }) => (
                <Toast key={key} style={props} message={item} />
            ))}
        </Container>
    );
};

export default ToastContainer;
