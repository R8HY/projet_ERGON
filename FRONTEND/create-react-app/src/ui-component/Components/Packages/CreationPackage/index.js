import PropTypes from 'prop-types';
import React, { useState } from "react";
// material-ui
import { Button, Box, Card, Grid, Typography } from '@mui/material';

// project imports
//import {useParams} from 'react-router-dom';
//import SecondaryAction from 'ui-component/cards/CardSecondaryAction';
import { gridSpacing } from 'store/constant';
import ListeSalle from 'ui-component/Components/SelectableLists/Salle';
import ListeDeco from 'ui-component/Components/SelectableLists/Decoration';
import ListeProduit from 'ui-component/Components/SelectableLists/Produit';
import FinalForm from './Forms/Finalisation';

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


function UIColor(props) {
  const [currentStep, setCurrentStep] = useState(props.step?props.step:0);
  const [disableNextButton, setDisableNextButton] = useState(true);

  const [vars, setVars] = useState({
    salle: (props.packProps!==false ? props.packProps.salle : false),
    produits: (props.packProps!==false ? props.packProps.produits : []),
    decorations: (props.packProps!==false ? props.packProps.decorations : []),
  });

  const steps = [
    "salle",
    "produits",
    "decorations",
    "formulaire",
  ];

  const next = () => {
    if (currentStep < steps.length - 1) {
      setDisableNextButton(vars[steps[currentStep+1]]===false);
      setCurrentStep(currentStep + 1);
    }
    props.nextPackStep();
  };

  const previous = () => {
    if (currentStep > 0) {
      setDisableNextButton(vars[steps[currentStep-1]]===false);
      setCurrentStep(currentStep - 1);
    }
    props.previousPackStep();
  };

  const initVar = (value) => {
    setVars(vars);
    vars[steps[currentStep]] = value;
    setDisableNextButton(vars[steps[currentStep]]===false);
    console.log(vars);
  }

  const confirm = () => {
    props.setPackage(vars)
    props.nextPackStep();
  }

  return (
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12}>
          {steps[currentStep] === "salle" ? (<ListeSalle setSalle={initVar} salle={vars.salle}/>) : <></>}
          {steps[currentStep] === "produits" ? (<ListeProduit setProduits={initVar} produits={vars.produits}/>) : <></>}          
          {steps[currentStep] === "decorations" ? (<ListeDeco setDecorations={initVar} decorations={vars.decorations}/>) : <></>}
          {steps[currentStep] === "formulaire" ? (<FinalForm/>) : <></>}

          <div style={{position:"fixed", bottom:"5%", right:"5%"}} >
            {currentStep > 0 && (
            <Button style={{marginRight:"10px"}}  variant="contained" color="primary" onClick={previous}>
              Précédent
            </Button>
            )}
            {currentStep < steps.length - 1 && (
              <Button  variant="contained" color="primary" onClick={next} disabled={disableNextButton}>
                Suivant
              </Button>
            )}
            {currentStep === steps.length - 1 && (
              <Button onClick={()=>confirm()} variant="contained" color="primary">
                Confirmer
              </Button>
            )}
          </div>

        </Grid>
      </Grid>
  );
}

export default UIColor;