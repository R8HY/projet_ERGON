import { lazy } from 'react';
import Loadable from 'ui-component/Loadable';

const LocationView = Loadable(lazy(() => import('views/Ressources/Location/index')));
const PanierView = Loadable(lazy(() => import('views/Ressources/Location/Panier/ArticlePanier')));
const VerificationLocationView = Loadable(lazy(() => import('views/Ressources/Location/Retour/Verification')));
const VerificationCasseView = Loadable(lazy(() => import('views/Ressources/Location/Retour/CheckProduit')));

const MainRoutes = {
    path: 'locations',
    children: [
      {
        path: '',
        element: <LocationView />
      },
      {
        path: 'verification_location',
        element: <VerificationLocationView />
      },
      {
        path: ':id',
        element: <PanierView />
      },
      {
        path: ':id/verification_location/',
        element: <VerificationCasseView />
      },
    ]
  };
  
  export default MainRoutes;

  