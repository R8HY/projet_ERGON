import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css'
import {useParams} from 'react-router-dom'

// material-ui
import { Button, CardActions, CardContent, Grid } from '@mui/material';

// project imports
import BajajAreaChartCard from '../dashboardmain/Default/CourbeFlux';
import MainCard from 'ui-component/cards/MainCard';
import SkeletonPopularCard from 'ui-component/cards/Skeleton/PopularCard';
import { gridSpacing } from 'store/constant';
import EntreesSorties from "./EntreesSorties"

// assets
import ChevronDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import ChevronTopOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';

// ==============================|| DASHBOARD DEFAULT - POPULAR CARD ||============================== //

const PopularCard = ({ isLoading }) => {
  const params = useParams();

  const [data, setData] = useState([]);
  const [flux, setFlux] = useState([]);
  const [entreeParMois, setEntreeParMois] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [sortieParMois, setSortieParMois] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [showList, setShowList] = useState(false);

  useEffect(() => {
    // Define the URL for your GET request
    const apiUrl = `http://127.0.0.1:8000/accounts/Account/${params.id}`;
    const fluxUrl = "http://127.0.0.1:8000/accounts/Fluxcash/";

    // Make the GET request using the fetch API
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((d) => {
        // Update the state with the fetched data
        setData(d);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

      fetch(fluxUrl)
        .then((response) => {
          if (!response.ok) {
              throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((d) => {
          if(data) d=d.filter(donnees=>donnees.crediteur===data.id||donnees.debiteur===data.id)
          setFlux(d);
          if(d) {
            setEntreeParMois(getEntreeParMois(d)); 
            setSortieParMois(getSortieParMois(d));
          }
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
      });
  }, [flux]);

  const getEntreeParMois = (f) => {
    const entrees = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const fEntree = f.filter(donnees=>donnees.crediteur===data.id);
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
    const fSorties = f.filter(donnees=>donnees.debiteur===data.id);
    fSorties.forEach((transaction) => {
      const { montant, date } = transaction;
      const dateObj = new Date(date);
      const mois = dateObj.getMonth();
      sorties[mois] += montant;
    });
    return sorties;
  };

  useEffect(() => {
    AOS.init({ duration: 1500 });
  }, []);

  return (
    <>
      {isLoading ? (
        <SkeletonPopularCard />
      ) : (
        <>
            <CardContent>
              <Grid container spacing={gridSpacing}>
                <Grid item xs={12} sx={{ pt: '16px !important' }}>
                  <BajajAreaChartCard
                    entrees={entreeParMois} 
                    sorties={sortieParMois}
                  />
                </Grid>
              </Grid>
            </CardContent>
            <CardActions sx={{ justifyContent: 'space-between' }}>
              <div>
                <Button variant="contained" color="primary" 
                  sx={{ display: showList ? 'inline' : 'none', marginRight:"10px", backgroundColor:"#8bc9ff" }} size="small" disableElevation>
                  Ajouter une entrée
                </Button>
                <Button variant="contained" color="primary" 
                  sx={{ display: showList ? 'inline' : 'none' }} size="small" disableElevation>
                  Ajouter une sortie
                </Button>
              </div>
              <Button onClick={() => setShowList(!showList)} size="small" disableElevation>
                Liste des transactions
                {showList ? <ChevronTopOutlinedIcon /> : <ChevronDownOutlinedIcon />}
              </Button>
            </CardActions>
          <MainCard 
            style={{height:"100%", display:showList?"block":"none"}} 
            data-aos="zoom-in" className="mb-4" content={false}>
            <CardContent>
              <Grid container spacing={gridSpacing}>
                <Grid item xs={12}>
                  <EntreesSorties flux={flux} data={data}/>
                  </Grid>
              </Grid>
            </CardContent>
          </MainCard>
        </>
      )}
    </>
  );
};

PopularCard.propTypes = {
  isLoading: PropTypes.bool
};

export default PopularCard;
