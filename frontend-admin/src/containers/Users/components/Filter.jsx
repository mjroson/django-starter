import { Button, Form, Input, DatePicker } from 'antd';
import React, { useEffect } from 'react';

const { RangePicker } = DatePicker;

const FilterForm = ({ onSubmit, onCancel, appliedFilters, filtersData }) => {
  const [form] = Form.useForm();

  const getFilterDataToForm = () => {
    const data = {};
    for (const [key, value] of Object.entries(appliedFilters)) {
      if (filtersData[key]?.inForm) {
        data[key] = value;
      }
    }
    return data;
  };

  useEffect(() => {
    if (appliedFilters != null) {
      form.setFieldsValue({ ...getFilterDataToForm() });
    }
  }, [appliedFilters]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Form
      form={form}
      onFinish={onSubmit}
      layout="inline"
      className="card-block"
    >
      <Form.Item label="Nombre" name="first_name">
        <Input placeholder="Ingresa el nombre completo" />
      </Form.Item>
      <Form.Item label="Apellido" name="last_name">
        <Input placeholder="Ingresa el apellido completo" />
      </Form.Item>
      <Form.Item label="Email" name="email">
        <Input placeholder="Ingresa el email" />
      </Form.Item>
      <Form.Item label="Fecha de registro" name="date_joined">
        <DatePicker format="DD-MM-YYYY" />
      </Form.Item>
      <Form.Item label="Fecha" name="date_joined_range">
        <RangePicker format="YYYY-MM-DD" />
      </Form.Item>
      <div className="drawer-footer">
        <Button
          type="secondary"
          onClick={onCancel}
          className="btn-forms-action"
        >
          Cancelar
        </Button>
        <Button type="primary" htmlType="submit" className="btn-forms-action">
          Aplicar filtros
        </Button>
      </div>
    </Form>
  );
};

export default FilterForm;
