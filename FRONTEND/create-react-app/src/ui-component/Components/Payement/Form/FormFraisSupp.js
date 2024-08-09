import React, { useState, useEffect } from "react";
import 'aos/dist/aos.css';

function FormRdv({submitted, setSubmitted, idPanier}) {
  const [montant, setMontant] = useState(0);
  const [motif, setMotif] = useState("");

  const handleSubmit = () => {

    // Créez un objet contenant les données du formulaire
    const formData = {
      motif: motif,
      montant: montant
    };

    // Envoyez les données du formulaire au serveur Django
    fetch(`http://127.0.0.1:8000/store/Panier/${idPanier}/frais_supplementaire_panier/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Utilisez JSON pour le contenu
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Réponse du serveur:", data);
        setSubmitted(false);
      })
      .catch((error) => {
        console.error("Erreur lors de l'envoi de la requête:", error);
        // Gérez l'erreur si nécessaire
      });
  };

  useEffect(() => {
      if(submitted===true){
        handleSubmit();
      }
  }, [submitted]);

  return (
        <form onSubmit={handleSubmit}>
        <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Entrez le motif
              </label>
              <input type="text" className="form-control" value={motif} onChange={(e) => setMotif(e.target.value)} />
            </div>
          <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Entrez le montant
              </label>
              <input type="number" className="form-control" value={montant} onChange={(e) => setMontant(e.target.value)} />
            </div>
        </form>
  );
}

export default FormRdv;