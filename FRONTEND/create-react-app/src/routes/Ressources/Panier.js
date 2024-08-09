import { lazy } from 'react';
import Loadable from 'ui-component/Loadable';

const ProduitCommandeView = Loadable(lazy(() => import('views/Clientele/Location/Commande/ProduitCommande')));
const PanierView = Loadable(lazy(() => import('views/Ressources/Location/Panier/Panier')));
const ArticlePanierView = Loadable(lazy(() => import('views/Ressources/Location/Panier/ArticlePanier')));

const MainRoutes = {
    path: 'paniers',
    children: [
      {
            path: '',
            element: <PanierView />
      },
      {
            path: ':idPanier/remplir',
            element: <ProduitCommandeView />
      },
      {
            path: ':idPanier/articles',
            element: <ArticlePanierView />
      },
    ]
  };
  
  export default MainRoutes;
  