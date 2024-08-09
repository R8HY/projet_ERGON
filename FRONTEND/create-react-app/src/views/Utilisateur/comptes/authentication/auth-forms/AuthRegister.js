import { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { useSelector } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  Divider,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  MenuItem,
  Select,
  useMediaQuery,
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project imports
import useScriptRef from 'hooks/useScriptRef';
// import Google from 'assets/images/icons/social-google.svg';
import AnimateButton from 'ui-component/extended/AnimateButton';
import axios from 'axios';
import { useNavigate } from 'react-router';
// import { Link } from 'react-router-dom';
// import { strengthColor, strengthIndicator } from 'utils/password-strength';

// // assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

// ===========================|| FIREBASE - REGISTER ||=========================== //

const FirebaseRegister = ({ ...others }) => {
  const theme = useTheme();
  const scriptedRef = useScriptRef();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [status, setStatus] = useState('Administrateur');
  const [currentUser, setCurrentUser] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const [passwordConfirmed, setPasswordConfirmed] = useState(true);
  // const [successMessage, setSuccessMessage] = useState('');
  const naviguer = useNavigate()
  

  // useEffect(() => {
  //   axios.get("http://127.0.0.1:8000/employer/user")
  //   .then(function() {
  //     setCurrentUser(true);
  //   })
  //   .catch(function() {
  //     setCurrentUser(false);
  //   });
  // }, []);

  function submitRegistration() {
    if(password===confirmPassword){
      setPasswordConfirmed(true);
      const valStatus=status==="Administrateur"?'A':
        status==="Responsable clientèle"?'C':
        status==="Responsable ressource"?'R':
        'F';
      axios.post(
      "http://127.0.0.1:8000/employer/register",
      {
        name: username,
        email: email,
        password: password,
        status: valStatus
      }
      ).then(function() {
          console.log("Account created");
          setCurrentUser(true);
          naviguer('/auth/connexion');
      });
    }
    else{
      setPasswordConfirmed(false);
    }
    
  }

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  if(currentUser){
    console.log('voilaa')
  }
  return (
    <>
    {/* {successMessage && (
          <Typography variant="success" sx={{ mb: 2 }}>
            {successMessage}
          </Typography>
        )} */}
      <Formik
        validationSchema={Yup.object().shape({
          email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
          mdp: Yup.string().max(255).required('Password is required')
        })}
        onSubmit={async ({ setErrors, setStatus, setSubmitting }) => {
          try {
            if (scriptedRef.current) {
              setStatus({ success: true });
              setSubmitting(false);
            }
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
        {({ errors, isSubmitting, handleBlur, touched}) => (
          <form noValidate onSubmit={submitRegistration} {...others}>
            <Grid container spacing={matchDownSM ? 0 : 2}>
              <Grid item xs={12} sm={12}>
                  <TextField
                    fullWidth
                    label="Nom"
                    value={username}
                    margin="normal"
                    name="lname"
                    type="text"
                    defaultValue=""
                    onChange={(e)=> setUsername(e.target.value)}
                    sx={{ ...theme.typography.customInput }}
                  />
                </Grid>
              
              <Grid item xs={12} sm={12}>
                <TextField
                  fullWidth
                  label="Email"
                  value={email}
                  margin="normal"
                  name="fname"
                  type="text"
                  defaultValue=""
                  onChange={(e)=> setEmail(e.target.value)}
                  sx={{ ...theme.typography.customInput }}
                />
              </Grid>
              
           </Grid>
           <FormControl className="mt-4" fullWidth>
            <Select labelId="selectable" value={status} onChange={(e)=>setStatus(e.target.value)}>
                  <MenuItem value="Administrateur">Administrateur</MenuItem>
                  <MenuItem value="Responsable clientèle">Responsable clientèle</MenuItem>
                  <MenuItem value="Responsable ressource">Responsable ressource</MenuItem>
                  <MenuItem value="Responsable finance">Responsable finance</MenuItem>
            </Select>
           </FormControl>
           <Divider className="mt-4 mb-2"/>

                <FormControl fullWidth error={Boolean(touched.password && errors.password)} sx={{ ...theme.typography.customInput }}>
                      <InputLabel htmlFor="outlined-adornment-password-login">Mot de passe</InputLabel>
                      <OutlinedInput
                        id="outlined-adornment-password-login"
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        name="Mot de passe"
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
                      {touched.password && errors.password && (
                        <FormHelperText error id="standard-weight-helper-text-password-login">
                          {errors.password}
                        </FormHelperText>
                      )}
                      </FormControl>
                      <FormControl className="mt-3" fullWidth error={Boolean(touched.password && errors.password)} sx={{ ...theme.typography.customInput }}>
                      <InputLabel htmlFor="outlined-adornment-password-login">Confirmer le mot de passe</InputLabel>
                      <OutlinedInput
                        id="outlined-adornment-password-login-confirm"
                        type={showPassword ? 'text' : 'password'}
                        value={confirmPassword}
                        name="Mot de passe"
                        onBlur={handleBlur}
                        onChange={(e)=>{setConfirmPassword(e.target.value)}}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                              size="large"
                            >
                            </IconButton>
                          </InputAdornment>
                        }
                        label="Password"
                        inputProps={{}}
                      />
                      {!passwordConfirmed&&<FormHelperText error id="standard-weight-helper-text-password-login">
                          Les mots de passe ne correspondent pas
                      </FormHelperText>}
                      {touched.password && errors.password && (
                        <FormHelperText error id="standard-weight-helper-text-password-login">
                          {errors.password}
                        </FormHelperText>
                      )}
                      </FormControl>
            {/* <FormControl fullWidth error={Boolean(touched.email && errors.email)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-email-register">Email Address / Username</InputLabel>
              <OutlinedInput
                id="outlined-adornment-email-register"
                type="email"
                // value={values.email}
                name="email"
                onBlur={handleBlur}
                onChange={(e)=>setEmail(e.target.value)}
                inputProps={{}}
              />
              {touched.email && errors.email && (
                <FormHelperText error id="standard-weight-helper-text--register">
                  {errors.email}
                </FormHelperText>
              )}
            </FormControl> */}
            {/* <FormControl fullWidth error={Boolean(touched.password && errors.password)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-password-register">Password</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password-register"
                type={showPassword ? 'text' : 'password'}
                // value={values.password}
                name="password"
                label="Password"
                onBlur={handleBlur}
                onChange={(e) => {
                  handleChange(e);
                  changePassword(e.target.value);
                  setMdp(e.target)
                }}
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
                inputProps={{}}
              />
              {touched.password && errors.password && (
                <FormHelperText error id="standard-weight-helper-text-password-register">
                  {errors.password}
                </FormHelperText>
              )}
            </FormControl> */}


            {/* {strength !== 0 && (
              <FormControl fullWidth>
                <Box sx={{ mb: 2 }}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item>
                      <Box style={{ backgroundColor: level?.color }} sx={{ width: 85, height: 8, borderRadius: '7px' }} />
                    </Grid>
                    <Grid item>
                      <Typography variant="subtitle1" fontSize="0.75rem">
                        {level?.label}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </FormControl>
            )} */}

            {/* <Grid container alignItems="center" justifyContent="space-between">
              <Grid item>
                <FormControlLabel
                  control={
                    <Checkbox checked={checked} onChange={(event) => setChecked(event.target.checked)} name="checked" color="primary" />
                  }
                  label={
                    <Typography variant="subtitle1">
                      Agree with &nbsp;
                      <Typography variant="subtitle1" component={Link} to="#">
                        Terms & Condition.
                      </Typography>
                    </Typography>
                  }
                />
              </Grid>
            </Grid> */}
            {errors.submit && (
              <Box sx={{ mt: 3 }}>
                <FormHelperText error>{errors.submit}</FormHelperText>
              </Box>
            )}

            <Box sx={{ mt: 2 }}>
              <AnimateButton>
                <Button 
                  onClick={()=>submitRegistration()}
                 disableElevation
                 disabled={isSubmitting} 
                 fullWidth size="large" 
                 variant="contained" 
                 color="secondary">
                  Enregistrer
                </Button>
              </AnimateButton>
            </Box>
          </form>
        )}
      </Formik>
    </>
  );
};

export default FirebaseRegister;
