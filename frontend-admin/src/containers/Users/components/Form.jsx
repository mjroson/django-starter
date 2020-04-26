import React, { useEffect } from 'react';
import { Form, Input, Button, Switch } from 'antd';

const FormItem = Form.Item;

const ObjectForm = ({
  currentObj,
  onClose,
  form,
  create,
  update,
  formErrors
}) => {
  const { getFieldDecorator } = form;

  useEffect(() => {
    if (currentObj != null) {
      form.setFieldsValue({ ...currentObj });
    } else {
      form.resetFields();
    }
  }, [currentObj]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    /**
     * Handler error from models.
     */
    if (formErrors) {
      const errorsData = {};
      const formValues = form.getFieldsValue();
      Object.keys(formErrors).forEach(key => {
        errorsData[key] = {
          value: formValues[key],
          errors: formErrors[key].map(errorMsg => new Error(errorMsg))
        };
      });
      form.setFields(errorsData);
    }
  }, [formErrors]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSubmit = e => {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        const obj = currentObj ? { ...currentObj } : Object();
        Object.keys(values).forEach(key => {
          obj[key] = values[key];
        });
        if (currentObj) {
          update(obj);
        } else {
          create(obj);
        }
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

      <FormItem label="Activo">
        {getFieldDecorator('is_active', { valuePropName: 'checked' })(
          <Switch />
        )}
      </FormItem>

      <div className="drawer-footer">
        <Button onClick={onClose} className="btn-forms-action">
          Cancelar
        </Button>
        <Button htmlType="submit" type="primary" className="btn-forms-action">
          {`${currentObj === null ? 'Crear' : 'Actualizar'}`}
        </Button>
      </div>
    </Form>
  );
};

export default Form.create()(ObjectForm);
