import { Dashboard, Login, RegisterPlace } from 'screens'
import { Person, PersonAdd, List, Dashboard as DashboardIcon } from "@material-ui/icons";


let routes = [
  {
    id: 2,
    path: '/',
    text: 'Login',
    component: Login,
    secure: false,
    exact: true
  },

  {
    id: 4,
    path: '/dashboard',
    component: Dashboard,
    secure: true,
    text: 'Dashboard',
    icon: DashboardIcon,
    exact: true
  },

  {
    id: 7,
    path: '/RegisterPlace/:id',
    component: RegisterPlace,
    secure: true,
    exact: false
  },


  {
    id: 9,
    path: '/RegisterPlace',
    component: RegisterPlace,
    secure: true,
    exact: true
  },



]

export default routes;