import React, { useEffect } from 'react';
import { Form, Icon, Input, Button } from 'antd';

const SearchForm = ({ form, searchValue = '', submit, placeholder = '' }) => {
  const { getFieldDecorator } = form;

  useEffect(() => {
    form.setFieldsValue({ search: searchValue });
  }, [searchValue]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSubmit = e => {
    e.preventDefault();
    form.validateFields((err, values) => {
      submit(values.search);
    });
  };

  return (
    <Form layout="inline" onSubmit={handleSubmit}>
      <Form.Item>
        {getFieldDecorator('search', {
          initialValue: searchValue
        })(
          <Input
            prefix={<Icon type="search" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder={placeholder}
          />
        )}
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Buscar
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Form.create({ name: 'search' })(SearchForm);
