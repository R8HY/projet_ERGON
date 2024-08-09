import React, { useState, useEffect } from "react";
import axios from "axios";

function FormProduit({ submitted, setSubmitted}) {
  const [nomProduit, setNomProduit] = useState("");
  const [prix_unitaire, setPrix_unitaire] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const resetData = () => {
    setNomProduit("");
    setPrix_unitaire("");
    setDescription("");
    setImage(null);
  };

  const handleSubmit = () => {

    // Créez un objet FormData pour envoyer les données du formulaire, y compris le fichier image
    const formData = new FormData();
    formData.append("nom", nomProduit);
    formData.append("prix", prix_unitaire);
    formData.append("description", description);
    formData.append("image", image);
    formData.append("disponible", true);
    formData.append("etat", null);

    axios
      .post("http://127.0.0.1:8000/store/Location/Salle/", formData)
      .then((response) => {
        console.log("Réponse du serveur:", response.data);
        setSubmitted(false);
        resetData();
      })
      .catch((error) => {
        // Gérez les erreurs ici
        console.error(error);
      });
  };

  useEffect(()=>{
    if(submitted===true){
      handleSubmit();
    }
  },[submitted])

  const handleImageChange = (event) => {
    const selectedImage = event.target.files[0];
    setImage(selectedImage);
  };

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="nomProduit" className="form-label">
              Nom de la salle
            </label>
            <input
              type="text"
              className="form-control"
              id="nomProduit"
              value={nomProduit}
              onChange={(e) => setNomProduit(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="prix_unitaire" className="form-label">
              Prix
            </label>
            <input
              type="number"
              className="form-control"
              id="prix_unitaire"
              value={prix_unitaire}
              onChange={(e) => setPrix_unitaire(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="categorie" className="form-label">
              Description
            </label>
            <input
              type="text"
              className="form-control"
              id="categorie"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="image" className="form-label">
              Image
            </label>
            <input
              type="file"
              className="form-control"
              id="image"
              onChange={handleImageChange}
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default FormProduit;
