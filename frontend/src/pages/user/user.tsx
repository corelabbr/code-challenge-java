import { paths } from '../../config';
import MainContainer from '../main-container';
import Form from './userForm';
import List from './userList';

const settings = {
    pathRegister: paths.userRegister,
    pathList: paths.user,
    apiPath: 'user',
    permissionAdmin: null,
    title: 'Usuários',
};

const User: React.FC = () => {
    return (
        <MainContainer>
            <Form settings={{ ...settings, title: 'Usuário' }} />
        </MainContainer>
    );
};

const UserList: React.FC = () => {
    return (
        <MainContainer>
            <List settings={settings} />
        </MainContainer>
    );
};

export { User, UserList };
