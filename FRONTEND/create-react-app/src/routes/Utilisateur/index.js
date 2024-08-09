import { lazy } from 'react';

// project imports
import Loadable from 'ui-component/Loadable';
import MinimalLayout from 'layout/MinimalLayout';
import MainLayout from 'layout/MainLayout';

// login option 3 routing
const Login = Loadable(lazy(() => import('views/Utilisateur/comptes/authentication/connexion/login')));
const SignUp= Loadable(lazy(() => import('views/Utilisateur/comptes/authentication/connexion/signUp')));
const UserProfileView = Loadable(lazy(() => import('views/Utilisateur/UserProfile')));

// ==============================|| AUTHENTICATION ROUTING ||============================== //

let AuthenticationRoutes = {
  path: 'auth',
  element: <MinimalLayout />,
  children: [
    {
      path: 'connexion',
      element: <Login/>
    },
    {
      path: 'inscription',
      element: <SignUp/>
    },
  ]
};

const ProfileUserRoute = {
    path: '',
    element: <MainLayout/>,
    children: [
      {
        path: 'utilisateurs/:id/profile',
        element: <UserProfileView/>,
      }
    ]
}

if(localStorage.getItem("userStatus")){
  AuthenticationRoutes = {
    path:'',
    children:[
        AuthenticationRoutes, ProfileUserRoute
    ]
  }  
}

export default AuthenticationRoutes;
