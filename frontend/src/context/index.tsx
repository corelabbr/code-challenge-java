import React from 'react';
import { AuthProvider } from './AuthContext';
import { ProviderGlobal } from './ContextGlobal';
import { ToastProvider } from './ToastContext';

type Props = { children: React.ReactNode };

const AppProvider: React.FC<Props> = ({ children }) => (
    <AuthProvider>
        <ToastProvider>
            <ProviderGlobal>{children}</ProviderGlobal>
        </ToastProvider>
    </AuthProvider>
);

export default AppProvider;
