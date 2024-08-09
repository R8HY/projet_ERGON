// assets
import { IconKey } from '@tabler/icons';
import { lazy } from 'react';
import Loadable from 'ui-component/Loadable';

// constant
const icons = {
  IconKey
};

const Connexion = Loadable(lazy(() => import('views/Utilisateur/comptes/authentication/connexion/login')));
const ProfileEmployer = Loadable(lazy(() => import('views/Utilisateur/comptes/authentication/connexion/login')));

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const auth = {
  id: 'auth',
  title: 'UTILISATEUR',
  caption: 'Gestion du compte',
  type: 'group',
  children: [
    {
      id: 'authentication',
      title: 'Comptes',
      type: 'collapse',
      icon: icons.IconKey,

      children: [
        {
          id: 'register3',
          title: 'Profil',
          type: 'item',
          url: '/pages/register/register3',
          target: true, 
          element : <ProfileEmployer/>
        },
        {
          id: 'login3',
          title: 'Historique',
          type: 'item',
          url: '/pages/login/login3',
          target: true
        },
        {
          id: 'logout3',
          title: 'Deconnexion',
          type: 'item',
          url: '/auth/connexion',
          target: true,
          element: <Connexion/>
        },
      ]
    }
  ]
};

export default auth;
