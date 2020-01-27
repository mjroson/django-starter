import { Button, Col, Form, Input, Row } from 'antd';
import React, { useEffect } from 'react';

const FormItem = Form.Item;

const FormFilter = ({ onSubmit, onCancel, filters, form }) => {
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
          <FormItem label="Title">
            {getFieldDecorator(
              'title',
              {}
            )(<Input placeholder="Ingresa el titulo" />)}
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

export default Form.create()(FormFilter);
