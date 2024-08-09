import RendezVous from './RendezVous'
import Events from './Evenements'
import Clients from './Clients'

import MainLayout from 'layout/MainLayout';

const MainRoutes = {
    path: 'clientele',
    element:<MainLayout/>,
    children:[
        Clients, RendezVous, Events
    ]
};

export default MainRoutes;
  