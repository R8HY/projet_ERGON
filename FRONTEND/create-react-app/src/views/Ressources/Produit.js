import PropTypes from 'prop-types';
import React, {useState, useEffect} from "react";

// material-ui
import { Box, Card, Grid, Typography, Button } from '@mui/material';
import AOS from 'aos';
import 'aos/dist/aos.css'

// project imports
import SubCard from 'ui-component/cards/SubCard';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import addImage from 'assets/images/produits/addImage.png'
import 'views/style/style.css';
import FormProduit from 'ui-component/Components/Produit/Forms/FormProduit';
import FormCategorie from 'ui-component/Components/Produit/Forms/FormCategorie';
import FormModal from 'ui-component/Components/Modals/FormModal'
// ===============================|| COLOR BOX ||=============================== //

const ColorBox = ({ title, data }) => (
  <>
    <Card sx={{ mb: 3, background: 'rgba(255, 255, 255, 0)' }}>
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

function Produit() {
  const [donneesType, setDonneesType] = useState([]);
  const [categorie, setCategorie] = useState("");
  const [donneesProduit, setDonneesProduit] = useState([]);
  const [showFormProduit, setShowFormProduit] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submittedProduit, setSubmittedProduit] = useState(false);
  const [showFormCategorie, setShowFormCategorie] = useState(false);

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
  }, []);
  //donneesType, donneesProduit
  // Group produits by type_produit
  const produitsParCategorie = donneesProduit.reduce((acc, produit) => {
    const typeProduitId = produit.type_produit;
    if (!acc[typeProduitId]) {
      acc[typeProduitId] = [];
    }
    acc[typeProduitId].push(produit);
    return acc;
  }, {});

  const handleDeleteCategorie = (categoryId) => {
    const apiUrl = `http://127.0.0.1:8000/store/TypeProduit/${categoryId}`;
  
    // Faire la requête DELETE
    fetch(apiUrl, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        // Ajoutez d'autres en-têtes si nécessaire
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        // Mettez à jour l'état ou effectuez d'autres actions si la suppression réussit
        console.log('Catégorie supprimée avec succès');
        // Vous pouvez également mettre à jour l'état pour recharger les données
      })
      .catch((error) => {
        console.error('Erreur lors de la suppression de la catégorie:', error);
      });
  };

  const handleFormProduit = (cat) => {
    setShowFormProduit(true);
    setCategorie(cat);
  };

  const handleFormCategorie = () => {
    setShowFormCategorie(true);
  };

  const classedPerImage = (url) => {
    if (url === "http://127.0.0.1:8000/media/products/defaultImage.png") {
      return "defaultBackImage";
    } else {
      return "productBackImage";
    }
  };

  const ShowProfile = (id) => {
    window.location.href = `./${id}/profile`
  };

  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);

  return (
    
    <MainCard title="PRODUITS" className="h-100">
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12}>
          {donneesType.map((type) => (
           <div key={type.id}>
            <FormModal showForm={showFormProduit} setShowForm={setShowFormProduit} onSubmit={()=>{setSubmittedProduit(true)}}>
              <FormProduit id_cat={categorie.id} submitted={submittedProduit} setSubmitted={setSubmittedProduit} categorie={categorie.categorie} />
            </FormModal>
              

              <SubCard secondary={<Button style={{color:"red", fontSize:"15px"}} onClick={() => handleDeleteCategorie(type.id)}>x</Button>} className="mb-4-none" data-aos="zoom-in" title={type.categorie}>
                <Grid container spacing={gridSpacing} style={{margin:'5px'}}>
                  {produitsParCategorie[type.id] &&
                    produitsParCategorie[type.id].map((produit) => (
                      <Grid onClick={()=>ShowProfile(produit.id)} style={{backgroundImage:`url(${produit.image})`}} item xs={12} sm={6} md={4} lg={2} key={produit.id} className={`conteneurProduit rounded-1 ${classedPerImage(produit.image)}`}>
                        <ColorBox data={{ label: produit.nomProduit, prix: produit.prix_unitaire.toLocaleString()+" Ar"}} title="" dark />
                      </Grid>
                    ))}
                    <Grid style={{backgroundImage:`url(${addImage})`}} item xs={12} sm={6} md={4} lg={2} className='ajoutProduit rounded-1 conteneurProduit btnAjoutProduit' onClick={()=>handleFormProduit(type)}>
                        <ColorBox bgcolor="grey.50" data={{ label: "", color: ""}} dark />
                    </Grid>
                </Grid>
              </SubCard>
              <br/>
            </div>
          ))}
              <FormModal showForm={showFormCategorie} setShowForm={setShowFormCategorie} onSubmit={()=>{setSubmitted(true)}}>
                <FormCategorie submitted={submitted} setSubmitted={setSubmitted}/>
              </FormModal>
          <Grid data-aos="zoom-in" style={{backgroundImage:`url(${addImage})`}} item xs={20} sm={20} md={20} lg={20} className='ajoutProduit rounded-1 btnAjoutProduit mb-4-none' onClick={handleFormCategorie}>
              <ColorBox bgcolor="grey.50" data={{ label: "", color: ""}} dark />
          </Grid>
        </Grid>
      </Grid>
    </MainCard>
  );
}

export default Produit;
