import React from 'react';
import { useSelector } from 'react-redux';
import {
    useQueryParams,
    StringParam,
    NumberParam
} from 'use-query-params';
import { Popconfirm } from 'antd';
import ObjectsTable from 'components/Table';
import { ENTITY_NAME, PAGE_SIZE, ENTITY_PLURAL_NAME } from '../constants';

const DashboardTable = ({ objects, onUpdate, onDelete, onCreate, ...props}) => {
    // Effects
    const [query, setQuery] = useQueryParams({
        page: NumberParam,
        search: StringParam,
        ordering: StringParam,
        title: StringParam
    });

    const reqListLoading = useSelector(
        state => state.posts.reqStatus.list !== 'loaded'
    );

    const onChangeParams = params => {
        setQuery({ ...params, page: 1 });
    };

    // End Effects

    const isColumnSorted = fieldName => {
        const sorted = query.ordering || '';
        return [fieldName, `-${fieldName}`].includes(sorted)
            ? sorted.charAt(0) !== '-'
                ? 'ascend'
                : 'descend'
            : false;
    };

    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            sorter: true,
            sortOrder: isColumnSorted('id')
        },
        {
            title: 'Title',
            dataIndex: 'title',
            render: (text, obj) => `${obj.title}`,
            sorter: true,
            sortOrder: isColumnSorted('title')
        },
        {
            title: 'Acciones',
            key: 'operation',
            render: obj => (
                <span className="table-column-actions">
                    <Popconfirm
                        title={`¿Desea eliminar este ${ENTITY_NAME}?`}
                        onConfirm={() => onDelete(obj)}
                    >
                        <span>Eliminar</span>
                    </Popconfirm>
                    <span onClick={() => onUpdate(obj)}>Editar</span>
                </span>
            )
        }
    ]

    return (
        <ObjectsTable
            results={objects.results}
            columns={columns}
            pagination={{
                total: objects.count,
                current: query.page ? query.page : 1,
                pageSize: PAGE_SIZE
            }}
            loading={reqListLoading}
            footer={() =>
                `Total de ${ENTITY_PLURAL_NAME.toLowerCase()} encontrados ${
                objects.count
                }`
            }
            onChangeParams={onChangeParams}
            sortedField={query.ordering || ''}
            onChangePage={page => setQuery({ page })}
            onUpdate={onUpdate}
            onCreate={onCreate}
            tableLayout="auto"
        />
    )
}

export default DashboardTable;