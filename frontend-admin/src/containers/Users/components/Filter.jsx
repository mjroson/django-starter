import { Button, Col, Form, Input, Row, Select } from 'antd';
import React, { useEffect } from 'react';

const FormItem = Form.Item;

const FilterForm = ({ onSubmit, onCancel, filters, form }) => {
  const { getFieldDecorator } = form;

  useEffect(() => {
    if (filters != null) {
      form.setFieldsValue({ ...filters });
    }
  }, [filters]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSubmit = e => {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        onSubmit(values);
      }
    });
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
    <Form {...formItemLayout} onSubmit={handleSubmit} className="card-block">
      <Row>
        <Col span={8}>
          <FormItem label="Nombre">
            {getFieldDecorator(
              'first_name',
              {}
            )(<Input placeholder="Ingresa el nombre completo" />)}
          </FormItem>
        </Col>
        <Col span={8}>
          <FormItem label="Apellido">
            {getFieldDecorator(
              'last_name',
              {}
            )(<Input placeholder="Ingresa el apellido completo" />)}
          </FormItem>
        </Col>
        <Col span={8}>
          <FormItem label="Nro. Documento">
            {getFieldDecorator(
              'national_id',
              {}
            )(<Input placeholder="Ingresa el documento" />)}
          </FormItem>
        </Col>
        <Col span={8}>
          <FormItem label="Nro. de Cuenta">
            {getFieldDecorator('id', {})(<Input placeholder="Ingresa el Id" />)}
          </FormItem>
        </Col>
        <Col span={8}>
          <FormItem label="NR">
            {getFieldDecorator('nr', {})(<Input placeholder="Ingresa el NR" />)}
          </FormItem>
        </Col>
      </Row>
      <div className="drawer-footer">
        <Button type="secondary" onClick={onCancel} style={{ marginRight: 8 }}>
          Cancelar
        </Button>
        <Button type="primary" htmlType="submit">
          Aplicar filtros
        </Button>
      </div>
    </Form>
  );
};

export default Form.create()(FilterForm);
