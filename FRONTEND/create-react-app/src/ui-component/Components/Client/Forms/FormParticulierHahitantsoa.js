import React, { useState } from "react";

function FormParticulierHahitantsoa({setShowFormParticulierHahitantsoa}) {
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [contact, setContact] = useState("");
  const [date_naissance, setDateNaiss] = useState("")
  const [lieu_naissance, setLieuNaiss] = useState("")
  const [num_CIN, setNumCin] = useState("")
  const [cin_date_delivrance, setDateDeliv] = useState("")
  const [certificat_residence, setCertificat] = useState("")
  const [lieu_residence, setLieuResid] = useState("")
  const [email, setEmail] = useState("")

  const resetForm = () => {
    setNom("");
    setPrenom("");
    setContact("");
    setDateNaiss("");
    setLieuNaiss("");
    setNumCin("");
    setDateDeliv("");
    setCertificat("");
    setLieuResid("");
    setEmail("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Créez un objet contenant les données du formulaire
    const formData = {
      nom: nom,
      prenom: prenom,
      contact: contact,
      date_naissance: date_naissance,
      lieu_naissance: lieu_naissance,
      num_CIN: num_CIN,
      cin_date_delivrance: cin_date_delivrance,
      certificat_residence: certificat_residence,
      lieu_residence: lieu_residence,
      email: email
    };

    // Envoyez les données du formulaire au serveur Django
    await fetch("http://127.0.0.1:8000/store/Particulier/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Utilisez JSON pour le contenu
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Réponse du serveur:", data);
        setShowFormParticulierHahitantsoa(false)
        resetForm(); 
      })
      .catch((error) => {
        console.error("Erreur lors de l'envoi de la requête:", error);
        // Gérez l'erreur si nécessaire
      });
    //ref vita io de redirigena amzay  ListeClients

  };
  
    return (
      <div>
      <h1>FORMULAIRE</h1>
      <form onSubmit={handleSubmit} className="form-particulier">
        <div className="form-group row">
          <div className="col-md-6">
            <label htmlFor="nom" className="form-label">
              Nom
            </label>
            <input type="text" className="form-control" id="nom" onChange={(e) => setNom(e.target.value)} />
          </div>
          <div className="col-md-6">
            <label htmlFor="prenom" className="form-label">
              Prénom
            </label>
            <input type="text" className="form-control" id="prenom" onChange={(e) => setPrenom(e.target.value)} />
          </div>
        </div>

        <div className="form-group row">
          <div className="col-md-6">
            <label htmlFor="contact" className="form-label">
              Contact
            </label>
            <input type="text" className="form-control" id="contact" onChange={(e) => setContact(e.target.value)} />
          </div>
          <div className="col-md-6">
            <label htmlFor="date_naissance" className="form-label">
              Date de naissance
            </label>
            <input type="text" className="form-control" id="date_naissance" onChange={(e) => setDateNaiss(e.target.value)} />
          </div>
        </div>

        <div className="form-group row">
          <div className="col-md-6">
            <label htmlFor="lieu_naissance" className="form-label">
              Lieu de naissance
            </label>
            <input type="text" className="form-control" id="lieu_naissance" onChange={(e) => setLieuNaiss(e.target.value)} />
          </div>
          <div className="col-md-6">
            <label htmlFor="num_CIN" className="form-label">
              Numéro CIN
            </label>
            <input type="text" className="form-control" id="num_CIN" onChange={(e) => setNumCin(e.target.value)} />
          </div>
        </div>

        <div className="form-group row">
          <div className="col-md-6">
            <label htmlFor="cin_date_delivrance" className="form-label">
              Date de délivrance de CIN
            </label>
            <input type="text" className="form-control" id="cin_date_delivrance" onChange={(e) => setDateDeliv(e.target.value)} />
          </div>
          <div className="col-md-6">
            <label htmlFor="certificat_residence" className="form-label">
              Certificat de résidence
            </label>
            <input type="text" className="form-control" id="certificat_residence" onChange={(e) => setCertificat(e.target.value)} />
          </div>
        </div>

        <div className="form-group row">
          <div className="col-md-6">
            <label htmlFor="lieu_residence" className="form-label">
              Lieu de résidence
            </label>
            <input type="text" className="form-control" id="lieu_residence" onChange={(e) => setLieuResid(e.target.value)} />
          </div>
          <div className="col-md-6">
            <label htmlFor="email" className="form-label">
              Adresse email
            </label>
            <input type="text" className="form-control" id="email" onChange={(e) => setEmail(e.target.value)} />
          </div>
        </div>

        <button className="btn btn-primary" type="submit">Valider</button>
      </form>
    </div>
    );
}

export default FormParticulierHahitantsoa;