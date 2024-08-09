// import PropTypes from 'prop-types';
// import React, { useState } from "react";
// // material-ui
// import { Button, Box, Card, Grid, Typography } from '@mui/material';

// // project imports
// import MainCard from 'ui-component/cards/MainCard';
// //import {useParams} from 'react-router-dom';
// //import SecondaryAction from 'ui-component/cards/CardSecondaryAction';
// import { gridSpacing } from 'store/constant';
// import ListeClient from 'ui-component/Components/SelectableLists/Client';
// import ListePackage from 'ui-component/Components/SelectableLists/Package';
// import CreatePackage from 'ui-component/Components/Packages/CreationPackage/index';
// import FinalForm from './Forms/Finalisation';

// // ===============================|| COLOR BOX ||=============================== //

// const ColorBox = ({ title, data, image }) => (
//   <>
//     <Card sx={{ mb: 3 }}>
//       <Box
//         sx={{
//           backgroundImage: `url(${image})`,
//           display: 'flex',
//           justifyContent: 'center',
//           alignItems: 'center',
//           py: 4.5,
//           backgroundSize: 'cover',
//           // color: dark ? 'grey.800' : '#ffffff' //l forme anle box
//         }}
//       >
//         {title && (
//           <Typography variant="subtitle1" color="inherit">
//             {title}
//           </Typography> //titre ao anatiny
//         )}
//         {!title && <Box sx={{ p: 1.15 }} />}
//       </Box>
//     </Card>
//     {data && (
//       <Grid container justifyContent="space-between" alignItems="center">
//         <Grid item>
//           <Typography variant="subtitle2">{data.label}</Typography>
//         </Grid>
//         <Grid item>
//           <Typography variant="subtitle1">
//             {data.color}
//           </Typography>
//         </Grid>
//       </Grid>
//     )} {/* l donnees info eo ambany*/}
//   </>
// );

// ColorBox.propTypes = {
//   image: PropTypes.string,
//   title: PropTypes.string,
//   data: PropTypes.object.isRequired,
//   dark: PropTypes.bool
// };

// // ===============================|| UI COLOR ||=============================== //


// function UIColor() {
//   const [currentStep, setCurrentStep] = useState(0);
//   const [currentPackStep, setCurrentPackStep] = useState(0);
//   const [disableNextButton, setDisableNextButton] = useState(true);
//   const [personnalisationPackage, setPersonnalisationPackage] = useState(false);
//   const [packagePersonnalized, setPackagePersonnalized] = useState(false);

//   const [vars, setVars] = useState({
//     client: false,
//     package:false,
//   });

//   const steps = [
//     "client",
//     "package",
//     "formulaire",
//   ];

//   const packSteps = [
//     "choix-salle",
//     "choix-produits",
//     "choix-decorations",
//     "formulaire",
//   ];

//   const next = () => {
//     setDisableNextButton(vars[steps[currentStep+1]]===false);
//     if(packagePersonnalized && steps[currentStep+1]==="package") setPersonnalisationPackage(true);
//     setCurrentStep(currentStep + 1);
//   };

//   const previous = () => {
//     setDisableNextButton(vars[steps[currentStep-1]]===false);
//     if(packagePersonnalized && steps[currentStep-1]==="package") setPersonnalisationPackage(true);
//     setCurrentStep(currentStep - 1);
//   };

//   const nextPackStep = () => {
//     if(currentPackStep+1===packSteps.length) {
//       setPersonnalisationPackage(false);
//       next();
//     }
//     else setCurrentPackStep(currentPackStep + 1);
//   };

//   const previousPackStep = () => {
//     if(currentPackStep-1===-1) {
//       setPersonnalisationPackage(false);
//       previous();
//     }
//     else setCurrentPackStep(currentPackStep - 1);
//   };

//   const initVar = (value) => {
//     setVars(vars);
//     vars[steps[currentStep]] = value;
//     setDisableNextButton(vars[steps[currentStep]]===false);
//     console.log(vars.package);
//   }

//   const changePersonnalisationState = () => {
//     setPersonnalisationPackage(!personnalisationPackage);
//     setPackagePersonnalized(!packagePersonnalized);
//   }

//   return (
//     <MainCard
//       title={`Evenement > creation > ${currentStep!==2?"choix-":""}${steps[currentStep]} ${personnalisationPackage?` > personnalisation > ${packSteps[currentPackStep]}`:""} `}
//       className="h-100"
//       secondary={
//         steps[currentStep] === "package" ? ( 
//           <Button size="sm" className="mt-2" onClick={()=>changePersonnalisationState()}>
//             {!personnalisationPackage?"package personnalisé":"package par défaut"}
//           </Button>) :<></>
//       }
//     >
//       {
//         !personnalisationPackage?
//         (<Grid container spacing={gridSpacing}>
//           <Grid item xs={12}>
//             {steps[currentStep] === "client" ? (<ListeClient setClient={initVar} client={vars.client}/>) : <></>}
//             {steps[currentStep] === "package" ? (<ListePackage setPackage={initVar} packParam={vars.package}/>) : <></>}
//             {steps[currentStep] === "formulaire" ? (<FinalForm/>) : <></>}
  
//             <div style={{position:"fixed", bottom:"5%", right:"5%"}} >
//               {currentStep > 0 && (
//               <Button style={{marginRight:"10px"}}  variant="contained" color="primary" onClick={previous}>
//                 Précédent
//               </Button>
//               )}
//               {currentStep < steps.length - 1 && (
//                 <Button  variant="contained" color="primary" onClick={next} disabled={disableNextButton}>
//                   Suivant
//                 </Button>
//               )}
//               {currentStep === steps.length - 1 && (
//                 <Button  variant="contained" color="primary" onClick={next} disabled={disableNextButton}>
//                   Confirmer
//                 </Button>
//               )}
//             </div>
  
//           </Grid>
//         </Grid>):(<CreatePackage step={currentPackStep} setPackage={initVar} packProps={vars.package} nextPackStep={nextPackStep} previousPackStep={previousPackStep}/>)
//       }
      
//     </MainCard>
//   );
// }

// export default UIColor;

import PropTypes from 'prop-types';
import React, {useState, useEffect} from "react";
// material-ui
import { Button, Box, Card, Grid, Typography } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
//import {useParams} from 'react-router-dom';
//import SecondaryAction from 'ui-component/cards/CardSecondaryAction';
import { gridSpacing } from 'store/constant';
// import ListeClient from 'ui-component/Components/SelectableLists/Client';
// import ListePackage from 'ui-component/Components/SelectableLists/Package';
// import CreatePackage from 'ui-component/Components/Packages/CreationPackage/index';
import FinalForm from './Forms/Finalisation';
import axios from 'axios';
//import Produit from 'views/titan/Inventaire/Produit';

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
  // const [currentStep, setCurrentStep] = useState(0);
  // // const [currentPackStep, setCurrentPackStep] = useState(0);
  // const [disableNextButton, setDisableNextButton] = useState(true);
  // const [personnalisationPackage, setPersonnalisationPackage] = useState(false);
  // const [packagePersonnalized, setPackagePersonnalized] = useState(false);
  //const [choixProduit, setChoixProduit] = useState(false);
  // const [formulaire, setFormulaire] = useState(false)

  // const [vars, setVars] = useState({
  //   // client: false,
  //   // package:false,
  //   produit:false
  // });

  // const steps = [
  //   // "client",
  //   // "package",
  //   "formulaire",
  //   "produit",
  // ];

  // const packSteps = [
  //   // "choix-salle",
  //   // "choix-produits",
  //   // "choix-decorations",
    
  // ];

  // const next = () => {
  //   setDisableNextButton(vars[steps[currentStep+1]]===false);
  //   if(formulaire && steps[currentStep+1]==="formulaire") setFormulaire(true);
  //   setCurrentStep(currentStep + 1);
  // };

  // const previous = () => {
  //   setDisableNextButton(vars[steps[currentStep-1]]===false);
  //   if(formulaire && steps[currentStep-1]==="formulaire") setFormulaire(true);
  //   setCurrentStep(currentStep - 1);
  // };

  // const nextPackStep = () => {
  //   if(currentPackStep+1===packSteps.length) {
  //     setPersonnalisationPackage(false);
  //     next();
  //   }
  //   else setCurrentPackStep(currentPackStep + 1);
  // };

  // const previousPackStep = () => {
  //   if(currentPackStep-1===-1) {
  //     setPersonnalisationPackage(false);
  //     previous();
  //   }
  //   else setCurrentPackStep(currentPackStep - 1);
  // };

  // const initVar = (value) => {
  //   setVars(vars);
  //   vars[steps[currentStep]] = value;
  //   setDisableNextButton(vars[steps[currentStep]]===false);
  //   console.log(vars.produit);
  // }

  // const changePersonnalisationState = () => {
  //   setChoixProduit(!setChoixProduit);
  //   // setPackagePersonnalized(!packagePersonnalized);
  // }
  const [data, setData] = useState([]);
  useEffect(() => {
    // Define the URL for your GET request
    const apiUrl = `http://127.0.0.1:8000/store/Panier/`;

    // Make the GET request using the fetch API
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // Update the state with the fetched data
        setData(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const createPanier = (id) =>{
    const urlPanier = 'http://127.0.0.1:8000/store/Panier/';

    const dataPanier = {client:id};

    axios.post(urlPanier, dataPanier)
    .then(response => {
      // Gérez la réponse ou effectuez une action en cas de succès
      const panierId = response.data.id;
      console.log("Ajout réussi", panierId);
      window.location.replace(`paniers/${panierId}/articles`)
    })
    .catch(error => {
      // Gérez les erreursc()
      console.error("Erreur lors de l'ajout", error);
    });
  }

  return (
    <MainCard
    // title={`Evenement > creation > ${currentStep!==2?"choix-":""} `}
    title={"Formulaire"}
      className="h-100"
      // secondary={
      //   steps[currentStep] === "package" ? ( 
      //     <Button size="sm" className="mt-2" onClick={()=>changePersonnalisationState()}>
      //       {!personnalisationPackage?"package personnalisé":"package par défaut"}
      //     </Button>) :<></>
      // }
    >
      {/* {
        !personnalisationPackage?
        ( */}
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12}>
            {/* {steps[currentStep] === "client" ? (<ListeClient setClient={initVar} client={vars.client}/>) : <></>}
            {steps[currentStep] === "package" ? (<ListePackage setPackage={initVar} packParam={vars.package}/>) : <></>} */}
            {/* {steps[currentStep] === "formulaire" ? (<FinalForm/>) : <></>} */}
            <FinalForm/>
            {/* {steps[currentStep] === "produit" ? (<Produit setPackage={initVar} packParam={vars.package}/>) : <></>} */}
  
            <div style={{position:"fixed", bottom:"5%", right:"5%"}} >
              {/* {currentStep > 0 && (
              <Button style={{marginRight:"10px"}}  variant="contained" color="primary" onClick={previous}>
                Précédent
              </Button>
              )} */}
              {/* {currentStep < steps.length - 1 && ( */}
                <Button  variant="contained" color="primary" onClick={()=>createPanier(data.id)}>
                  Suivant
                </Button>
              {/*  */}
              {/* {currentStep === steps.length - 1 && (
                <Button  variant="contained" color="primary" onClick={next} disabled={disableNextButton}>
                  Confirmer
                </Button>
              )} */}
            </div>
            {/* `./paniers/${data.id}/remplir` */}
          </Grid>
        </Grid>
      {/* //   ):(<CreatePackage step={currentPackStep} setPackage={initVar} packProps={vars.package} nextPackStep={nextPackStep} previousPackStep={previousPackStep}/>)
      // } */}
      
    </MainCard>
  );
}

export default UIColor;