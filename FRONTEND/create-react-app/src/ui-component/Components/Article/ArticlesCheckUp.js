import React, { useEffect, useState } from "react";
import { Modal, Button } from 'react-bootstrap'; 
//import FormPanier from "../Panier/FormPanier";
import CasseProduit from "../Produit/CasseProduit";
import {IconBrandCouchdb, IconBallon} from '@tabler/icons';
import { Grid } from '@mui/material';
import AOS from 'aos';
import 'aos/dist/aos.css';
import axios from 'axios';

//import ListeArticle from "./ListeArticle";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

function ArticleCheckUp({id_panier, casseProd, casseDeco, produitLouee, decoLouee}) {
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
    AOS.init({ duration: 2000 });
  }, []);

  const handleCheckboxChange = (id, type) => {
    console.log(type);
    if(type==='produit'){
      if(casseProd.filter(pro=>pro.article===id).length===0){
        axios.post(`http://127.0.0.1:8000/store/Panier/${id_panier}/casse_article_panier/`, 
          {article:id, quantiteCasse:0});
      }
      else{
        const ident = (casseProd.filter(pro=>pro.article===id)[0]).id
        axios.delete(`http://127.0.0.1:8000/store/Panier/${id_panier}/casse_article_panier/${ident}`);
      }
    }
    if(type==='decoration'){
      if(casseDeco.filter(pro=>pro.decoration===id).length===0){
        axios.post(`http://127.0.0.1:8000/store/Panier/${id_panier}/casse_decoration_panier/`, 
          {decoration:id, quantiteCasse:0});
      }
      else{
        const ident = (casseDeco.filter(pro=>pro.decoration===id)[0]).id
        axios.delete(`http://127.0.0.1:8000/store/Panier/${id_panier}/casse_decoration_panier/${ident}`);
      }
    }
  };

  const handleFormSubmitCasse = (formData) => {
    const updatedData = data.map((item, index) => {
      if (index === prodIndex) {
        item.casse = formData.quantite;
      }
      return item;
    });

    console.log(updatedData)
    setShowForm(false);
  };

  const handleProductSelect = (product) => {
    setSelectedProduct(product);
  };


  const isComplete = (elem, type) => {
    if(!isCasse(elem, type)) return false;
    if (type==="decoration"){
      var deco = casseDeco.filter(deco=>deco.decoration===elem.decoration);
      return deco[0].quantiteCasse==0;
    }
    if (type==="produit"){
      var prod = casseProd.filter(deco=>deco.article===elem.produit);
      return prod[0].quantiteCasse==0;
    }
  }

  const isCasse = (elem, type) => {
    if (type==="decoration"){
      var deco = casseDeco.filter(deco=>deco.decoration===elem.decoration);
      if (!deco[0])return false;
      return true;
    }
    if (type==="produit"){
      var prod = casseProd.filter(deco=>deco.article===elem.produit);
      if (!prod[0])return false;
      return true;
    }
  }

  return (
    <Grid container xs={12} sm={12} md={12} lg={12}>
      <Grid item xs={12} sm={12} md={12} lg={12}>
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
        <Grid data-aos="zoom-in" item className="myContainer" style={{height:"666px", marginBottom:"10px"}} 
            xs={12} sm={12} md={12} lg={12}>
            <p><span style={{fontWeight:"bold"}}>Produits louées : </span></p>
              <table className="table" style={{width:"100%"}}>
                <tbody>
                {produitLouee.map((elem, index) => (
                    <tr key={index}>
                      <td style={{border:'none', width:"45%"}}><Grid  key={index}>
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
                                marginRight: "10px",
                                backgroundColor: "#f9f9f9",
                              }}
                            >
                              <Grid style={{ flex: "1" }}>
                                <p
                                  style={{
                                    textDecoration:
                                      isCasse(elem, "produit") ? "line-through" : "none",
                                    color:
                                      !isCasse(elem, "produit")?"black":"gray"
                                  }}
                                >
                                  {elem.quantite} - {elem.nomP}
                                </p>
                              </Grid>
                              <Grid style={{ flex: "1" }}>
                                <IconBrandCouchdb style={{color:
                                  !isCasse(elem, "produit")?"black":"gray"}} stroke={1.5} size="1.5rem" />
                              </Grid>

                              {isCasse(elem, "produit")&&
                                !isComplete(elem, "produit")?<Grid style={{  flex: "0 0 auto" , right:'20px'}}>
                                <p
                                  style={{
                                    color: "red",
                                  }}
                                >
                                  Casse
                                </p>
                              </Grid>
                              :
                              <>
                                <Grid style={{ flex: "0 0 auto", right:'20px', transform:"translate(0%, 15%)"}}>
                                  <input
                                      type="checkbox"
                                      checked={isCasse(elem, "produit")}
                                      onClick={() => handleCheckboxChange(elem.id, "produit")}
                                    />
                                </Grid>
                                {!isCasse(elem, "produit")&&!isComplete(elem, "produit")&&<Grid style={{ marginLeft: '20px' }}>
                                  <Button
                                      className="btn btn-danger"
                                      style={{ fontSize: '10px', padding: '5px 10px'}}
                                      onClick={() => handleIncompleteButtonClick(index, "produit")}>
                                      Incomplet
                                    </Button>
                                </Grid>}
                              </>
                            }
                            </Grid>
                          </Grid>
                        </td>
                    </tr>
                  ))}
                  {decoLouee.map((elem, index) => (
                    <tr key={index}>
                      <td style={{border:'none', width:"45%"}}><Grid  key={index}>
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
                                marginRight: "10px",
                                backgroundColor: "#f9f9f9",
                              }}
                            >
                              <Grid style={{ flex: "1" }}>
                                <p
                                  style={{
                                    textDecoration:
                                      isCasse(elem, "decoration") ? "line-through" : "none",
                                    color:
                                      !isCasse(elem, "decoration")?"black":"gray"
                                  }}
                                >
                                  {elem.quantite} - {elem.nomDecoration}
                                </p>
                              </Grid>
                              <Grid style={{ flex: "1" }}>
                                <IconBallon style={{color:
                                  !isCasse(elem, "decoration")?"black":"gray"}} stroke={1.5} size="1.5rem" />
                              </Grid>

                              {isCasse(elem, "decoration")&&
                                !isComplete(elem, "decoration")?<Grid style={{  flex: "0 0 auto" , right:'20px'}}>
                                <p
                                  style={{
                                    color: "red",
                                  }}
                                >
                                  Casse
                                </p>
                              </Grid>
                              :
                              <>
                                <Grid style={{ flex: "0 0 auto", right:'20px', transform:"translate(0%, 15%)"}}>
                                  <input
                                      type="checkbox"
                                      checked={isCasse(elem, "decoration")}
                                      onClick={() => handleCheckboxChange(elem.id, "decoration")}
                                    />
                                </Grid>
                                {!isCasse(elem, "decoration")&&!isComplete(elem, "decoration")&&<Grid style={{ marginLeft: '20px' }}>
                                  <Button
                                      className="btn btn-danger"
                                      style={{ fontSize: '10px', padding: '5px 10px'}}
                                      onClick={() => handleIncompleteButtonClick(index, "decoration")}>
                                      Incomplet
                                    </Button>
                                </Grid>}
                              </>
                            }
                            </Grid>
                          </Grid>
                        </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Grid>
          </Grid>
        <Grid>
      </Grid>
    </Grid>
  );
}

export default ArticleCheckUp;