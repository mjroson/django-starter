import React from 'react';
import FormFilter from './FormFilter';
import {
  useQueryParams,
  StringParam,
  NumberParam
} from 'use-query-params';

const QueryFormFilter = ({ onSubmit, onCancel, filters }) => {
  
  const [query, setQuery] = useQueryParams({
    page: NumberParam,
    search: StringParam,
    ordering: StringParam,
    title: StringParam,
    id: NumberParam
  });

  const changeQueryParams = params => {
    setQuery({ ...params, page: 1 });
  };

  const handleSubmitValues = values => {
    changeQueryParams(values);
    onSubmit(values);
  };

  return (
    <FormFilter 
      onSubmit={handleSubmitValues} 
      onCancel={onCancel} 
      filters={filters} />
  )
};

export default QueryFormFilter;
