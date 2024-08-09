import { React, useEffect, useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import AOS from 'aos';
import 'aos/dist/aos.css'

// material-ui
import { useTheme } from '@mui/material/styles';
import { Card, Grid, Typography } from '@mui/material';

// third-party
import ApexCharts from 'apexcharts';
import Chart from 'react-apexcharts';

// project imports
import ChartData from './chart-data/bajaj-area-chart';

// ===========================|| DASHBOARD DEFAULT - BAJAJ AREA CHART CARD ||=========================== //

const BajajAreaChartCard = ({data, flux}) => {
  const theme = useTheme();
  const customization = useSelector((state) => state.customization);
  const { navType } = customization;
  const [suiteSolde, setSuiteSolde] = useState([0]);
  const orangeDark = theme.palette.secondary[800];
  const dataFlux = flux.filter((donnees) => donnees.debiteur === data.id || donnees.crediteur === data.id);

  // Mémoriser suiteSolde pour éviter des rendus inutiles
  const memorizedSuiteSolde = useMemo(() => suiteSolde, [suiteSolde]);

  useEffect(() => {
    // Séparer la logique de mise à jour de l'état
    const soldes = [0];
    dataFlux.forEach((donnees) => {
      const newSolde = donnees.crediteur === data.id ? soldes[soldes.length - 1] + donnees.montant : soldes[soldes.length - 1] - donnees.montant;
      soldes.push(newSolde);
    });
    setSuiteSolde(soldes);
  }, [navType, orangeDark, flux]);

  useEffect(() => {
    // Séparer la logique de mise à jour des options ApexCharts
    const newSupportChart = {
      ...ChartData.options,
      colors: [orangeDark],
      tooltip: {
        theme: 'light',
      },
    };
    ApexCharts.exec(`support-chart`, 'updateOptions', newSupportChart);
  }, [navType, orangeDark]);

  useEffect(() => {
    AOS.init({ duration: 1500 });
  }, [data]);

  const formatSolde = (cnt) => {
    return cnt.solde.toLocaleString();  // Utilisez la fonction toLocaleString() pour le formatage
  };


  return (
    <Card data-aos="zoom-in" className="mb-4-none" sx={{ bgcolor: 'secondary.light' }}>
      <Grid container sx={{ p: 2, pb: 0, color: '#fff' }}>
        <Grid item xs={12}>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Typography variant="subtitle1" sx={{ color: theme.palette.secondary.dark }}>
                {data.nom}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="h4" sx={{ color: theme.palette.grey[800] }}>
                N°{data.numero}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle2" sx={{ color: theme.palette.grey[800] }}>
            Solde actuel: {data && data.solde?formatSolde(data):data.solde} Ar
          </Typography>
        </Grid>
      </Grid>
      <Chart {...ChartData(memorizedSuiteSolde)} />
    </Card>
  );
};

export default BajajAreaChartCard;
