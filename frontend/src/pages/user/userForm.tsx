import React, { useCallback } from 'react';
import { FieldValues } from 'react-hook-form';
//
import { FormInputProps } from '../../componets/form/formInterfaces';
import { ImperativeHandleAccessedByParentComponent } from '../../componets/interfaces/formProps';
import FormComplete from '../../componets/form/formComplete';
import * as ImplEnum from '../../communs/enums/generic-enum';
import { useAuth } from '../../context/AuthContext';
import { useHistory } from 'react-router-dom';

const enumInstances = {
    permissionOptionsInstance: new ImplEnum.GenericEnum(
        ImplEnum.permissionOptions,
    ),
};
const permissionOptions = enumInstances.permissionOptionsInstance.optionsList();

interface IFormInput extends FieldValues {
    description: string;
}

const defaultValues = {
    authorities: [],
};

const Form: React.FC<{ settings: any }> = props => {
    const { settings } = props;

    const history = useHistory();

    const { user, signOut } = useAuth();

    const refForm =
        React.useRef<ImperativeHandleAccessedByParentComponent<IFormInput>>(
            null,
        );

    const inputsForm = React.useMemo<FormInputProps<IFormInput>[]>(
        () => [
            {
                typeInput: 'text',
                name: 'name',
                control: null,
                label: 'Nome',
                setValue: null,
                md: 6,
                xs: 12,
                rules: {
                    required: true,
                },
                autoFocus: true,
            },
            {
                typeInput: 'text',
                name: 'nameToEnter',
                control: null,
                label: 'Usuário',
                loadingAutocomplete: false,
                setValue: null,
                md: 6,
                xs: 12,
                rules: {
                    required: true,
                },
                dto: data => {
                    data.username = data.nameToEnter;
                    return data;
                },
                setData: data => {
                    return data.username;
                },
            },
            {
                typeInput: 'password',
                name: 'password',
                control: null,
                label: 'Senha',
                md: 5,
                xs: 12,
                rules: {
                    pattern: /^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,15}$/,
                },
                messagesError: [
                    {
                        type: 'pattern',
                        message:
                            'A senha tem que ter de 6 a 15 caracteres, ao menos uma letra e ao menos um número',
                    },
                ],
            },
            {
                typeInput: 'password',
                name: 'passwordConfirmation',
                control: null,
                label: 'Confirmar senha',
                md: 4,
                xs: 12,
                rules: {
                    validate: (val: string) => {
                        if (
                            val &&
                            refForm?.current?.watch('password') !== val
                        ) {
                            return 'As senhas não conferem';
                        }
                    },
                },
            },
            {
                typeInput: 'autocomplete',
                name: 'authorities',
                control: null,
                label: 'Permissões',
                loadingAutocomplete: false,
                setValue: null,
                options: permissionOptions,
                md: 11,
                xs: 11,
                multiple: true,
                rules: {
                    required: true,
                },
                dto: data => {
                    data.authorities = data.authorities
                        .map((a: any) => a.id)
                        .join(',');
                    return data;
                },
                setData: data => {
                    return data.authorities
                        .split(',')
                        .map((a: any) =>
                            enumInstances.permissionOptionsInstance.getObject(
                                a,
                            ),
                        );
                },
            },
        ],
        [],
    );

    const callbackSuccess = async (data: any) => {
        if (data?.id == user.sub) {
            signOut();
        } else {
            history.push(`${settings.pathList}?`);
        }
    };

    return (
        <FormComplete
            defaultValues={defaultValues}
            inputsForm={inputsForm}
            ref={refForm}
            settings={settings}
            callbackSuccess={callbackSuccess}
        />
    );
};

export default Form;
