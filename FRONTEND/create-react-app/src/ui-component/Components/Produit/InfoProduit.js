import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router';
import {
  MDBCol,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
//   MDBBreadcrumb,
//   MDBBreadcrumbItem,
  // MDBProgress,
  // MDBProgressBar,
  // MDBIcon,
  // MDBListGroup,
  // MDBListGroupItem
} from 'mdb-react-ui-kit';
import {Button, Grid} from "@mui/material"
import ListeSortie from "../Sortie/ListeSortie"
import AOS from 'aos';
import 'aos/dist/aos.css';
import axios from 'axios';
import ConfirmModal from "ui-component/Components/Modals/ConfirmModal";
import MessageModal from "ui-component/Components/Modals/MessageModal";

function ProfilePage() {
  const [produit, setProduit] = useState([]);
  const params = useParams()
  const [nomProduit, setNomProduit] = useState("");
  const [nombre, setNombre] = useState("");
  const [prix, setPrix] = useState("");
  const [typeProduit, setTypeProduit] = useState("");
  const [description, setDescription] = useState("");
  const [categorie, setCategorie] = useState("");
  const [showFormDelete, setShowFormDelete] = useState(false);
  const [showFormDeleted, setShowFormDeleted] = useState(false);
  const [showFormEdited, setShowFormEdited] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);

  useEffect(() => {
    // Define the URL for your GET request
    var apiUrl =`http://127.0.0.1:8000/store/Produit/${params.id}`;
    // Make the GET request using the fetch API
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((produit) => {
        // Update the state with the fetched produit
        setProduit(produit);
        setNomProduit(produit.nomProduit);
        setNombre(produit.nombre);
        setPrix(produit.prix_unitaire);
        setDescription(produit.description);
        setTypeProduit(produit.type_produit);
        apiUrl =`http://127.0.0.1:8000/store/TypeProduit/${produit.type_produit}`;

        fetch(apiUrl)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((produit) => {
          // Update the state with the fetched produit
          setCategorie(produit);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
        console.log("les produits:", produit)
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [params.id]);

  const deleteProduit = () => {
    var apiUrl =`http://127.0.0.1:8000/store/Produit/${params.id}`;
    axios.delete(apiUrl);
    setShowFormDeleted(true);
    setShowFormDelete(false);
  };

  const askingForEdit = () => {
    var apiUrl =`http://127.0.0.1:8000/store/Produit/${params.id}/`;
    const formEdit = {
      nomProduit:nomProduit,
      prix_unitaire:prix,
      nombre:nombre,
      type_produit:typeProduit,
      description:description
    }
    axios.put(apiUrl, formEdit).then((response)=>{
      setProduit(response.data);
      setShowFormEdited(true);
    })
  };

  return (
        <MDBRow>
        <ConfirmModal showForm={showFormDelete} setShowForm={setShowFormDelete}
                message="Supprimer le produit ?" onConfirm={()=>deleteProduit()} />
        <MessageModal showForm={showFormDeleted} setShowForm={setShowFormDeleted}
              message="Le produit a bien été supprimé"/>
        <MessageModal showForm={showFormEdited} setShowForm={setShowFormEdited}
              message="Les informations ont bien été modifiées"/>
          <Grid container xs={12} sm={12} md={12} lg={4}>
            <Grid style={{marginLeft:"10px", marginRight:"10px"}} lg={12}>
              <MDBCard data-aos="zoom-in" className="mb-4">
                <MDBCardBody className="text-center">
                  <MDBCardImage
                    src={produit.image}
                    alt="avatar"
                    style={{ width: '150px', marginBottom:'40px', marginTop:'10px', borderRadius:"10px" }}
                    fluid />
                  <p className="text-muted mb-1">{produit.nomProduit}</p>
                  <p className="text-muted titreDivProfil">Identifiant : {produit.id}</p>
                  <div className="d-flex justify-content-center mb-2" >
                    <Button variant="contained" color="secondary"onClick={()=>setShowFormDelete(true)}>Supprimer</Button>
                  </div>
                </MDBCardBody>
              </MDBCard>
            </Grid>
            <Grid style={{marginLeft:"10px", marginRight:"10px"}} lg={12}>
              <MDBCard data-aos="zoom-in" className="mb-4 h-100">
                  <MDBCardBody>
                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText>Produit</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        <input
                          className="text-muted noBorder-input"
                          value={nomProduit}
                          onChange={(e)=>setNomProduit(e.target.value)}
                          style={{border:"none",  outline: "none"}}
                        />
                      </MDBCol>
                    </MDBRow>
                    <hr />
                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText>Quantité en stock</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        <MDBCardText className="text-muted"><input
                          className="text-muted noBorder-input"
                          value={nombre}
                          onChange={(e)=>setNombre(e.target.value)}
                          style={{border:"none",  outline: "none"}}
                        /></MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    <hr />
                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText>Catégorie</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                          <MDBCardText className="text-muted">{categorie.categorie} <span style={{color:'black', marginLeft:"30%"}}>id:</span><input
                          className="text-muted noBorder-input"
                          value={typeProduit}
                          onChange={(e)=>setTypeProduit(e.target.value)}
                          style={{border:"none",  outline: "none", width:"10px"}}
                        /></MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    <hr />
                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText>Prix unitaire</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        <MDBCardText className="text-muted">Ariary <input
                          className="text-muted noBorder-input"
                          value={prix}
                          onChange={(e)=>setPrix(e.target.value)}
                          style={{border:"none",  outline: "none"}}
                        /></MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    <hr />
                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText>Description</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        <MDBCardText className="text-muted"><input
                          type="text"
                          className="text-muted noBorder-input"
                          value={description}
                          onChange={(e)=>setDescription(e.target.value)}
                          style={{border:"none",  outline: "none"}}
                        /></MDBCardText>
                      </MDBCol>
                    </MDBRow>
                  </MDBCardBody>
                  <div className="d-flex justify-content-center mb-2" style={{marginRight:"10px"}}>
                    <Button variant="contained" color="secondary" onClick={()=>askingForEdit()}>Modifier</Button>
                </div>
                </MDBCard>
            </Grid>
          </Grid>
          <Grid container xs={12} sm={12} md={12} lg={8}>
            <Grid style={{marginLeft:"10px", marginRight:"10px"}} lg={12}>
              <MDBCard data-aos="zoom-in" className="mb-4 mt-3" style={{height:"670px"}}>
                <MDBCardBody>
                  <span style={{color:"#999"}}>Locations sur ce produits : </span>
                  <ListeSortie type="ArticlePanier" id={produit.id}/>
                </MDBCardBody>
              </MDBCard>
            </Grid>
          </Grid>
        </MDBRow>
  );
}

export default ProfilePage;