import * as React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppProvider from './context';
import Routes from './routes';
import { createTheme, ThemeProvider } from '@mui/material';

const theme = createTheme({
    palette: {
        primary: {
            main: '#FFF',
        },
        secondary: {
            main: '#f5f5f5',
        },
    },
});

const App: React.FC = () => {
    return (
        <ThemeProvider theme={theme}>
            <Router>
                <AppProvider>
                    <Routes />
                </AppProvider>
            </Router>
        </ThemeProvider>
    );
};

export default App;
