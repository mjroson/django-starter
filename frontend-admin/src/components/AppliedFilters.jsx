import React from 'react';
import { Tag } from 'antd';

const AppliedFilters = ({ filters, removeFilter }) => {
  const activeFiltersKeys =
    Object.keys(filters).filter(
      key => filters[key] !== undefined && key !== 'page'
    ) || [];

  const displayValue = value => {
    if (value._isAMomentObject) {
      return value.format('DD-MM-YYYY');
    }
    return value;
  };

  return (
    <>
      <b>Filtros aplicados: </b>
      {activeFiltersKeys.map((key, index) => (
        <Tag closable onClose={() => removeFilter(key)} key={index} visible>
          {key}:{displayValue(filters[key])}
        </Tag>
      ))}
      {activeFiltersKeys.length === 0 &&
        'Todavía no tienes ningún filtro aplicado.'}
    </>
  );
};

export default AppliedFilters;
