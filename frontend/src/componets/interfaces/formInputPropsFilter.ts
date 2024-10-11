import { IFormInputProps } from '../form/formInputText';

export interface IFormInputPropsFilter extends IFormInputProps {
    typeInput: 'text' | 'date' | 'autocomplete' | 'multiple';
    mask?:
        | 'phone'
        | 'number'
        | 'identification'
        | 'cep'
        | 'toUpperCase'
        | undefined;
    loadingAutocomplete?: boolean;
    options?: any[];
    setValue?: any;
    getValues?: (name: string) => any | any[] | undefined;
    // query?: string;
    handleChange?: any;
    handleOnKeyPress?: (data: any, input?: string) => void;
    entityPath?: string;
    keyQuery?: string;
    aliasToQuery?: string;
    query?: (value: string) => string;
    DAODataList?: (value: any) => any;
}
