import { lazy } from 'react';
import Loadable from 'ui-component/Loadable';

const CommandeView = Loadable(lazy(() => import('views/Clientele/Location/Commande/Commande')));
const CommandeClientView = Loadable(lazy(() => import('views/Clientele/CommandeClient')));
const CommandeStat = Loadable(lazy(() => import('views/Clientele/Location/Commande/CommandeStat')));

const MainRoutes = {
    path: 'evenements',
    children: [
      {
        path: '',
        element: <CommandeView />
      },
      {
        path: 'statistiques',
        element: <CommandeStat />
      },
      {
        path: ':idCommande',
        element: <CommandeClientView />
      },
    ]
  };
  
  export default MainRoutes;

  