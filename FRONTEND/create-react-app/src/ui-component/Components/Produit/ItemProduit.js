import PropTypes from 'prop-types';
import React, { useEffect, useState } from "react";
// material-ui
import { Box, Card, Grid, Typography } from '@mui/material';

// project imports
import { gridSpacing } from 'store/constant';
import 'views/style/style.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

// ===============================|| COLOR BOX ||=============================== //

const ColorBox = ({ title, data }) => (
  <>
    <Card sx={{ mb: 3, background: 'rgba(255, 255, 255, 0)'  }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          py: 8,
          marginRight:'2px',
          backgroundSize: 'cover',
          // color: dark ? 'grey.800' : '#ffffff' //l forme anle box
        }}
      >
        {title && (
          <Typography variant="subtitle1" color="inherit">
            {title}
          </Typography> //titre ao anatiny
        )}
        {!title && <Box sx={{ p: 0.0 }} />}
      </Box>
    </Card>
    {data && data.label!=="" && (
      <Grid container justifyContent="space-between" alignItems="center" className="sousTitreProduit">
        <Grid item style={{display:'block'}}>
          <Typography variant="subtitle2" style={{color:'gray'}}>
            {data.label}<br/>
            {data.prix.toLocaleString()}
          </Typography>
        </Grid>
      </Grid>
    )}
  </>
);

ColorBox.propTypes = {
  image: PropTypes.string,
  title: PropTypes.string,
  data: PropTypes.object.isRequired,
  dark: PropTypes.bool
};

// ===============================|| UI COLOR ||=============================== //


function UIColor(props) {
  const [produit, setProduit] = useState({});
  useEffect(() => {
    const apiProdUrl = `http://127.0.0.1:8000/store/Produit/${props.id}`;

    fetch(apiProdUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((donneesProduit) => {
        setProduit(donneesProduit);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);

  const classedPerImage = (url) => {
    if (url === "http://127.0.0.1:8000/media/products/defaultImage.png") {
      return "defaultBackImage";
    } else {
      return "productBackImage";
    }
  };

  return (
      <Grid data-aos="fade-left" container spacing={gridSpacing} style={{margin:'5px'}}>
          <Grid style={{backgroundImage:`url(${produit.image})`}} item xs={12} sm={6} md={4} lg={2} key={produit.id} className={`conteneurProduit rounded-1 ${classedPerImage(produit.image)}`} onClick={() => handleFormPanier(produit)}>
            <ColorBox bgcolor="grey.50" data={{ label: produit.nomProduit, prix: produit.prix_unitaire+" Ar"}} title="" dark />
          </Grid>
      </Grid>
  );
}

export default UIColor;
