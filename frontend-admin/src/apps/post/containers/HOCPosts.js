import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'antd';
import FiltersDrawer from './FiltersDrawer';
import {
    useQueryParams,
    StringParam,
    NumberParam,
    //ArrayParam
} from 'use-query-params';

import { pathOr } from 'ramda';
import Posts from './Posts';
import QuerySearchForm from './QuerySearchForm';

const HOCPosts = (props) => {
    // Effects
    const dispatch = useDispatch();

    const [visibleFilter, setVisibleFilter] = useState(false);

    const [query] = useQueryParams({
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
    }, [query, dispatch]);

    const objects = useSelector(pathOr([], ['posts']))

    const applyFilter = values => {
        setVisibleFilter(false);
    };

    return(
        <>
            <FiltersDrawer 
                setVisibleFilter={setVisibleFilter}
                visibleFilter={visibleFilter}
                applyFilter={applyFilter}
                query={query}
                />
            
            <Button onClick={() => setVisibleFilter(true)}>Filtros</Button>
            <QuerySearchForm />
            
            <Posts objects={objects} />
        </>
    )
}

export default HOCPosts;