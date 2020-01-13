import React from 'react';
import DashboardPage from 'containers/Dashboard/DashboardPage';
import UserPage from 'containers/Users/ListPage';

const dashboardRoutes = [
  {
    path: '/dashboard',
    sidebarName: 'Dashboard',
    navbarName: 'Moni Dashboard',
    icon: 'dashboard',
    component: DashboardPage
  },
  {
    path: '/users',
    sidebarName: 'Usuarios',
    navbarName: 'Material Dashboard',
    icon: 'user',
    component: (props) => (<UserPage {...props} objectPath={['users']} />),
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
