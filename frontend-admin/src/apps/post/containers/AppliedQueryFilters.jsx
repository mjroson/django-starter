import React from 'react';
import {
    useQueryParams,
    StringParam,
    NumberParam
} from 'use-query-params';
import AppliedFilters from './AppliedFilters';

const AppliedQueryFilters = (props) => {

    const [query, setQuery] = useQueryParams({
        page: NumberParam,
        search: StringParam,
        ordering: StringParam,
        title: StringParam,
        id: NumberParam
    });

    const removeFilter = filterKey => {
        setQuery({ [filterKey]: undefined });
    };

    return (
        <AppliedFilters filters={query} removeFilter={removeFilter} />
    )
}

export default AppliedQueryFilters;