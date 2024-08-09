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
  const [nom, setNom] = useState("");
  const [etat, setEtat] = useState("");
  const [prix, setPrix] = useState("");
  const [disponible, setDisponible] = useState("");
  const [description, setDescription] = useState("");
  const [showFormDelete, setShowFormDelete] = useState(false);
  const [showFormDeleted, setShowFormDeleted] = useState(false);
  const [showFormEdited, setShowFormEdited] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);

  useEffect(() => {
    // Define the URL for your GET request
    var apiUrl =`http://127.0.0.1:8000/store/Location/Salle/${params.id}`;
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
        setNom(produit.nom);
        setEtat(produit.etat);
        setPrix(produit.prix);
        setDescription(produit.description);
        setDisponible(produit.disponible);
        apiUrl =`http://127.0.0.1:8000/store/Location/Salle/${produit.categorie}`;

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
    var apiUrl =`http://127.0.0.1:8000/store/Location/Salle/${params.id}`;
    axios.delete(apiUrl);
    setShowFormDeleted(true);
    setShowFormDelete(false);
  };

  const askingForEdit = () => {
    var apiUrl =`http://127.0.0.1:8000/store/Location/Salle/${params.id}/`;
    const formEdit = {
      nom:nom,
      prix:prix,
      etat:etat,
      description:description,
      disponible:disponible
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
            <MDBCard data-aos="zoom-in" className="mb-4 mt-2">
              <MDBCardBody className="text-center">
                <MDBCardImage
                  src={produit.image}
                  alt="avatar"
                  style={{ width: '200px', marginBottom:'40px', marginTop:'10px', borderRadius:"10px" }}
                  fluid />
                <p className="text-muted mb-1">{produit.nom}</p>
                <p className="text-muted titreDivProfil">Identifiant : {produit.id}</p>
                <div className="d-flex justify-content-center mb-2" >
                  <Button variant="contained" color="secondary" onClick={()=>setShowFormDelete(true)}>Supprimer</Button>
                </div>
              </MDBCardBody>
            </MDBCard>


      </Grid>
      <Grid style={{marginLeft:"10px", marginRight:"10px"}} lg={12}>
            <MDBCard data-aos="zoom-in" className="mb-4 h-100">
                <MDBCardBody>
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Salle</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <input
                        className="text-muted noBorder-input"
                        value={nom}
                        onChange={(e)=>setNom(e.target.value)}
                        style={{border:"none",  outline: "none"}}
                      />
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Etat</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted"><input
                        className="text-muted noBorder-input"
                        value={etat}
                        onChange={(e)=>setEtat(e.target.value)}
                        style={{border:"none",  outline: "none"}}
                      /></MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Prix</MDBCardText>
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
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Disponibilité</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <input type="checkbox" checked={disponible} onChange={()=>setDisponible(!disponible)}/>
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
            <span style={{color:"#999"}}>Locations sur cette décoration : </span>
            <ListeSortie type="SallePanier" id={produit.id}/>
          </MDBCardBody>
        </MDBCard>
      </Grid>
    </Grid>
  </MDBRow>
);
}

export default ProfilePage;