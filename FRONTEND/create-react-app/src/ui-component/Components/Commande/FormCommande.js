import React, { useState, useEffect } from "react";
import Divider from "@mui/material/Divider";

function FormParticulier({submitted, setSubmitted, panier, client, event, commande}) {
  const [nomEvent, setNomEvent] = useState(event!=false?event.description:"")
  const [dateEvent, setDateEvent] = useState(event!=false?event.date:"")
  const [nbPersEvent, setNbPersEvent] = useState(event!=false?event.nbPersonne:"")
  const [locationSalle, setLocationSalle] = useState(commande!=false?commande.locationSalle:false)
  const [locationProduit, setLocationProduit] = useState(commande!=false?commande.locationProduit:false)
  const [locationDeco, setLocationDeco] = useState(commande!=false?commande.locationDecoration:false)
  const [dateDebutLoc, setDateDebutLoc] = useState(commande!=false?commande.date_debutLoc:"")
  const [dateFinLoc, setDateFinLoc] = useState(commande!=false?commande.date_finLoc:"");
  

  const resetForm = () => {
    setNomEvent("");
    setDateEvent("");
    setNbPersEvent("")
    setLocationSalle(false);
    setLocationProduit(false);
    setLocationDeco(false);
    setDateDebutLoc("");
    setDateFinLoc("");
  };

  const handleSubmit = () => {
    // Créez un objet contenant les données du formulaire
    const formDataPanier = {
      client: client.id
    };

    // Envoyez les données du formulaire au serveur Django
      fetch("http://127.0.0.1:8000/store/Panier/", {
      method: panier?"PUT":"POST",
      headers: {
        "Content-Type": "application/json", // Utilisez JSON pour le contenu
      },
      body: JSON.stringify(formDataPanier),
      })
      .then((response) => response.json())
      .then((data) => {
        console.log("Réponse du serveur:", data);
        const formDataCommande = {
          panier: data.id,
          date_debutLoc: dateDebutLoc,
          date_finLoc: dateFinLoc,
          etat_paiement: commande?commande.etat_payement:"A",
          locationSalle: locationSalle,
          locationDecoration: locationDeco,
          locationProduit: locationProduit
        };
        fetch("http://127.0.0.1:8000/store/Commande/", {
          method: commande?"PUT":"POST",
          headers: {
            "Content-Type": "application/json", // Utilisez JSON pour le contenu
          },
          body: JSON.stringify(formDataCommande),
          })
          .then((response) => response.json())
          .then((dataC) => {
            console.log("Réponse du serveur:", dataC);
            const formDataEvent = {
              commande: dataC.id,
              description:nomEvent,
              date:dateEvent,
              nbPersonne:nbPersEvent,
            };
            fetch("http://127.0.0.1:8000/store/Evenement/", {
              method: event?"PUT":"POST",
              headers: {
                "Content-Type": "application/json", // Utilisez JSON pour le contenu
              },
              body: JSON.stringify(formDataEvent),
              })
              .then((response) => response.json())
              .then((dataC) => {
                  console.log("Réponse du serveur:", dataC);
                  resetForm();
                  window.location.reload();
              })
              .catch((error) => {
                console.error("Erreur lors de l'envoi de la requête:", error);
                // Gérez l'erreur si nécessaire
              });
          })
        .catch((error) => {
          console.error("Erreur lors de l'envoi de la requête:", error);
          // Gérez l'erreur si nécessaire
        });
      })
      .catch((error) => {
        console.error("Erreur lors de l'envoi de la requête:", error);
        // Gérez l'erreur si nécessaire
      });
      
    };
        useEffect(()=>{
          if(submitted===true) {
            handleSubmit();
            setSubmitted(false);
          }
        }, [submitted])
  
    return (
      <div>
      <form className="form-particulier">
        <div className="form-group row">
          {client.categorie==="Particulier"?
             <>
                <div className="col-md-6">
                <label htmlFor="nom" className="form-label">
                  Nom du client
                </label>
                <input disabled={true} type="text" className="form-control" id="nom" value={client.nom} onChange={(e) => setNom(e.target.value)} required/>
              </div>
              <div className="col-md-6">
                <label htmlFor="prenom" className="form-label">
                  Prénom du client
                </label>
                <input disabled={true} type="text" className="form-control" id="prenom" value={client.prenom} onChange={(e) => setPrenom(e.target.value)} required/>
              </div>
            </>
          :
            <div className="col-md-6">
              <label htmlFor="nom" className="form-label">
                Nom de la société
              </label>
              <input disabled={true} type="text" className="form-control" id="nom" value={client.nomSociete} onChange={(e) => setNomSociete(e.target.value)} required/>
            </div>
          }
        </div>

        

        <div className="form-group row mt-3 ">
          <div className="col-md-6">
            <label htmlFor="lieu_naissance" className="form-label">
              Nom de {"l'évènement "}
            </label>
            <input type="text" className="form-control" id="description" value={event?event.designation:nomEvent} onChange={(e) => setNomEvent(e.target.value)} required/>
          </div>
          <div className="col-md-6">
            <label htmlFor="date_naissance" className="form-label">
              Date de {"l'évènement "}
            </label>
            <input type="date" className="form-control" id="date" value={event?event.date:dateEvent} onChange={(e) => setDateEvent(e.target.value)} required/>
          </div>
          
        </div>

        <div className="form-group row mt-3 ">
          <div className="col-md-6">
            <label htmlFor="num_CIN" className="form-label">
              Nombre de personne
            </label>
            <input type="number" className="form-control" id="nbPersonne" value={event?event.nbPersonne:nbPersEvent} onChange={(e) => setNbPersEvent(e.target.value)} required/>
          </div>
          
        </div>
        <Divider className="mt-4 mb-2"/>          
        <div className="form-group row mt-3">
            <label htmlFor="certificat_residence" className="form-label">
              Ressources à louer
            </label>
            <div>
              <div style={{display:"inline-block", marginRight:"20%"}}>
                <label className="checkbox-container">
                  <input className="form-check-input" id="locationSalle" type="checkbox" onChange={()=>setLocationSalle(!locationSalle)} value={commande?commande.locationSalle:locationSalle}  checked={locationSalle} style={{float:"right", width:"20px", height:"20px"}} required/>
                  <span className="checkMark"></span>
                  <span className="label-text">Salles</span>
                </label>
              </div>
              <div style={{display:"inline-block", marginRight:"20%"}}>
                <label className="checkbox-container">
                  <input className="form-check-input" id="locationDeco" type="checkbox" onChange={()=>setLocationDeco(!locationDeco)} value={commande?commande.locationDecoration:locationDeco}  checked={locationDeco} style={{float:"right", width:"20px", height:"20px"}} required/>
                  <span className="checkMark"></span>
                  <span className="label-text">Decorations</span>
                </label>
              </div>
              <div style={{display:"inline-block"}}>
                <label className="checkbox-container">
                  <input className="form-check-input" id="locationProduit" type="checkbox" onChange={()=>setLocationProduit(!locationProduit)} value={commande?commande.locationProduit:locationProduit}  checked={locationProduit} style={{float:"right", width:"20px", height:"20px"}} required/>
                  <span className="checkMark"></span>
                  <span className="label-text">Produits</span>
                </label>
              </div>
          </div>
          
        </div>

        <div className="form-group row mt-3 ">
          <div className="col-md-6">
            <label htmlFor="lieu_naissance" className="form-label">
              Date de sortie des matériels
            </label>
            <input type="datetime-local" className="form-control" id="date_debutLoc" value={commande?commande.date_debutLoc:dateDebutLoc} onChange={(e) => setDateDebutLoc(e.target.value)} required/>
          </div>
          <div className="col-md-6">
            <label htmlFor="date_naissance" className="form-label">
              Date de retour des matériels
            </label>
            <input type="datetime-local" className="form-control" id="date_finLoc" value={commande?commande.date_finLoc:dateFinLoc} onChange={(e) => setDateFinLoc(e.target.value)} required/>
          </div>
          
        </div>
      </form>
    </div>
    );
}

export default FormParticulier;