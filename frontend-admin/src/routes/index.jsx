import Dashboard from '../layouts/Dashboard';
import LoginPage from '../containers/Auth/LoginPage';

const indexRoutes = [
  { path: '/login', name: 'login', component: LoginPage },
  { path: '/', component: Dashboard }
];

export default indexRoutes;
