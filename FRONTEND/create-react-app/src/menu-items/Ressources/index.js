import { IconBox, IconChecklist, IconHome } from '@tabler/icons';

// constant
const icons = {
  IconBox,
  IconChecklist,
  IconHome,
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const ressources = {
  id: 'ressources',
  title: 'RESSOURCE',
  caption: "Inventaire et gestion des ressources",
  type: 'group',
  children: [
      {
        id: 'ressources-inventaire',
        title: 'Inventaire',
        type: 'collapse',
        icon: icons.IconBox,
        breadcrumbs: false,
        children: [
          {
            id: 'ressources-produits',
            title: 'Produits',
            type: 'item',
            url: '/ressources/produits/',
            breadcrumbs: false
          },
          {
            id: 'ressources-decorations',
            title: 'Decorations',
            type: 'item',
            url: '/ressources/decorations/',
            breadcrumbs: false
          },
          {
            id: 'ressources-salles',
            title: 'Salles',
            type: 'item',
            url: '/ressources/salles/',
            breadcrumbs: false
          },
        ]
      },
      {
        id: 'ressources-locations',
        title: 'Locations',
        type: 'item',
        icon: icons.IconChecklist,
        url: '/ressources/locations/',
        breadcrumbs: false,
      },
    
  ]
};


export default ressources;
