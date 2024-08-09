import { useState, useEffect } from 'react';
// import { useSelector } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Button,
  Checkbox,
  // Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  TextField,
  // useMediaQuery
} from '@mui/material';

import { IconChecks } from '@tabler/icons';


// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project imports
import useScriptRef from 'hooks/useScriptRef';
import AnimateButton from 'ui-component/extended/AnimateButton';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';


// import Google from 'assets/images/icons/social-google.svg';

// ============================|| FIREBASE - LOGIN ||============================ //

const FirebaseLogin = ({ ...others }) => {
  const theme = useTheme();
  const scriptedRef = useScriptRef();
  const [checked, setChecked] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [currentUser, setCurrentUser] = useState();
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [showMessageConnection, setShowMessageConnection] = useState(false);
  const [connectionError, setConnectionError] = useState(false);
  const naviguer = useNavigate();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleFocus= () => {
    setShowErrorMessage(false);
    setConnectionError(false);
  };

  useEffect(() => {
    AOS.init({ duration: 1500 });
  }, []);


  // useEffect(()=>{
  //   if(key!=''){
  //     console.log(Cookies.get("jwt"));
  //     console.log(key);
  //     axios.get("http://127.0.0.1:8000/employer/user", {
  //       withCredentials: true,
  //       headers: {
  //           'Authorization': `Bearer ${Cookies.get("jwt")}`,
  //       },
  //     })
  //     .then((response)=>{
  //       setCurrentUser(true);
  //       localStorage.setItem('user', response.data);
  //       setCurrentUser(true);
  //     })
  //     .catch(function() {
  //       setCurrentUser(false);
  //     });
  //   }
  // },[key])

  function submitLogin() {
    setShowMessageConnection(true);
    setShowErrorMessage(false);
    setConnectionError(false);
    axios.post(
      "http://127.0.0.1:8000/employer/login",
      {
        email: email,
        password: password
      }
    ).then(function(response) {
      const user = response.data["user"];
      console.log(user);
      localStorage.setItem("user", user);
      localStorage.setItem("userStatus", user.status);
      setCurrentUser(true);
      setTimeout(() => {
        setShowSuccessMessage(false); // Cache le message après un court délai (par exemple, 3 secondes ici)
      }, 2000);
    }).catch((error)=>{
      console.log(error);
      setConnectionError(true);
      setShowErrorMessage(true);
      setTimeout(() => {
        setShowErrorMessage(false);
      }, 2800);
      setShowMessageConnection(false);
    })
      
  }

  if(currentUser===true)setTimeout(() => {
    setShowSuccessMessage(true);
  }, 1000);

  if(currentUser===true)setTimeout(() => {
    naviguer('/dashboard');
    window.location.reload();
  }, 1500);
  
  return (
    <>
      <Formik
        autoComplete="off"
        validationSchema={Yup.object().shape({
          email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
          password: Yup.string().max(255).required('Password is required')
        })}
        onSubmit={(values, { setErrors, setStatus, setSubmitting }) => {
        try {
          handleLogin(values);  // Appeler la fonction handleLogin avec les valeurs du formulaire
        } catch (err) {
          console.error(err);
          if (scriptedRef.current) {
            setStatus({ success: false });
            setErrors({ submit: err.message });
            setSubmitting(false);
          }
        }
        }}
      >
        {({ errors, handleBlur,  isSubmitting }) => (
          <form noValidate onSubmit={submitLogin} {...others} autoComplete="off">

              <Grid item xs={12} sm={12}>
                <TextField
                  fullWidth
                  type="email"
                  value={email}
                  onFocus={handleFocus}
                  name="email"
                  error={connectionError}
                  onBlur={handleBlur}
                  onChange={(e)=>{setEmail(e.target.value)}}
                  label="Adresse email"
                  sx={{ ...theme.typography.customInput }}
                />
              </Grid>
                {/* error={Boolean(touched.password && errors.password)} */}
                      <FormControl fullWidth error={false} sx={{ ...theme.typography.customInput }}>
                      <InputLabel htmlFor="outlined-adornment-password-login" style={{color:connectionError&&"red"}}>Mot de passe</InputLabel>
                      <OutlinedInput
                        id="outlined-adornment-password-login"
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        name="password"
                        error={connectionError}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        onChange={(e)=>{setPassword(e.target.value)}}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                              size="large"
                            >
                              {showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                          </InputAdornment>
                        }
                        label="Password"
                        inputProps={{}}
                      />
                      {showMessageConnection && (
                          <span className="mt-2" style={{width:"100%", textAlign:"center", color:"#5e3295", fontSize:"12px"}}>
                            {showSuccessMessage?<IconChecks/>:"Connexion..."}
                          </span>
                        )}
                      {showErrorMessage && (
                        <span className="mt-2" style={{width:"100%", textAlign:"center", color:"red", fontSize:"12px"}}>
                          Erreur de connexion
                        </span>
                      )}
                      </FormControl>
            
            <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
              <FormControlLabel
                control={
                  <Checkbox checked={checked} onChange={(event) => setChecked(event.target.checked)} name="checked" color="primary" />
                }
                label="Se souvenir de moi"
              />
            </Stack>
            {errors.submit && (
              <Box sx={{ mt: 3 }}>
                <FormHelperText error>{errors.submit}</FormHelperText>
              </Box>
            )}
            

            <Box sx={{ mt: 2 }}>
              <AnimateButton>
                <Button
                  disableElevation
                  disabled={isSubmitting}  
                  fullWidth
                  size="large"
                  variant="contained"
                  color="secondary"
                  onClick={()=>submitLogin()}
                >
                  Se connecter
                </Button>
              </AnimateButton>
            </Box>
          </form>
        )}
      </Formik>
    </>
  );
};

export default FirebaseLogin;
