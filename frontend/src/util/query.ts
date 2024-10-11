import { IFormInputPropsFilter } from '../componets/interfaces/formInputPropsFilter';
import { rowsPerPageOptions } from '../config';
import { settingSetValue } from './settingSetValue';

export function queryToObj(query: string) {
    return query
        ? JSON.parse(
              '{"' + query.replace(/&/g, '","').replace(/=/g, '":"') + '"}',
              function (key, value) {
                  return key === '' ? value : decodeURIComponent(value);
              },
          )
        : {};
}

export function objToQuery(obj: any, arrNotInclude?: string[]) {
    return Object.keys(obj)
        .reduce(function (a: string[], k) {
            if (arrNotInclude && arrNotInclude.includes(k)) {
                return a;
            }
            if (obj[k]) {
                const query: string = `${k}=${encodeURIComponent(obj[k])}`;
                a.push(query);
            }
            return a;
        }, [])
        .join('&');
}

export const handleChangePage = (
    event: unknown,
    newPage: number,
    setPage: (number: number) => void,
    history: any,
    loadRows?: (query: string) => Promise<void>,
) => {
    const objQuery = queryToObj(window.location.search.replace('?', ''));
    objQuery.page = newPage.toString();
    const query = objToQuery(objQuery);
    history.push(`?${query}`);

    setPage(newPage);

    if (loadRows) {
        loadRows(query);
    }
};

export const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
    setRowsPerPage: (number: number) => void,
    setPage: (number: number) => void,
    history: any,
    loadRows?: (query: string) => Promise<void>,
) => {
    const rowsPerPage = parseInt(event.target.value, 10);
    const objQuery = queryToObj(window.location.search.replace('?', ''));
    objQuery.size = rowsPerPage;
    objQuery.page = 1;
    const query = objToQuery(objQuery);
    history.push(`?${query}`);
    setRowsPerPage(rowsPerPage);
    setPage(0);

    if (loadRows) {
        loadRows(query);
    }
};

export async function setValuesOfQuery(
    queryDefault: string,
    inputs: IFormInputPropsFilter[],
    setRowsPerPage: (number: number) => void,
    setPage: (number: number) => void,
) {
    const objOfQuery = queryToObj(queryDefault);
    const keys = Object.keys(objOfQuery);

    inputs.forEach(i => {
        i.setValue(i.name, '');
    });

    for (const k of keys) {
        const input = inputs.find(i => i.name === k || i?.aliasToQuery === k);

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

export const LINES_PER_PAGE = 5;
