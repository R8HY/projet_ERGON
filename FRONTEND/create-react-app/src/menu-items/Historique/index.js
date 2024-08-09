import { IconDashboard, IconListCheck } from '@tabler/icons';

// constant
const icons = {
  IconDashboard,
  IconListCheck
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //
const dashboard = {
  id: 'historique',
  title: 'HISTORIQUE',
  caption: "Historique des évènements",
  type: 'group',
  children: [
      {
        id: 'historique-historique',
        title: 'Historique',
        type: 'item',
        url: '/historique/',
        icon: icons.IconListCheck,
        breadcrumbs: false
      },
  ]
};

export default dashboard;
