import React, { useState} from "react";

const FormSocieteHahitantsoa = ({setShowFormSocieteHahitantsoa}) =>{
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [contact, setContact] = useState("");
  const [nomSociete, setNomSociete] = useState("");
  const [domiciliation, setDomiciliation] = useState("");
  const [email, setEmail] = useState("");
  const [nif, setNif] = useState("");
  const [stat, setStat] = useState("");

  const resetForm = () => {
    setNom("");
    setPrenom("");
    setContact("");
    setNomSociete("");
    setDomiciliation("");
    setEmail("");
    setNif("");
    setStat("");
  };

  console.log(nomSociete)
  const handleSubmit = async (e) =>{
    e.preventDefault()

    const SocieteObjet = {
      nom: nom,
      prenom: prenom,
      contact: contact,
      nomSociete: nomSociete,
      domiciliation: domiciliation,
      email: email,
      nif: nif,
      stat: stat,
    };

    await fetch("http://127.0.0.1:8000/store/HahitantsoaSociete/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Utilisez JSON pour le contenu
      },
      body: JSON.stringify(SocieteObjet),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Réponse du serveur:", data);
        console.log(data)
        setShowFormSocieteHahitantsoa(false)
        resetForm(); 
      })
      .catch((error) => {
        console.error("Erreur lors de l'envoi de la requête:", error);
        // Gérez l'erreur si nécessaire
      });
  }
  
    return(
       <div>
      <h1>FORMULAIRE</h1>
      <form onSubmit={handleSubmit} className="form-particulier">
        <div className="row">
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="nom" className="form-label">
                Nom
              </label>
              <input type="text" className="form-control" onChange={(e) => setNom(e.target.value)} />
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="prenom" className="form-label">
                Prénom
              </label>
              <input type="text" className="form-control" onChange={(e) => setPrenom(e.target.value)} />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="contact" className="form-label">
                Contact
              </label>
              <input type="text" className="form-control" onChange={(e) => setContact(e.target.value)} />
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="nomSociete" className="form-label">
                Nom de la société
              </label>
              <input type="text" className="form-control" onChange={(e) => setNomSociete(e.target.value)} />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="domiciliation" className="form-label">
                Domiciliation
              </label>
              <input type="text" className="form-control" onChange={(e) => setDomiciliation(e.target.value)} />
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input type="text" className="form-control" onChange={(e) => setEmail(e.target.value)} />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="nif" className="form-label">
                NIF
              </label>
              <input type="text" className="form-control" onChange={(e) => setNif(e.target.value)} />
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="stat" className="form-label">
                STAT
              </label>
              <input type="text" className="form-control" onChange={(e) => setStat(e.target.value)} />
            </div>
          </div>
        </div>

        <button className="btn btn-primary" type="submit">Valider</button>
      </form>
    </div>
    )
}

export default FormSocieteHahitantsoa;