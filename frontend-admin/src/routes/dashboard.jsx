import DashboardPage from 'containers/Dashboard/DashboardPage';
import UserPage from 'containers/Users/Main';
import {
  DashboardOutlined,
  UserOutlined,
  BankOutlined,
  RightCircleOutlined
} from '@ant-design/icons';

const dashboardRoutes = [
  {
    path: '/dashboard',
    sidebarName: 'Dashboard',
    navbarName: 'Boilerplate dashboard',
    Icon: DashboardOutlined,
    component: DashboardPage
  },
  {
    path: '/users',
    sidebarName: 'Usuarios',
    navbarName: 'Material Dashboard',
    Icon: UserOutlined,
    component: UserPage
  },
  {
    sidebarName: 'Submenu',
    Icon: BankOutlined,
    submenu: [
      {
        sidebarName: 'Item 1',
        Icon: RightCircleOutlined,
        path: '/dummy-page-1'
      },
      {
        sidebarName: 'Item 2',
        Icon: RightCircleOutlined,
        path: '/dummy-page-2'
      }
    ]
  },
  {
    redirect: true,
    path: '/',
    to: '/dashboard',
    navbarName: 'Redirect',
    hidden: true
  }
];

export default dashboardRoutes;
