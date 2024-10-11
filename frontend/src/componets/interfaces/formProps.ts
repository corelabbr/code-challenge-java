import * as React from 'react';
import {
    DeepPartial,
    FieldValues,
    UnpackNestedValue,
    UseFormSetValue,
} from 'react-hook-form';
import { FormInputProps } from '../form/formInterfaces';

export interface IFormSettinsProps {
    settings: any;
}

export interface IFormProps<T extends FieldValues> {
    settings: any;
    defaultValues: UnpackNestedValue<DeepPartial<T>>;
    inputsForm: FormInputProps<T>[];
    implSetValueData?: (data: any) => void;
    callbackSuccess?: (data: any) => void;
    configDataFooter?: {
        dataFooter?: (data: any) => any;
        nameFields: string;
    };
}

export interface ImperativeHandleAccessedByParentComponent<
    T extends FieldValues,
> {
    setValue: UseFormSetValue<T & any>;
    handleClick: (index: number, name: string) => void;
    handleDeleteItemTable: (index: number, name: string) => void;
    handleNewItemTable: (name: string) => void;
    dynamicFieldArrays: any;
    setValueInput: ({ value, field }: { value: any; field: string }) => void;
    watch: any;
}
