import React from 'react';
import SearchForm from 'components/SearchForm';
import {
    useQueryParams,
    StringParam,
    NumberParam,
    ArrayParam
} from 'use-query-params';

const QuerySearchForm = (props) => {

    const [query, setQuery] = useQueryParams({
        page: NumberParam,
        search: StringParam,
        ordering: StringParam,
        title: StringParam,
        id: NumberParam
    });

    const search = value => {
        onChangeParams({ search: value });
    };

    const onChangeParams = params => {
        setQuery({ ...params, page: 1 });
    };

    return (
        <>
            <SearchForm
                submit={search}
                searchValue={query.search || ''}
                placeholder="Ingrese email, nombre o apellido"
            />
        </>
    )
}

export default QuerySearchForm;