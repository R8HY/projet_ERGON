import { IconDashboard, IconListCheck } from '@tabler/icons';

// constant
const icons = {
  IconDashboard,
  IconListCheck
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //
const dashboard = {
  id: 'dashboard',
  title: 'DASHBOARD',
  caption: "Tableau de bord",
  type: 'group',
  children: [
    {
      id: 'dashboard-dashboard',
      title: 'Dashboard',
      type: 'item',
      url: '/dashboard/',
      icon: icons.IconDashboard,
      breadcrumbs: false
    },
  ]
};

export default dashboard;
