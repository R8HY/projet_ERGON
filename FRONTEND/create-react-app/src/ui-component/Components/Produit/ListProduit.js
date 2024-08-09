import PropTypes from 'prop-types';
import React, {useState, useEffect} from "react";
import {useParams} from 'react-router-dom';
// material-ui
import { Box, Card, Grid, Typography } from '@mui/material';

// project imports
import SubCard from 'ui-component/cards/SubCard';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import { Modal, Button } from 'react-bootstrap'; 
import 'views/style/style.css';
import FormPanier from 'ui-component/Components/FormPanier';

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


function UIColor() {
  const params = useParams();
  const [donneesType, setDonneesType] = useState([]);
  const [donneesProduit, setDonneesProduit] = useState([]);
  // const [showFormProduit, setShowFormProduit] = useState(false);
  const [showFormPanier, setShowFormPanier] = useState(false);
  const [data, setData] = useState([]);
  const [nomProduit, setNomProduit] = useState(""); // État pour nomProduit
  const [prixUnitaire, setPrixUnitaire] = useState("");
  const [idProduit, setIdProduit] = useState(""); // État pour prixUnitaire
  //const [panier, setPanier] = usestate("");

  useEffect(() => {
    // Define the URL for your GET request
    const apiTypeUrl = "http://127.0.0.1:8000/store/TypeProduit/";
    const apiProdUrl = "http://127.0.0.1:8000/store/Produit/";
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
      .then((donneesProduit) => {
        // Update the state with the fetched data
        setDonneesProduit(donneesProduit);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
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

  const handleFormSubmit = (formData) => {
    // Enregistrez les données dans le tableau de la page
    setData([...data, formData]);
    // Cachez le formulaire flottant
    setShowForm(false);
  };

  const handleFormPanier = (produit) => {
    setShowFormPanier(true);
    setNomProduit(produit.nomProduit);
    setPrixUnitaire(produit.prix_unitaire);
    setIdProduit(produit.id);
  };

  const classedPerImage = (url) => {
    if (url === "http://127.0.0.1:8000/media/products/defaultImage.png") {
      return "defaultBackImage";
    } else {
      return "productBackImage";
    }
  };

  return (
    <MainCard title="Remplir un panier" 
        secondary={
            <button className='btn btn-success' onClick={()=>{window.location.href=`../${params.idPanier}/articles`}}>
              Voir le contenue du panier
            </button>
          }>
          <Grid container spacing={gridSpacing}>
          <Grid item xs={12}>
              {donneesType.map((type) => (
                <div key={type.id}>
    
                  <Modal show={showFormPanier} onHide={() => setShowFormPanier(false)} centered>
                    <Modal.Header closeButton className="custom-modal-header" style={{ backgroundColor: '#3399FF', color: 'white' }}>
                      <Modal.Title>Nouveau produit</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <FormPanier onSubmit={handleFormSubmit} idProduit={idProduit} id_panier={params.idPanier} nomProduit={nomProduit} prix_unitaire={prixUnitaire}/>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={() => setShowFormPanier(false)}>Fermer</Button>
                    </Modal.Footer>
                  </Modal>
                  <SubCard title={type.categorie}>
                    <Grid container spacing={gridSpacing} style={{margin:'5px'}}>
                      {produitsParCategorie[type.id] &&
                        produitsParCategorie[type.id].map((produit) => (
                          <Grid style={{backgroundImage:`url(${produit.image})`}} item xs={12} sm={6} md={4} lg={2} key={produit.id} className={`conteneurProduit rounded-1 ${classedPerImage(produit.image)}`} onClick={() => handleFormPanier(produit)}>
                            <ColorBox bgcolor="grey.50" data={{ label: produit.nomProduit, prix: produit.prix_unitaire.toLocaleString()+" Ar"}} title="" dark />
                          </Grid>
                        ))}
                    </Grid>
                  </SubCard>
                  <br/>
                </div>
              ))}
          </Grid>
        </Grid>
      </MainCard>
  );
}

export default UIColor;
