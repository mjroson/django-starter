import React, { useState } from 'react';
import { Layout, Menu, Dropdown, Button } from 'antd';
import { Switch, Route, Redirect } from 'react-router-dom';
import {
  ProfileOutlined,
  LogoutOutlined,
  UserOutlined
} from '@ant-design/icons';
import Logo from 'components/icons/logo';
import dashboardRoutes from 'routes/dashboard';
import './index.less';

const { SubMenu } = Menu;

const { Header, Content, Footer, Sider } = Layout;

const switchRoutes = (routes, parentKey = '') =>
  routes.map((item, idx) => {
    const key = parentKey ? `${parentKey}-${idx}` : String(idx);
    if (item.redirect)
      return <Redirect from={item.path} to={item.to} key={key} />;

    if (item.submenu) return switchRoutes(item.submenu, key);

    return <Route path={item.path} component={item.component} key={key} />;
  });

const sidebarMenu = (routes, parentKey) =>
  routes.map((item, idx) => {
    if (!item.hidden) {
      const key = parentKey ? `${parentKey}-${idx}` : String(idx);
      if (item.submenu) {
        return (
          <SubMenu
            key={key}
            title={
              <span>
                {item.Icon ? <item.Icon /> : null}
                <span className="nav-text">{item.sidebarName}</span>
              </span>
            }
          >
            {sidebarMenu(item.submenu, key)}
          </SubMenu>
        );
      }
      return (
        <Menu.Item key={key} path={item.path}>
          {item.Icon ? <item.Icon /> : null}
          <span className="nav-text">{item.sidebarName}</span>
        </Menu.Item>
      );
    }
    return null;
  });

const Dashboard = ({ history }) => {
  const [siderCollapsed, setSiderCollapsed] = useState(false);
  const initialMenuSelected = String(
    dashboardRoutes.findIndex(item => item.path === window.location.pathname) ||
      0
  );

  const onLogout = () => {
    // TODO : This is local logout
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('refresh');
    history.replace('/login');
  };

  const menu = (
    <Menu>
      <Menu.Item key="1">
        <ProfileOutlined size="large" />
        Profile
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="3" onClick={onLogout}>
        <LogoutOutlined size="large" />
        Logout
      </Menu.Item>
    </Menu>
  );

  const onClickMenuItem = (item, index, selectedKeys) => {
    history.push(item.item.props.path);
  };

  return (
    <Layout>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={broken => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          setSiderCollapsed(collapsed);
        }}
      >
        <div id="logo">
          <Logo style={siderCollapsed ? { width: '95%' } : {}} />
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[initialMenuSelected]}
          onSelect={onClickMenuItem}
        >
          {sidebarMenu(dashboardRoutes)}
        </Menu>
      </Sider>
      <Layout>
        <Header className="site-layout-sub-header-background">
          <div id="right-menu">
            <Dropdown overlay={menu} trigger={['click']}>
              <Button
                type="primary"
                shape="circle"
                icon={<UserOutlined />}
                size="large"
              />
            </Dropdown>
          </div>
        </Header>
        <Content style={{ margin: '24px 16px 0' }}>
          <Switch>{switchRoutes(dashboardRoutes)}</Switch>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Boilerplate ©2020</Footer>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
