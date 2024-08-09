// // assets
// import { IconDashboard, IconUser, IconUsers, IconCalendar, IconBuildingBank} from '@tabler/icons';

// // constant
// const icons = {
//   IconUser,
//   IconUsers,
//   IconCalendar,
//   IconDashboard,
//   IconBuildingBank,
// };

// import Inventaire from './Inventaire';

// // ==============================|| UTILITIES MENU ITEMS ||============================== //

// const hahitantsoa = {
//   id: 'hahitantsoa',
//   title: 'HAHITANSOA',
//   caption: 'Gestion d\'Hahitantsoa',
//   type: 'group',
//   children: [
//     {
//       id: 'hahitantsoa-dashboard',
//       title: 'Dashboard',
//       type: 'item',
//       url: '/Hahitantsoa/dashboard',
//       icon: icons.IconDashboard,
//       breadcrumbs: false
//     },
//     {
//       id: 'hahitantsoa-evenements',
//       title: 'Evènements',
//       type: 'item',
//       url: '/Hahitantsoa/evenements',
//       icon: icons.IconCalendar,
//       breadcrumbs: false
//     },
//     {
//       id: 'hahitantsoa-clients',
//       title: 'Clients',
//       type: 'item',
//       url: '/Hahitantsoa/clients',
//       icon: icons.IconUser,
//       breadcrumbs: false
//     },
//     Inventaire,
//     {
//       id: 'hahitantsoa-personnels',
//       title: 'Personnels',
//       type: 'item',
//       url: '/Hahitantsoa/personnels',
//       icon: icons.IconUsers,
//       breadcrumbs: false
//     },
//     {
//       id: 'hahitantsoa-comptes',
//       title: 'Comptes',
//       type: 'item',
//       url: '/Hahitantsoa/comptes',
//       icon: icons.IconBuildingBank,
//       breadcrumbs: false
//     },
//   ]
// };

// export default hahitantsoa;

import { IconWallet, IconCoin } from '@tabler/icons';

// constant
const icons = {
    IconWallet,
    IconCoin
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const finance = {
  id: 'finance',
  title: 'FINANCE',
  caption: "Gestion des aspects financier",
  type: 'group',
  children: [
    {
      id: 'finance-recettes',
      title: 'Recettes',
      type: 'item',
      url: '/finance/comptes',
      icon: icons.IconWallet,
      breadcrumbs: false
    },
    {
      id: 'finance-payement',
      title: 'Payements',
      type: 'item',
      url: '/finance/payements',
      icon: icons.IconCoin,
      breadcrumbs: false
    },
  ]
};

export default finance;
