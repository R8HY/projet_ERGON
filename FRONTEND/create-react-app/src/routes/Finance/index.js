import { lazy } from 'react';
import Loadable from 'ui-component/Loadable';
import MainLayout from 'layout/MainLayout';

const PayementView = Loadable(lazy(() => import('views/Finance/Payement/ListPayement')));
const PayementCommandeView = Loadable(lazy(() => import('views/Finance/Payement/index')));
const PayementCasseView = Loadable(lazy(() => import('views/Finance/Payement/Casse')));
const DashCompteView = Loadable(lazy(() => import('views/Finance/Compte')));
const FluxView= Loadable(lazy(() => import('views/Finance/Flux')));

const MainRoutes = {
    path: 'finance',
    element:<MainLayout/>,
    children: [
        {
            path: 'payements',
            children:[
                {
                    path: '',
                    element: <PayementView />                    
                },
                {
                    path: ':id',
                    element: <PayementCommandeView />                    
                },
                {
                    path: ':id/Casse',
                    element: <PayementCasseView />                    
                },
            ]
        },
        {
            path: 'comptes',
            element: <DashCompteView />
        },
        {
            path: 'comptes/:id/:typeFlux',
            element: <FluxView />
        },
    ]
};
  
export default MainRoutes;