import { ColumnDef } from '@tanstack/react-table';
import { DeepPartial, FieldValues, UnpackNestedValue } from 'react-hook-form';
import { IFormInputPropsFilter } from './formInputPropsFilter';
import { FormInputProps } from '../form/formInterfaces';

export interface IPropsList<T, DataQuery extends FieldValues> {
    settings: any;
    defaultValues: UnpackNestedValue<DeepPartial<DataQuery>>;
    columnsTable: ColumnDef<T>[];
    inputsFilter: IFormInputPropsFilter[];
    QUERY_DEFAULT: string;
    mainInputsFilter: FormInputProps[];
}

export interface ImperativeHandleAccessedByParentListComponent {
    handleClick: (id: string) => void;
    handleByOnKeyPressEnterNewQuery: (value: any, name: string) => void;
    setIdDelete: (idDelete: string) => void;
    setOpenModalDelete: (open: boolean) => void;
    handleEdit: (idDelete: string) => void;
    setToggleSearch: (open: boolean) => void;
    control: any;
    setValue: any;
    clearErrors: any;
    setError: any;
    setUpdateRows: (updateRows: boolean) => void;
    loadRows: (query: string) => Promise<void>;
    handleClearDates: (keys: string[]) => void;
}
