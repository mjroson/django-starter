import React from 'react';
import { Table } from 'antd';

const ObjectsTable = props => {
  const {
    results,
    pagination,
    loading,
    onChangeParams,
    sortedField,
    onChangePage,
    sorted,
    columns,
    ...otherTableParams
  } = props;

  const handleTableChange = (currentPagination, filters, sorter) => {
    console.warn('Change table ', sorter);
    if (pagination.current !== currentPagination.current) {
      onChangePage(currentPagination.current);
    } else {
      if (sorter && sorter.field) {
        let ordering = '';

        if (sortedField.charAt(0) === '-') {
          ordering = sorter.field;
        } else {
          if (sortedField === sorter.field) {
            ordering = `-${sorter.field}`;
          } else {
            ordering = sorter.field;
          }
        }
        onChangeParams({ ordering });
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
      {...otherTableParams}
    />
  );
};

export default ObjectsTable;
