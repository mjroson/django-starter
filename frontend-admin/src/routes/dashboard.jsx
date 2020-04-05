import DashboardPage from 'containers/Dashboard/DashboardPage';
import UserPage from 'containers/Users/Main';

const dashboardRoutes = [
  {
    path: '/dashboard',
    sidebarName: 'Dashboard',
    navbarName: 'Boilerplate dashboard',
    icon: 'dashboard',
    component: DashboardPage
  },
  {
    path: '/users',
    sidebarName: 'Usuarios',
    navbarName: 'Material Dashboard',
    icon: 'user',
    component: UserPage
  },
  {
    sidebarName: 'Submenu',
    icon: 'bank',
    submenu: [
      {
        sidebarName: 'Item 1',
        icon: 'right-circle',
        path: '/dummy-page-1'
      },
      {
        sidebarName: 'Item 2',
        icon: 'right-circle',
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
