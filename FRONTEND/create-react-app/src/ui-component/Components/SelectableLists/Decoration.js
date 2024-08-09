import PropTypes from 'prop-types';
import React, {useState, useEffect} from "react";
// material-ui
import { Box, Card, Grid, Typography, Button } from '@mui/material';
import { IconChecks } from '@tabler/icons';
import AOS from 'aos';
import 'aos/dist/aos.css';

// project imports
import SubCard from 'ui-component/cards/SubCard';
import { gridSpacing } from 'store/constant';
import { Modal } from 'react-bootstrap'; 
import 'views/style/style.css';
import FormDecoration from 'ui-component/Components/Packages/CreationPackage/Forms/FormDecoration';

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
      <Grid container justifyContent="space-between" alignItems="center" className="sousTitreProduit" style={{
          backgroundColor:data.bgProd,
          opacty:data.opacityProd,
          witdh:"100%"
        }}>
        <Grid item style={{display:'block', witdh:"100%"}}>
          <Typography variant="subtitle2" style={{color:data.colorProd}}>
            {data.label}<br/>
            {data.prix.toLocaleString()}
          </Typography>
        </Grid>
        {
          data.colorProd==="white"?
        (<p style={{float:"right", display:"flex", color:"white", fontSize:"15px", fontWeight:"bold"}}><IconChecks/></p>):
            (<></>)
        }
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


function UIColor({decorations, setView}) {
  const [donneesType, setDonneesType] = useState([]);
  const [donneesDecoration, setDonneesDecoration] = useState([]);

  // const [showFormdecoration, setShowFormdecoration] = useState(false);
  const [showFormPanier, setShowFormPanier] = useState(false);
  const data = decorations.length!==0?decorations:[];
  const [decoration, setDecoration] = useState({});

  useEffect(() => {
    // Define the URL for your GET request
    const apiTypeUrl = "http://127.0.0.1:8000/store/Location/TypeDeco/";
    const apiProdUrl = "http://127.0.0.1:8000/store/Location/Decoration/";
    //const apiPanierUrl = "http://127.0.0.1:8000/store/Panier/";
   

    // Make the GET request using the fetch API
    fetch(apiTypeUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((donneesType) => {
        // Update the state with the fetched data
        setDonneesType(donneesType);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

    fetch(apiProdUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((donneesDecoration) => {
        // Update the state with the fetched data
        setDonneesDecoration(donneesDecoration);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);

  // Group decorations by type_decoration
  const decorationsParCategorie = donneesDecoration.reduce((acc, decoration) => {
    const typeDecorationId = decoration.id;
    if (!acc[typeDecorationId]) {
      acc[typeDecorationId] = [];
    }
    acc[typeDecorationId].push(decoration);
    return acc;
  }, {});

  const bgProductColor= (id) => {
    return data.filter((donnee)=>donnee.decoration===id).length>0?["green","white","1"]:["white","gray","0.5"];
  };

  const handleFormPanier = (decoration) => {
    setDecoration(decoration);
    setShowFormPanier(true);
  };

  const classedPerImage = (url) => {
    if (url === "http://127.0.0.1:8000/media/decorations/defaultImage.png") {
      return "defaultBackImage";
    } else {
      return "productBackImage";
    }
  };

  return (
          <Grid container spacing={gridSpacing}>
          <Grid item xs={12}>
              {donneesType.map((type) => (
                <div key={type.id}>
    
                  <Modal show={showFormPanier} onHide={() => setShowFormPanier(false)} centered>
                    <Modal.Header>
                      <h3>Ajout de decoration</h3>
                    </Modal.Header>
                    <Modal.Body>
                      <FormDecoration setShowForm={setShowFormPanier} decoration={decoration} settedData={data.filter((donnee)=>donnee.decoration===decoration.id)}/>
                    </Modal.Body>
                  </Modal>
                  <SubCard data-aos="zoom-in" title={type.titre}>
                    <Grid container spacing={gridSpacing} style={{margin:'5px'}}>
                      {decorationsParCategorie[type.id] &&
                        decorationsParCategorie[type.id].map((decoration) => (
                          <><Grid style={{backgroundImage:`url(${decoration.image})`}} item xs={12} sm={6} md={4} lg={2} key={decoration.id} className={`conteneurProduit rounded-1 ${classedPerImage(decoration.image)}`} onClick={() => handleFormPanier(decoration)}>
                            <ColorBox bgcolor="grey.50" data={{
                               label: decoration.nom,
                                prix: decoration.prix_unitaire.toLocaleString()+" Ar",
                                 bgProd:bgProductColor(decoration.id)[0], 
                                 colorProd:bgProductColor(decoration.id)[1],
                                 opacityProd:bgProductColor(decoration.id)[2]}} title="" dark />
                          </Grid>
                          <input className="form-check-input" type="checkbox" value="" style={{float:"right", width:"20px", height:"20px", display:"none"}}/></>
                          
                        ))}
                    </Grid>
                  </SubCard>
                  <br/>
                </div>
              ))}
             
            <div style={{position:"fixed", right:"50px", bottom:"40px"}}>
              <Button variant="outlined" color="primary" style={{marginLeft:"10px"}} onClick={()=>setView("main")}>Retour</Button>
            </div>
            
          </Grid>
        </Grid>
  );
}

export default UIColor;
