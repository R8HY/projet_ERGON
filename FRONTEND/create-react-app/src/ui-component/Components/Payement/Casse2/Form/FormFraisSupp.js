import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addRdvDate } from "./store";
import {Card, Button} from "@mui/material"
import AOS from 'aos';
import 'aos/dist/aos.css';
import MessageModal from "ui-component/Components/Modals/MessageModal";

function FormRdv() {
  const [nom, setNom] = useState("");
  const [dateRdv, setDateRdv] = useState("");
  const [prenom, setPrenom] = useState("");
  const [contact, setContact] = useState("");
  const [motif, setMotif] = useState("");
  const [showFormAdded, setShowFormAdded] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Créez un objet contenant les données du formulaire
    const formData = {
      nom: nom,
      dateRdv: dateRdv,
      prenom: prenom,
      contact: contact,
      motif: motif,
    };

    // Envoyez les données du formulaire au serveur Django
    await fetch("http://127.0.0.1:8000/store/RendezVous/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Utilisez JSON pour le contenu
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Réponse du serveur:", data);
        setShowFormAdded(true);
        // Utilisez this.props.history.push pour passer les données à la page ListeClients
      })
      .catch((error) => {
        console.error("Erreur lors de l'envoi de la requête:", error);
        // Gérez l'erreur si nécessaire
      });
      dispatch(addRdvDate(dateRdv));

      setDateRdv("");
  };

  const resetForm = ()=>{
    setNom("");
    setPrenom("");
    setDateRdv("");
    setContact("");
    setMotif("");
  }

  useEffect(() => {
    AOS.init({ duration: 1500 });
  }, []);

  return (
    <Card data-aos="zoom-in" className="myContainer h-100">
      <MessageModal onClose={()=>resetForm()} showForm={showFormAdded} setShowForm={setShowFormAdded}
                message="Rendez-vous ajouté avec succès"/>
      <div style={{marginBottom:"30px", marginTop:"20px", width:"100%"}}>
        <h3>Formulaire de rendez-vous</h3>
      </div>
      <div>
        <div>
          <form onSubmit={handleSubmit}>
          <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Date
              </label>
              <input type="datetime-local" className="form-control" value={dateRdv} onChange={(e) => setDateRdv(e.target.value)} />
            </div>

            <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Nom
              </label>
              <input type="text" className="form-control" value={nom} onChange={(e) => setNom(e.target.value)} />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Prenom
              </label>
              <input type="text" className="form-control" value={prenom} onChange={(e) => setPrenom(e.target.value)} />
            </div>

            <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Contact
              </label>
              <input type="text" className="form-control" value={contact} onChange={(e) => setContact(e.target.value)} />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Motif
              </label>
              <textarea className="form-control" rows="3" value={motif} onChange={(e) => setMotif(e.target.value)} />
            </div>
            {/* <Link to="/ListeClients"> */}
            <Button variant="contained" color="secondary" onClick={handleSubmit} style={{float:"right"}}>Ajouter</Button>
            {/* </Link> */}
          </form>
        </div>
      </div>
    </Card>
    
  );
}

export default FormRdv;