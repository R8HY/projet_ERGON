import { IconUser, IconClock, IconCalendar } from '@tabler/icons';

// constant
const icons = {
  IconUser,
  IconClock,
  IconCalendar
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const clientele = {
  id: 'clientele',
  title: 'CLIENTÈLE',
  caption: "Gestion de la clientèle",
  type: 'group',
  children: [
    {
      id: 'clientele-rendezVous',
      title: 'Rendez-vous',
      type: 'item',
      url: '/clientele/rendez-vous/',
      icon: icons.IconClock,
      breadcrumbs: false
    },
    {
      id: 'clientele-evenements',
      title: 'Evènements',
      type: 'item',
      url: '/clientele/evenements/',
      icon: icons.IconCalendar,
      breadcrumbs: false
    },
    {
      id: 'clientele-clients',
      title: 'Clients',
      type: 'item',
      url: '/clientele/clients/',
      icon: icons.IconUser,
      breadcrumbs: false
    },
  ]
};

export default clientele;
