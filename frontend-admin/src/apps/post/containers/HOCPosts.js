import React, { useEffect } from 'react';
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

const HOCPosts = (props) => {
    // Effects
    const dispatch = useDispatch();

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

    // End Effects

    return(
        <>
            <QuerySearchForm />
            <Posts objects={objects} />
        </>
    )
}

export default HOCPosts;