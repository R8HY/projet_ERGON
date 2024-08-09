import React, {useState} from 'react';
import ListeGuest from 'ui-component/Components/Client/Lists/ListeClient';
import InfoClientele from 'ui-component/Components/Client/InfoClientele';
import { Grid } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
// import FormGuest from 'ui-component/Components/FormGuest';
// import FormGuest from 'ui-component/Components/FormGuest';

// Composant de la page
const Typography = () => {
  const [clients, setClients] = useState([]);

  return (
    <MainCard className="h-100" title="Clients">
      

      <Grid container spacing={gridSpacing}>
        <Grid item xs={12} sm={12} md={7.5} lg={7.5}>
          <ListeGuest setClients = {setClients} />
        </Grid>
        <Grid item xs={12} sm={12} md={4.5} lg={4.5}>
          <InfoClientele clients ={clients} />
        </Grid>
      </Grid>
    </MainCard>
    
  );
};

export default Typography;