import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    useQueryParams,
    StringParam,
    NumberParam,
    ArrayParam
} from 'use-query-params';

import { pathOr } from 'ramda';
import Posts from './Posts';
import QuerySearchForm from './QuerySearchForm';
import QueryFormFilter from './QueryFormFilter';

const HOCPosts = (props) => {
    // Effects
    const dispatch = useDispatch();

    const [visibleFilter, setVisibleFilter] = useState(false);

    const [query, setQuery] = useQueryParams({
        page: NumberParam,
        search: StringParam,
        ordering: StringParam,
        title: StringParam,
        id: NumberParam
    });

    useEffect(() => {
        dispatch(
            {
                type: 'REQUEST_POSTS',
                payload: { query }
            }
        );
    }, [query]);

    const objects = useSelector(pathOr([], ['posts']))

    const applyFilter = values => {
        setVisibleFilter(false);
    };

    return(
        <>
            <QuerySearchForm />
            <QueryFormFilter
                onSubmit={applyFilter}
                onCancel={() => setVisibleFilter(false)}
                filters={query}
            />
            <Posts objects={objects} />
        </>
    )
}

export default HOCPosts;