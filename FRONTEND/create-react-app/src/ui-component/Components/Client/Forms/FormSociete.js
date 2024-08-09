import React, { useState, useEffect } from "react";

const FormSociete = ({submitted,setSubmitted, setShowMessage, rdvData}) =>{
  const [nom, setNom] = useState(rdvData?rdvData.nom:"");
  const [prenom, setPrenom] = useState(rdvData?rdvData.prenom:"");
  const [contact, setContact] = useState(rdvData?rdvData.contact:"");
  const [nomSociete, setNomSociete] = useState("");
  const [domiciliation, setDomiciliation] = useState("");
  const [email, setEmail] = useState("");
  const [nif, setNif] = useState("");
  const [stat, setStat] = useState("");
  const [errorMessage1, setErrorMessage1] = useState("")
  const [errorMessage2, setErrorMessage2] = useState("")
  const [errorMessage3, setErrorMessage3] = useState("")
  // const token = "eyJpdiI6InNGeXBrbGxRdEkvVVpKL045NVZpYVE9PSIsInZhbHVlIjoiYWdUWGl5ZERWVnZkbXNrSFg1SDRkT3ROZ1Z0MTRNM1o2NGMyek5YQ2M1OXI2QTBobi9HZVlkb2JVbDJXaldxZURtancyQ0tYcGlYVWw2ZkoyM0Qxc1VKSHN6Z1duc1VKL1ZSL2k5QVBJbHhYSG1WUWZ4K1pDdDYxODVNdm9uaDEiLCJtYWMiOiJkMDE2ODYyZGU5ZWQ5YTg0ZTdmYmQzZGFmYjdiODE4MTE5MGMwZjdmM2NmYTFjOGEyNWIyZDc1ZjVhYzY4YjQ5IiwidGFnIjoiIn0%3D"

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

  const handleSubmit = () =>{
    const SocieteObjet = {
      nom: nom,
      prenom: prenom,
      contact: contact,
      categorie: "Société",
      nomSociete: nomSociete,
      domiciliation: domiciliation,
      email: email,
      nif: nif,
      stat: stat,
    };

    if (!/^\d+$/.test(contact)) {
      setErrorMessage1('Le contact doit contenir uniquement des chiffres.');
    }
    setErrorMessage1('');

    if (!/^\d/.test(nom)) {
      setErrorMessage2('Le nom ne doit pas contenir des caractères spéciaux');
    }
    setErrorMessage2('');

    if (!/^\d/.test(prenom)) {
      setErrorMessage3('Le nom ne doit pas contenir des caractères spéciaux');
    }
    setErrorMessage3('');


    fetch("http://127.0.0.1:8000/store/Societe/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", 
      },
      body: JSON.stringify(SocieteObjet),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Réponse du serveur:", data);
        setShowMessage();
        resetForm(); 
      })
      .catch((error) => {
        console.error("Erreur lors de l'envoi de la requête:", error);
        // Gérez l'erreur si nécessaire
      });
  }

  useEffect(()=>{
    if(submitted===true) {
      handleSubmit();
      setSubmitted(false);
    }
    
  }, [submitted])
  
    return(
       <div>
      <form onSubmit={handleSubmit} className="form-particulier">
        <div className="row">
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="nom" className="form-label">
                Nom du représentant
              </label>
              <input type="text" value={nom} className="form-control" onChange={(e) => setNom(e.target.value)} required/>
              {errorMessage2 && <p style={{ color: 'red' }}>{errorMessage2}</p>}
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="prenom" className="form-label">
                Prénom du représentant
              </label>
              <input type="text" value={prenom} className="form-control" onChange={(e) => setPrenom(e.target.value)} required/>
              {errorMessage3 && <p style={{ color: 'red' }}>{errorMessage3}</p>}
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="nomSociete" className="form-label">
                Nom de la société
              </label>
              <input type="text" className="form-control" onChange={(e) => setNomSociete(e.target.value)} required/>
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="domiciliation" className="form-label">
                Domiciliation
              </label>
              <input type="text" className="form-control" onChange={(e) => setDomiciliation(e.target.value)} required/>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="contact" className="form-label">
                Contact
              </label>
              <input type="text" value={contact} className="form-control" onChange={(e) => setContact(e.target.value)} required/>
              {errorMessage1&&!errorMessage1 && <p style={{ color: 'red' }}>{errorMessage1}</p>}
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input type="email" className="form-control" onChange={(e) => setEmail(e.target.value)} required/>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="nif" className="form-label">
                NIF
              </label>
              <input type="text" className="form-control" onChange={(e) => setNif(e.target.value)} required/>
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="stat" className="form-label">
                STAT
              </label>
              <input type="text" className="form-control" onChange={(e) => setStat(e.target.value)} required/>
            </div>
          </div>
        </div>
      </form>
    </div>
    )
}

export default FormSociete