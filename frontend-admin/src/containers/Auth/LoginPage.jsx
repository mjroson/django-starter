import React from 'react';
import { Form, Icon, Input, Button, Checkbox, Card, message } from 'antd';
import axios from 'axios';

const LoginPage = props => {
  const { form, history } = props;
  const { getFieldDecorator } = form;

  const redirect = () => {
    const query = new URLSearchParams(window.location.search);
    const next = query.get('next');
    if (next && next !== null && next !== '') {
      history.push(next);
    } else {
      history.push('/');
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        axios
          .post('/api/auth/token/', values)
          .then(resp => {
            console.log('Resquest Login Success ', resp);
            message.success(`Bienvenido ${values.username}`);
            window.localStorage.setItem('token', resp.data.access);
            window.localStorage.setItem('refresh_token', resp.data.refresh);
            redirect();
          })
          .catch(e => {
            console.log('Request Login Error ', e);
            if (
              e.response &&
              e.response.status === 400 &&
              e.response.data &&
              e.response.data.non_field_errors
            ) {
              message.error(e.response.data.non_field_errors[0]);
            }
          });
      }
    });
  };

  return (
    <div
      className="section-auth"
      style={{
        display: 'flex',
        height: '100%',
        width: '100%',
        alignItems: 'center'
      }}
    >
      <Card title="Iniciar sesion" style={{ maxWidth: 400, margin: 'auto' }}>
        <Form onSubmit={handleSubmit} className="login-form">
          <Form.Item>
            {getFieldDecorator('username', {
              rules: [
                { required: true, message: 'Please input your username!' }
              ]
            })(
              <Input
                prefix={
                  <Icon type="email" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                placeholder="Nombre de usuario"
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [
                { required: true, message: 'Please input your Password!' }
              ]
            })(
              <Input
                prefix={
                  <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                type="password"
                placeholder="Password"
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true
            })(<Checkbox>Recordarme</Checkbox>)}
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Entrar
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Form.create({ name: 'login' })(LoginPage);
