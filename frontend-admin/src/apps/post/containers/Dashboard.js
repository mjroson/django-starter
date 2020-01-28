import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Row, Col } from 'antd';
import FiltersDrawer from './FiltersDrawer';
import {
    useQueryParams,
    StringParam,
    NumberParam,
    //ArrayParam
} from 'use-query-params';

import { pathOr } from 'ramda';
import Posts from './Posts';
import AppliedQueryFilters from './AppliedQueryFilters';
import DashboardHeader from './DashboardHeader';
import QuerySearchForm from './QuerySearchForm';

const Dashboard = (props) => {
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
            <DashboardHeader>
                <Row>
                    <Col span={12}>
                        <QuerySearchForm />
                    </Col>
                    <Col span={12} className="container-general-actions-right">
                        <Button onClick={() => setVisibleFilter(true)}>Filtros</Button>
                    </Col>
                </Row>
                <Row>
                    <Col span={24} className="container-applied-filters">
                        <AppliedQueryFilters />
                    </Col>
                </Row>
            </DashboardHeader>
            
            
            
            <Posts objects={objects} />
        </>
    )
}

export default Dashboard;