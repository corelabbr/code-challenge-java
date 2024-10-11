import { useEffect, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { objToQuery, queryToObj } from '../../util/query';
import { rowsPerPageOptions } from '../../config';

interface IValueToBeHeart {
    keyParam: string;
    defaultValue: any;
    implementation: (value: any) => void;
    implementationClear: () => void;
}

interface IProps {
    setRowsPerPage: (numb: number) => void;
    setPage: (numb: number) => void;
    rowsPerPage: number;
    page: number;
    initialValues: any;
    implementationLoadRows: (queryString: string) => Promise<void>;
    valuesToBeHeart: IValueToBeHeart[];
    loadRows: boolean;
}

const QueryStringGlobal: React.FC<IProps> = ({
    setRowsPerPage,
    setPage,
    rowsPerPage,
    page,
    initialValues,
    implementationLoadRows,
    valuesToBeHeart,
    loadRows,
}) => {
    const history = useHistory();
    const { search } = useLocation();
    const [execQueryDefault, setExecQueryDefault] = useState(false);
    const params = useParams<{ id?: string }>();

    const [query, setQuery] = useState<string>('');

    useEffect(() => {
        let queryT = '';
        if (search && search.length > 0 && (!params || !params.id)) {
            const { size, pageParam } = getParams();
            setRowsPerPage(Number(size));
            setPage(Number(pageParam - 1));
            queryT = search.replace('?', '');
            setQuery(queryT);
        } else if (rowsPerPage === 0 && (!params || !params.id)) {
            const queryTemp = objToQuery(initialValues);
            history.push(`?${queryTemp}`);
        }

        if (queryT.length > 0) {
            implementationLoadRows(queryT);
            setParams(queryT);
        }
    }, [search]);

    useEffect(() => {
        let paramsQueryString = getParams();
        const { size, pageParam } = paramsQueryString;
        if (size != rowsPerPage || pageParam != page + 1) {
            paramsQueryString.page = page + 1;
            paramsQueryString.size = rowsPerPage > 0 ? rowsPerPage : size;
            const { pageParam, ...params } = paramsQueryString;
            const queryTemp = objToQuery(params);
            history.push(`?${queryTemp}`);
        }
    }, [page, rowsPerPage]);

    useEffect(() => {
        if (loadRows) {
            implementationLoadRows(query);
        }
    }, [loadRows]);

    function getParams(): any {
        let paramsQueryString: any = {};

        for (const valueToBeHeart of valuesToBeHeart) {
            paramsQueryString = {
                ...paramsQueryString,
                [valueToBeHeart.keyParam]: valueToBeHeart.defaultValue,
            };
        }

        if (search && search.length > 0) {
            paramsQueryString = queryToObj(search.replace('?', ''));
        }

        if (paramsQueryString.page) {
            paramsQueryString.pageParam = Number(paramsQueryString.page) || 0;
        }
        return paramsQueryString;
    }

    // Parâmetros de consulta padrão, para atualizar campos quando é dado um refresh na página
    function setParams(queryString: string) {
        const objQuery = queryToObj(queryString);
        const keys = Object.keys(objQuery);
        for (const key of keys) {
            const findKey = valuesToBeHeart.find(v => v.keyParam === key);
            if (findKey) {
                findKey.implementation(objQuery[key]);
            }
        }
    }

    return <></>;
};

export default QueryStringGlobal;
