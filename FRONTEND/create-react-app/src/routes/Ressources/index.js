import Location from './Location';
import Packages from './Packages';
import Panier from './Panier';
import Produits from './Inventaire';

import MainLayout from 'layout/MainLayout';

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: 'ressources',
  element : <MainLayout/>,
  children: [
    Location, Packages, Panier, Produits
  ]
};

export default MainRoutes;