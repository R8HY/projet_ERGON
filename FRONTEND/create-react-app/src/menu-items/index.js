import dashboard from './Dashboard/index';
import historique from './Historique/index';
import clientele from './Clientele/index';
import ressources from './Ressources/index';
import finance from './Finance/index';
// import user from './Utilisateur/index';
// import hahitantsoa from './Hahitantsoa/index';

// ==============================|| MENU ITEMS ||============================== //
var menuItems = {
  items: [
    dashboard, 
    clientele, 
    ressources, 
    finance,
    historique
  ]
};

if(localStorage['userStatus']==='C'){
  menuItems = {
    items: [
      dashboard, 
      clientele,
      historique
    ]
  };
}
if(localStorage['userStatus']==='R'){
  menuItems = {
    items: [
      dashboard,
      ressources,
      historique
    ]
  };
}
if(localStorage['userStatus']==='F'){
  menuItems = {
    items: [
      dashboard, 
      finance,
      historique
    ]
  };
}


export default menuItems;
