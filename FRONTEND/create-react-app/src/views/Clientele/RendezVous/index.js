// import { styled } from '@mui/material/styles';
import { Grid } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';

// assets
import ListeRdv from 'ui-component/Components/Client/RendezVous/ListeRdv';
import FormRdv from 'ui-component/Components/Client/RendezVous/FormRdv';

const TablerIcons = () => (
  <MainCard className="h-100" title="Rendez-vous" xs={20} sm={20} md={20} lg={20}>
    <Grid container>
      <Grid item style={{ marginRight: '25px', marginTop:"25px" }} xs={12} sm={12} md={3.6} lg={3.6}>
        <FormRdv />
      </Grid>
      <Grid item data-aos="zoom-in" className="myContainer" style={{ maxHeight:"635px", overflow:"auto", marginTop:"25px" }} xs={12} sm={12} md={8.2} lg={8.2}>
        <Grid item>
          <ListeRdv/>
        </Grid>
      </Grid>
    </Grid>
  </MainCard>
);

export default TablerIcons;
