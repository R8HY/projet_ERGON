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
import FormProduit from 'ui-component/Components/Packages/CreationPackage/Forms/FormProduit';

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


function UIColor({produits, setView}) {
  const [donneesType, setDonneesType] = useState([]);
  const [donneesProduit, setDonneesProduit] = useState([]);

  // const [showFormProduit, setShowFormProduit] = useState(false);
  const [showFormPanier, setShowFormPanier] = useState(false);
  const data = produits.length!==0?produits:[];
  const [produit, setProduit] = useState({});

  useEffect(() => {
    // Define the URL for your GET request
    const apiTypeUrl = "http://127.0.0.1:8000/store/TypeProduit/";
    const apiProdUrl = "http://127.0.0.1:8000/store/Produit/";
   

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
      .then((donneesProduit) => {
        // Update the state with the fetched data
        setDonneesProduit(donneesProduit);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [data]);

  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);

  // Group produits by type_produit
  const produitsParCategorie = donneesProduit.reduce((acc, produit) => {
    const typeProduitId = produit.type_produit;
    if (!acc[typeProduitId]) {
      acc[typeProduitId] = [];
    }
    acc[typeProduitId].push(produit);
    return acc;
  }, {});

  const bgProductColor= (id) => {
    return data.filter((donnee)=>donnee.produit===id).length>0?["green","white","1"]:["white","gray","0.5"];
  };

  const handleFormPanier = (produit) => {
    setProduit(produit);
    setShowFormPanier(true);
  };

  const classedPerImage = (url) => {
    if (url === "http://127.0.0.1:8000/media/products/defaultImage.png") {
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
                      <h3>Ajout de produit</h3>
                    </Modal.Header>
                    <Modal.Body>
                      <FormProduit setShowForm={setShowFormPanier} produit={produit} settedData={data.filter((donnee)=>donnee.produit===produit.id)}/>
                    </Modal.Body>
                  </Modal>
                  <SubCard data-aos="zoom-in" title={type.categorie}>
                    <Grid container spacing={gridSpacing} style={{margin:'5px'}}>
                      {produitsParCategorie[type.id] &&
                        produitsParCategorie[type.id].map((produit) => (
                          <><Grid style={{backgroundImage:`url(${produit.image})`}} item xs={12} sm={6} md={4} lg={2} key={produit.id} className={`conteneurProduit rounded-1 ${classedPerImage(produit.image)}`} onClick={() => handleFormPanier(produit)}>
                            <ColorBox bgcolor="grey.50" data={{
                               label: produit.nomProduit,
                                prix: produit.prix_unitaire.toLocaleString()+" Ar",
                                 bgProd:bgProductColor(produit.id)[0], 
                                 colorProd:bgProductColor(produit.id)[1],
                                 opacityProd:bgProductColor(produit.id)[2]}} title="" dark />
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
