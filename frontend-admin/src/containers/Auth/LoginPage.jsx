import React from 'react';
import { Form, Icon, Input, Button, Checkbox, Card, message } from 'antd';
import axios from 'axios';

const LoginPage = ({ history }) => {
  const [form] = Form.useForm();

  const redirect = () => {
    const query = new URLSearchParams(window.location.search);
    const next = query.get('next');
    if (
      next &&
      next !== null &&
      next !== '' &&
      window.location.pathname !== next
    ) {
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
            message.success(`Bienvenido ${values.username}`);
            window.localStorage.setItem('token', resp.data.access);
            window.localStorage.setItem('refresh_token', resp.data.refresh);
            redirect();
          })
          .catch(e => {
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
        <Form
          onFinish={handleSubmit}
          form={form}
          className="login-form"
          name="loginForm"
        >
          <Form.Item name="username">
            <Input
              prefix={
                <Icon type="email" style={{ color: 'rgba(0,0,0,.25)' }} />
              }
              placeholder="Nombre de usuario"
            />
          </Form.Item>
          <Form.Item name="password">
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item name="remember">
            <Checkbox>Recordarme</Checkbox>
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

export default LoginPage;
