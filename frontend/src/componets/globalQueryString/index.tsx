import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { queryToObj, setValuesOfQuery } from '../../util/query';
import { IFormInputPropsFilter } from '../interfaces/formInputPropsFilter';
import { settingSetValue } from '../../util/settingSetValue';

interface IProps {
    setRowsPerPage: (numb: number) => void;
    setPage: (numb: number) => void;
    rowsPerPage: number;
    page: number;
    implementationLoadRows: (queryString: string) => Promise<void>;
    updateRows: boolean;
    setUpdateRows: (action: boolean) => void;
    queryDefault: string;
    inputs: IFormInputPropsFilter[];
}

const GlobalQueryString: React.FC<IProps> = ({
    implementationLoadRows,
    updateRows,
    setUpdateRows,
    queryDefault,
    inputs,
    setRowsPerPage,
    setPage,
}) => {
    const history = useHistory();
    const [execQueryDefault, setExecQsueryDefault] = useState(false);

    useEffect(() => {
        if (updateRows) {
            setValuesOfWindowLocationSearch(
                window.location.search.replace('?', ''),
            );
            implementationLoadRows(window.location.search.replace('?', ''));
            setUpdateRows(false);
        }
    }, [updateRows]);

    useEffect(() => {
        if (!execQueryDefault) {
            if (
                window.location.search &&
                window.location.search.replace('?', '') !== queryDefault
            ) {
                setValuesOfWindowLocationSearch(
                    window.location.search.replace('?', ''),
                );
                implementationLoadRows(window.location.search.replace('?', ''));
            } else {
                setValuesOfQuery(queryDefault, inputs, setRowsPerPage, setPage);
                implementationLoadRows(queryDefault);
                history.replace(`?${queryDefault}`);
            }
            setExecQsueryDefault(true);
        }
    }, [execQueryDefault]);

    async function setValuesOfWindowLocationSearch(query: string) {
        const objOfQuery = queryToObj(query);
        const keys = Object.keys(objOfQuery);

        for (const k of keys) {
            const input = inputs.find(
                i => i.name === k || i?.aliasToQuery === k,
            );

            if (input) {
                settingSetValue[input.typeInput](objOfQuery[k], input);
            }

            if (k === 'page') {
                setPage(Number(objOfQuery[k]));
            }

            if (k === 'size') {
                setRowsPerPage(Number(objOfQuery[k]));
            }
        }
    }

    return <></>;
};

export default GlobalQueryString;
