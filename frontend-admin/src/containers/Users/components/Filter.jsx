import { Button, Col, Form, Input, Row, DatePicker } from 'antd';
import React, { useEffect } from 'react';

const FormItem = Form.Item;
const { RangePicker } = DatePicker;

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
        <Col sm={24} md={8}>
          <FormItem label="Nombre">
            {getFieldDecorator(
              'first_name',
              {}
            )(<Input placeholder="Ingresa el nombre completo" />)}
          </FormItem>
        </Col>
        <Col sm={24} md={8}>
          <FormItem label="Apellido">
            {getFieldDecorator(
              'last_name',
              {}
            )(<Input placeholder="Ingresa el apellido completo" />)}
          </FormItem>
        </Col>

        <Col sm={24} md={8}>
          <FormItem label="Email">
            {getFieldDecorator(
              'email',
              {}
            )(<Input placeholder="Ingresa el email" />)}
          </FormItem>
        </Col>
        <Col sm={24} md={8}>
          <FormItem label="Fecha de registro">
            {getFieldDecorator(
              'date_joined',
              {}
            )(<DatePicker format="DD-MM-YYYY" />)}
          </FormItem>
        </Col>
        <Col sm={24} md={8}>
          <FormItem label="Fecha">
            {getFieldDecorator(
              'date_joined_range',
              {}
            )(<RangePicker format="YYYY-MM-DD" />)}
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
