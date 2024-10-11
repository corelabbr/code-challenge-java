import React from 'react';
import { FieldValues } from 'react-hook-form';
//
import { FormInputProps } from '../../componets/form/formInterfaces';
import { ImperativeHandleAccessedByParentComponent } from '../../componets/interfaces/formProps';
import FormComplete from '../../componets/form/formComplete';

interface IFormInput extends FieldValues {
    description: string;
}

const defaultValues = {};

const Form: React.FC<{ settings: any }> = props => {
    const { settings } = props;

    const refForm =
        React.useRef<ImperativeHandleAccessedByParentComponent<IFormInput>>(
            null,
        );

    const inputsForm = React.useMemo<FormInputProps<IFormInput>[]>(
        () => [
            {
                typeInput: 'text',
                name: 'title',
                control: null,
                label: 'Título',
                setValue: null,
                md: 12,
                xs: 12,
                rules: {
                    required: true,
                },
            },
            {
                typeInput: 'text',
                multiline: true,
                name: 'detail',
                control: null,
                label: 'Detalhes',
                loadingAutocomplete: false,
                setValue: null,
                md: 12,
                xs: 12,
                rules: {
                    required: true,
                },
            },
            {
                typeInput: 'checkbox',
                name: 'favorite',
                control: null,
                label: 'Favorito',
                md: 3,
                xs: 12,
            },
        ],
        [],
    );

    return (
        <FormComplete
            defaultValues={defaultValues}
            inputsForm={inputsForm}
            ref={refForm}
            settings={settings}
        />
    );
};

export default Form;
