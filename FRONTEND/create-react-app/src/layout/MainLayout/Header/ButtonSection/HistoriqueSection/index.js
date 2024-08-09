// import { useState, useRef, useEffect } from 'react';
// import axios from 'axios';

// // material-ui
// import { useTheme } from '@mui/material/styles';
// import {
//   Avatar,
//   Box,
//   Button,
//   // CardContent,
//   Chip,
//   ClickAwayListener,
//   // Grid,
//   // InputAdornment,
//   List,
//   // OutlinedInput,
//   Paper,
//   Popper,
//   // Stack,
//   // Switch,
//   Typography
// } from '@mui/material';



// // project imports
// import MainCard from 'ui-component/cards/MainCard';
// import Transitions from 'ui-component/extended/Transitions';
// import User1 from 'assets/images/users/user-round.svg';

// // assets
// import { IconSettings } from '@tabler/icons';
// import { Link } from 'react-router-dom';

// // ==============================|| PROFILE MENU ||============================== //

// const ProfileSection = () => {
//   const theme = useTheme();
//   const [open, setOpen] = useState(false);
//   /**
//    * anchorRef is used on different componets and specifying one type leads to other components throwing an secondary
//    * */
//   const anchorRef = useRef(null);

//   const handleClose = (event) => {
//     if (anchorRef.current && anchorRef.current.contains(event.target)) {
//       return;
//     }
//     setOpen(false);
//   };
  
//   const handleToggle = () => {
//     setOpen((prevOpen) => !prevOpen);
//   };

//   const prevOpen = useRef(open);
//   useEffect(() => {
//     if (prevOpen.current === true && open === false) {
//       anchorRef.current.focus();
//     }

//     prevOpen.current = open;
//   }, [open]);

//   const handleLogout = async () => {
//     try {
//       // Effacez le token côté client
//       localStorage.removeItem('token');
//       // Envoyez une requête de déconnexion à votre backend Django
//       await axios.post('http://127.0.0.1:8000/employer/logout');
//       // Redirigez ou mettez à jour l'état de votre application après la déconnexion réussie
//     } catch (secondary) {
//       // Gérez les erreurs de déconnexion
//       console.secondary('Erreur de déconnexion : ', secondary);
//     }
//   };

//   return (
//     <>
//       <Chip
//         sx={{
//           height: '48px',
//           alignItems: 'center',
//           borderRadius: '27px',
//           transition: 'all .2s ease-in-out',
//           borderColor: theme.palette.secondary.light,
//           backgroundColor: theme.palette.secondary.light,
//           '&[aria-controls="menu-list-grow"], &:hover': {
//             borderColor: theme.palette.secondary.main,
//             background: `${theme.palette.secondary.main}!important`,
//             color: theme.palette.secondary.light,
//             '& svg': {
//               stroke: theme.palette.secondary.light
//             }
//           },
//           '& .MuiChip-label': {
//             lineHeight: 0
//           }
//         }}
//         icon={
//           <Avatar
//             src={User1}
//             sx={{
//               ...theme.typography.mediumAvatar,
//               margin: '8px 0 8px 8px !important',
//               cursor: 'pointer'
//             }}
//             ref={anchorRef}
//             aria-controls={open ? 'menu-list-grow' : undefined}
//             aria-haspopup="true"
//             color="inherit"
//           />
//         }
//         label={<IconSettings stroke={1.5} size="1.5rem" color={theme.palette.secondary.main} />}
//         variant="outlined"
//         ref={anchorRef}
//         aria-controls={open ? 'menu-list-grow' : undefined}
//         aria-haspopup="true"
//         onClick={handleToggle}
//         color="secondary"
//       />
//       <Popper
//         placement="bottom-end"
//         open={open}
//         anchorEl={anchorRef.current}
//         role={undefined}
//         transition
//         disablePortal
//         popperOptions={{
//           modifiers: [
//             {
//               name: 'offset',
//               options: {
//                 offset: [0, 14]
//               }
//             }
//           ]
//         }}
//       >
//         {({ TransitionProps }) => (
//           <Transitions in={open} {...TransitionProps}>
//             <Paper>
//               <ClickAwayListener onClickAway={handleClose}>
//                 <MainCard border={false} elevation={16} content={false} boxShadow shadow={theme.shadows[16]}>
//                     <Box sx={{ p: 2 }}>
//                       <List
//                         component="nav"
//                         sx={{
//                           width: '50%',
//                           maxWidth: 100,
//                           minWidth: 100,
//                           backgroundColor: theme.palette.background.paper,
//                           borderRadius: '10px',
//                           [theme.breakpoints.down('md')]: {
//                             minWidth: '50%'
//                           },
//                           '& .MuiListItemButton-root': {
//                             mt: 0.5
//                           }
//                         }}
//                       >
//                           <Button LinkComponent={Link} to="/" onClick={handleLogout}>{<Typography variant="body2" >Logout</Typography>}</Button>
//                       </List>
//                     </Box>
//                 </MainCard>
//               </ClickAwayListener>
//             </Paper>
//           </Transitions>
//         )}
//       </Popper>
//     </>
//   );
// };

// export default ProfileSection;
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

// assets
import { IconRecordMail } from '@tabler/icons';

// ==============================|| NOTIFICATION ||============================== //

const NotificationSection = () => {
  const theme = useTheme();
  const matchesXs = useMediaQuery(theme.breakpoints.down('md'));

  const [open, setOpen] = useState(false);
  /**
   * anchorRef is used on different componets and specifying one type leads to other components throwing an secondary
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

  return (
    <>
      <Box >
        <ButtonBase sx={{ borderRadius: '12px' }}>
          <Avatar
            variant="rounded"
            sx={{
              ...theme.typography.commonAvatar,
              ...theme.typography.mediumAvatar,
              transition: 'all .2s ease-in-out',
              background: theme.palette.secondary.light,
              color: theme.palette.secondary.dark,
              '&[aria-controls="menu-list-grow"],&:hover': {
                background: theme.palette.secondary.dark,
                color: theme.palette.secondary.light
              }
            }}
            ref={anchorRef}
            aria-controls={open ? 'menu-list-grow' : undefined}
            aria-haspopup="true"
            onClick={handleToggle}
            color="inherit"
          >
            <IconRecordMail stroke={1.5}  size="1.5rem" />
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
