import { useState, useRef, useEffect } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Avatar,
  Box,
  ButtonBase,
  Popper,
  useMediaQuery
} from '@mui/material';
import { Link } from 'react-router-dom';

// assets
import { IconLogout } from '@tabler/icons';
import axios from "axios";

// ==============================|| NOTIFICATION ||============================== //

const NotificationSection = () => {
  const theme = useTheme();
  const matchesXs = useMediaQuery(theme.breakpoints.down('md'));

  const [open, setOpen] = useState(false);
  /**
   * anchorRef is used on different componets and specifying one type leads to other components throwing an error
   * */
  const anchorRef = useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };
  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }
    prevOpen.current = open;
  }, [open]);

  

  const handleLogout = async () => {
    try {
      // Effacez le token côté client
      localStorage.removeItem('token');
      localStorage.removeItem('userStatus');
      localStorage.removeItem('user');
      // Envoyez une requête de déconnexion à votre backend Django
      await axios.post('http://127.0.0.1:8000/employer/logout');
      window.location.reload();
      // Redirigez ou mettez à jour l'état de votre application après la déconnexion réussie
    } catch (error) {
      // Gérez les erreurs de déconnexion
      console.error('Erreur de déconnexion : ', error);
    }
  };

  return (
    <>
      <Box
        sx={{
          ml: 2,
          mr: 1,
          [theme.breakpoints.down('md')]: {
            mr: 1
          }
        }}
      >
        <ButtonBase component={Link} to="/auth/connexion" sx={{ borderRadius: '12px' }} onClick={()=>handleLogout()}>
          <Avatar
            variant="rounded"
            sx={{
              ...theme.typography.commonAvatar,
              ...theme.typography.mediumAvatar,
              transition: 'all .2s ease-in-out',
              background: theme.palette.primary.light,
              color: theme.palette.primary.dark,
              '&[aria-controls="menu-list-grow"],&:hover': {
                background: theme.palette.primary.dark,
                color: theme.palette.primary.light
              }
            }}
            ref={anchorRef}
            aria-controls={open ? 'menu-list-grow' : undefined}
            aria-haspopup="true"
            onClick={handleToggle}
            color="inherit"
          >
            <IconLogout stroke={1.5} size="1.5rem" />
          </Avatar>
        </ButtonBase>
      </Box>
      <Popper
        placement={matchesXs ? 'bottom' : 'bottom-end'}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        popperOptions={{
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [matchesXs ? 5 : 0, 20]
              }
            }
          ]
        }}
      >
      </Popper>
    </>
  );
};

export default NotificationSection;
