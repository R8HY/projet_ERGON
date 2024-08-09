import { useState, useEffect } from 'react';

// material-ui
import { Grid } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import ListeRdv from 'ui-component/Components/DashBoard/ListeRdv';
import ListePayement from 'ui-component/Components/DashBoard/ListePayement';
import ListeEvent from 'ui-component/Components/DashBoard/ListeEvent';

// project imports
// import EarningCard from './EarningCard';
import PopularCard from './PopularCard';
// import TotalOrderLineChartCard from './TotalOrderLineChartCard';
// import TotalIncomeDarkCard from './TotalIncomeDarkCard';
// import TotalIncomeLightCard from './TotalIncomeLightCard';
import TotalGrowthBarChart from './TotalGrowthBarChart';
import { gridSpacing } from 'store/constant';
import AOS from 'aos';
import 'aos/dist/aos.css'

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({ duration: 1500 });
  }, []);


  return (
    <MainCard title="Dashboard" className="h-100">
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12}>
            <Grid container spacing={gridSpacing}>
              <Grid item xs={12} md={7}>
                <Grid data-aos="zoom-in" item xs={12} md={12} className="mb-3">
                  <PopularCard setLoading={setLoading} isLoading={isLoading} />
                </Grid>
                <Grid data-aos="zoom-in" item xs={12} md={12}>
                  <TotalGrowthBarChart isLoading={isLoading} />              
                </Grid>
              </Grid>
              <Grid item xs={12} sm={12} md={5} lg={5}>
                <Grid data-aos="zoom-in" container className="h-100 mb-3 d-flex">
                  <div className="myContainer mb-3" style={{width:"100%", fontSize:"14px"}}>
                      <span style={{fontWeight:"bold"}}>Rendez-vous </span>
                      <ListeRdv/>
                  </div>
                  <div className="myContainer mb-3" style={{width:"100%", fontSize:"14px"}}>
                    <span style={{fontWeight:"bold"}}>Evènements </span>
                      <ListeEvent/>
                  </div>
                  <div className="myContainer mb-3" style={{width:"100%", fontSize:"14px"}}>
                    <span style={{fontWeight:"bold"}}>Payements </span>
                      <ListePayement/>
                  </div>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          {/* <Grid item xs={12}>
            <Grid container spacing={gridSpacing}>
              <Grid item lg={4} md={6} sm={6} xs={12}>
                <EarningCard isLoading={isLoading} />
              </Grid>
              <Grid item lg={4} md={6} sm={6} xs={12}>
                <TotalOrderLineChartCard isLoading={isLoading} />
              </Grid>
              <Grid item lg={4} md={12} sm={12} xs={12}>
                <Grid container spacing={gridSpacing}>
                  <Grid item sm={6} xs={12} md={6} lg={12}>
                    <TotalIncomeDarkCard isLoading={isLoading} />
                  </Grid>
                  <Grid item sm={6} xs={12} md={6} lg={12}>
                    <TotalIncomeLightCard isLoading={isLoading} />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid> */}
        </Grid>
    </MainCard>
    
  );
};

export default Dashboard;
