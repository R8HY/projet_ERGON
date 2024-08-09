import Clientele from './Clientele/index';
import Dashboard from './Dashboard/index';
import Finance from './Finance/index';
import Ressources from './Ressources/index';
import Utilisateur from './Utilisateur/index';
import Historique from './Historique/index';

import { lazy } from 'react';

// project imports
import Loadable from 'ui-component/Loadable';

// login option 3 routing
const AccueilView = Loadable(lazy(() => import('views/Accueil/index')));
// ==============================|| MAIN ROUTING ||============================== //

const FreeRoutes = {
  path: '',
  element: <AccueilView/>
};

var MainRoutes = {
  path: '',
  children: [
    FreeRoutes, Utilisateur
  ]
};

if(localStorage['userStatus']==='A'){
  MainRoutes = {
    path: '',
    children: [
      FreeRoutes, Dashboard, Clientele, Finance, Ressources, Utilisateur, Historique
    ]
  };
}
if(localStorage['userStatus']==='C'){
  MainRoutes = {
    path: '',
    children: [
      FreeRoutes, Dashboard, Clientele, Utilisateur, Historique
    ]
  };
}
if(localStorage['userStatus']==='R'){
  MainRoutes = {
    path: '',
    children: [
      FreeRoutes, Dashboard, Ressources, Utilisateur, Historique
    ]
  };
}
if(localStorage['userStatus']==='F'){
  MainRoutes = {
    path: '',
    children: [
      FreeRoutes, Dashboard, Finance, Utilisateur, Historique
    ]
  };
}

export default MainRoutes;