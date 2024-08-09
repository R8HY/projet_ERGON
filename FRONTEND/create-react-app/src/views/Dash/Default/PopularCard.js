import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

// material-ui
import { Grid, Typography, Button } from '@mui/material';
import { gridSpacing } from 'store/constant';

// project imports
import BajajAreaChartCard from './BajajAreaChartCard';
import MainCard from 'ui-component/cards/MainCard';

// assets
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import ChevronLeftOutlinedIcon from '@mui/icons-material/ChevronLeftOutlined';
import Loading from 'ui-component/Components/Loading/CylinderSpinLoader';

// ==============================|| DASHBOARD DEFAULT - POPULAR CARD ||============================== //

const PopularCard = ({ isLoading, setLoading }) => {
  const [accountIndex, setAccountIndex] = useState(0);
  const [selectedAccount, setSelectedAccount] = useState();
  const [showLeftChevron, setShowLeftChevron] = useState(false);
  const [showRightChevron, setShowRightChevron] = useState(false);
  const [compte, setCompte] = useState([]);
  const [flux, setFlux] = useState([]);
  const [entrees, setEntrees] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [sorties, setSorties] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);

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
      setCompte(d);
      setSelectedAccount(d[accountIndex]);
      setFlux(f);
      setLoading(false);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
  }, [compte, flux]);

  useEffect(()=>{
      
      setSelectedAccount(compte[accountIndex]);
  },[accountIndex])

  useEffect(()=>{
      if(compte.length>1&&accountIndex!=compte.length-1){
        setShowRightChevron(true);
      } 
      if(accountIndex==0){
        setShowLeftChevron(false);
      } 
      setEntrees(getEntreeParMois(flux));
      setSorties(getSortieParMois(flux));
  },[selectedAccount])

  const getEntreeParMois = (f) => {
    const entrees = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const fEntree = f.filter(donnees=>donnees.crediteur===selectedAccount.id);
    fEntree.forEach((transaction) => {
      const { montant, date } = transaction;
      const dateObj = new Date(date);
      const mois = dateObj.getMonth();
      entrees[mois] += montant;
    });
    return entrees;
  };

  const getSortieParMois = (f) => {
    const sorties = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const fSorties = f.filter(donnees=>donnees.debiteur===selectedAccount.id);
    fSorties.forEach((transaction) => {
      const { montant, date } = transaction;
      const dateObj = new Date(date);
      const mois = dateObj.getMonth();
      sorties[mois] += montant;
    });
    return sorties;
  };

  const changeAccount = (move) =>{
    if(move==="up"){
      const up = accountIndex+1;
      setAccountIndex(up);
      setShowLeftChevron(true);
      up===compte.length-1?setShowRightChevron(false):setShowRightChevron(true);
    }
    else{
      const down = accountIndex-1;
      setAccountIndex(down);
      setShowRightChevron(true);
      down===0?etShowLeftChevron(false): setShowLeftChevron(true);
    }
  }

  return (
    <>
      {isLoading ? (
        <Grid container style={{transform:"translate(0%,-30%)"}}><Loading/></Grid>
      ) : (
        <MainCard className="myContainer" content={false}>
              <Grid item xs={12}>
                <Grid container alignContent="center" justifyContent="space-between">
                  <Grid item>
                    <Typography variant="h4" style={{color:"#444"}}>Finance</Typography>
                  </Grid>
                  <Grid item>
                   <Button onClick={()=>changeAccount("down")} disabled={!showLeftChevron}>
                     <ChevronLeftOutlinedIcon style={{color:showLeftChevron?"#555":"ccc"}}/>
                   </Button>
                   <Button onClick={()=>changeAccount("up")} disabled={!showRightChevron}>
                      <ChevronRightOutlinedIcon style={{color:showRightChevron?"#555":"ccc"}}/>
                   </Button>
                    
                    
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                  <Grid item xs={12} md={6}>
                    <BajajAreaChartCard compte={selectedAccount} titre="Entrées" data={entrees}/>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <BajajAreaChartCard compte={selectedAccount} titre="Sorties" data={sorties}/>
                  </Grid>
                </Grid>
              </Grid>
          {/* <CardActions sx={{ p: 1.25, pt: 0, justifyContent: 'center' }}>
            <Button size="small" disableElevation>
              View All
              <ChevronRightOutlinedIcon />
            </Button>
          </CardActions> */}
        </MainCard>
      )}
    </>
  );
};

PopularCard.propTypes = {
  isLoading: PropTypes.bool
};

export default PopularCard;
