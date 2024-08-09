import PropTypes from 'prop-types';
import React from "react";
// material-ui
import { Box, Card, Grid, Typography } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
//import {useParams} from 'react-router-dom';
//import SecondaryAction from 'ui-component/cards/CardSecondaryAction';
import { gridSpacing } from 'store/constant';
import ListeSalle from 'ui-component/Components/Salle/ListeSalle';

// ===============================|| COLOR BOX ||=============================== //

const ColorBox = ({ title, data, image }) => (
  <>
    <Card sx={{ mb: 3 }}>
      <Box
        sx={{
          backgroundImage: `url(${image})`,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          py: 4.5,
          backgroundSize: 'cover',
          // color: dark ? 'grey.800' : '#ffffff' //l forme anle box
        }}
      >
        {title && (
          <Typography variant="subtitle1" color="inherit">
            {title}
          </Typography> //titre ao anatiny
        )}
        {!title && <Box sx={{ p: 1.15 }} />}
      </Box>
    </Card>
    {data && (
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography variant="subtitle2">{data.label}</Typography>
        </Grid>
        <Grid item>
          <Typography variant="subtitle1">
            {data.color}
          </Typography>
        </Grid>
      </Grid>
    )} {/* l donnees info eo ambany*/}
  </>
);

ColorBox.propTypes = {
  image: PropTypes.string,
  title: PropTypes.string,
  data: PropTypes.object.isRequired,
  dark: PropTypes.bool
};

// ===============================|| UI COLOR ||=============================== //


function UIColor() {

  return (
    <MainCard title="Salles" className="h-100">
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12}>
            <ListeSalle/>
          </Grid>
        </Grid>
      </MainCard>
  );
}

export default UIColor;
