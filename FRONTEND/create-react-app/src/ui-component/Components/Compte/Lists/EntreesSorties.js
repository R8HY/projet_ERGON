import {React, useState, useEffect} from 'react';
import { Avatar,Grid, Divider, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { format, parseISO } from 'date-fns';
import AOS from 'aos';
import 'aos/dist/aos.css'

import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';

function FluxView({flux, data}) {
  const theme = useTheme();
  const fluxTrie = flux.sort((a, b) => parseISO(b.date) - parseISO(a.date));
  const [accounts, setAccounts] = useState([])

  useEffect(() => {
    const apiUrl = `http://127.0.0.1:8000/accounts/Account/`;
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((d) => {
        setAccounts(d);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const getAccount = (id) => {
      return accounts.filte(donnees => donnees.id===id)[0];
  }

  useEffect(() => {
    AOS.init({ duration: 1500 });
  }, []);

  return (
    <Grid item xs={12}>
    {fluxTrie.map((donnees, index) => (
        <div  data-aos="zoom-in" key={index}>
            {donnees.crediteur === data.id ? (
                <Grid container direction="column">
                    <Grid container direction="column">
                    <Grid item>
                    <Grid container alignItems="center" justifyContent="space-between">
                        <Grid item>
                        <Typography variant="subtitle1" color="inherit">
                            {donnees.debiteur ? `Tranfert depuis : ${getAccount(donnees.debiteur).numero} (${getAccount(donnees.debiteur).nom})`:donnees.motif}
                        </Typography>
                        </Grid>
                        <Grid item>
                        <Grid container alignItems="center" justifyContent="space-between">
                            <Grid item>
                            <Typography variant="subtitle1" color="inherit">
                                {`${donnees && donnees.montant?donnees.montant.toLocaleString():donnees.montant} Ar`}
                            </Typography>
                            </Grid>
                            <Grid item>
                            <Avatar
                                variant="rounded"
                                sx={{
                                width: 16,
                                height: 16,
                                borderRadius: '5px',
                                backgroundColor: theme.palette.success.light,
                                color: theme.palette.success.dark,
                                ml: 2
                                }}
                            >
                                <KeyboardArrowUpOutlinedIcon fontSize="small" color="inherit" />
                            </Avatar>
                            </Grid>
                        </Grid>
                        </Grid>
                    </Grid>
                    </Grid>
                    <Grid item>
                    <Typography variant="subtitle2" sx={{ color: 'success.dark' }}>
                        Entrée du {format(parseISO(donnees.date),'dd-MM-yyyy')}
                    </Typography>
                    </Grid>
                </Grid>
                </Grid>
            ) : (
                <Grid container data-aos="zoom-in" direction="column">
                    <Grid container direction="column">
                        <Grid item>
                            <Grid container alignItems="center" justifyContent="space-between">
                                <Grid item>
                                    <Typography variant="subtitle1" color="inherit">
                                        {donnees.crediteur ? `Tranfert vers : ${getAccount(donnees.crediteur).nom}`:donnees.motif}
                                    </Typography>
                                </Grid>
                                <Grid item>
                                <Grid container alignItems="center" justifyContent="space-between">
                                    <Grid item>
                                    <Typography variant="subtitle1" color="inherit">
                                        {`${donnees && donnees.montant?donnees.montant.toLocaleString():donnees.montant} Ar`}
                                    </Typography>
                                    </Grid>
                                    <Grid item>
                                    <Avatar
                                        variant="rounded"
                                        sx={{
                                        width: 16,
                                        height: 16,
                                        borderRadius: '5px',
                                        backgroundColor: theme.palette.orange.light,
                                        color: theme.palette.orange.dark,
                                        marginLeft: 1.875
                                        }}
                                    >
                                        <KeyboardArrowDownOutlinedIcon fontSize="small" color="inherit" />
                                    </Avatar>
                                    </Grid>
                                </Grid>
                                </Grid>
                            </Grid>
                            </Grid>
                            <Grid item>
                            <Typography variant="subtitle2" sx={{ color: theme.palette.orange.dark }}>
                                Sortie du {format(parseISO(donnees.date),'dd-MM-yyyy')}
                            </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                )}
                <Divider sx={{ my: 1.5 }} />
            </div>
        ))}
    </Grid>
  );
}

export default FluxView;

