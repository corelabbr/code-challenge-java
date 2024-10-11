import { IFormInputPropsFilter } from '../componets/interfaces/formInputPropsFilter';
import api from '../services/api';
import { unixToDate } from './dateUtil';

export const settingSetValue = {
    text: async (value: string, input: IFormInputPropsFilter) => {
        input.setValue && input.setValue(input.name, value);
    },
    date: async (value: string, input: IFormInputPropsFilter) => {
        const newDate = unixToDate(Number(value));
        input.setValue(input.name, newDate);
    },
    autocomplete: async (value: string, input: IFormInputPropsFilter) => {
        if (input?.options) {
            if (input.options.length === 0 && input?.entityPath) {
                const { data } = await api.get(`${input.entityPath}/${value}`);
                input.options.push(data);
            }
            const option = input.options.find(o => o.id === value);
            input.setValue(input.name, option);
        }
    },
    multiple: async (value: string, input: IFormInputPropsFilter) => {
        const values = value.split(',').map(v => ({ id: v }));

        if (input.options || input?.query) {
            input.setValue(input.name, values);
        }
    },
};
