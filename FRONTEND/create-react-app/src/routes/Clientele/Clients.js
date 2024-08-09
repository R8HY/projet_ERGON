import { lazy } from 'react';
import Loadable from 'ui-component/Loadable';

const ListeClientView = Loadable(lazy(() => import('views/Clientele/Client')));
const ProfileClientView = Loadable(lazy(() => import('views/Clientele/ProfilClient')));
const UpdateClientView = Loadable(lazy(() => import('views/Clientele/UpdateClient')));

const MainRoutes = {
    path: 'clients',
    children: [
        {
            path: '',
            element: <ListeClientView />
        },
        {
            path: ':id/profile',
            element: <ProfileClientView />
        },
        {
            path: 'update/:id',
            element: <UpdateClientView />
        },
    ]
};
  
export default MainRoutes;
  