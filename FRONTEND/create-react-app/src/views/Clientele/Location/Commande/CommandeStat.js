import React from 'react';
import ListeStatCommande from 'ui-component/Components/Commande/Stats/ListeStatCommande';
import InfoCommande from 'ui-component/Components/Commande/Stats/InfoCommande';
import { Grid } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
// import FormGuest from 'ui-component/Components/FormGuest';
// import FormGuest from 'ui-component/Components/FormGuest';

// Composant de la page
const Typography = () => {

  return (
    <MainCard className="h-100" title="Clients">
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12} sm={12} md={7} lg={7}>
          <InfoCommande/>
        </Grid>
        <Grid item xs={12} sm={12} md={5} lg={5}>
          <ListeStatCommande />
        </Grid>
      </Grid>
    </MainCard>
    
  );
};

export default Typography;
