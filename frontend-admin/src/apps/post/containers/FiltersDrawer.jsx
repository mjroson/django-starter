import React from 'react';
import { Drawer, } from 'antd';
import QueryFormFilter from './QueryFormFilter';

const FiltersDrawer = (props) => {
    return (
        <Drawer
            title="Filtros"
            placement="top"
            closable={false}
            onClose={() => props.setVisibleFilter(false)}
            visible={props.visibleFilter}
        >
            <QueryFormFilter
                onSubmit={props.applyFilter}
                onCancel={() => props.setVisibleFilter(false)}
                filters={props.query}
            />
        </Drawer>
    )
}

export default FiltersDrawer;