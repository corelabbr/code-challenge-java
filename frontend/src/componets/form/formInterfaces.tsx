import { InputProps } from '@mui/material';
import { ReactTableProps } from '../table';
import { IButtonProps } from '../icons';

// interface FormInputText
export interface IFormInputProps extends InputProps {
    variant?: 'outlined' | 'standard' | 'filled' | undefined;
    name: string;
    control: any;
    rules?: any;
    label: string;
    messageError?: (errors: any, field: any) => string;
    handleChange?: any;
    handleOnKeyPress?: (data: any) => void;
    handleOnBlur?: (data: any) => void;
    ref?: any;
    autoFocus?: boolean;
    readOnly?: boolean;
    size?: 'small' | 'medium' | undefined;
    sx?: any;
    type?: any;
    multiline?: boolean;
    mask?:
        | 'phone'
        | 'number'
        | 'identification'
        | 'cep'
        | 'toUpperCase'
        | undefined;
    hidden?: boolean;
}

export interface InputPropsToForm extends IFormInputProps {
    typeInput:
        | 'text'
        | 'date'
        | 'autocomplete'
        | 'number'
        | 'subForm'
        | 'component'
        | 'password'
        | 'checkbox';
    loadingAutocomplete?: boolean;
    options?: any[];
    setValue?: any;
    md?: number;
    xs?: number;
    getValues?: (name: string) => any | any[] | undefined;
    setError?: any;
    clearErrors?: any;
    handleChange?: any;
    rules?: any;
    decimalScale?: 0 | 2;
    show?: boolean | true;
    setFocusFirstField?: (value: boolean) => void;
    placeholder?: string;
    messagesError?: any[];
    dto?: (data: any) => any;
}

export interface FormInputProps<I = undefined> extends IFormInputProps {
    typeInput:
        | 'text'
        | 'date'
        | 'dateHour'
        | 'autocomplete'
        | 'number'
        | 'subForm'
        | 'component'
        | 'password'
        | 'checkbox';
    loadingAutocomplete?: boolean;
    options?: any[];
    setValue?: any;
    md?: number;
    xs?: number;
    getValues?: (name: string) => any | any[] | undefined;
    setError?: any;
    clearErrors?: any;
    handleChange?: any;
    rules?: any;
    decimalScale?: 0 | 2;
    show?: boolean | true;
    setFocusFirstField?: (value: boolean) => void;
    placeholder?: string;
    messagesError?: any[];
    dto?: (data: any) => any;
    setData?: (data: any) => any;
    dataTable?: {
        propsTable: ReactTableProps<any & I>;
        handleNewItemTable?: () => void;
        inputs: FormInputProps<any & I>[];
        keyArrData?: string;
    };
    actionOnInput?: {
        action: () => void;
        iconProps: IButtonProps;
        textTooltip: string;
    };
    componentProps?: {
        component?: React.ReactNode;
        componentData?: (data: any) => React.ReactNode;
        conditionRender: boolean;
    };
    toolTipPros?: {
        title: string;
        arrow: boolean;
    };
    inputFormat?: string;
    multiple?: boolean;
    activeDebounce?: boolean;
    query?: (value: string) => string;
    index?: number;
    setIndex?: (index: number) => void;
    useDynamicFieldArray?: any;
    openModal?: boolean;
    setOpenModal?: (open: boolean) => void;
}
