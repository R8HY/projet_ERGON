import { lazy } from 'react';
import Loadable from 'ui-component/Loadable';

const UtilsTablerIcons = Loadable(lazy(() => import('views/Clientele/RendezVous/index.js')));


const MainRoutes = {
    path: 'rendez-vous',
    element: <UtilsTablerIcons />
  };
  
  export default MainRoutes;