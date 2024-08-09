import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { format } from 'date-fns';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Card, Grid, Typography } from '@mui/material';

// third-party
import ApexCharts from 'apexcharts';
import Chart from 'react-apexcharts';

// project imports
import chartData from './chart-data/bajaj-area-chart';

// ===========================|| DASHBOARD DEFAULT - BAJAJ AREA CHART CARD ||=========================== //

const BajajAreaChartCard = ({ compte = {}, titre = '', data = [] }) => {
  const theme = useTheme();
  const customization = useSelector((state) => state.customization);
  const { navType } = customization;
  const [totalOfMonth, setTotalOfMonth] = useState(0)

  const orangeDark = theme.palette.secondary[800];

  useEffect(() => {
    const today = new Date();
    const month = format(today, "MM");
    setTotalOfMonth(data[month-1].toLocaleString());
  }, [data]);

  useEffect(() => {
    const newSupportChart = {
      ...chartData.options,
      colors: [orangeDark],
      tooltip: {
        theme: 'light'
      }
    };
    ApexCharts.exec(`support-chart`, 'updateOptions', newSupportChart);
  }, [navType, orangeDark]);

  return (
    <Card sx={{ bgcolor: 'secondary.light' }}>
      <Grid container sx={{ p: 2, pb: 2, color: '#fff' }}>
        <Grid item xs={12}>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Typography variant="subtitle1" sx={{ color: theme.palette.secondary.dark }}>
              {compte.nom || 'Nom non défini'}
              </Typography>
            </Grid>
            <Grid item>
              <Typography style={{fontSize:"11px", fontWeight:"bold"}} variant="h6" sx={{ color: theme.palette.grey[800] }}>
                {titre}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Typography style={{fontSize:"11px"}} variant="subtitle2" sx={{ color: theme.palette.grey[800] }}>
              {titre} du mois : {totalOfMonth} Ar
          </Typography>
        </Grid>
      </Grid>
      <Chart {...chartData(data)} />
    </Card>
  );
};

export default BajajAreaChartCard;
