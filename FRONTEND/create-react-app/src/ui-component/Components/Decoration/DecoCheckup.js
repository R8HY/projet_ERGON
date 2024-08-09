import React, { useEffect, useState } from "react";
import { Modal, Button } from 'react-bootstrap'; 
//import FormPanier from "../Panier/FormPanier";
import CasseProduit from "../Produit/CasseProduit";
import { Grid } from '@mui/material';
//import ListeArticle from "./ListeArticle";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

function ArticleCheckUp({id_panier}) {
  const [data, setData] = useState([]);
  const [decoData, setDecoData] = useState([]);
  const [salleData, setSalleData] = useState([]);
  const [checkedItems, setCheckedItems] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [prodIndex, setProdIndex] = useState(0);

  // const handleFormSubmit = (formData) => {
  //   // Enregistrez les données dans le tableau de la page
  //   setData([...data, formData]);
  //   // Cachez le formulaire flottant
  //   setShowForm(false);
  // };

  const handleIncompleteButtonClick = (index) => {
    const selected = data[index];
    setSelectedProduct(selected);
    setProdIndex(index);
    setShowForm(true);
    handleProductSelect(selected);
  };

  useEffect(() => {
    // Define the URL for your GET request
    const apiUrl = `http://127.0.0.1:8000/store/Panier/${id_panier}/article_panier/`;
    const salleApiUrl = `http://127.0.0.1:8000/store/Panier/${id_panier}/salle_panier/`;
    const decoApiUrl = `http://127.0.0.1:8000/store/Panier/${id_panier}/decoration_panier/`;

    Promise.all([fetch(apiUrl), fetch(salleApiUrl), fetch(decoApiUrl)])
      .then(([response1, response2, response3]) => Promise.all([response1.json(), response2.json(), response3.json()]))
      .then(([artData, salleData, decoData]) => {
        setData(artData);
        setSalleData(salleData);
        setDecoData(decoData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  console.log(data)

  const handleCheckboxChange = (index) => {
    const updatedCheckedItems = {
      ...checkedItems,
      [index]: !checkedItems[index],
    };
    setCheckedItems(updatedCheckedItems);
  };

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

  const handleProductSelect = (product) => {
    setSelectedProduct(product);
  };

  return (
    <Grid className="w-100">
        {showForm && selectedProduct && (
        <Modal show={showForm} onHide={() => setShowForm(false)} centered>
          <Modal.Header closeButton className="custom-modal-header" style={{ backgroundColor: '#3399FF', color: 'white' }}>
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

      <Grid className="myContainer">
      {data.map((elem, index) => (
        <Grid  key={index}>
        <Grid
          style={{
            textAlign: "left",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            marginBottom: "10px",
            backgroundColor: "#f9f9f9",
          }}
        >
          <Grid style={{ flex: "1" }}>
            <p
              style={{
                textDecoration: checkedItems[index] ? "line-through" : "none",
              }}
            >
              {elem.quantite} - {elem.nomP}
            </p>
          </Grid>
          
          <Grid style={{ flex: "0 0 auto", right:'20px'}}>
          <input
              type="checkbox"
              checked={checkedItems[index]}
              onChange={() => handleCheckboxChange(index, "produit")}
            />
          </Grid>
          <Grid style={{ marginLeft: '20px' }}>
          <Button
              className="btn btn-danger"
              style={{ fontSize: '10px', padding: '5px 10px'}}
              onClick={() => handleIncompleteButtonClick(index, "produit")}>
              Incomplet
            </Button>
          </Grid>
        </Grid>
      </Grid>
        
      ))}
      {decoData.map((elem, index) => (
        <Grid  key={index}>
        <Grid
          style={{
            textAlign: "left",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            marginBottom: "10px",
            backgroundColor: "#f9f9f9",
          }}
        >
          <Grid style={{ flex: "1" }}>
            <p
              style={{
                textDecoration: checkedItems[index] ? "line-through" : "none",
              }}
            >
              {elem.quantite} - {elem.nomDecoration}
            </p>
          </Grid>
          
          <Grid style={{ flex: "0 0 auto", right:'20px'}}>
          <input
              type="checkbox"
              checked={checkedItems[index]}
              onChange={() => handleCheckboxChange(index, "decoration")}
            />
          </Grid>
          <Grid style={{ marginLeft: '20px' }}>
          <Button
              className="btn btn-danger"
              style={{ fontSize: '10px', padding: '5px 10px'}}
              onClick={() => handleIncompleteButtonClick(index, "decoration")}>
              Incomplet
            </Button>
          </Grid>
        </Grid>
        </Grid>
        
      ))}
      </Grid>
      <Grid>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">PRODUIT</th>
            <th scope="col">QUANTITE RENDU</th>
            <th scope="col">CASSE</th>
          </tr>
        </thead>
        <tbody>
          {data.map((elem, index) => (
            <tr key={index}>
              <td>{elem.nomP}</td>
              <td>
              {/* Vérification pour afficher la valeur de Quantité Louée ou Rendue */}
              {checkedItems[index] ? <span>{elem.quantite}</span> : null}
              </td>
              <td>{selectedProduct && selectedProduct.casse?selectedProduct.casse:""}</td>
            </tr>
          ))}
          {decoData.map((elem, index) => (
            <tr key={index}>
              <td>{elem.nomDecoration}</td>
              <td>
              {/* Vérification pour afficher la valeur de Quantité Louée ou Rendue */}
              {checkedItems[index] ? <span>{elem.quantite}</span> : null}
              </td>
              <td>{selectedProduct && selectedProduct.casse?selectedProduct.casse:""}</td>
            </tr>
          ))}
        </tbody>
      </table>
              {salleData.map((elem, index) => (
                <Grid  key={index}>
                <Grid
                  style={{
                    textAlign: "left",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    padding: "10px",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    marginBottom: "10px",
                    backgroundColor: "#f9f9f9",
                  }}
                >
                  <Grid style={{ flex: "1" }}>
                    <p
                      style={{
                        textDecoration: checkedItems[index] ? "line-through" : "none",
                      }}
                    >
                      1 - {elem.nomSalle}
                    </p>
                  </Grid>
                  
                  <Grid style={{ flex: "0 0 auto", right:'20px'}}>
                  <input
                      type="checkbox"
                      checked={checkedItems[index]}
                      onChange={() => handleCheckboxChange(index, "salle")}
                    />
                  </Grid>
                  <Grid style={{ marginLeft: '20px' }}>
                  <Button
                      className="btn btn-danger"
                      style={{ fontSize: '10px', padding: '5px 10px'}}
                      onClick={() => handleIncompleteButtonClick(index, "salle")}>
                      Incomplet
                    </Button>
                  </Grid>
                </Grid>
                </Grid>
                
              ))}
      </Grid>
      
      
      
    </Grid>
  );
}

export default ArticleCheckUp;