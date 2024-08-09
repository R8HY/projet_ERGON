import React, { useEffect, useState } from "react";
import { Modal, Button } from 'react-bootstrap'; 
//import FormPanier from "../Panier/FormPanier";
import CasseProduit from "../Produit/CasseProduit";
import { Grid } from '@mui/material';
import Loading from 'ui-component/Components/Loading/CylinderSpinLoader';
import AOS from 'aos';
import 'aos/dist/aos.css';
//import ListeArticle from "./ListeArticle";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

function ArticleCheckUp({id_panier}) {
  const [salleData, setSalleData] = useState([]);
  const [salles, setSalles] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Define the URL for your GET request
    const salleApiUrl = `http://127.0.0.1:8000/store/Panier/${id_panier}/salle_panier/`;

    Promise.all([fetch(salleApiUrl)])
      .then(([response1]) => Promise.all([response1.json()]))
      .then(([sd]) => {
        setSalleData(sd);
        const salleUrl = `http://127.0.0.1:8000/store/Location/Salle/`;
        Promise.all([fetch(salleUrl)])
        .then(([response1]) => Promise.all([response1.json()]))
        .then(([salle]) => {
            setSalles(salle);
            setLoading(false);
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
        });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleFormSubmitCasse = (formData) => {
    const updatedData = data.map((item, index) => {
      if (index === prodIndex) {
        item.casse = formData.quantite;
      }
      return item;
    });

    console.log(updatedData)
    setData(updatedData);
    setShowForm(false);
  };

  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);

  return (
    <Grid data-aos="zoom-in" style={{marginLeft:"5px", marginRight:"5px"}}>
        {showForm && selectedProduct && (
        <Modal show={showForm} onHide={() => setShowForm(false)} centered>
          <Modal.Header closeButton className="custom-modal-header" style={{ backgroundColor: '#3399FF', color: 'white'}}>
            <Modal.Title>Détail de casse</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <CasseProduit onSend={handleFormSubmitCasse} selectedProduct={selectedProduct}/>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowForm(false)}>Fermer</Button>
          </Modal.Footer>
        </Modal>
      )}
      {loading ? (
        <Grid container style={{transform:"translate(0%,-30%)"}}><Loading/></Grid>
      ) : (
      <Grid className="myContainer" style={{height:"320px" }}>
        {salleData.map((elem, index) => (
        <Grid  key={index}>
              <p>Etat de la salle : {'"'+salles.filter(s=>s.id===elem.salle)[0].nom+'"'}</p>
            <Grid style={{ flex: "1" }}>
              <p>nom : {'"'+salles.filter(s=>s.id===elem.salle)[0].nom+'"'}</p>
            </Grid>
        </Grid>
        
        ))}
      </Grid>)}
    </Grid>
  );
}

export default ArticleCheckUp;