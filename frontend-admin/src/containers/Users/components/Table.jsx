import React from 'react';
import { Table, Popconfirm } from 'antd';
import { displayDate } from 'utils/formats';

const ObjectsTable = ({
  results,
  pagination,
  loading,
  sorter,
  onChangeParams,
  onChangePage,
  onDelete,
  onUpdate
}) => {
  const handleTableChange = (currentPagination, filters, sorter) => {
    if (pagination.current !== currentPagination.current) {
      onChangePage(currentPagination.current);
    } else {
      if (sorter && sorter.field) {
        onChangeParams({
          ordering:
            sorter.order === 'ascend' ? sorter.field : '-' + sorter.field
        });
      } else {
        onChangeParams({ ordering: null });
      }
    }
  };

  const columns = [
    {
      title: 'Id',
      dataIndex: 'id'
    },
    {
      title: 'Nombre y Apellido',
      render: (text, obj) => `${obj.last_name}, ${obj.first_name}`
    },
    {
      title: 'Email Principal',
      dataIndex: 'email'
    },
    {
      title: 'Fecha de Ingreso',
      dataIndex: 'date_joined',
      render: date => displayDate(date)
    },
    {
      title: 'Acciones',
      key: 'operation',
      render: obj => (
        <span>
          <Popconfirm
            title="¿Desea eliminar este usuario?"
            onConfirm={() => onDelete(obj)}
          >
            <a>Eliminar</a>
          </Popconfirm>
          <a onClick={() => onUpdate(obj)} style={{ marginLeft: '10px' }}>
            Editar
          </a>
        </span>
      )
    }
  ];

  return (
    <Table
      columns={columns}
      rowKey={obj => obj.id}
      dataSource={results}
      pagination={pagination}
      loading={loading}
      onChange={handleTableChange}
      bordered={true}
    />
  );
};

export default ObjectsTable;
