import React, { useEffect } from 'react';
import { Form, Input, Button, Switch } from 'antd';
import { useDispatch } from 'react-redux';

const FormItem = Form.Item;

const ObjectForm = ({ currentObj, onClose, submit, form }) => {
  const dispatch = useDispatch();
  const { getFieldDecorator } = form;

  useEffect(() => {
    console.log('Use efect object form ', currentObj);
    form.resetFields();
    if (currentObj != null) {
      const data = {};
      data['title'] = currentObj['title'] || null;
      form.setFieldsValue(data);
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

        submit(obj);
      }
    });
  };

  return (
    <Form onSubmit={handleSubmit} className="card-block">
      
      <FormItem label="Title">
        {getFieldDecorator('title', {
          //initialValue: 'My Value',
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
