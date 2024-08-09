import { useState } from "react";
import axios from "axios";

function FormPanier({idProduit, nomProduit, prix_unitaire, id_panier, setShowFormPanier}) {
  // const [nomProduit, setNomProduit] = useState("");
  // const [prix_unitaire, setPrix_unitaire] = useState("");
  const [quantite, setQuantite] = useState("");

  const resetForm = () =>{
    quantite('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Créez un objet contenant les données du formulaire
    const formData = {
      produit:idProduit,
      //prix_unitaire:prix_unitaire,
      quantite:quantite,
      //id:id,
    };

        axios.post(`http://127.0.0.1:8000/store/Panier/${id_panier}/article_panier/`, formData)
        .then((response) => response.json())
        .then((data) => {
            console.log("Réponse du serveur:", data);
            setShowFormPanier(false)
            resetForm()
        })
        .catch((error) => {
            // Gérez les erreurs ici
            console.error("Erreur:"+error);
        });
  };


  return (
    <div>
      <div>
        <h3>Remplissez vos panier!</h3>
        <form onSubmit={handleSubmit}>
        <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              Identifiant du panier
            </label>
            <input type="text" className="form-control" value={id_panier} disabled/>
          </div>

          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              Nom du produit
            </label>
            <input type="text" className="form-control" value={nomProduit} disabled/>
          </div>

          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              Prix unitaire
            </label>
            <input type="price" className="form-control" value={prix_unitaire} disabled/>
          </div>

          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              Quantité
            </label>
            <input type="text" className="form-control" onChange={(e) => setQuantite(e.target.value)} min={0}/>
          </div>
          <button className="btn btn-primary" onClick={handleSubmit}>Ajouter au panier</button>
        
        </form>
      </div>
    </div>
  );
}

export default FormPanier;