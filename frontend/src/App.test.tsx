import React from 'react';
import {
    fireEvent,
    render,
    screen,
    waitFor,
    act,
    getByLabelText,
} from '@testing-library/react';
import App from './App';
import userEvent from '@testing-library/user-event';
import {
    MemoryRouter,
    BrowserRouter as Router,
    useHistory,
} from 'react-router-dom';
import AppProvider from './context';
import Routes from './routes';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from './context/AuthContext';
import { ProviderGlobal } from './context/ContextGlobal';
import { ReactElement } from 'react-imask/dist/mixin';
import SignIn from './pages/sign-in/sign-in';

const crendentials = {
    login: 'admin',
    password: 'abc123',
};

const Wrapper = ({ children }: { children: React.ReactNode }) => {
    return (
        <AppProvider>
            <MemoryRouter initialEntries={['/']}>{children}</MemoryRouter>
            {/* <InterceptorComponent /> */}
        </AppProvider>
    );
};

test('renders learn react link', async () => {
    // eslint-disable-next-line testing-library/no-unnecessary-act
    const { container } = render(<App />, { wrapper: Wrapper });
    // act(() => {
    // const { container } = render(<App />);
    // });

    // Without screen, you need to provide a container:
    const email = screen.getByRole('textbox', { name: /E-mail/i });
    const password = screen.getByLabelText('Senha');
    // const password = screen.getByTestId('password');
    const submitButton = screen.getByText(/ENTRAR/i);

    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();

    userEvent.type(email, crendentials.login);
    userEvent.type(password, crendentials.password);
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
        await fireEvent.click(submitButton);
    });
    console.log(window.localStorage.getItem('@CORELAB:token'));
    expect(await screen.findByText('Faturamentos')).toBeInTheDocument();
    // expect(await screen.findByText(crendentials.password)).toBeInTheDocument();
});
