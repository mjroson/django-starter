import React, { useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import { useDispatch } from 'react-redux';
import { update } from '../actions';

const FormItem = Form.Item;

const ObjectForm = ({ currentObj, onClose, form }) => {
  const dispatch = useDispatch();
  const { getFieldDecorator } = form;

  useEffect(() => {
    if (currentObj != null) {
      form.setFieldsValue({ ...currentObj });
    } else {
      form.resetFields();
    }
  }, [currentObj]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSubmit = e => {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        const obj = currentObj ? { ...currentObj } : Object();
        Object.keys(values).forEach(key => {
          obj[key] = values[key];
        });
        dispatch(update(obj));
      }
    });
  };

  return (
    <Form onSubmit={handleSubmit} className="card-block">
      <FormItem label="Email">
        {getFieldDecorator('email', {
          rules: [{ required: true, message: 'Este campo es requerido!' }]
        })(<Input type="email" />)}
      </FormItem>
      <FormItem label="Nombre">
        {getFieldDecorator('first_name', {
          rules: [{ required: true, message: 'Este campo es requerido!' }]
        })(<Input />)}
      </FormItem>
      <FormItem label="Apellido">
        {getFieldDecorator('last_name', {
          rules: [{ required: true, message: 'Este campo es requerido!' }]
        })(<Input />)}
      </FormItem>
      <FormItem label="Nombre de usuario">
        {getFieldDecorator('username', {
          rules: [{ required: true, message: 'Este campo es requerido!' }]
        })(<Input />)}
      </FormItem>
      <div className="drawer-footer">
        <Button onClick={onClose} style={{ marginRight: 8 }}>
          Cancelar
        </Button>
        <Button htmlType="submit" type="primary">
          {`${currentObj === null ? 'Crear' : 'Actualizar'}`}
        </Button>
      </div>
    </Form>
  );
};

export default Form.create()(ObjectForm);
