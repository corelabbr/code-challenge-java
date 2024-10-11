import { paths } from '../../config';
import MainContainer from '../main-container';
import Form from './taskForm';
import List from './taskList';

const settings = {
    pathRegister: paths.taskRegister,
    pathList: paths.task,
    apiPath: 'task',
    permissionAdmin: null,
    title: 'Anotações',
};

const FormEntity: React.FC = () => {
    return (
        <MainContainer>
            <Form settings={{ ...settings, title: 'Anotação' }} />
        </MainContainer>
    );
};

const ListEntity: React.FC = () => {
    return (
        <MainContainer>
            <List settings={settings} />
        </MainContainer>
    );
};

export { FormEntity, ListEntity };
