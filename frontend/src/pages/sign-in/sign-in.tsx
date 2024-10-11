import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { FormInputText } from '../../componets/form/formInputText';
import { useAuth } from '../../context/AuthContext';
import { useContextGlobal } from '../../context/ContextGlobal';
import { useToast } from '../../context/ToastContext';
import { handleExceptionMessage } from '../../util/handleExceptionAxios';
import { message } from '../../util/handleMessages';
import image from '../../assets/images/core-notes.svg';
import './styles.scss';
import { texts } from '../../config';

interface IFormInput {
    username: string;
    password: string;
    test: string;
}

const SignIn: React.FC = () => {
    const { addToast } = useToast();
    const { signIn } = useAuth();
    const { setOpenLoading } = useContextGlobal();

    const defaultValues = {
        username: '',
        password: '',
    };

    const rules = {
        username: {
            required: true,
        },
        password: {
            required: true,
        },
    };

    const messageError = (errors: any, field: any) => {
        // username
        if (errors && errors.type === 'required' && field === 'username') {
            return 'O campo usuário é obrigátorio.';
        }
        // password
        if (errors && errors.type === 'required' && field === 'password') {
            return 'O campo senha é obrigátorio.';
        }
        return '';
    };

    const { handleSubmit, control, formState } = useForm<IFormInput>({
        defaultValues,
    });

    const submit = async (data: IFormInput, e: any) => {
        e.preventDefault();
        setOpenLoading(true);

        try {
            await signIn({
                username: data.username,
                password: data.password,
            });
            setOpenLoading(false);
        } catch (error) {
            setOpenLoading(false);

            const messageResponse = handleExceptionMessage(error);
            addToast({
                type: 'error',
                title: message.error.login,
                description: messageResponse,
            });
        }
    };

    return (
        <div className="container">
            <div className="main-container">
                {/* <CssBaseline /> */}
                <div className="main">
                    <Avatar sx={{ bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        CORENOTES
                    </Typography>
                    <br />
                    <form
                        style={{ width: '100%' }}
                        onSubmit={handleSubmit(submit)}>
                        <FormInputText
                            id="username"
                            name="username"
                            control={control}
                            rules={rules.username}
                            label="E-mail"
                            size="medium"
                            autoFocus={
                                !formState.dirtyFields.username &&
                                !formState.dirtyFields.password
                            }
                            autoComplete="email"
                            messageError={messageError}
                            sx={{ marginBottom: '16px' }}
                            inactiveRandomId={true}
                        />
                        <FormInputText
                            id={'password'}
                            name="password"
                            control={control}
                            rules={rules.password}
                            label="Senha"
                            size="medium"
                            type="password"
                            autoComplete="password"
                            messageError={messageError}
                            inactiveRandomId={true}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}>
                            Entrar
                        </Button>
                    </form>
                </div>
                <div className="main-image">
                    <div className="container-title">
                        <h2>{texts.nameSystem}</h2>
                        <h6>{texts.info}</h6>
                        <img
                            src={image}
                            alt="CORENOTES"
                            width={'100%'}
                            color="#191919"
                        />
                    </div>
                </div>
            </div>
            <footer className="footer" style={{}}>
                <Typography variant="body2" color="textPrimary" align="center">
                    {`Copyright © ${texts.nameSystem} `}
                    {new Date().getFullYear()}
                    {'.'}
                </Typography>
            </footer>
        </div>
    );
};

export default SignIn;
