
import { lazy } from 'react';
import Loadable from 'ui-component/Loadable';

const ProfilPackage = Loadable(lazy(() => import('ui-component/Components/Packages/ProfilePackage')));
const CreationPackage = Loadable(lazy(() => import('ui-component/Components/Packages/CreationPackage/index')));
const CreationEvent = Loadable(lazy(() => import('ui-component/Components/Evenements/CreationEvenement/index')));

const MainRoutes = {
        path: '',
        children: [
            {
                path: 'packages/:id/details',
                element: <ProfilPackage />
            },
            {
                path: 'package/creation',
                element: <CreationPackage />
            },
            {
                path: 'evenement/creation',
                element: <CreationEvent />
            },
        ]
  };
  export default MainRoutes;
  

  