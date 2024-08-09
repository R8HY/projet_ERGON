import { lazy } from 'react';
import Loadable from 'ui-component/Loadable';
import MainLayout from 'layout/MainLayout';

const DashboardDefault = Loadable(lazy(() => import('views/Dash/Default/index')));

const MainRoutes = {
    path: '',
    element:<MainLayout/>,
    children: [
      {
        path: 'historique',
        element: <DashboardDefault/>
      },
    ]
  };
  
  export default MainRoutes;
  