import React from 'react';
import { Switch } from 'react-router-dom';
import { paths } from './config';
import Dashboard from './pages/dashboard';
import { User, UserList } from './pages/user/user';
import Route from './Route';
import { FormEntity as TaskForm, ListEntity as TaskList } from './pages/task';
import SignIn from './pages/sign-in/sign-in';

const Routes: React.FC = () => (
    <Switch>
        <Route path={`/`} exact component={SignIn} />
        <Route path={`/dashboard`} isPrivate={true} component={Dashboard} />

        {/*INICIO - cadastros gerais */}
        <Route
            path={`${paths.userRegister}/:id?`}
            isPrivate={true}
            component={User}
        />
        <Route path={`${paths.user}`} isPrivate={true} component={UserList} />
        {/*FIM - cadastros gerais */}

        <Route
            isPrivate={true}
            path={`${paths.taskRegister}/:id?`}
            component={TaskForm}
        />
        <Route isPrivate={true} path={`${paths.task}`} component={TaskList} />
        {/* <Route path="/records/category" component={ListEntity} /> */}
    </Switch>
);

export default Routes;
