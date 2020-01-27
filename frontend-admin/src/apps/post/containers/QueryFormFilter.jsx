import { Button, Col, Form, Input, Row, DatePicker } from 'antd';
import React, { useEffect } from 'react';
import FormFilter from './FormFilter';
import {
  useQueryParams,
  StringParam,
  NumberParam,
  ArrayParam
} from 'use-query-params';

const QueryFormFilter = ({ onSubmit, onCancel, filters, form }) => {
  
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

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 }
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 }
    }
  };

  return (
    <FormFilter 
      onSubmit={handleSubmitValues} 
      onCancel={onCancel} 
      filters={filters} 
      form={form} />
  )
};

export default Form.create()(QueryFormFilter);
