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
import DashboardTable from './DashboardTable';
import AppliedQueryFilters from './AppliedQueryFilters';
import DashboardHeader from './DashboardHeader';
import QuerySearchForm from './QuerySearchForm';
import UpdateCreateDrawer from './UpdateCreateDrawer';

const Dashboard = (props) => {
    // Effects
    const dispatch = useDispatch();

    const [visibleFilter, setVisibleFilter] = useState(false);

    const [currentObj, setCurrentObj] = useState(null);
    const [visibleForm, setVisibleForm] = useState(false);

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

    // End Effects

    const onUpdate = obj => {
        setCurrentObj(obj);
        setVisibleForm(true);
    };

    const onCreate = () => {
        setCurrentObj(null);
        setVisibleForm(true);
    };

    const onDelete = (obj) => {
        dispatch({
            type: 'DELETE_POST',
            payload: {
                id: obj.id
            }
        })
    }

    const objects = useSelector(pathOr([], ['posts']))

    const applyFilter = values => {
        setVisibleFilter(false);
    };

    return(
        <>
            <UpdateCreateDrawer 
                currentObj={currentObj}
                visibleForm={visibleForm}
                setVisibleForm={setVisibleForm}
            />
            <FiltersDrawer 
                setVisibleFilter={setVisibleFilter}
                visibleFilter={visibleFilter}
                applyFilter={applyFilter}
                query={query}
                />
            <DashboardHeader
                onCreate={onCreate}>
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

                <DashboardTable 
                    objects={objects}
                    onDelete={onDelete}
                    onUpdate={onUpdate}
                    onCreate={onCreate}
            />
            </DashboardHeader>
        </>
    )
}

export default Dashboard;