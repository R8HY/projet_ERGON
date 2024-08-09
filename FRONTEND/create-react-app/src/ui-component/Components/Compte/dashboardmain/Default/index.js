import { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css'

// material-ui
import { Grid, Button } from '@mui/material';
// project imports
import SoldeEntree from './SoldeEntree';
import SoldeSortie from './SoldeSortie';
// import TotalIncomeDarkCard from './TotalIncomeDarkCard';
// import TotalIncomeLightCard from './TotalIncomeLightCard';
import ListeCompte from '../../Lists/ListeCompte';
import CourbeSolde from './CourbeSolde';
import { gridSpacing } from 'store/constant';
import PerfectScrollbar from 'react-perfect-scrollbar/';
import 'react-perfect-scrollbar/dist/css/styles.css';
import addImage from 'assets/images/produits/addImage.png'

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);
  const [data, setData] = useState([]);
  const [flux, setFlux] = useState([]);
  const [selectedData, setSelectedData] = useState({});
  const [showScrollBar, setShowScrollBar] = useState(false);
  

  useEffect(() => {
    // Define the URL for your GET request
    const apiUrl = "http://127.0.0.1:8000/accounts/Account/";
    const fluxUrl = "http://127.0.0.1:8000/accounts/Fluxcash/";

    // Make the GET request using the fetch API
    Promise.all([fetch(apiUrl),fetch(fluxUrl)])
    .then(([response1, response2]) => Promise.all([
      response1.json(), response2.json()
    ]))
    .then(([d, f]) => {
      setData(d);
      if(d)setSelectedData(d[0]);
      setFlux(f);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
  }, []);

  useEffect(() => {
    AOS.init({ duration: 1500 });
  }, []);

  const setShowEntree = (id) =>{
    window.location.href = `./comptes/${id}/entrees`;
  }

  const setShowSortie = (id) =>{
    window.location.href = `./comptes/${id}/sorties`;
  }

  return (
    <Grid container spacing={gridSpacing}>
        <>
          <Grid item lg={8.5} xs={20} md={20} sm={20}>
            <Grid container spacing={gridSpacing}>
              <Grid item lg={6} md={20} sm={12} xs={12}>
                <SoldeEntree flux={flux} setFlux={setFlux} setShowEntree={setShowEntree} data={selectedData} isLoading={isLoading} />
              </Grid>
              <Grid item lg={6} md={12} sm={12} xs={12}>
                <SoldeSortie  flux={flux} setFlux={setFlux} setShowSortie={setShowSortie} data={selectedData} isLoading={isLoading} />
              </Grid>
              <Grid item xs={20} s={20} md={20}>
                <Grid container spacing={gridSpacing}>
                  <Grid item lg={16} md={20} sm={20} xs={20}>
                    <CourbeSolde flux={flux} setFlux={setFlux} data={selectedData} isLoading={isLoading} />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            data-aos="zoom-in"
            className="mb-4-none"
            style={{
              border:"solid whitesmoke 1px",
              borderRadius: "20px",
              margin: "15px 0 0 12px",
              backgroundColor:"rgb(250,250,255)",
              witdh:"90%"
            }}
            item lg={3.4} xs={12} md={12} sm={12}
          >
            <Grid container spacing={gridSpacing}>
              <Grid item
                style={{
                  overflowY: showScrollBar?"auto":"hidden",
                  margin: "5px 0 0 0",
                  width:"100%"
                }}
                onMouseOver={()=>setShowScrollBar(true)}
                onMouseOut={()=>setShowScrollBar(false)}
              >
                <PerfectScrollbar
                  component="div"
                  style={{
                    paddingLeft: '16px',
                    paddingRight: '16px',
                  }}
                >
                  <Grid item lg={12} md={20} sm={20} xs={20}>
                    <Grid container spacing={gridSpacing}>
                      <ListeCompte selectedData={selectedData} setSelectedData={setSelectedData} accounts={data} isLoading={isLoading}/>
                    </Grid>
                  </Grid>
                </PerfectScrollbar>
              </Grid>
            </Grid>
              <Grid item lg={12} md={20} sm={20} xs={20}>
                <Grid container spacing={gridSpacing}>
                  <Button className="btnAjoutAccount mb-4-none">
                    <img src={addImage} style={{width:"20px"}} alt="Ajouter un compte"></img>
                  </Button>
              </Grid>
            </Grid>
          </Grid>
        </>
    </Grid>
  );
};

export default Dashboard;
