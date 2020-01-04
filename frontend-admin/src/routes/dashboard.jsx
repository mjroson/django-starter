import DashboardPage from 'containers/Dashboard/DashboardPage';
// import UserDetail from 'containers/Users/components/Detail';
import UserPage from 'containers/Users/ListPage';

const dashboardRoutes = [
  {
    path: '/dashboard',
    sidebarName: 'Dashboard',
    navbarName: 'Moni Dashboard',
    icon: 'dashboard',
    component: DashboardPage
  },
  // { Register page without menu item
  //   path: '/users/:userId',
  //   component: UserDetail,
  //   hidden: true
  // },
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
        icon: 'right-circle'
      },
      {
        sidebarName: 'Item 2',
        icon: 'right-circle'
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
