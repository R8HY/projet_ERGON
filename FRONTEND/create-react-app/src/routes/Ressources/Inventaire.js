import { lazy } from 'react';
import Loadable from 'ui-component/Loadable';

const ProduitView = Loadable(lazy(() => import('views/Ressources/Produit')));
const SalleView = Loadable(lazy(() => import('views/Ressources/Salle')));
const DecorationView = Loadable(lazy(() => import('views/Ressources/Decoration')));
const ProduitProfile = Loadable(lazy(() => import('views/Ressources/ProfileProduit')));
const SalleProfile = Loadable(lazy(() => import('views/Ressources/ProfileSalle')));
const DecorationProfile = Loadable(lazy(() => import('views/Ressources/ProfileDecoration')));

const MainRoutes = {
    path: '',
    children: [
        {
            path: 'produits',
            element: <ProduitView />
        },
        {
            path: 'produits/:id/profile',
            element: <ProduitProfile />
        },
        {
            path: 'decorations',
            element: <DecorationView />
        },
        {
            path: 'salles',
            element: <SalleView />
        },
        {
            path: 'decorations/:id/profile',
            element: <DecorationProfile />
        },
        {
            path: 'salles/:id/profile',
            element: <SalleProfile />
        },
    ]
};
  
export default MainRoutes;
  