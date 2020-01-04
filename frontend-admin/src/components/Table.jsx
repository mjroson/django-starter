import React from 'react';
import { Table } from 'antd';

// TODO: tomar parametros dinamicamente para incluirlo en la tabla
const ObjectsTable = ({
  results,
  pagination,
  loading,
  onChangeParams,
  onChangePage,
  columns
}) => {
  const handleTableChange = (currentPagination, filters, sorter) => {
    if (pagination.current !== currentPagination.current) {
      onChangePage(currentPagination.current);
    } else {
      if (sorter && sorter.field) {
        onChangeParams({
          ordering:
            sorter.order === 'ascend' ? sorter.field : `-${sorter.field}`
        });
        return;
      }
      onChangeParams({ ordering: null });
    }
  };

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
